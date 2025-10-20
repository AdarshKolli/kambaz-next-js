"use client"
import { Form, Button, Row, Col } from "react-bootstrap";
import { useParams } from "next/navigation";
import Link from "next/link";
import * as db from "../../../../Database";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const assignment = db.assignments.find((a: any) => a._id === aid);

  if (!assignment) {
    return <div className="p-4">Assignment not found</div>;
  }

  return (
    <div id="wd-assignments-editor" className="container-fluid p-4">
      <Form>
        {/* Assignment Name */}
        <Form.Group className="mb-3">
          <Form.Label htmlFor="wd-name">Assignment Name</Form.Label>
          <Form.Control 
            type="text" 
            id="wd-name" 
            defaultValue={assignment.title}
          />
        </Form.Group>

        {/* Description */}
        <Form.Group className="mb-3">
          <Form.Label htmlFor="wd-description">Description</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={5}
            id="wd-description"
            defaultValue={assignment.description}
          />
        </Form.Group>

        {/* Points */}
        <Row className="mb-3">
          <Col md={3}>
            <Form.Label htmlFor="wd-points" className="text-end d-block">Points</Form.Label>
          </Col>
          <Col md={9}>
            <Form.Control 
              type="number" 
              id="wd-points" 
              defaultValue={assignment.points}
            />
          </Col>
        </Row>

        {/* Assignment Group */}
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

        {/* Display Grade As */}
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

        {/* Submission Type */}
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

        {/* Assign Section */}
        <Row className="mb-3">
          <Col md={3}>
            <Form.Label className="text-end d-block">Assign</Form.Label>
          </Col>
          <Col md={9}>
            <div className="border rounded p-3">
              {/* Assign To */}
              <Form.Group className="mb-3">
                <Form.Label htmlFor="wd-assign-to" className="fw-bold">Assign to</Form.Label>
                <Form.Control 
                  type="text" 
                  id="wd-assign-to"
                  defaultValue="Everyone"
                />
              </Form.Group>

              {/* Due Date */}
              <Form.Group className="mb-3">
                <Form.Label htmlFor="wd-due-date" className="fw-bold">Due</Form.Label>
                <Form.Control 
                  type="date"
                  id="wd-due-date"
                  defaultValue={assignment.dueDate}
                />
              </Form.Group>

              {/* Available From and Until */}
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="wd-available-from" className="fw-bold">Available from</Form.Label>
                    <Form.Control 
                      type="date"
                      id="wd-available-from"
                      defaultValue={assignment.availableDate}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="wd-available-until" className="fw-bold">Until</Form.Label>
                    <Form.Control 
                      type="date"
                      id="wd-available-until"
                      defaultValue={assignment.dueDate}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        {/* Buttons */}
        <hr />
        <div className="d-flex justify-content-end gap-2">
          <Link href={`/Courses/${cid}/Assignments`}>
            <Button 
              variant="secondary" 
              id="wd-cancel-button"
            >
              Cancel
            </Button>
          </Link>
          <Link href={`/Courses/${cid}/Assignments`}>
            <Button 
              variant="danger" 
              id="wd-save-button"
            >
              Save
            </Button>
          </Link>
        </div>
      </Form>
    </div>
  );
}