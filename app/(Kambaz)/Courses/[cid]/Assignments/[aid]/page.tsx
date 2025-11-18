"use client"

import { Form, Button, Row, Col } from "react-bootstrap";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { setAssignment } from "../../../../../Labs/store/assignmentsReducer";
import * as coursesClient from "../../../client";

interface AssignmentsState {
  assignments: any[];
  assignment: any;
}

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const { assignment } = useSelector((state: { assignmentsReducer: AssignmentsState }) => state.assignmentsReducer);
  const dispatch = useDispatch();

  const isNewAssignment = aid === "new";

  const handleSave = async () => {
    if (isNewAssignment) {
      await coursesClient.createAssignmentForCourse(cid as string, assignment);
    } else {
      await coursesClient.updateAssignment(assignment);
    }
    router.push(`/Courses/${cid}/Assignments`);
  };

  const handleCancel = () => {
    router.push(`/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="container-fluid p-4">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="wd-name">Assignment Name</Form.Label>
          <Form.Control 
            type="text" 
            id="wd-name" 
            value={assignment?.title || ""}
            onChange={(e) => dispatch(setAssignment({ ...assignment, title: e.target.value }))}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="wd-description">Description</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={5}
            id="wd-description"
            value={assignment?.description || ""}
            onChange={(e) => dispatch(setAssignment({ ...assignment, description: e.target.value }))}
          />
        </Form.Group>

        <Row className="mb-3">
          <Col md={3}>
            <Form.Label htmlFor="wd-points" className="text-end d-block">Points</Form.Label>
          </Col>
          <Col md={9}>
            <Form.Control 
              type="number" 
              id="wd-points" 
              value={assignment?.points || 100}
              onChange={(e) => dispatch(setAssignment({ ...assignment, points: parseInt(e.target.value) }))}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={3}>
            <Form.Label htmlFor="wd-group" className="text-end d-block">Assignment Group</Form.Label>
          </Col>
          <Col md={9}>
            <Form.Select id="wd-group">
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              <option value="SOLO">Solo</option>
              <option value="DUO">Duo</option>
              <option value="GROUP">Group</option>
            </Form.Select>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={3}>
            <Form.Label htmlFor="wd-display-grade-as" className="text-end d-block">Display Grade as</Form.Label>
          </Col>
          <Col md={9}>
            <Form.Select id="wd-display-grade-as">
              <option value="PERCENTAGE">Percentage</option>
              <option value="GRADE">Grade</option>
              <option value="MARKS">Marks</option>
            </Form.Select>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={3}>
            <Form.Label htmlFor="wd-submission-type" className="text-end d-block">Submission Type</Form.Label>
          </Col>
          <Col md={9}>
            <div className="border rounded p-3">
              <Form.Select id="wd-submission-type" className="mb-3">
                <option value="ONLINE">Online</option>
                <option value="OFFLINE">Offline</option>
              </Form.Select>

              <Form.Label className="fw-bold">Online Entry Options</Form.Label>
              <Form.Check 
                type="checkbox" 
                id="wd-text-entry"
                label="Text Entry"
                className="mb-2"
              />
              <Form.Check 
                type="checkbox" 
                id="wd-website-url"
                label="Website URL"
                className="mb-2"
              />
              <Form.Check 
                type="checkbox" 
                id="wd-media-recordings"
                label="Media Recordings"
                className="mb-2"
              />
              <Form.Check 
                type="checkbox" 
                id="wd-student-annotation"
                label="Student Annotation"
                className="mb-2"
              />
              <Form.Check 
                type="checkbox" 
                id="wd-file-upload"
                label="File Uploads"
              />
            </div>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={3}>
            <Form.Label className="text-end d-block">Assign</Form.Label>
          </Col>
          <Col md={9}>
            <div className="border rounded p-3">
              <Form.Group className="mb-3">
                <Form.Label htmlFor="wd-assign-to" className="fw-bold">Assign to</Form.Label>
                <Form.Control 
                  type="text" 
                  id="wd-assign-to"
                  defaultValue="Everyone"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="wd-due-date" className="fw-bold">Due</Form.Label>
                <Form.Control 
                  type="date"
                  id="wd-due-date"
                  value={assignment?.dueDate || ""}
                  onChange={(e) => dispatch(setAssignment({ ...assignment, dueDate: e.target.value }))}
                />
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="wd-available-from" className="fw-bold">Available from</Form.Label>
                    <Form.Control 
                      type="date"
                      id="wd-available-from"
                      value={assignment?.availableDate || ""}
                      onChange={(e) => dispatch(setAssignment({ ...assignment, availableDate: e.target.value }))}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="wd-available-until" className="fw-bold">Until</Form.Label>
                    <Form.Control 
                      type="date"
                      id="wd-available-until"
                      value={assignment?.dueDate || ""}
                      onChange={(e) => dispatch(setAssignment({ ...assignment, dueDate: e.target.value }))}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        <hr />
        <div className="d-flex justify-content-end gap-2">
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleSave}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}