import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserIdFromToken } from '../../../utility.js';
import './LinkButton.scss';

export default function LinkButton({ formId }) {
  const navigate = useNavigate();
    const userId = getUserIdFromToken(); 
  const handleCopyLink = () => {
    // make link
    const formLink = `${import.meta.env.VITE_CLIENT_URL}/form/live/${userId}/${formId}`;

    // Copy to clip
    navigator.clipboard.writeText(formLink)
      .then(() => {
        alert('Link copied to clipboard!');
      })
      .catch((err) => {
        console.error('Error copying link: ', err);
        alert('Failed to copy link.');
      });
  };

  return (
    <button className="btn--link" onClick={handleCopyLink}>
      Copy Link
    </button>
  );
}