import Form from "react-bootstrap/Form";
import { IoSearch } from "react-icons/io5";
import "./style.css";
import { FaPlus } from "react-icons/fa6";
import { Button } from "react-bootstrap";

export default function ModulesControls() {
  return (
    <div className="modules-controls d-flex align-items-center justify-content-between">
      <div className="search-container">
        <IoSearch className="search-icon" />
        <Form.Control
          type="text"
          placeholder="Search for Assignment"
          aria-label="Search"
          className="search-input"
        />
      </div>
      <div className="button-group">
        <Button variant="black" size="lg" id="wd-add-module-btn" className="me-2">
          <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
          Groups
        </Button>
        <Button variant="danger" size="lg" id="wd-add-module-btn">
          <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
          Assignments
        </Button>
      </div>
    </div>
  );
}

