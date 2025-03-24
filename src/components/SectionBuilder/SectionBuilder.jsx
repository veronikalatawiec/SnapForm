import './SectionBuilder.scss';
import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import ShortText from '../SectionShortText/SectionShortText.jsx';
import LongText from '../SectionLongText/SectionLongText.jsx';
import MultiChoice from '../SectionMultiChoice/SectionMultiChoice.jsx';
import Checkbox from '../SectionCheck/SectionCheck.jsx'
import Button from '../Button/Button.jsx';
import Delete from '../../assets/images/icon_delete.svg';
import Header from '../../assets/images/icon_header.svg';
import Paragraph from '../../assets/images/icon_paragraph.svg';
import Text from '../../assets/images/icon_text.svg';
import MChoice from '../../assets/images/icon_radio.svg';
import Checkb from '../../assets/images/icon_check-box.svg';
import './SectionBuilder.scss'

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

  const removeSection = (index) => {
    const updatedSections = formSections.filter((_, i) => i !== index);
    setFormSections(updatedSections);
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
          'Authorization': `Bearer ${token}`, 
        },
      }
    );

    console.log('Form created:', response.data);
    navigate('/home'); 
  } catch (err) {
    console.error('Error creating form:', err);
  }
};

  return (
    <div className='builder'>
      <form onSubmit={handleSubmit} className='builder__form'>
      <div className='builder__name'>
          <label htmlFor="formName" className='builder__label'>Form Name</label>
          <input 
            id="formName"
            type="text"
            placeholder="Enter form name"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            required
            className='builder__input'
          />
        </div>

        {formSections.map((section, index) => {
          switch (section.type) {
            case 'header':
                return (
                    <div key={index} className='builder__section'>
                        <input
                            type="text"
                            placeholder="Add a header"
                            value={section.label}
                            onChange={(e) => handleSectionChange(index, { ...section, label: e.target.value })}
                            required
                            className='builder__input'
                        />
                        <Button type="button" onClick={() => removeSection(index)} text="Delete" className='btn--delete' iconPosition="icon-only" icon={<img src={Delete} alt="Delete"/>}/>
                    </div>
                );
            case 'paragraph':
                return (
                <div key={index} className='builder__section'>
                    <textarea
                        placeholder="Add a paragraph"
                        value={section.label}
                        onChange={(e) => handleSectionChange(index, { ...section, label: e.target.value })}
                        className='builder__input builder__input--large'
                    />
                    <Button type="button" onClick={() => removeSection(index)} text="Delete" className='btn--delete' iconPosition="icon-only" icon={<img src={Delete} alt="Delete"/>}/>
                </div>
            );
            case 'shorttext':
              return (
                <div key={index} className='builder__section'>
                    <ShortText
                        onChange={(newSection) => handleSectionChange(index, newSection)}
                        label={section.label}
                        placeholder={section.placeholder}
                    />
                    <Button type="button" onClick={() => removeSection(index)} text="Delete" className='btn--delete' iconPosition="icon-only" icon={<img src={Delete} alt="Delete"/>}/>
                </div>
              );
            case 'longtext':
              return (
                <div key={index} className='builder__section'>
                    <LongText
                        onChange={(newSection) => handleSectionChange(index, newSection)}
                        label={section.label}
                        placeholder={section.placeholder}
                    />
                    <Button type="button" onClick={() => removeSection(index)} text="Delete" className='btn--delete' iconPosition="icon-only" icon={<img src={Delete} alt="Delete"/>}/>
                </div>
                
              );
            case 'checkbox':
              return (
                <div key={index} className='builder__section'>
                    <Checkbox
                        onChange={(newSection) => handleSectionChange(index, newSection)}
                        label={section.label}
                        placeholder={section.placeholder}
                        options={section.options}
                    />
                     <Button type="button" onClick={() => removeSection(index)} text="Delete" className='btn--delete' iconPosition="icon-only" icon={<img src={Delete} alt="Delete"/>}/>
                </div>
                
              );
            case 'radio':
              return (
                <div key={index} className='builder__section'>
                    <MultiChoice
                        onChange={(newSection) => handleSectionChange(index, newSection)}
                        label={section.label}
                        placeholder={section.placeholder}
                        options={section.options}
                    />
                    <Button type="button" onClick={() => removeSection(index)} text="Delete" className='btn--delete' iconPosition="icon-only" icon={<img src={Delete} alt="Delete"/>}/>
                </div>
              );
            default:
              return null;
          }
        })}

        <div className='builder__add-sections'>
          <Button type="button" onClick={() => addSection('header')} text="Add A Header" className="btn--build" iconPosition="icon-top" icon={<img src={Header} alt="H"/>}/>
          <Button type="button" onClick={() => addSection('paragraph')} text="Add A Paragraph" className="btn--build" iconPosition="icon-top" icon={<img src={Paragraph} alt="P"/>}/>
          <Button type="button" onClick={() => addSection('shorttext')} text="Add Short Text Question" className="btn--build" iconPosition="icon-top" icon={<img src={Text} alt="T"/>}/>
          <Button type="button" onClick={() => addSection('longtext')} text="Add Long Text Question" className="btn--build" iconPosition="icon-top" icon={<img src={Text} alt="T"/>}/>
          <Button type="button" onClick={() => addSection('checkbox')} text="Add Checkbox Question" className="btn--build" iconPosition="icon-top" icon={<img src={MChoice} alt="M"/>}/>
          <Button type="button" onClick={() => addSection('radio')} text="Add Multiple Choice Question" className="btn--build" iconPosition="icon-top" icon={<img src={Checkb} alt="C"/>}/>
        </div>
        <Button type="submit" text="Create my Form" className="btn--primary"/>
      </form>
    </div>
  );
}
