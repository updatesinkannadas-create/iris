import { createContext, useContext, useState, useEffect } from 'react'
import { auth, googleProvider, db } from '../firebase'
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import axios from 'axios'

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isNewUser, setIsNewUser] = useState(false)

    // Listen for auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                setUser(firebaseUser)
                // Check if user has profile data in Firestore
                const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))
                if (userDoc.exists()) {
                    setUserData(userDoc.data())
                    setIsNewUser(false)
                } else {
                    // New user — needs onboarding
                    setIsNewUser(true)
                    setUserData(null)
                }
            } else {
                setUser(null)
                setUserData(null)
                setIsNewUser(false)
            }
            setLoading(false)
        })

        return unsubscribe
    }, [])

    // Google Sign In
    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider)
            return result.user
        } catch (error) {
            console.error('Google sign-in error:', error)
            throw error
        }
    }

    // Sign Out
    const logout = async () => {
        try {
            await signOut(auth)
        } catch (error) {
            console.error('Sign out error:', error)
        }
    }

    // Save user data to Firestore (called after onboarding)
    const saveUserData = async (data) => {
        if (!user) return
        try {
            await setDoc(doc(db, 'users', user.uid), {
                ...data,
                email: user.email,
                googleName: user.displayName,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            })
            setUserData(data)
            setIsNewUser(false)
        } catch (error) {
            console.error('Error saving user data:', error)
            throw error
        }
    }

    // Update user data (for edits)
    const updateUserData = async (data) => {
        if (!user) return
        try {
            await updateDoc(doc(db, 'users', user.uid), {
                ...data,
                updatedAt: new Date().toISOString(),
            })
            setUserData(prev => ({ ...prev, ...data }))
        } catch (error) {
            console.error('Error updating user data:', error)
            throw error
        }
    }

    // Upload profile photo to Cloudinary
    const uploadProfilePhoto = async (file) => {
        if (!user) return null

        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

        if (!cloudName || !uploadPreset) {
            alert('Cloudinary is not configured! Please set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in your .env.local file.')
            return null
        }

        try {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('upload_preset', uploadPreset)

            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                formData
            )

            const downloadURL = response.data.secure_url

            await updateDoc(doc(db, 'users', user.uid), {
                profilePhotoURL: downloadURL,
                updatedAt: new Date().toISOString(),
            })
            setUserData(prev => ({ ...prev, profilePhotoURL: downloadURL }))
            return downloadURL
        } catch (error) {
            console.error('Error uploading photo to Cloudinary:', error)
            alert('Cloudinary Error: Make sure your Cloud Name and Upload Preset are correct, and the preset is set to "Unsigned" in Cloudinary settings.')
            throw error
        }
    }

    // Remove profile photo
    const removeProfilePhoto = async () => {
        if (!user) return
        try {
            // Cannot securely delete from Cloudinary frontend without signature. 
            // Just removing reference from Firestore.
            await updateDoc(doc(db, 'users', user.uid), {
                profilePhotoURL: null,
                updatedAt: new Date().toISOString(),
            })
            setUserData(prev => ({ ...prev, profilePhotoURL: null }))
        } catch (error) {
            console.error('Error removing photo:', error)
            throw error
        }
    }

    const value = {
        user,
        userData,
        loading,
        isNewUser,
        signInWithGoogle,
        logout,
        saveUserData,
        updateUserData,
        uploadProfilePhoto,
        removeProfilePhoto,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
