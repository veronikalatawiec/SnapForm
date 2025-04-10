import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Forms.scss";
import Switch from "../Switch/Switch.jsx";
import Button from "../Button/Button.jsx";
import { getUserIdFromToken } from "../../../utility.js";
import { v4 as uuidv4 } from "uuid";
import LinkButton from "../LinkButton/LinkButton.jsx";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal.jsx";
import Delete from "../../assets/images/icon_delete.svg";
import Edit from "../../assets/images/icon_edit.svg";

export default function Table() {
  const [forms, setForms] = useState([]);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [deleteFormId, setDeleteFormId] = useState(null);
  const navigate = useNavigate();
  const userId = getUserIdFromToken();

  useEffect(() => {
    const fetchForms = async () => {
      try {
        if (!userId) {
          setError("User not authenticated");
          return;
        }
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/forms/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setForms(response.data);
        setError("");
      } catch (err) {
        setError("Error fetching forms");
        console.error("Error fetching forms", err);
      }
    };

    fetchForms();
  }, []);

  const handleToggle = async (formId) => {
    try {
      const formToUpdate = forms.find((form) => form.form_id === formId);

      if (!formToUpdate) {
        throw new Error(`Form with ID ${formId} not found.`);
      }

      const updatedStatus = !formToUpdate.status;

      if (!userId) {
        throw new Error("No user ID found.");
      }
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/forms/${userId}/${formId}`,
        {
          status: updatedStatus,
          name: formToUpdate.name,
          design_object: formToUpdate.design_object,
          sections: formToUpdate.sections,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      const updatedForms = forms.map((form) =>
        form.form_id === formId ? { ...form, status: updatedStatus } : form
      );
      setForms(updatedForms);
    } catch (err) {
      setError("Error toggling status");
    }
  };

  const openModal = (formId) => {
    setDeleteFormId(formId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setDeleteFormId(null);
  };

  return (
    <div className="forms">
      <h2 className="forms__header">My Forms</h2>
      {showModal && (
        <Modal formId={deleteFormId} onClose={closeModal} setForms={setForms} />
      )}
      {error && (
        <p className="forms__error">
          Sorry, something went wrong. Please try again.
        </p>
      )}
      {forms.length === 0 ? (
        <div className="forms__no-forms">
          <h3 className="forms__no-forms--header">No Forms Found</h3>
          <p className="forms__no-forms--text">
            We couldn't find any forms for your account. Start by creating your
            first form!
          </p>
          <Button
            text="Create Form"
            onClick={() => navigate("/form/create")}
            className="btn--primary"
          />
        </div>
      ) : (
        <div className="forms__body">
          {forms.map((form) => (
            <div key={uuidv4()} className="forms__row">
              <div className="forms__data forms__data--top">
                <h3 className="forms__title">{form.name}</h3>
                <Switch
                  isLive={form.status}
                  onToggle={() => handleToggle(form.form_id)}
                />
              </div>
              <div className="forms__data forms__data--mid">
                <Button
                  text="View Responses"
                  className="btn--link"
                  onClick={() =>
                    navigate(`/form/responses/${userId}/${form.form_id}`)
                  }
                />
                <LinkButton
                  text="Copy Link"
                  formId={form.form_id}
                  className="btn--link"
                />
              </div>
              <div className="forms__data forms__data--bot">
                <Button
                  text="Edit"
                  className="btn--add"
                  iconPosition="icon-only"
                  icon={<img src={Edit} alt="Edit" />}
                />
                <Button
                  text="Delete"
                  onClick={() => openModal(form.form_id)}
                  className="btn--delete"
                  iconPosition="icon-only"
                  icon={<img src={Delete} alt="Delete" />}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
