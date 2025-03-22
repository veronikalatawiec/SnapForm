import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '../../components/Button/Button';
import axios from 'axios';
import './FormResponsesPage.scss';

export default function FormResponsesPage() {
  const { user_id, form_id } = useParams();
  const [responses, setResponses] = useState([]);
  const [totalResponses, setTotalResponses] = useState(0);
  const [error, setError] = useState('');

  // Fetch responses on component mount
  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/forms/${user_id}/forms/${form_id}/responses`);
        setResponses(response.data.responses);
        setTotalResponses(response.data.totalResponses);
      } catch (err) {
        setError('Error fetching responses');
        console.error(err);
      }
    };
    fetchResponses();
  }, [user_id, form_id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (responses.length === 0) {
    return <div>No responses found for this form.</div>;
  }

  return (
    <div>
      <h1>Form Responses</h1>
      <h2>Total Responses: {totalResponses}</h2>

      <Link to="/home">
        <Button text="Back" className="btn--link" />
      </Link>

      <div className="responses-list">
        {responses.map((response, index) => (
          <div key={index} className="response">
            <h3>Response #{index + 1}</h3>
            {Object.keys(response).map((sectionKey) => {
              if (sectionKey !== 'form_id') {
                return (
                  <div key={sectionKey} className="response-section">
                    <h4>{sectionKey}</h4>
                    <div>{response[sectionKey]}</div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        ))}
      </div>
    </div>
  );
}