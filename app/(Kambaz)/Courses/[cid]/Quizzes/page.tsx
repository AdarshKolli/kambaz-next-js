"use client"

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, ListGroup, ListGroupItem, Dropdown } from "react-bootstrap";
import { FaPlus, FaEllipsisV, FaCheckCircle, FaBan } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { setQuizzes, deleteQuiz as deleteQuizAction } from "../../../../Labs/store/quizzesReducer";
import * as quizzesClient from "./client";
import Link from "next/link";

interface QuizzesState {
  quizzes: any[];
}

interface AccountState {
  currentUser: any;
}

export default function Quizzes() {
  const { cid } = useParams();
  const router = useRouter();
  const { quizzes } = useSelector((state: { quizzesReducer: QuizzesState }) => state.quizzesReducer);
  const { currentUser } = useSelector((state: { accountReducer: AccountState }) => state.accountReducer);
  const dispatch = useDispatch();

  const isFaculty = currentUser?.role === "FACULTY";

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
  const quizzes = await quizzesClient.findQuizzesForCourse(cid as string);
  
  // Fetch questions for each quiz to calculate total points
  const quizzesWithPoints = await Promise.all(
    quizzes.map(async (quiz: any) => {
      const questions = await quizzesClient.findQuestionsForQuiz(quiz._id);
      const totalPoints = questions.reduce((sum: number, q: any) => sum + (q.points || 0), 0);
      return { ...quiz, points: totalPoints, questionCount: questions.length };
    })
  );
  
  dispatch(setQuizzes(quizzesWithPoints));
};

  const handleAddQuiz = async () => {
    const newQuiz = {
      title: "New Quiz",
      course: cid,
      quizType: "Graded Quiz",
      points: 0,
      published: false,
    };
    const quiz = await quizzesClient.createQuizForCourse(cid as string, newQuiz);
    dispatch(setQuizzes([...quizzes, quiz]));
    router.push(`/Courses/${cid}/Quizzes/${quiz._id}`);
  };

  const handleDeleteQuiz = async (quizId: string) => {
    if (confirm("Are you sure you want to delete this quiz?")) {
      await quizzesClient.deleteQuiz(quizId);
      dispatch(deleteQuizAction(quizId));
    }
  };

  const handlePublishQuiz = async (quizId: string) => {
    const updatedQuiz = await quizzesClient.publishQuiz(quizId);
    dispatch(setQuizzes(quizzes.map((q: any) => q._id === quizId ? updatedQuiz : q)));
  };

  const getAvailabilityStatus = (quiz: any) => {
    const now = new Date();
    const availableDate = new Date(quiz.availableDate);
    const untilDate = new Date(quiz.untilDate);

    if (now < availableDate) {
      return `Not available until ${quiz.availableDate}`;
    } else if (now > untilDate) {
      return "Closed";
    } else {
      return "Available";
    }
  };

  return (
    <div id="wd-quizzes">
      {isFaculty && (
        <div className="d-flex justify-content-end mb-3">
          <Button variant="danger" onClick={handleAddQuiz}>
            <FaPlus className="me-2" />
            Quiz
          </Button>
        </div>
      )}

      {quizzes.length === 0 ? (
        <div className="text-center p-5">
          <h4>No quizzes yet</h4>
          {isFaculty && <p>Click the "+ Quiz" button to create your first quiz</p>}
        </div>
      ) : (
        <ListGroup>
          {quizzes.map((quiz: any) => (
            <ListGroupItem key={quiz._id} className="d-flex align-items-center">
              {quiz.published ? (
                <FaCheckCircle className="text-success me-3" />
              ) : (
                <FaBan className="text-danger me-3" />
              )}
              
              <div className="flex-grow-1">
                <Link
                  href={`/Courses/${cid}/Quizzes/${quiz._id}`}
                  className="fw-bold text-decoration-none"
                >
                  {quiz.title}
                </Link>
                <div className="small text-muted">
                  {getAvailabilityStatus(quiz)} | Due: {quiz.dueDate} | {quiz.points} pts | {quiz.questions?.length || 0} Questions
                </div>
              </div>

              {isFaculty && (
                <Dropdown>
                  <Dropdown.Toggle variant="light" size="sm">
                    <FaEllipsisV />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => router.push(`/Courses/${cid}/Quizzes/${quiz._id}/edit`)}>
                      Edit
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDeleteQuiz(quiz._id)}>
                      Delete
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handlePublishQuiz(quiz._id)}>
                      {quiz.published ? "Unpublish" : "Publish"}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </ListGroupItem>
          ))}
        </ListGroup>
      )}
    </div>
  );
}