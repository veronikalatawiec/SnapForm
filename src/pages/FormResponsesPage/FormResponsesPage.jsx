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

  if (error) {
    return <div>{error}</div>;
  }

  if (!responses || responses.length === 0) {
    return <div>
      <h3>No responses found for this form.</h3>
      <Link to="/home">
        <Button text="Back" className="btn--link" />
      </Link>
    </div>;
  }
  const groupedResponses = responses.reduce((acc, response) => {

    Object.keys(response).forEach((key) => {
      if (key !== 'form_id') {
        const sectionNumber = key;
        if (!acc[sectionNumber]) {
          acc[sectionNumber] = []; 
        }
        acc[sectionNumber].push(response[key]);
      }
    });
    return acc;
  }, {});

  return (
    <div>
    <Link to="/home">
      <Button text="Back" className="btn--link" />
    </Link>
    <h1>Form Responses</h1>
    <h2>Total Responses: {totalResponses}</h2>

    <div className="responses-list">
      {Object.keys(groupedResponses).map((sectionNumber) => (
        <div key={sectionNumber} className="response-section">
          <h3>Section {sectionNumber}</h3>
          {groupedResponses[sectionNumber].map((response, index) => {
            // get rid of quotes 
            const parsedResponse = JSON.parse(response);
            return <div key={index}>{parsedResponse}</div>;
          })}
        </div>
      ))}
    </div>
  </div>
);

}