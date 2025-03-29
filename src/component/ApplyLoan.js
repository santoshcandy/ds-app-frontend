
import React, { useState, useEffect } from "react";
import axios from "axios";
import "animate.css";
import "../style/applyloan.css";
import { API_URL } from "../Config";

const ApplyLoan = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact_number: "",
    alternative_number: "",
    father_name: "",
    mother_name: "",
    qualifications: "",
    married_status: false,
    current_address: "",
    landmark: "",
    years_at_address: "",
    gmail: "",
    office_name: "",
    office_address: "",
    designation: "",
    department: "",
    current_experience: "",
    overall_experience: "",
    reference_name_1: "",
    reference_number_1: "",
    reference_name_2: "",
    reference_number_2: "",
    expected_loan_amount: "",
    loan_purpose: "",
    client_type: "direct",
    assigned_employee: null,
    approval_status: "pending",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Scroll to form after reload or success message
  useEffect(() => {
    const formElement = document.getElementById("loan-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [success]); // Runs when success state changes

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}client/apply/`, formData);
      console.log("Loan application submitted:", response.data);
      setSuccess(true);

      // Scroll to success message
      setTimeout(() => {
        const formElement = document.getElementById("loan-form");
        if (formElement) {
          formElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);

      setFormData({
        name: "",
        contact_number: "",
        alternative_number: "",
        father_name: "",
        mother_name: "",
        qualifications: "",
        married_status: false,
        current_address: "",
        landmark: "",
        years_at_address: "",
        gmail: "",
        office_name: "",
        office_address: "",
        designation: "",
        department: "",
        current_experience: "",
        overall_experience: "",
        reference_name_1: "",
        reference_number_1: "",
        reference_name_2: "",
        reference_number_2: "",
        expected_loan_amount: "",
        loan_purpose: "",
        client_type: "direct",
        assigned_employee: localStorage.getItem("userID") || null,
        approval_status: "pending",
      });
    } catch (error) {
      console.error("Error submitting loan application:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5 animate__animated animate__fadeInUp">
      <h2 className="text-center mb-4">Loan Application Form</h2>
      {success && <div className="alert alert-success">Application Submitted Successfully!</div>}
      <form className="p-4 shadow rounded bg-white" onSubmit={handleSubmit}>
        <h5>Personal Details</h5>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Name</label>
            <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label>Contact Number</label>
            <input type="text" name="contact_number" className="form-control" value={formData.contact_number} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
    <label>Gmail</label>
    <input type="email" name="gmail" className="form-control" value={formData.gmail} onChange={handleChange} required />
  </div>
       
  <div className="col-md-6 mb-3">
    <label>Alternative Number</label>
    <input type="text" name="alternative_number" className="form-control" value={formData.alternative_number} onChange={handleChange} />
  </div>
  
          <div className="col-md-6 mb-3">
            <label>Father's Name</label>
            <input type="text" name="father_name" className="form-control" value={formData.father_name} onChange={handleChange} />
          </div>
          <div className="col-md-6 mb-3">
            <label>Mother's Name</label>
            <input type="text" name="mother_name" className="form-control" value={formData.mother_name} onChange={handleChange} />
          </div>
        
  <div className="col-md-6 mb-3">
    <label>Qualifications</label>
    <input type="text" name="qualifications" className="form-control" value={formData.qualifications} onChange={handleChange} />
  </div>
</div>
<div className="col-md-6 mb-3">
    <label>Married Status</label>
    <select name="married_status" className="form-control" value={formData.married_status} onChange={handleChange}>
      <option value="false">Single</option>
      <option value="true">Married</option>
    </select>
  </div>

        <h5>Address Details</h5>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Current Address</label>
            <input type="text" name="current_address" className="form-control" value={formData.current_address} onChange={handleChange} />
          </div>
          <div className="col-md-6 mb-3">
            <label>Landmark</label>
            <input type="text" name="landmark" className="form-control" value={formData.landmark} onChange={handleChange} />
          </div>
        </div>
        <div className="row">
  
  <div className="col-md-6 mb-3">
    <label>Years Staying at Address</label>
    <input type="number" name="years_at_address" className="form-control" value={formData.years_at_address} onChange={handleChange} />
  </div>
  <div className="col-md-6 mb-3">
  <label>Designation</label>
  <input type="text" name="designation" className="form-control" value={formData.designation} onChange={handleChange} />
  </div>
  
</div>

  
  


        <h5>Employment Details</h5>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Office Name</label>
            <input type="text" name="office_name" className="form-control" value={formData.office_name} onChange={handleChange} />
          </div>
          
    <div className="col-md-6 mb-3">
    <label>Office Address</label>
    <input type="text" name="office_address" className="form-control" value={formData.office_address} onChange={handleChange} />
    </div>
  <div className="col-md-6 mb-3">
            <label>Current Experience (Years)</label>
            <input type="number" name="current_experience" className="form-control" value={formData.current_experience} onChange={handleChange} required />
          </div>
<div className="col-md-6 mb-3">
            <label>Overall Experience (Years)</label>
            <input type="number" name="overall_experience" className="form-control" value={formData.overall_experience} onChange={handleChange} required />
          </div>
  
            
          </div>
        

        <h5>Loan Details</h5>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Expected Loan Amount</label>
            <input type="number" name="expected_loan_amount" className="form-control" value={formData.expected_loan_amount} onChange={handleChange} />
          </div>
          <div className="col-md-6 mb-3">
            <label>Loan Purpose</label>
            <input type="text" name="loan_purpose" className="form-control" value={formData.loan_purpose} onChange={handleChange} />
          </div>
        </div>
        
        
         
        

        <h5>Reference Details</h5>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Reference Name 1</label>
            <input type="text" name="reference_name_1" className="form-control" value={formData.reference_name_1} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label>Reference Number 1</label>
            <input type="tel" name="reference_number_1" className="form-control" value={formData.reference_number_1} onChange={handleChange} required />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Reference Name 2</label>
            <input type="text" name="reference_name_2" className="form-control" value={formData.reference_name_2} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label>Reference Number 2</label>
            <input type="tel" name="reference_number_2" className="form-control" value={formData.reference_number_2} onChange={handleChange} required />
          </div>
        </div>
        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? "Submitting..." : "Apply Now"}
        </button>
      </form>
    </div>
  );
};

export default ApplyLoan;