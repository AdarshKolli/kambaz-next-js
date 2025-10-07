import Link from "next/link";
import ModulesControls from "./ModulesControls";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModuleControlButtons";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <ModulesControls />
      <br />
      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          {/* <div className="wd-title p-3 ps-2 bg-secondary">  <BsGripVertical className="me-2 fs-3" /> ASSIGNMENTS <ModuleControlButtons/> </div> */}
          <div className="wd-title p-3 ps-2 bg-secondary">
            <div className="module-title">
              <BsGripVertical className="me-2 fs-3" />
              ASSIGNMENTS
            </div>
            <ModuleControlButtons />
          </div>
          <ListGroup className="wd-lessons rounded-0">
            <ListGroupItem className="wd-grid-col-main-content  wd-fg-color-white d-flex">
              <BsGripVertical className="me-2 fs-2" />
              <h3>
                <Link
                  href="/Courses/1234/Assignments/123"
                  className="wd-assignment-link"
                >
                  A1 - ENV + HTML
                </Link>
              </h3>
              <p className="wd-bg-color-blue">
                Due Date: 22 oct 11:59 | 100 pts
              </p>{" "}
            </ListGroupItem>
            {/* <ListGroupItem className="wd-lesson p-3 ps-1 align-center">
              <BsGripVertical className="me-2 fs-3" /> <br/>
            </ListGroupItem> */}

            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex">
              <BsGripVertical className="me-2 fs-3" />
              <Link
                href="/Courses/1234/Assignments/123"
                className="wd-assignment-link"
              >
                A2 - React.js
              </Link><br/>
              <p>Due Date: 25 oct 11:59 | 100 pts</p>
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              Learn what is Web Development
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              READINGS
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              Web Dev- Chapter 1 - Introduction
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              Web Dev- Chapter 2 - Web Development 101
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              SLIDES
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              Intro to Web Development
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <Link
            href="/Courses/1234/Assignments/123"
            className="wd-assignment-link"
          >
            A1 - ENV + HTML
          </Link>
          <p>Due Date: 22 oct 11:59 | 100 pts</p>
        </li>
        <li className="wd-assignment-list-item">
          <Link
            href="/Courses/1234/Assignments/123"
            className="wd-assignment-link"
          >
            A2 - React.js
          </Link>
          <p>Due Date: 25 oct 11:59 | 100 pts</p>
        </li>
        <li className="wd-assignment-list-item">
          <Link
            href="/Courses/1234/Assignments/123"
            className="wd-assignment-link"
          >
            A3 - Next.js
          </Link>
          <p>Due Date: 27 oct 11:59 | 100 pts</p>
        </li>
        <li className="wd-assignment-list-item">
          <Link
            href="/Courses/1234/Assignments/123"
            className="wd-assignment-link"
          >
            A4 - MongoDB
          </Link>
          <p>Due Date: 3 nov 08:59 | 100 pts</p>
        </li>
        <li className="wd-assignment-list-item">
          <Link
            href="/Courses/1234/Assignments/123"
            className="wd-assignment-link"
          >
            A5 - API
          </Link>
          <p>Due Date: 7 nov 9:00 | 100 pts</p>
        </li>
      </ul>
    </div>
  );
}
