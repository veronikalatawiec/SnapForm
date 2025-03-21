import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function HostedFormPage() {
  const { id, user_id } = useParams();
  const [form, setForm] = useState(null);
  const [error, setError] = useState('');
  
  // get form
  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/forms/live/${user_id}/${id}`);
        setForm(response.data); 
        console.log(response.data)
      } catch (err) {
        setError('This form cannot be reached please try again later.');
        console.error(err);
      }
    };
    fetchForm();
  }, [id, user_id]);

  // Handle form submission WIP
  const handleSubmit = async (e) => {
    e.preventDefault();
    //handle it
  };
  if (error) {
    return <div>{error}</div>;
  }

  if (!form) {
    return <div>Loading...</div>;
  }

  if (!form.form.status) {
    return <div>This form is not currently accepting responses.</div>;
  }

  // Render FORM
  return (
    <div>
      <h2>{form.form.name}</h2>
      <form onSubmit={handleSubmit}>
        {/* WIP NEED TO RENDER FORM FROM RESPONSE */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}