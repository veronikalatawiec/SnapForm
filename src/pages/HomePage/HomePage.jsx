import React from 'react';
import { useParams } from 'react-router-dom';
import SectionBuilder from '../../components/SectionBuilder/SectionBuilder';

const HomePage = () => {
  return (
    <div>
      <h1>User Home</h1>
      <SectionBuilder />
    </div>
  );
};

export default HomePage;
//NOTE: If time set popup/different homepage on first time sign in(linked from sign up)