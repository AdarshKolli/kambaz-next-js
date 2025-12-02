"use client"

import React, { useEffect, useState } from "react";
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
import { setCourses, setCourse } from "../../Labs/store/coursesReducer";
import * as coursesClient from "../Courses/client";

interface CoursesState {
  courses: any[];
  course: any;
}

interface AccountState {
  currentUser: any;
}

export default function Dashboard() {
  const { courses, course } = useSelector((state: { coursesReducer: CoursesState }) => state.coursesReducer);
  const { currentUser } = useSelector((state: { accountState: AccountState }) => state.accountReducer);
  const dispatch = useDispatch();

  const [showAllCourses, setShowAllCourses] = useState(false);
  const [allCourses, setAllCourses] = useState<any[]>([]);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([]);
  const isFaculty = currentUser?.role === "FACULTY";

  const fetchCourses = async () => {
    try {
      const courses = await coursesClient.findMyCourses();
      dispatch(setCourses(courses));
      // Extract enrolled course IDs from the courses returned
      setEnrolledCourseIds(courses.map((c: any) => c._id));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAllCourses = async () => {
    try {
      const allCourses = await coursesClient.fetchAllCourses();
      setAllCourses(allCourses);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchAllCourses();
  }, [currentUser]);

  const isEnrolled = (courseId: string) => {
    return enrolledCourseIds.includes(courseId);
  };

  const displayedCourses = showAllCourses ? allCourses : courses;

  const handleEnroll = async (courseId: string) => {
    if (currentUser) {
      try {
        await coursesClient.enrollInCourse("current", courseId);
        setEnrolledCourseIds([...enrolledCourseIds, courseId]);
        // Refresh enrolled courses
        fetchCourses();
      } catch (error) {
        console.error("Error enrolling:", error);
      }
    }
  };

  const handleUnenroll = async (courseId: string) => {
    if (currentUser) {
      try {
        await coursesClient.unenrollFromCourse("current", courseId);
        setEnrolledCourseIds(enrolledCourseIds.filter(id => id !== courseId));
        // Refresh enrolled courses
        fetchCourses();
      } catch (error) {
        console.error("Error unenrolling:", error);
      }
    }
  };

  const onAddNewCourse = async () => {
    const newCourse = await coursesClient.createCourse(course);
    dispatch(setCourses([...courses, newCourse]));
  };

  const onDeleteCourse = async (courseId: string) => {
    await coursesClient.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((c: any) => c._id !== courseId)));
  };

  const onUpdateCourse = async () => {
    await coursesClient.updateCourse(course);
    dispatch(setCourses(
      courses.map((c: any) => {
        if (c._id === course._id) { 
          return course; 
        } else { 
          return c; 
        }
      })
    ));
  };

  return (
    <div id="wd-dashboard" className="p-4">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      {!isFaculty && currentUser && (
        <div className="d-flex justify-content-end mb-3">
          <Button
            variant="primary"
            onClick={() => setShowAllCourses(!showAllCourses)}
          >
            {showAllCourses ? "My Enrollments" : "Enrollments"}
          </Button>
        </div>
      )}
      
      {isFaculty && (
        <>
          <h5>
            New Course
            <Button
              variant="warning"
              className="float-end me-2"
              id="wd-update-course-click"
              onClick={onUpdateCourse}
            >
              Update
            </Button>
            <Button
              variant="primary"
              className="float-end me-2"
              id="wd-add-new-course-click"
              onClick={onAddNewCourse}
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
                    
                    {(isFaculty || isEnrolled(course._id)) && (
                      <Button variant="primary">Go</Button>
                    )}
                    
                    {isFaculty && (
                      <>
                        <Button
                          onClick={(event) => {
                            event.preventDefault();
                            onDeleteCourse(course._id);
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