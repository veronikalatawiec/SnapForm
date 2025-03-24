import "./SectionLongText.scss";
import React, { useState } from "react";

export default function SectionLongText({ onChange }) {
  const [label, setLabel] = useState("");

  const handleLabelChange = (e) => {
    setLabel(e.target.value);
    onChange({ type: "longtext", label: e.target.value });
  };

  return (
    <div className="long-text">
      <input
        type="text"
        placeholder="What would you like to ask?"
        value={label}
        onChange={handleLabelChange}
        required
        className="long-text__label"
      />
    </div>
  );
}
