import React, { useState, useEffect } from 'react';
import './applicationForm.css';
import Modal from 'react-modal';

function ApplicationForm() {
  const [formInput, setFormInput] = useState({
    name: '',
    phoneNumber: '',
    age: '',
    employmentStatus: false,
    salary: '',
  });

  console.log(formInput);
  const [formErrors, setFormErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmissionSuccess, setIsSubmissionSuccess] = useState(false);

  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (isModalOpen) {
        const modalContent = document.querySelector('.ReactModal__Content');
        if (modalContent && !modalContent.contains(e.target)) {
          closeModal();
        }
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [isModalOpen]);

  function handelInputChange(e) {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormInput({
      ...formInput,
      [name]: newValue,
    });
  }

  function validateForm() {
    const errors = {};

    if (!formInput.name.trim()) {
      errors.name = 'Name is required';
    }
    const phoneNumberRegex = /^\d{10}$/;
    if (!phoneNumberRegex.test(formInput.phoneNumber)) {
      errors.phoneNumber = 'Invalid phone number , must be 10 numbers';
    }

    const age = parseInt(formInput.age);
    if (isNaN(age) || age < 18 || age > 65) {
      errors.age = 'Age must be between 18 and 65';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmissionSuccess(true);
    } else {
      setIsSubmissionSuccess(false);
    }
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            id="name"
            name="name"
            value={formInput.name}
            className="input-group-input"
            placeholder="Enter your name .."
            required
            onChange={handelInputChange}
          />
          <label htmlFor="name" className="input-group-label">
            Name
          </label>
        </div>
        {formErrors.name && <p className="error-message">{formErrors.name}</p>}

        <div className="input-group">
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formInput.phoneNumber}
            className="input-group-input"
            placeholder="Enter your phone number .."
            required
            onChange={handelInputChange}
          />
          <label htmlFor="phoneNumber" className="input-group-label">
            Phone number
          </label>
        </div>
        {formErrors.phoneNumber && (
          <p className="error-message">{formErrors.phoneNumber}</p>
        )}

        <div className="input-group">
          <input
            type="number"
            id="age"
            name="age"
            value={formInput.age}
            className="input-group-input"
            placeholder="Enter your age .."
            required
            onChange={handelInputChange}
          />
          <label htmlFor="age" className="input-group-label">
            Age
          </label>
        </div>
        {formErrors.age && <p className="error-message">{formErrors.age}</p>}

        <div className="input-group">
          <input
            type="checkbox"
            id="employmentStatus"
            name="employmentStatus"
            checked={formInput.employmentStatus}
            className="input-group-input"
            onChange={handelInputChange}
          />
          <label htmlFor="employmentStatus" className="input-group-label">
            Are you employed?
          </label>
        </div>

        <div className="input-group">
          <label htmlFor="salary" className="input-group-label">
            Salary
          </label>
          <select
            id="salary"
            name="salary"
            value={formInput.salary}
            onChange={handelInputChange}
          >
            <option>Less than 500$</option>
            <option>Between 500$ - 1000$</option>
            <option>More than 1000$</option>
          </select>
        </div>

        <button type="submit">Submit</button>
      </form>

      <Modal isOpen={isModalOpen}>
        <div>
          <h2>Submission Status</h2>
          {isSubmissionSuccess ? (
            <p>Form submitted successfully!</p>
          ) : (
            <div>
              <p>Form submission failed. Please check your inputs.</p>
              {Object.keys(formErrors).length > 0 && (
                <div>
                  <h3>Validation Errors:</h3>
                  <ul>
                    {Object.values(formErrors).map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default ApplicationForm;


