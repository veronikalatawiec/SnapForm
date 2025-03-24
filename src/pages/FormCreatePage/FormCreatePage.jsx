import React from "react";
import SectionBuilder from "../../components/SectionBuilder/SectionBuilder";
import Button from "../../components/Button/Button";
import Nav from "../../components/Nav/Nav";
import "./FormCreatePage.scss";
import { Link } from "react-router-dom";

export default function FormCreatePage() {
  return (
    <>
      <Nav />
      <div className="form-create__page">
        <div className="form-create">
          <Link to="/home">
            <Button text="Back" className="btn--primary" />
          </Link>
          <h1 className="form-create__h1">Create Form</h1>
          <div className="form-create__content">
            <SectionBuilder />
          </div>
        </div>
      </div>
    </>
  );
}
