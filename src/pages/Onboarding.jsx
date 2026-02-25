import { useState, useRef } from 'react'
import { useAuth } from '../context/AuthContext'
import CustomSelect from '../components/CustomSelect'
import './Onboarding.css'

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
    'Karavali (Block I)',
    'Aravali (Block II)',
    'Vindhya (Block III)',
    'Satpura (Block IV)',
    'Nilgiri (Block V)',
    'Pushpagiri (PG Block)',
    'Brahmagiri (PG New)',
    'Sahyadri (Block VII)',
    'Trishul (Block VIII)',
    'Everest (MT-I)',
    'Himalaya (MT-II)',
    'Kailash (MT-III)',
    'Shivalik (Block XI)',
]

const GIRLS_HOSTELS = [
    'Ganga (GH-I)',
    'Kaveri (GH-II)',
    'Yamuna (GH-III)',
    'Sharavathi (GH-IV)',
    'Netravathi (GH-V)',
    'Godavari (GH-VI)',
]

function Onboarding() {
    const { user, saveUserData, uploadProfilePhoto } = useAuth()
    const [step, setStep] = useState(1)
    const [saving, setSaving] = useState(false)
    const fileInputRef = useRef(null)
    const [photoPreview, setPhotoPreview] = useState(null)
    const [photoFile, setPhotoFile] = useState(null)

    // Step 1: Basic Info
    const [fullName, setFullName] = useState(user?.displayName || '')
    const [degree, setDegree] = useState('')
    const [year, setYear] = useState('')
    const [semester, setSemester] = useState('')
    const [branch, setBranch] = useState('')

    // Step 2: Credits & Hostel
    const [majorCredits, setMajorCredits] = useState('')
    const [minorCredits, setMinorCredits] = useState('')
    const [hostelStatus, setHostelStatus] = useState('day_scholar')
    const [hostelName, setHostelName] = useState('')
    const [roomNumber, setRoomNumber] = useState('')

    // Step 3: Courses
    const [courses, setCourses] = useState([{ name: '', code: '', status: 'taken' }])

    // Step 4: Personal Info
    const [fatherName, setFatherName] = useState('')
    const [dob, setDob] = useState('')
    const [gender, setGender] = useState('')
    const [bloodGroup, setBloodGroup] = useState('')
    const [nationality, setNationality] = useState('India')
    const [religion, setReligion] = useState('')
    const [phone, setPhone] = useState('')
    const [parentPhone, setParentPhone] = useState('')
    const [email, setEmail] = useState(user?.email || '')
    const [address, setAddress] = useState('')

    // Step 5: Academic Info
    const [rollNo, setRollNo] = useState('')
    const [registrationNo, setRegistrationNo] = useState('')
    const [admissionYear, setAdmissionYear] = useState('')

    const totalSteps = 6 // includes photo step

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

    const canProceed = () => {
        switch (step) {
            case 1: return fullName && degree && year && semester && branch
            case 2: return majorCredits && minorCredits
            case 3: return courses.length > 0 && courses[0].name && courses[0].code
            case 4: return fatherName && dob && gender
            case 5: return true // academic info optional
            case 6: return true // photo optional
            default: return true
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
                    fatherName,
                    dob,
                    gender,
                    bloodGroup,
                    nationality,
                    religion,
                    phone,
                    parentPhone,
                    email,
                    address,
                },
                academic: {
                    rollNo,
                    registrationNo,
                    admissionYear,
                },
            }

            await saveUserData(data)

            // Upload photo if selected
            if (photoFile) {
                await uploadProfilePhoto(photoFile)
            }
        } catch (error) {
            console.error('Error saving:', error)
            alert('Error saving data. Please try again.')
        }
        setSaving(false)
    }

    const renderStepIndicator = () => (
        <div className="step-indicator">
            {[1, 2, 3, 4, 5, 6].map(s => (
                <div key={s} className={`step-dot ${s === step ? 'active' : s < step ? 'done' : ''}`}>
                    {s < step ? '✓' : s}
                </div>
            ))}
        </div>
    )

    return (
        <div className="onboarding-page">
            <div className="onboarding-header">
                <h1 className="onboarding-logo">
                    <span>I</span><span>r</span><span>I</span><span>S</span>
                </h1>
                <p className="onboarding-welcome">Welcome, {user?.displayName?.split(' ')[0] || 'Student'}!</p>
                <p className="onboarding-subtitle">Let's set up your profile</p>
            </div>

            {renderStepIndicator()}

            <div className="onboarding-form">
                {/* Step 1: Basic Info */}
                {step === 1 && (
                    <div className="form-step">
                        <h2 className="form-step-title">Basic Information</h2>
                        <div className="form-group">
                            <label className="form-label">Full Name</label>
                            <input type="text" className="form-input" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Enter your full name" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Degree</label>
                            <CustomSelect value={degree} onChange={setDegree} options={DEGREES} placeholder="Select Degree" />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Year</label>
                                <CustomSelect value={year} onChange={setYear} options={YEARS} placeholder="Select Year" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Semester</label>
                                <CustomSelect value={semester} onChange={setSemester} options={SEMESTERS} placeholder="Select Semester" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Branch</label>
                            <CustomSelect value={branch} onChange={setBranch} options={BRANCHES} placeholder="Select Branch" />
                        </div>
                    </div>
                )}

                {/* Step 2: Credits & Hostel */}
                {step === 2 && (
                    <div className="form-step">
                        <h2 className="form-step-title">Credits & Accommodation</h2>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Major Credits</label>
                                <input type="number" className="form-input" value={majorCredits} onChange={e => setMajorCredits(e.target.value)} placeholder="e.g. 151" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Minor Credits</label>
                                <input type="number" className="form-input" value={minorCredits} onChange={e => setMinorCredits(e.target.value)} placeholder="e.g. 16" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Gender</label>
                            <CustomSelect value={gender} onChange={setGender} options={['Male', 'Female', 'Other']} placeholder="Select Gender" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Accommodation</label>
                            <CustomSelect
                                value={hostelStatus}
                                onChange={(val) => {
                                    setHostelStatus(val)
                                    setHostelName('')
                                    setRoomNumber('')
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
                                <div className="form-group">
                                    <label className="form-label">Hostel Block</label>
                                    <CustomSelect
                                        value={hostelName}
                                        onChange={setHostelName}
                                        options={gender === 'Female' ? GIRLS_HOSTELS : BOYS_HOSTELS}
                                        placeholder="Select Hostel"
                                    />
                                    {!gender && <p className="form-hint">💡 Set your gender in Step 4 to see gender-specific hostels</p>}
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Room Number</label>
                                    <input type="text" className="form-input" value={roomNumber} onChange={e => setRoomNumber(e.target.value)} placeholder="e.g. 524" />
                                </div>
                            </>
                        )}
                    </div>
                )}

                {/* Step 3: Courses */}
                {step === 3 && (
                    <div className="form-step">
                        <h2 className="form-step-title">Your Courses</h2>
                        <p className="form-hint">Add your current courses</p>
                        {courses.map((course, index) => (
                            <div key={index} className="course-entry">
                                <div className="course-entry-header">
                                    <span className="course-entry-num">Course {index + 1}</span>
                                    {courses.length > 1 && (
                                        <button className="course-remove-btn" onClick={() => removeCourse(index)}>
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <line x1="18" y1="6" x2="6" y2="18" />
                                                <line x1="6" y1="6" x2="18" y2="18" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">Course Code</label>
                                        <input type="text" className="form-input" value={course.code} onChange={e => updateCourse(index, 'code', e.target.value)} placeholder="e.g. EC498" />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Status</label>
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
                                <div className="form-group">
                                    <label className="form-label">Course Name</label>
                                    <input type="text" className="form-input" value={course.name} onChange={e => updateCourse(index, 'name', e.target.value)} placeholder="e.g. Major Project" />
                                </div>
                            </div>
                        ))}
                        <button className="add-course-btn" onClick={addCourse}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="12" y1="5" x2="12" y2="19" />
                                <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                            Add Another Course
                        </button>
                    </div>
                )}

                {/* Step 4: Personal Info */}
                {step === 4 && (
                    <div className="form-step">
                        <h2 className="form-step-title">Personal Information</h2>
                        <div className="form-group">
                            <label className="form-label">Father's Name</label>
                            <input type="text" className="form-input" value={fatherName} onChange={e => setFatherName(e.target.value)} placeholder="Father's full name" />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Date of Birth</label>
                                <input type="date" className="form-input" value={dob} onChange={e => setDob(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Gender</label>
                                <CustomSelect value={gender} onChange={setGender} options={['Male', 'Female', 'Other']} placeholder="Select Gender" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Blood Group</label>
                                <CustomSelect value={bloodGroup} onChange={setBloodGroup} options={['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']} placeholder="Select Blood Group" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Nationality</label>
                                <input type="text" className="form-input" value={nationality} onChange={e => setNationality(e.target.value)} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Religion</label>
                            <input type="text" className="form-input" value={religion} onChange={e => setReligion(e.target.value)} placeholder="Enter religion" />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Phone</label>
                                <input type="tel" className="form-input" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Your phone" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Parent Phone</label>
                                <input type="tel" className="form-input" value={parentPhone} onChange={e => setParentPhone(e.target.value)} placeholder="Parent phone" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-input" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Address</label>
                            <textarea className="form-textarea" value={address} onChange={e => setAddress(e.target.value)} placeholder="Home address" rows={3} />
                        </div>
                    </div>
                )}

                {/* Step 5: Academic Info */}
                {step === 5 && (
                    <div className="form-step">
                        <h2 className="form-step-title">Academic Details</h2>
                        <p className="form-hint">These fields are optional</p>
                        <div className="form-group">
                            <label className="form-label">Roll Number</label>
                            <input type="text" className="form-input" value={rollNo} onChange={e => setRollNo(e.target.value)} placeholder="e.g. 211EC341" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Registration Number</label>
                            <input type="text" className="form-input" value={registrationNo} onChange={e => setRegistrationNo(e.target.value)} placeholder="e.g. 21ECXXX" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Year of Admission</label>
                            <input type="text" className="form-input" value={admissionYear} onChange={e => setAdmissionYear(e.target.value)} placeholder="e.g. 2022" />
                        </div>
                    </div>
                )}

                {/* Step 6: Profile Photo */}
                {step === 6 && (
                    <div className="form-step">
                        <h2 className="form-step-title">Profile Photo</h2>
                        <p className="form-hint">Upload a profile picture (optional)</p>
                        <div className="photo-upload-area" onClick={() => fileInputRef.current?.click()}>
                            {photoPreview ? (
                                <img src={photoPreview} alt="Preview" className="photo-preview" />
                            ) : (
                                <div className="photo-placeholder onboarding-initials">
                                    <span>{fullName ? fullName.charAt(0).toUpperCase() : 'U'}</span>
                                    <p style={{ color: 'white' }}>Tap to change</p>
                                </div>
                            )}
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handlePhotoSelect}
                            />
                        </div>
                        {photoPreview && (
                            <button className="photo-remove-btn" onClick={() => { setPhotoPreview(null); setPhotoFile(null) }}>
                                Remove Photo
                            </button>
                        )}
                    </div>
                )}

                {/* Navigation */}
                <div className="form-nav">
                    {step > 1 && (
                        <button className="form-nav-btn back-btn-onboard" onClick={() => setStep(step - 1)}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                            Back
                        </button>
                    )}
                    <div style={{ flex: 1 }} />
                    {step < totalSteps ? (
                        <button
                            className="form-nav-btn next-btn"
                            onClick={() => setStep(step + 1)}
                            disabled={!canProceed()}
                        >
                            Next
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </button>
                    ) : (
                        <button
                            className="form-nav-btn save-btn"
                            onClick={handleSave}
                            disabled={saving}
                        >
                            {saving ? 'Saving...' : 'Complete Setup'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Onboarding
