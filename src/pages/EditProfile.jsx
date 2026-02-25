import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import CustomSelect from '../components/CustomSelect'
import './EditProfile.css'

const BRANCHES = [
    'Computer Science and Engineering',
    'Information Technology',
    'Electronics and Communication Engineering',
    'Electrical and Electronics Engineering',
    'Civil Engineering',
    'Mechanical Engineering',
    'Chemical Engineering',
    'Mining Engineering',
    'Metallurgical and Materials Engineering',
    'Mathematical and Computational Sciences',
]

const DEGREES = ['B.Tech', 'M.Tech', 'PhD']
const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year']
const SEMESTERS = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th']

const BOYS_HOSTELS = [
    'Karavali (Block I)', 'Aravali (Block II)', 'Vindhya (Block III)',
    'Satpura (Block IV)', 'Nilgiri (Block V)', 'Pushpagiri (PG Block)',
    'Brahmagiri (PG New)', 'Sahyadri (Block VII)', 'Trishul (Block VIII)',
    'Everest (MT-I)', 'Himalaya (MT-II)', 'Kailash (MT-III)', 'Shivalik (Block XI)',
]

const GIRLS_HOSTELS = [
    'Ganga (GH-I)', 'Kaveri (GH-II)', 'Yamuna (GH-III)',
    'Sharavathi (GH-IV)', 'Netravathi (GH-V)', 'Godavari (GH-VI)',
]

function EditProfile() {
    const navigate = useNavigate()
    const { userData, updateUserData, uploadProfilePhoto, removeProfilePhoto } = useAuth()
    const fileInputRef = useRef(null)
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)

    // Basic Info
    const [fullName, setFullName] = useState('')
    const [degree, setDegree] = useState('')
    const [year, setYear] = useState('')
    const [semester, setSemester] = useState('')
    const [branch, setBranch] = useState('')

    // Credits & Hostel
    const [majorCredits, setMajorCredits] = useState('')
    const [minorCredits, setMinorCredits] = useState('')
    const [hostelStatus, setHostelStatus] = useState('day_scholar')
    const [hostelName, setHostelName] = useState('')
    const [roomNumber, setRoomNumber] = useState('')

    // Courses
    const [courses, setCourses] = useState([{ name: '', code: '', status: 'taken' }])

    // Personal
    const [fatherName, setFatherName] = useState('')
    const [dob, setDob] = useState('')
    const [gender, setGender] = useState('')
    const [bloodGroup, setBloodGroup] = useState('')
    const [nationality, setNationality] = useState('')
    const [religion, setReligion] = useState('')
    const [phone, setPhone] = useState('')
    const [parentPhone, setParentPhone] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')

    // Academic
    const [rollNo, setRollNo] = useState('')
    const [registrationNo, setRegistrationNo] = useState('')
    const [admissionYear, setAdmissionYear] = useState('')

    // Photo
    const [photoPreview, setPhotoPreview] = useState(null)
    const [photoFile, setPhotoFile] = useState(null)
    const initials = fullName ? fullName.charAt(0).toUpperCase() : 'U'

    // Load existing data
    useEffect(() => {
        if (userData) {
            setFullName(userData.fullName || '')
            setDegree(userData.degree || '')
            setYear(userData.year || '')
            setSemester(userData.semester || '')
            setBranch(userData.branch || '')
            setMajorCredits(userData.majorCredits?.toString() || '')
            setMinorCredits(userData.minorCredits?.toString() || '')
            setHostelStatus(userData.hostelStatus || 'day_scholar')
            setHostelName(userData.hostelName || '')
            setRoomNumber(userData.roomNumber || '')
            setCourses(userData.courses?.length ? userData.courses : [{ name: '', code: '', status: 'taken' }])
            setFatherName(userData.personal?.fatherName || '')
            setDob(userData.personal?.dob || '')
            setGender(userData.personal?.gender || '')
            setBloodGroup(userData.personal?.bloodGroup || '')
            setNationality(userData.personal?.nationality || '')
            setReligion(userData.personal?.religion || '')
            setPhone(userData.personal?.phone || '')
            setParentPhone(userData.personal?.parentPhone || '')
            setEmail(userData.personal?.email || '')
            setAddress(userData.personal?.address || '')
            setRollNo(userData.academic?.rollNo || '')
            setRegistrationNo(userData.academic?.registrationNo || '')
            setAdmissionYear(userData.academic?.admissionYear || '')
            if (userData.profilePhotoURL) {
                setPhotoPreview(userData.profilePhotoURL)
            }
        }
    }, [userData])

    const addCourse = () => {
        setCourses([...courses, { name: '', code: '', status: 'taken' }])
    }

    const removeCourse = (index) => {
        if (courses.length > 1) {
            setCourses(courses.filter((_, i) => i !== index))
        }
    }

    const updateCourse = (index, field, value) => {
        const updated = [...courses]
        updated[index] = { ...updated[index], [field]: value }
        setCourses(updated)
    }

    const handlePhotoSelect = (e) => {
        const file = e.target.files[0]
        if (file) {
            setPhotoFile(file)
            const reader = new FileReader()
            reader.onload = (ev) => setPhotoPreview(ev.target.result)
            reader.readAsDataURL(file)
        }
    }

    const handleRemovePhoto = async () => {
        setPhotoPreview(null)
        setPhotoFile(null)
        try {
            await removeProfilePhoto()
        } catch (err) {
            console.error(err)
        }
    }

    const handleSave = async () => {
        setSaving(true)
        try {
            const data = {
                fullName,
                degree,
                year,
                semester,
                branch,
                majorCredits: parseInt(majorCredits) || 0,
                minorCredits: parseInt(minorCredits) || 0,
                hostelStatus,
                hostelName: hostelStatus === 'hostel' ? hostelName : '',
                roomNumber: hostelStatus === 'hostel' ? roomNumber : '',
                courses: courses.filter(c => c.name && c.code),
                personal: {
                    fatherName, dob, gender, bloodGroup,
                    nationality, religion, phone, parentPhone, email, address,
                },
                academic: {
                    rollNo, registrationNo, admissionYear,
                },
            }
            await updateUserData(data)

            if (photoFile) {
                await uploadProfilePhoto(photoFile)
                setPhotoFile(null)
            }

            setSaved(true)
            setTimeout(() => setSaved(false), 2000)
        } catch (error) {
            console.error('Error saving:', error)
            alert('Error saving. Please try again.')
        }
        setSaving(false)
    }

    return (
        <div className="edit-profile-page">
            <header className="edit-header">
                <button className="edit-back-btn" onClick={() => navigate(-1)}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </button>
                <h1 className="edit-title">Edit Profile</h1>
                <button className="edit-save-btn" onClick={handleSave} disabled={saving}>
                    {saving ? 'Saving...' : saved ? '✓ Saved' : 'Save'}
                </button>
            </header>

            <div className="edit-form">
                {/* Profile Photo */}
                <div className="edit-photo-section">
                    <div className="edit-photo-circle" onClick={() => fileInputRef.current?.click()}>
                        {photoPreview ? (
                            <img src={photoPreview} alt="Profile" className="edit-photo-img" />
                        ) : (
                            <div className="edit-photo-placeholder">
                                {initials}
                            </div>
                        )}
                        <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoSelect} />
                    </div>
                    <div className="edit-photo-actions">
                        <button className="photo-action-btn" onClick={() => fileInputRef.current?.click()}>
                            {photoPreview ? 'Change Photo' : 'Upload Photo'}
                        </button>
                        {photoPreview && (
                            <button className="photo-action-btn remove" onClick={handleRemovePhoto}>
                                Remove
                            </button>
                        )}
                    </div>
                </div>

                {/* Basic Info Section */}
                <div className="edit-section">
                    <h3 className="edit-section-title">Basic Information</h3>
                    <div className="edit-card">
                        <div className="edit-field">
                            <label>Full Name</label>
                            <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} />
                        </div>
                        <div className="edit-field">
                            <label>Degree</label>
                            <CustomSelect value={degree} onChange={setDegree} options={DEGREES} placeholder="Select Degree" />
                        </div>
                        <div className="edit-field-row">
                            <div className="edit-field">
                                <label>Year</label>
                                <CustomSelect value={year} onChange={setYear} options={YEARS} placeholder="Select Year" />
                            </div>
                            <div className="edit-field">
                                <label>Semester</label>
                                <CustomSelect value={semester} onChange={setSemester} options={SEMESTERS} placeholder="Select Semester" />
                            </div>
                        </div>
                        <div className="edit-field">
                            <label>Branch</label>
                            <CustomSelect value={branch} onChange={setBranch} options={BRANCHES} placeholder="Select Branch" />
                        </div>
                    </div>
                </div>

                {/* Credits & Hostel */}
                <div className="edit-section">
                    <h3 className="edit-section-title">Credits & Accommodation</h3>
                    <div className="edit-card">
                        <div className="edit-field-row">
                            <div className="edit-field">
                                <label>Major Credits</label>
                                <input type="number" value={majorCredits} onChange={e => setMajorCredits(e.target.value)} />
                            </div>
                            <div className="edit-field">
                                <label>Minor Credits</label>
                                <input type="number" value={minorCredits} onChange={e => setMinorCredits(e.target.value)} />
                            </div>
                        </div>
                        <div className="edit-field">
                            <label>Accommodation</label>
                            <CustomSelect
                                value={hostelStatus}
                                onChange={(val) => {
                                    setHostelStatus(val)
                                    if (val !== 'hostel') {
                                        setHostelName('')
                                        setRoomNumber('')
                                    }
                                }}
                                options={[
                                    { value: 'day_scholar', label: 'Day Scholar' },
                                    { value: 'hostel', label: 'Hostel' }
                                ]}
                                placeholder="Select Status"
                            />
                        </div>
                        {hostelStatus === 'hostel' && (
                            <>
                                <div className="edit-field">
                                    <label>Hostel Block</label>
                                    <CustomSelect
                                        value={hostelName}
                                        onChange={setHostelName}
                                        options={gender === 'Female' ? GIRLS_HOSTELS : BOYS_HOSTELS}
                                        placeholder="Select Hostel"
                                    />
                                </div>
                                <div className="edit-field">
                                    <label>Room Number</label>
                                    <input type="text" value={roomNumber} onChange={e => setRoomNumber(e.target.value)} placeholder="e.g. 524" />
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Courses */}
                <div className="edit-section">
                    <h3 className="edit-section-title">Courses</h3>
                    {courses.map((course, index) => (
                        <div key={index} className="edit-card course-edit-card">
                            <div className="course-edit-header">
                                <span>Course {index + 1}</span>
                                {courses.length > 1 && (
                                    <button className="course-delete-btn" onClick={() => removeCourse(index)}>✕</button>
                                )}
                            </div>
                            <div className="edit-field-row">
                                <div className="edit-field">
                                    <label>Code</label>
                                    <input type="text" value={course.code} onChange={e => updateCourse(index, 'code', e.target.value)} />
                                </div>
                                <div className="edit-field">
                                    <label>Status</label>
                                    <CustomSelect
                                        value={course.status}
                                        onChange={val => updateCourse(index, 'status', val)}
                                        options={[
                                            { value: 'taken', label: 'Active' },
                                            { value: 'dropped', label: 'Dropped' }
                                        ]}
                                        placeholder="Select Status"
                                    />
                                </div>
                            </div>
                            <div className="edit-field">
                                <label>Name</label>
                                <input type="text" value={course.name} onChange={e => updateCourse(index, 'name', e.target.value)} />
                            </div>
                        </div>
                    ))}
                    <button className="add-course-edit-btn" onClick={addCourse}>+ Add Course</button>
                </div>

                {/* Personal Info */}
                <div className="edit-section">
                    <h3 className="edit-section-title">Personal Information</h3>
                    <div className="edit-card">
                        <div className="edit-field">
                            <label>Father's Name</label>
                            <input type="text" value={fatherName} onChange={e => setFatherName(e.target.value)} />
                        </div>
                        <div className="edit-field-row">
                            <div className="edit-field">
                                <label>Date of Birth</label>
                                <input type="date" value={dob} onChange={e => setDob(e.target.value)} />
                            </div>
                            <div className="edit-field">
                                <label>Gender</label>
                                <CustomSelect value={gender} onChange={setGender} options={['Male', 'Female', 'Other']} placeholder="Select Gender" />
                            </div>
                        </div>
                        <div className="edit-field-row">
                            <div className="edit-field">
                                <label>Blood Group</label>
                                <CustomSelect value={bloodGroup} onChange={setBloodGroup} options={['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']} placeholder="Select Blood Group" />
                            </div>
                            <div className="edit-field">
                                <label>Nationality</label>
                                <input type="text" value={nationality} onChange={e => setNationality(e.target.value)} />
                            </div>
                        </div>
                        <div className="edit-field">
                            <label>Religion</label>
                            <input type="text" value={religion} onChange={e => setReligion(e.target.value)} />
                        </div>
                        <div className="edit-field-row">
                            <div className="edit-field">
                                <label>Phone</label>
                                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} />
                            </div>
                            <div className="edit-field">
                                <label>Parent Phone</label>
                                <input type="tel" value={parentPhone} onChange={e => setParentPhone(e.target.value)} />
                            </div>
                        </div>
                        <div className="edit-field">
                            <label>Email</label>
                            <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="edit-field">
                            <label>Address</label>
                            <textarea value={address} onChange={e => setAddress(e.target.value)} rows={3} />
                        </div>
                    </div>
                </div>

                {/* Academic Info */}
                <div className="edit-section">
                    <h3 className="edit-section-title">Academic Details</h3>
                    <div className="edit-card">
                        <div className="edit-field">
                            <label>Roll Number</label>
                            <input type="text" value={rollNo} onChange={e => setRollNo(e.target.value)} />
                        </div>
                        <div className="edit-field">
                            <label>Registration Number</label>
                            <input type="text" value={registrationNo} onChange={e => setRegistrationNo(e.target.value)} />
                        </div>
                        <div className="edit-field">
                            <label>Year of Admission</label>
                            <input type="text" value={admissionYear} onChange={e => setAdmissionYear(e.target.value)} />
                        </div>
                    </div>
                </div>

                {/* Save button at bottom */}
                <button className="edit-save-bottom" onClick={handleSave} disabled={saving}>
                    {saving ? 'Saving...' : saved ? '✓ Changes Saved!' : 'Save All Changes'}
                </button>
            </div>
        </div>
    )
}

export default EditProfile
