import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '../../components/Button/Button';
import axios from 'axios';
import './FormResponsesPage.scss';

export default function FormResponsesPage() {
  const { user_id, id } = useParams();
  const [responses, setResponses] = useState([]);
  const [totalResponses, setTotalResponses] = useState(0);
  const [error, setError] = useState('');
  const [sections, setSections] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/forms/response/${user_id}/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setResponses(response.data.responses);
        setTotalResponses(response.data.totalResponses);
      } catch (err) {
        setError('Error fetching responses');
        console.error(err);
      }
    };
    fetchResponses();
  }, [user_id, id]);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/forms/live/${user_id}/${id}`
        );
        setSections(response.data.sections);
      } catch (err) {
        setError('Error fetching form sections');
        console.error(err);
      }
    };
    fetchForm();
  }, [user_id, id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!responses || responses.length === 0) {
    return <div>
      <p>No responses found for this form.</p>
        <Link to="/home">
            <Button className="btn--primary" text="Back"/>
        </Link>
    </div>;
  }
  const groupedResponses = responses.reduce((acc, response) => {
    const { form_section_id, content } = response;
    if (!acc[form_section_id]) {
      acc[form_section_id] = [];
    }
    acc[form_section_id].push(content);
    return acc;
  }, {});

  return (
    <div className="responses">
      <Link to="/home">
        <Button className="btn--primary" text="Back"/>
      </Link>
      <h1>Form Responses</h1>
      <h2>{totalResponses} Questions Answered</h2>
      <div className="responses-list">
        {sections.map((section) => {
          if (!groupedResponses[section.id]) return null;

          return (
            <div key={section.id} className="response-section">
              <h3>{section.label}</h3>
              {groupedResponses[section.id].map((response, index) => (
                <div key={index} className="response-content">
                  {response}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
