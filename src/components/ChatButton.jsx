import { useState } from 'react'
import './ChatButton.css'

function ChatButton() {
    const [isOpen, setIsOpen] = useState(false)
    const [activeTab, setActiveTab] = useState('feedback')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [file1, setFile1] = useState(null)
    const [file2, setFile2] = useState(null)

    const handleSubmit = () => {
        alert('Thank you for your feedback! It has been submitted.')
        setTitle('')
        setDescription('')
        setFile1(null)
        setFile2(null)
        setIsOpen(false)
    }

    return (
        <>
            {/* Floating Button */}
            <button className="chat-button" aria-label="Chat" onClick={() => setIsOpen(true)}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="white" stroke="none">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
            </button>

            {/* Feedback Panel Overlay */}
            {isOpen && (
                <div className="feedback-overlay" onClick={() => setIsOpen(false)}>
                    <div className="feedback-panel" onClick={(e) => e.stopPropagation()}>
                        {/* Header */}
                        <div className="feedback-header">
                            <h2 className="feedback-title">Tell IRIS</h2>
                            <button className="feedback-close" onClick={() => setIsOpen(false)}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>

                        {/* Quick Links */}
                        <div className="feedback-links">
                            <button className="feedback-link-btn green">View Past Ticket Status</button>
                            <button className="feedback-link-btn green">Helpdesk User Manual</button>
                        </div>

                        {/* Type Tabs */}
                        <div className="feedback-tabs">
                            <button
                                className={`feedback-tab ${activeTab === 'feedback' ? 'active' : ''}`}
                                onClick={() => setActiveTab('feedback')}
                            >
                                Feedback
                            </button>
                            <button
                                className={`feedback-tab ${activeTab === 'suggestion' ? 'active' : ''}`}
                                onClick={() => setActiveTab('suggestion')}
                            >
                                Suggestion
                            </button>
                            <button
                                className={`feedback-tab ${activeTab === 'issue' ? 'active' : ''}`}
                                onClick={() => setActiveTab('issue')}
                            >
                                Issue
                            </button>
                        </div>

                        {/* Title Input */}
                        <div className="feedback-field">
                            <input
                                type="text"
                                className="feedback-input"
                                placeholder="Give a short title for your query"
                                value={title}
                                onChange={(e) => setTitle(e.target.value.slice(0, 50))}
                                maxLength={50}
                            />
                            <span className="feedback-char-count">{title.length}/50</span>
                        </div>

                        {/* Description */}
                        <div className="feedback-field">
                            <textarea
                                className="feedback-textarea"
                                placeholder="Tell IRIS what you think about this page"
                                value={description}
                                onChange={(e) => setDescription(e.target.value.slice(0, 190))}
                                maxLength={190}
                                rows={5}
                            />
                            <span className="feedback-char-count">{description.length}/190</span>
                        </div>

                        {/* Attachment 1 */}
                        <div className="feedback-attachment">
                            <p className="attachment-label">Attachment 1 (Optional) :</p>
                            <div className="attachment-row">
                                <label className="choose-file-btn">
                                    Choose file
                                    <input type="file" accept=".jpg,.png,.mp4,.webm" onChange={(e) => setFile1(e.target.files[0])} hidden />
                                </label>
                                <span className="file-name">{file1 ? file1.name : 'No file chosen'}</span>
                            </div>
                            <p className="attachment-hint">Maximum size per file is 2 MB(megabytes). File types allowed are: .jpg, .png, .mp4, .webm</p>
                        </div>

                        {/* Attachment 2 */}
                        <div className="feedback-attachment">
                            <p className="attachment-label">Attachment 2 (Optional) :</p>
                            <div className="attachment-row">
                                <label className="choose-file-btn">
                                    Choose file
                                    <input type="file" accept=".jpg,.png,.mp4,.webm" onChange={(e) => setFile2(e.target.files[0])} hidden />
                                </label>
                                <span className="file-name">{file2 ? file2.name : 'No file chosen'}</span>
                            </div>
                            <p className="attachment-hint">Maximum size per file is 2 MB(megabytes). File types allowed are: .jpg, .png, .mp4, .webm</p>
                        </div>

                        {/* Submit */}
                        <button className="feedback-submit" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default ChatButton
