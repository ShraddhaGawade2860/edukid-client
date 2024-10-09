import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaHome } from 'react-icons/fa';
import Menu from '../menu/Menu';
import { useNavigate, useParams } from 'react-router-dom';
import './verifyhome.css';

const VerifyHome = () => {
  const { formId } = useParams();
  const [formData, setFormData] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [state, setState] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchedState = localStorage.getItem('state') || '';
    setState(fetchedState);

    const fetchFormData = async () => {
      try {
        const response = await axios.get(`https://shradha.onrender.com/api/forms/${formId}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching form data:', error);
      }
    };

    fetchFormData();
  }, [formId]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const goToHome = () => {
    navigate(`/adminhome/${state}`);
  };

  const handleApprove = async () => {
    try {
      await axios.put(`https://shradha.onrender.com/api/forms/${formId}/approve`);
      alert('Form approved successfully');
      navigate(`/studentlist/${state}`);
    } catch (error) {
      console.error('Error approving form:', error);
    }
  };

  const handleReject = async () => {
    setShowRejectModal(true);
  };

  const handleRejectSubmit = async () => {
    try {
      await axios.put(`https://shradha.onrender.com/api/forms/${formId}/reject`, { rejectReason });
      alert('Form rejected successfully');
      navigate(`/studentlist/${state}`);
    } catch (error) {
      console.error('Error rejecting form:', error);
    }
  };

  return (
    <div className={`verify-home-container ${menuOpen ? 'menu-expanded' : ''}`}>
      <Menu isExpanded={menuOpen} toggleMenu={toggleMenu} />
      <div className={`main-content ${menuOpen ? 'menu-expanded' : ''}`}>
        <div className="top-bar">
          <div className="welcome">
            Form Verification
          </div>
          <div className="icons">
            <FaHome className="icon" onClick={goToHome} />
          </div>
        </div>
        {formData ? (
          <div className="form-details">
            <h2>User Details</h2>
            <div className="row">
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            </div>
            <div className="row">
            <p><strong>Course:</strong> {formData.course}</p>
            <p><strong>Institution:</strong> {formData.institutionName}</p>
            </div>
            <div className="row">
            <p><strong>Date of Birth:</strong> {new Date(formData.dateOfBirth).toLocaleDateString()}</p>
            </div>

            <h2>Institution Details</h2>
            <div className="row">
            <p><strong>Institution Name: </strong>{formData.institutionName}</p>
            <p><strong>State: </strong>{formData.state}</p>
            </div>
            <div className="row">
            <p><strong>Course: </strong>{formData.course}</p>
            <p><strong>Year: </strong>{formData.year}</p>
            </div>
            <div className="row">
            <p><strong>Enrollment No.: </strong>{formData.enrollmentNo}</p>
            <p><strong>Xth Percentage: </strong>{formData.xthPercentage}</p>
            </div>
            <div className="row">
            <p><strong>XIIth Percentage: </strong>{formData.xiithPercentage}</p>
            <p><strong>UG Percentage: </strong>{formData.ugPercentage}</p>
            </div>

            <h2>Address Details</h2>
            <div className="row">
            <p><strong>Address: </strong>{formData.address}</p>
            <p><strong>Home State: </strong>{formData.homeState}</p>
            </div>
            <div className="row">
            <p><strong>Reason Of Leaving State: </strong>{formData.reasonOfLeavingState}</p>
            </div>

            <h2>Scholarship Details</h2>
            <div className="row">
            <p><strong>Scholarship Name: </strong>{formData.scholarshipName}</p>
            <p><strong>Reason For Denying Scholarship: </strong>{formData.reasonForDenyingScholarship}</p>
            </div>

            <h2>Disability Details</h2>
            <p><strong>Disabilities: </strong>{formData.disabilities === 'yes' ? 'Yes' : 'No'}</p>
            {formData.disabilities === 'yes' && (
              <>
                <p><strong>Disability Details: </strong>{formData.disabilityDetails}</p>
                <p><strong>
                  Disability Certificate:</strong>
                  <a href={`https://shradha.onrender.com/${formData.disabilityCertificate}`} target="_blank" rel="noopener noreferrer">
                    View Document
                  </a>
                </p>
              </>
            )}

<h2>Upload Documents</h2>
<div className="row">
  <p><strong>Xth Marksheet: </strong>
    <a href={`https://shradha.onrender.com/${formData.xthMarksheet}`} target="_blank" rel="noopener noreferrer">
      View Document
    </a>
  </p>
  <p><strong>XIIth Marksheet: </strong>
    <a href={`https://shradha.onrender.com/${formData.xiithMarksheet}`} target="_blank" rel="noopener noreferrer">
      View Document
    </a>
  </p>
</div>
<div className="row">
  <p><strong>UG Certificate: </strong>
    <a href={`https://shradha.onrender.com/${formData.ugCertificate}`} target="_blank" rel="noopener noreferrer">
      View Document
    </a>
  </p>
  <p><strong>PG Certificate: </strong>
    <a href={`https://shradha.onrender.com/${formData.pgCertificate}`} target="_blank" rel="noopener noreferrer">
      View Document
    </a>
  </p>
</div>
<div className="row">
  <p><strong>Birth Certificate: </strong>
    <a href={`https://shradha.onrender.com/${formData.birthCertificate}`} target="_blank" rel="noopener noreferrer">
      View Document
    </a>
  </p>
  <p><strong>Community Certificate: </strong>
    <a href={`https://shradha.onrender.com/${formData.communityCertificate}`} target="_blank" rel="noopener noreferrer">
      View Document
    </a>
  </p>
</div>
<div className="row">
  <p><strong>Aadhar Card: </strong>
    <a href={`https://shradha.onrender.com/${formData.aadharCard}`} target="_blank" rel="noopener noreferrer">
      View Document
    </a>
  </p>
  <p><strong>ID Card: </strong>
    <a href={`https://shradha.onrender.com/${formData.idCard}`} target="_blank" rel="noopener noreferrer">
      View Document
    </a>
  </p>
</div>
<div className="row">
  <p><strong>Fee Receipt: </strong>
    <a href={`https://shradha.onrender.com/${formData.feeReceipt}`} target="_blank" rel="noopener noreferrer">
      View Document
    </a>
  </p>
</div>


            {formData.homeStateVerified === 0 ? (
              <div className="form-actions">
                <button className="approve-button" onClick={handleApprove}>Approve</button>
                <button className="reject-button" onClick={handleReject}>Reject</button>
              </div>
            ) : (
              <div
              className={`form-status-message ${
                formData.homeStateVerified === 1 ? 'approved-status' : 'rejected-status'
              }`}
            >
              {formData.homeStateVerified === 1 ? 'Form approved by admin' : 'Form rejected by admin'}
            </div>
            )}
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
        {showRejectModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Reject Form</h2>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Enter reject reason"
              />
              <button className="reject-button" onClick={handleRejectSubmit}>Submit</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyHome;
