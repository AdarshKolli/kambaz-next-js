import Form from "react-bootstrap/Form";
import { IoSearch } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { Button } from "react-bootstrap";
import "./style.css";

export default function ModulesControls() {
  return (
    <div className="modules-controls d-flex align-items-center justify-content-between">
      <div className="search-container d-flex align-items-center">
        <IoSearch className="search-icon" />
        <Form.Control
          type="text"
          placeholder="Search for Assignment"
          aria-label="Search"
          className="search-input"
        />
      </div>

      <div className="button-group d-flex align-items-center">
        <Button
          variant="light"
          size="lg"
          className="group-btn me-2"
        >
          <FaPlus className="me-2 plus-icon" />
          Group
        </Button>

        <Button
          variant="danger"
          size="lg"
          className="assignment-btn"
        >
          <FaPlus className="me-2 plus-icon" />
          Assignment
        </Button>
      </div>
    </div>
  );
}
