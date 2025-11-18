"use client"

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ListGroup, ListGroupItem, Button, Modal } from "react-bootstrap";
import { BsGripVertical, BsThreeDotsVertical } from "react-icons/bs";
import { FaCheckCircle, FaTrash, FaPlus } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { setAssignments, setAssignment } from "../../../../Labs/store/assignmentsReducer";
import * as coursesClient from "../../client";

interface AssignmentsState {
  assignments: any[];
  assignment: any;
}

interface AccountState {
  currentUser: any;
}

export default function Assignments() {
  const { cid } = useParams();
  const router = useRouter();
  const { assignments } = useSelector((state: { assignmentsReducer: AssignmentsState }) => state.assignmentsReducer);
  const { currentUser } = useSelector((state: { accountReducer: AccountState }) => state.accountReducer);
  const dispatch = useDispatch();
  
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState<string | null>(null);

  const isFaculty = currentUser?.role === "FACULTY";

  const fetchAssignments = async () => {
    const assignments = await coursesClient.findAssignmentsForCourse(cid as string);
    dispatch(setAssignments(assignments));
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleDeleteClick = (assignmentId: string) => {
    setAssignmentToDelete(assignmentId);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (assignmentToDelete) {
      await coursesClient.deleteAssignment(assignmentToDelete);
      dispatch(setAssignments(assignments.filter((a: any) => a._id !== assignmentToDelete)));
      setShowDeleteDialog(false);
      setAssignmentToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteDialog(false);
    setAssignmentToDelete(null);
  };

  const handleAddAssignment = () => {
    dispatch(setAssignment({
      _id: "new",
      title: "New Assignment",
      course: cid,
      description: "",
      points: 100,
      dueDate: "2024-05-20",
      availableDate: "2024-05-06"
    }));
    router.push(`/Courses/${cid}/Assignments/new`);
  };

  return (
    <div id="wd-assignments">
      {isFaculty && (
        <div className="d-flex justify-content-end gap-2 mb-3">
          <Button variant="secondary">
            <FaPlus className="me-2" />
            Group
          </Button>
          <Button variant="danger" onClick={handleAddAssignment}>
            <FaPlus className="me-2" />
            Assignment
          </Button>
        </div>
      )}

      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroupItem className="p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <IoMdArrowDropdown className="me-2" />
              <span className="fw-bold">Assignments</span>
            </div>
            {isFaculty && (
              <div className="d-flex align-items-center">
                <span className="border border-dark rounded-pill px-3 py-1 me-2">40% of total</span>
                <button 
                  className="btn btn-sm"
                  onClick={handleAddAssignment}
                >
                  +
                </button>
                <BsThreeDotsVertical className="ms-2" />
              </div>
            )}
          </div>

          <ListGroup className="rounded-0">
            {assignments.map((assignment: any) => (
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
                    onClick={() => dispatch(setAssignment(assignment))}
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
                  {isFaculty && (
                    <FaTrash
                      className="text-danger fs-5 me-3"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDeleteClick(assignment._id)}
                    />
                  )}
                  <FaCheckCircle className="text-success fs-5 me-3" />
                  <BsThreeDotsVertical />
                </div>
              </ListGroupItem>
            ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>

      <Modal show={showDeleteDialog} onHide={cancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove this assignment?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}