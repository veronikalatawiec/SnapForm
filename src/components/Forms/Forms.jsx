import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Forms.scss'
import Switch from '../Switch/Switch.jsx';  
import Button from '../Button/Button.jsx'; 
import { getUserIdFromToken } from '../../../utility.js';
import { v4 as uuidv4 } from 'uuid';
import LinkButton from '../LinkButton/LinkButton.jsx';
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal/Modal.jsx';

export default function Table() {
  const [forms, setForms] = useState([]);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false); 
  const [deleteFormId, setDeleteFormId] = useState(null); 
  const navigate = useNavigate();

  // Fetch forms
  useEffect(() => {
    const fetchForms = async () => {
        try {
          const userId = getUserIdFromToken(); 
          if (!userId) {
            setError('User not authenticated');
            return;
          }
          const token = localStorage.getItem('token');
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/forms/${userId}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          setForms(response.data);  
        } catch (err) {
          setError('Error fetching forms');
          console.error(err);
        }
      };
  
      fetchForms();
    }, []);

    // switch toggle and put to update staus
    const handleToggle = async (formId) => {
        try {
          const formToUpdate = forms.find((form) => form.form_id === formId);
      
          if (!formToUpdate) {
            throw new Error(`Form with ID ${formId} not found.`);
          }
      
          const updatedStatus = !formToUpdate.status;

          const userId = getUserIdFromToken();
          if (!userId) {
            throw new Error("No user ID found.");
          }
          const token = localStorage.getItem('token');
          if (!token) {
          console.error("No token found");
          return; 
          }

          const response = await axios.put(`${import.meta.env.VITE_API_URL}/forms/${userId}/${formId}`, {
            status: updatedStatus,
            name: formToUpdate.name, 
            design_object: formToUpdate.design_object, 
            sections: formToUpdate.sections, 
          },{headers: {
            'Authorization': `${token}`, 
            },
            }
          );

          const updatedForms = forms.map((form) =>
            form.form_id === formId ? { ...form, status: updatedStatus } : form
          );
          setForms(updatedForms);
      
        } catch (err) {
          setError('Error toggling status');
        }
      };

        // Handle modal open
        const openModal = (formId) => {
          setDeleteFormId(formId);
          setShowModal(true);
        };

        // Handle modal close
        const closeModal = () => {
          setShowModal(false);
          setDeleteFormId(null);
        };


  return (
    <div className="forms">
      <h2 className="forms__header" >Your Forms</h2>
      {error && <p>{error}</p>}
      {showModal && (
        <Modal
          formId={deleteFormId}
          onClose={closeModal}
          setForms={setForms}
        />
      )}

      <div className="forms__table">
        <div className="forms__body">
          {forms.map((form) => (
            <div key={uuidv4()} className="forms__row">
              <div className="forms__data forms__data--top">{form.name}
              <Switch  
                    isLive={form.status} 
                    onToggle={() => handleToggle(form.form_id)} />
              </div>
              <div className="forms__data forms__data--mid">
                <Button text="View Responses" className="btn--link" onClick={() => navigate(`/form/responses/${form.form_id}`)} />
                <LinkButton text="Copy Link" formId={form.form_id} className="btn--link" />
              </div>
              <div className="forms__data forms__data--bot">
                <Button text="Edit" onClick={() => navigate(`/form/edit/${form.form_id}`)} className="btn--primary"/>
                <Button text="Delete" onClick={() => openModal(form.form_id)} className="btn--delete"/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}