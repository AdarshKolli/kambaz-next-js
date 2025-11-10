"use client"

import React, { useState } from "react";
import Link from "next/link";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Row,
  Form,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse, setCourse } from "../../Labs/store/coursesReducer";
import { enroll, unenroll } from "../../Labs/store/enrollmentsReducer";

interface CoursesState {
  courses: any[];
  course: any;
}

interface AccountState {
  currentUser: any;
}

interface EnrollmentsState {
  enrollments: any[];
}

export default function Dashboard() {
  const { courses, course } = useSelector((state: { coursesReducer: CoursesState }) => state.coursesReducer);
  const { currentUser } = useSelector((state: { accountReducer: AccountState }) => state.accountReducer);
  const { enrollments } = useSelector((state: { enrollmentsReducer: EnrollmentsState }) => state.enrollmentsReducer);
  const dispatch = useDispatch();

  const [showAllCourses, setShowAllCourses] = useState(false);
  const isFaculty = currentUser?.role === "FACULTY";

  // Check if user is enrolled in a course
  const isEnrolled = (courseId: string) => {
    return enrollments.some(
      (e: any) => e.user === currentUser?._id && e.course === courseId
    );
  };

  // Get courses to display based on showAllCourses toggle
  const displayedCourses = showAllCourses
    ? courses
    : courses.filter((course) =>
        enrollments.some(
          (enrollment) =>
            enrollment.user === currentUser?._id &&
            enrollment.course === course._id
        )
      );

  const handleEnroll = (courseId: string) => {
    if (currentUser) {
      dispatch(enroll({ userId: currentUser._id, courseId }));
    }
  };

  const handleUnenroll = (courseId: string) => {
    if (currentUser) {
      dispatch(unenroll({ userId: currentUser._id, courseId }));
    }
  };

  return (
    <div id="wd-dashboard" className="p-4">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      {/* Enrollments button - Only for non-faculty */}
      {!isFaculty && currentUser && (
  <div className="d-flex justify-content-end mb-3">
    <Button
      variant="primary"
      onClick={() => setShowAllCourses(!showAllCourses)}
    >
      {showAllCourses ? "Show My Courses" : "Show All Courses"}
    </Button>
  </div>
)}
      
      {/* Only show form for FACULTY */}
      {isFaculty && (
        <>
          <h5>
            New Course
            <Button
              variant="warning"
              className="float-end me-2"
              id="wd-update-course-click"
              onClick={() => dispatch(updateCourse())}
            >
              Update
            </Button>
            <Button
              variant="primary"
              className="float-end me-2"
              id="wd-add-new-course-click"
              onClick={() => dispatch(addNewCourse())}
            >
              Add
            </Button>
          </h5>
          <br />
          
          <Form.Control
            value={course.name}
            className="mb-2"
            onChange={(e) => dispatch(setCourse({ ...course, name: e.target.value }))}
            placeholder="Course Name"
          />
          <Form.Control
            as="textarea"
            rows={3}
            value={course.description}
            onChange={(e) => dispatch(setCourse({ ...course, description: e.target.value }))}
            placeholder="Course Description"
          />
          <hr />
        </>
      )}
      
      <h2 id="wd-dashboard-published">
        Published Courses ({displayedCourses.length})
      </h2>
      <hr />
      
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {displayedCourses.map((course) => (
            <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link
                  href={`/Courses/${course._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                  onClick={(e) => {
                    // Prevent navigation if not enrolled (non-faculty only)
                    if (!isFaculty && !isEnrolled(course._id)) {
                      e.preventDefault();
                      alert("You must enroll in this course to access it");
                    }
                  }}
                >
                  <CardImg
                    variant="top"
                    src={course.image || "/images/reactjs.jpeg"}
                    width="100%"
                    height={160}
                  />
                  <CardBody>
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name}
                    </CardTitle>
                    <CardText
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {course.description}
                    </CardText>
                    
                    {/* Go button - only for enrolled or faculty */}
                    {(isFaculty || isEnrolled(course._id)) && (
                      <Button variant="primary">Go</Button>
                    )}
                    
                    {/* Edit/Delete buttons for FACULTY */}
                    {isFaculty && (
                      <>
                        <Button
                          onClick={(event) => {
                            event.preventDefault();
                            dispatch(deleteCourse(course._id));
                          }}
                          variant="danger"
                          className="float-end"
                          id="wd-delete-course-click"
                        >
                          Delete
                        </Button>
                        <Button
                          onClick={(event) => {
                            event.preventDefault();
                            dispatch(setCourse(course));
                          }}
                          variant="warning"
                          className="float-end me-2"
                          id="wd-edit-course-click"
                        >
                          Edit
                        </Button>
                      </>
                    )}

                    {/* Enroll/Unenroll buttons for Students - ALWAYS SHOW */}
                    {!isFaculty && (
                      <>
                        {isEnrolled(course._id) ? (
                          <Button
                            onClick={(event) => {
                              event.preventDefault();
                              handleUnenroll(course._id);
                            }}
                            variant="danger"
                            className="float-end"
                          >
                            Unenroll
                          </Button>
                        ) : (
                          <Button
                            onClick={(event) => {
                              event.preventDefault();
                              handleEnroll(course._id);
                            }}
                            variant="success"
                            className="float-end"
                          >
                            Enroll
                          </Button>
                        )}
                      </>
                    )}
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}