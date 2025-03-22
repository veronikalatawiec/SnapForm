import React from 'react';
import './Button.scss';

export default function Button({
  className,
  onClick,
  icon,
  type,
  text,
  iconPosition, // Accepts "icon-left", "icon-right", "icon-top", or "icon-only"
}) {
  let content;

  if (iconPosition === "icon-left") {
    content = (
      <>
        {icon && <span className="btn__icon">{icon}</span>}
        <span className="btn__text">{text}</span>
      </>
    );
  } else if (iconPosition === "icon-right") {
    content = (
      <>
        <span className="btn__text">{text}</span>
        {icon && <span className="btn__icon">{icon}</span>}
      </>
    );
  } else if (iconPosition === "icon-top") {
    content = (
      <>
        {icon && <span className="btn__icon">{icon}</span>}
        <span className="btn__text">{text}</span>
      </>
    );
  } else if (iconPosition === "icon-only") {
    content = icon && <span className="btn__icon">{icon}</span>;
  } else {
    // Default: text only (or any custom arrangement)
    content = <span className="btn__text">{text}</span>;
  }

  return (
    <button
      className={`btn ${className} ${iconPosition ? `btn--${iconPosition}` : ""}`}
      onClick={onClick}
      type={type}
    >
      {content}
    </button>
  );
}

//note have link, delete, primary, secondary, disabled and BUILD