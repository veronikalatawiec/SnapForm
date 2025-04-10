import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import ShortText from "../../components/ShortText/ShortText.jsx";
import LongText from "../../components/LongText/LongText.jsx";
import MultiChoice from "../../components/MultiChoice/MultiChoice.jsx";
import Check from "../../components/Check/Check.jsx";
import Button from "../../components/Button/Button.jsx";
import Logo from "../../assets/images/logo-light.svg";
import "./HostedFormPage.scss";

export default function HostedFormPage() {
  const { id, user_id } = useParams();
  const [form, setForm] = useState(null);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/forms/live/${user_id}/${id}`
        );
        setForm(response.data);
      } catch (err) {
        setError("This form cannot be reached please try again later.");
        console.error(err);
      }
    };
    fetchForm();
  }, [id, user_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const responses = Object.entries(formData).map(([sectionId, content]) => ({
      form_section_id: parseInt(sectionId),
      content: JSON.stringify(content),
    }));

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/forms/response/${user_id}/${id}`,
        {
          form_id: id,
          responses: responses,
        }
      );
      console.log("Form submitted successfully", response.data);
      navigate("/form/submitted");
    } catch (err) {
      setError("Error submitting form.");
      console.error("Form submission error:", err);
    }
  };

  if (error) {
    return <div className="form__error">{error}</div>;
  }

  if (!form) {
    return <div className="form__loading">Loading...</div>;
  }

  if (!form.form.status) {
    return (
      <div className="form__notaccept">
        This form is not currently accepting responses.
      </div>
    );
  }
  const handleInputChange = (sectionId, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [sectionId]: value,
    }));
  };

  const renderFormSections = () => {
    return form.sections.map((section, index) => {
      switch (section.type) {
        case "header":
          return (
            <div key={index}>
              <h2 className="form__header">{section.label}</h2>
            </div>
          );
        case "paragraph":
          return (
            <div key={index} className="form__p-container">
              <p className="form__paragraph">{section.label}</p>
            </div>
          );
        case "shorttext":
          return (
            <ShortText
              key={index}
              label={section.label}
              placeholder={section.placeholder}
              sectionId={section.id}
              value={formData[section.id] || ""}
              onChange={(value) => handleInputChange(section.id, value)}
            />
          );
        case "longtext":
          return (
            <LongText
              key={index}
              label={section.label}
              placeholder={section.placeholder}
              value={formData[section.id] || ""}
              onChange={(value) => handleInputChange(section.id, value)}
            />
          );
        case "radio":
          return (
            <MultiChoice
              key={index}
              label={section.label}
              options={section.options}
              sectionId={section.id}
              value={formData[section.id] || ""}
              onChange={(value) => handleInputChange(section.id, value)}
            />
          );
        case "checkbox":
          return (
            <Check
              key={index}
              label={section.label}
              options={section.options}
              sectionId={section.id}
              value={formData[section.id] || []}
              onChange={(value) => handleInputChange(section.id, value)}
            />
          );
        default:
          return null;
      }
    });
  };

  return (
    <div className="form__page">
      <div className="form">
        <h2 className="form__head">{form.form.name}</h2>
        <form className="form__container" onSubmit={handleSubmit}>
          {renderFormSections()}
          <Button type="submit" text="Submit" className="btn--primary" />
        </form>
      </div>
      <img className="form__logo" src={Logo} />
    </div>
  );
}
