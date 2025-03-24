import React from "react";
import "./Modal.scss";
import axios from "axios";
import { getUserIdFromToken } from "../../../utility.js";
import Button from "../Button/Button.jsx";
import Delete from "../../assets/images/icon_delete.svg";

export default function Modal({ formId, onClose, setForms }) {
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = getUserIdFromToken();

      await axios.delete(
        `${import.meta.env.VITE_API_URL}/forms/${userId}/${formId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setForms((prevForms) =>
        prevForms.filter((form) => form.form_id !== formId)
      );
      onClose();
    } catch (err) {
      console.error("Error deleting form", err);
      onClose();
    }
  };
  return (
    <div className="modal__overlay">
      <div className="modal">
        <h3 className="modal__head">
          Are you sure you want to delete this form?
        </h3>
        <p className="modal__text">This action cannot be undone.</p>
        <div className="modal__btns">
          <Button
            onClick={handleDelete}
            className="btn--link"
            text="Delete"
            iconPosition="icon-right"
            icon={<img src={Delete} alt="Delete" />}
          />
          <Button onClick={onClose} className="btn--primary" text="Cancel" />
        </div>
      </div>
    </div>
  );
}
