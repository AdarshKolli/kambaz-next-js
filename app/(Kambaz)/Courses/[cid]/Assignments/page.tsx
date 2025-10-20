"use client"
import Link from "next/link";
import ModulesControls from "./ModulesControls";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { useParams } from "next/navigation";
import ModuleControlButtons from "./ModuleControlButtons";
import * as db from "../../../Database";

export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments;

  return (
    <div id="wd-assignments">
      <ModulesControls />
      <br />
      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroupItem className="p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <IoMdArrowDropdown className="me-2" />
              <span className="fw-bold">Assignments</span>
            </div>
            <div className="d-flex align-items-center">
              <span className="border border-dark rounded-pill px-3 py-1 me-2">40% of total</span>
              <button className="btn btn-sm">+</button>
              <BsThreeDotsVertical className="ms-2" />
            </div>
          </div>

          <ListGroup className="rounded-0">
            {assignments
              .filter((assignment: any) => assignment.course === cid)
              .map((assignment: any) => (
                <ListGroupItem 
                  key={assignment._id}
                  className="p-3 d-flex align-items-start"
                  style={{ borderLeft: "5px solid #28a745" }}
                >
                  <BsGripVertical className="me-3 fs-3 text-muted" />
                  <div className="flex-grow-1">
                    <Link
                      href={`/Courses/${cid}/Assignments/${assignment._id}`}
                      className="text-dark text-decoration-none fw-bold"
                    >
                      {assignment.title}
                    </Link>
                    <div className="text-muted small">
                      <span className="text-danger">Multiple Modules</span>
                      {" | "}
                      <span className="fw-bold">Not available until</span> {assignment.availableDate}
                      {" | "}
                      <span className="fw-bold">Due</span> {assignment.dueDate}
                      {" | "}
                      {assignment.points} pts
                    </div>
                  </div>
                  <div className="d-flex align-items-center ms-3">
                    <FaCheckCircle className="text-success fs-5 me-3" />
                    <BsThreeDotsVertical />
                  </div>
                </ListGroupItem>
              ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}