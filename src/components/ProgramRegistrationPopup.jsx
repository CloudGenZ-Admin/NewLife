import React, { useState, useEffect } from 'react';
import '../styles/ProgramRegistration.css';

const ProgramRegistrationPopup = ({ 
  show, 
  onClose, 
  programName,
  formAction,
  entryProgram,
  entryName,
  entryEmail,
  entryContact
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Reset success state when popup reopens for a different program
  useEffect(() => {
    if (show) {
      setSubmitted(false);
      setIsSubmitting(false);
      document.body.style.overflow = 'hidden';
      if (window.lenis) window.lenis.stop();
    } else {
      document.body.style.overflow = '';
      if (window.lenis) window.lenis.start();
    }
    return () => {
      document.body.style.overflow = '';
      if (window.lenis) window.lenis.start();
    };
  }, [show]);

  if (!show) return null;

  const FORM_ACTION = "https://docs.google.com/forms/d/e/1FAIpQLSdiA3Cav8ifqBpZObmBDalpXJoj06YP06Sgt9dfuSdjgldwng/formResponse";
  const ENTRY_PROGRAM = "entry.574291237";
  const ENTRY_NAME = "entry.743630460";
  const ENTRY_EMAIL = "entry.2010389936";
  const ENTRY_CONTACT = "entry.1005238941";

  const handleFormSubmit = () => {
    setIsSubmitting(true);
    // Success state will be triggered by iframe onLoad
  };

  const handleIframeLoad = () => {
    if (isSubmitting) {
      setSubmitted(true);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="preg-overlay" onClick={onClose}>
      <div className="preg-modal" onClick={(e) => e.stopPropagation()}>
        <button className="preg-close" onClick={onClose}>&times;</button>
        
        <div style={{ display: submitted ? 'none' : 'block' }}>
          <div className="preg-header">
            <span className="preg-label">Registration</span>
            <h2>Secure Your <em>Spot</em></h2>
            <p>Fill out the details below to register for the {programName} program.</p>
          </div>

          {/* Hidden iframe to catch Google Form redirect */}
          <iframe
            name="hidden_iframe"
            id="hidden_iframe"
            style={{ display: 'none' }}
            onLoad={handleIframeLoad}
          ></iframe>

          <form
            action={formAction}
            method="POST"
            target="hidden_iframe"
            onSubmit={handleFormSubmit}
            className="preg-form"
          >
            <div className="preg-field">
              <label>Program Name</label>
              <input
                type="text"
                name={entryProgram}
                value={programName}
                readOnly
                className="preg-input-disabled"
              />
            </div>

            <div className="preg-field">
              <label>Full Name</label>
              <input
                type="text"
                name={entryName}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="preg-field">
              <label>Email Address</label>
              <input
                type="email"
                name={entryEmail}
                placeholder="email@example.com"
                required
              />
            </div>

            <div className="preg-field">
              <label>Contact Number</label>
              <input
                type="tel"
                name={entryContact}
                placeholder="Your phone number"
                required
              />
            </div>

            {/* Google Form metadata fields */}
            <input type="hidden" name="fvv" value="1" />
            <input type="hidden" name="pageHistory" value="0" />

            <button type="submit" className="preg-submit-btn" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Complete Registration"}
            </button>
          </form>
        </div>

        {submitted && (
          <div className="preg-success">
            <div className="preg-success-icon">✓</div>
            <h2>Registration <em>Submitted!</em></h2>
            <p>Thank you for registering for <strong>{programName}</strong>.</p>
            <button className="preg-submit-btn" onClick={onClose}>
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgramRegistrationPopup;
