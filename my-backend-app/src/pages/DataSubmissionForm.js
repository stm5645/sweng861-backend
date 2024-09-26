import React, { useState } from 'react';
import './DataSubmissionForm.css';

const DataSubmissionForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    phone: '',
    address: '',
    course: '',
    semester: '',
    comments: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = 'Name is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = 'Email is invalid';
    if (formData.password.length < 6) tempErrors.password = 'Password must be at least 6 characters';
    if (!formData.age || isNaN(formData.age) || formData.age <= 0) tempErrors.age = 'Age must be a positive number';
    if (!formData.phone) tempErrors.phone = 'Phone number is required';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form submitted:', formData);
      onSubmit(formData); // Call onSubmit with form data
      // Reset form
      setFormData({
        name: '',
        email: '',
        password: '',
        age: '',
        phone: '',
        address: '',
        course: '',
        semester: '',
        comments: '',
      });
      setErrors({});
    }
  };

  return (
    <div className="dataform-container">
      <h2>Data Submission Form</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
            <input
              type={key === 'password' ? 'password' : 'text'}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              required
            />
            {errors[key] && <span className="error">{errors[key]}</span>}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DataSubmissionForm;




