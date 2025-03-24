import React from "react";
import { useNavigate } from "react-router-dom";
import { getUserIdFromToken } from "../../../utility.js";
import Button from "../Button/Button.jsx";
import "./LinkButton.scss";

export default function LinkButton({ formId }) {
  const navigate = useNavigate();
  const userId = getUserIdFromToken();
  const handleCopyLink = () => {
 
    const formLink = `${
      import.meta.env.VITE_CLIENT_URL
    }/form/live/${userId}/${formId}`;

    navigator.clipboard
      .writeText(formLink)
      .then(() => {
        alert("Link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Error copying link: ", err);
        alert("Failed to copy link.");
      });
  };

  return (
    <Button text="Copy Link" className="btn--link" onClick={handleCopyLink} />
  );
}
