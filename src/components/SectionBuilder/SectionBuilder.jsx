import './SectionBuilder.scss';
import React from 'react';
import ShortText from '../SectionShortText/SectionShortText.jsx';
import LongText from '../SectionLongText/SectionLongText.jsx';
import MultipleChoice from '../SectionMultiChoice/SectionMultiChoice.jsx';

export default function SectionBuilder() {
  return(
    <>
    <ShortText />
    <LongText />
    <MultipleChoice />
    </>
  )
}