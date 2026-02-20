// Firebase configuration
// REPLACE these values with your actual Firebase config from the console
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBaIB6ctN72sOInFbQuoaBH5aXEHfglH4Q",
  authDomain: "irisnitk-8d387.firebaseapp.com",
  projectId: "irisnitk-8d387",
  storageBucket: "irisnitk-8d387.firebasestorage.app",
  messagingSenderId: "234082038840",
  appId: "1:234082038840:web:3068f2fe747ca4bcc022cd",
  measurementId: "G-WKC2ZPZH19"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app



