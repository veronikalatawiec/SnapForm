import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Switch from '../Switch/Switch.jsx';  
import Button from '../Button/Button.jsx'; 
import { getUserIdFromToken } from '../../../utility.js';
import { v4 as uuidv4 } from 'uuid';
import LinkButton from '../LinkButton/LinkButton.jsx';

export default function HomePage() {
  const [forms, setForms] = useState([]);
  const [error, setError] = useState('');

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

  // delete form WIP NEED EP
//   const handleDelete = async (formId) => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.delete(`${import.meta.env.VITE_API_URL}/forms/${formId}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });
//       setForms(forms.filter(form => form.id !== formId));
//     } catch (err) {
//       console.error('Error deleting form', err);
//     }
//   };

  return (
    <div className="forms">
      <h2 className="forms__header" >Your Forms</h2>
      {error && <p>{error}</p>}
      <table className="forms__table">
        <tbody className="forms__body">
          {forms.map((form) => (
            <tr key={uuidv4()} className="forms__row">
              <td className="forms__data">{form.name}</td>
              <td className="forms__data">
                <Switch  
                    isLive={form.status} 
                    onToggle={() => handleToggle(form.form_id)} />
              </td>
              <td className="forms__data">
                <LinkButton text="Copy Link" formId={form.form_id} className="btn--link" onClick={() => navigate(`/form/${form.form_id}`)} />
                <Button text="View Responses" className="btn--link" onClick={() => navigate(`/forms/responses/${form.form_id}`)} />
                {/* <Button text="Edit" onClick={() => navigate(`/form/edit/${form.form_id}`)} className="btn--primary"/> */}
                {/* <Button text="Delete" onClick={() => handleDelete(form.form_id)} className="btn--delete"/> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}