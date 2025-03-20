import './SectionBuilder.scss';
import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import ShortText from '../SectionShortText/SectionShortText.jsx';
import LongText from '../SectionLongText/SectionLongText.jsx';
import MultipleChoice from '../SectionMultiChoice/SectionMultiChoice.jsx';
import Checkbox from '../SectionCheck/SectionCheck.jsx'
import Button from '../Button/Button.jsx';

export default function SectionBuilder() {
  // Sstore sections
  const [formSections, setFormSections] = useState([]);
  const [formName, setFormName] = useState('');
  const [formStatus, setFormStatus] = useState(true);
//   const [error, setError] = useState('');
  const navigate = useNavigate();
  
  // Handle section change
  const handleSectionChange = (index, newSection) => {
    const updatedSections = [...formSections];
    updatedSections[index] = { ...updatedSections[index], ...newSection };
    setFormSections(updatedSections);
  };

  // Add section
  const addSection = (type) => {
    const newSection = {
      type,
      label: '',
      placeholder: '',
      options: [],
    };
    setFormSections([...formSections, newSection]);
  };

  // form submit handle
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }
        // Decode 
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.id;

    // Prepare the data 
    const formData = {
      name: formName,  
      status: formStatus,  
      sections: formSections,  
      design_object: { theme: 'default' },  
    };
  
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/forms/${userId}`, 
      formData, 
      {
        headers: {
          'Authorization': `Bearer ${token}`,  // Include the JWT token in the Authorization header
        },
      }
    );

    console.log('Form created:', response.data);
    navigate('/home');  // Redirect after form is created
  } catch (err) {
    console.error('Error creating form:', err);
  }
};

  return (
    <div>
      <h2>Create a Form</h2>
      <form onSubmit={handleSubmit}>
      <div>
          <label htmlFor="formName">Form Name</label>
          <input
            id="formName"
            type="text"
            placeholder="Enter form name"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            required
          />
        </div>

        {formSections.map((section, index) => {
          switch (section.type) {
            // case 'heading':
            //   return (
            //     <ShortText
            //       key={index}
            //       onChange={(newSection) => handleSectionChange(index, newSection)}
            //       label={section.label}
            //       placeholder={section.placeholder}
            //     />
            //   );
            //   case 'paragraph':
            //   return (
            //     <ShortText
            //       key={index}
            //       onChange={(newSection) => handleSectionChange(index, newSection)}
            //       label={section.label}
            //       placeholder={section.placeholder}
            //     />
            //   );
            case 'shorttext':
              return (
                <ShortText
                  key={index}
                  onChange={(newSection) => handleSectionChange(index, newSection)}
                  label={section.label}
                  placeholder={section.placeholder}
                />
              );
            case 'longtext':
              return (
                <LongText
                  key={index}
                  onChange={(newSection) => handleSectionChange(index, newSection)}
                  label={section.label}
                  placeholder={section.placeholder}
                />
              );
            case 'checkbox':
              return (
                <Checkbox
                  key={index}
                  onChange={(newSection) => handleSectionChange(index, newSection)}
                  label={section.label}
                  placeholder={section.placeholder}
                  options={section.options}
                />
              );
            case 'radio':
              return (
                <MultipleChoice
                  key={index}
                  onChange={(newSection) => handleSectionChange(index, newSection)}
                  label={section.label}
                  placeholder={section.placeholder}
                  options={section.options}
                />
              );
            default:
              return null;
          }
        })}

        {/* <div>
            <Button type="button" onClick={() => addSection('header')} text="Add A Heading" className="btn--build"/>
            <Button type="button" onClick={() => addSection('paragraph')} text="Add A Paragraph" className="btn--build" />
        </div> */}
        <div>
          <Button type="button" onClick={() => addSection('shorttext')} text="Add Short Text Question" className="btn--build"/>
          <Button type="button" onClick={() => addSection('longtext')} text="Add Long Text Question" className="btn--build"/>
          <Button type="button" onClick={() => addSection('checkbox')} text="Add Checkbox Question" className="btn--build"/>
          <Button type="button" onClick={() => addSection('radio')} text="Add Multiple Choice Question" className="btn--build"/>
        </div>
        <Button type="submit" text="Create my Form" className="btn--primary"/>
      </form>
    </div>
  );
}

// export default function SectionBuilder() {
//   return(
//     <>
//     <ShortText />
//     <LongText />
//     <MultipleChoice />
//     <Checkbox />
//     </>
//   )
// }