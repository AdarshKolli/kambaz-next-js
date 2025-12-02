"use client"

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import * as quizzesClient from "../client";

interface AccountState {
  currentUser: any;
}

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const { currentUser } = useSelector((state: { accountReducer: AccountState }) => state.accountReducer);
  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [latestAttempt, setLatestAttempt] = useState<any>(null);

  const isFaculty = currentUser?.role === "FACULTY";

  useEffect(() => {
    fetchQuizDetails();
    fetchQuestions();
    if (!isFaculty) {
      fetchLatestAttempt();
    }
  }, []);

  const fetchQuizDetails = async () => {
    const quizData = await quizzesClient.findQuizById(qid as string);
    setQuiz(quizData);
  };

  const fetchQuestions = async () => {
    const questionsData = await quizzesClient.findQuestionsForQuiz(qid as string);
    setQuestions(questionsData);
  };

  const fetchLatestAttempt = async () => {
    try {
      const attempt = await quizzesClient.findLatestAttempt(qid as string);
      setLatestAttempt(attempt);
    } catch (error) {
      // No attempt yet
    }
  };

  const handleEdit = () => {
    router.push(`/Courses/${cid}/Quizzes/${qid}/edit`);
  };

  const handlePreview = () => {
    router.push(`/Courses/${cid}/Quizzes/${qid}/preview`);
  };

  const handleTakeQuiz = () => {
    router.push(`/Courses/${cid}/Quizzes/${qid}/take`);
  };

  if (!quiz) return <div>Loading...</div>;

  const totalPoints = questions.reduce((sum, q) => sum + (q.points || 0), 0);

  return (
    <div id="wd-quiz-details">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>{quiz.title}</h2>
        {isFaculty && (
          <div>
            <Button variant="secondary" onClick={handlePreview} className="me-2">
              Preview
            </Button>
            <Button variant="primary" onClick={handleEdit}>
              Edit
            </Button>
          </div>
        )}
      </div>

      <Card>
        <Card.Body>
          <div className="mb-3">
            <strong>Quiz Type:</strong> {quiz.quizType}
          </div>
          <div className="mb-3">
            <strong>Points:</strong> {totalPoints}
          </div>
          <div className="mb-3">
            <strong>Assignment Group:</strong> {quiz.assignmentGroup}
          </div>
          <div className="mb-3">
            <strong>Shuffle Answers:</strong> {quiz.shuffleAnswers ? "Yes" : "No"}
          </div>
          <div className="mb-3">
            <strong>Time Limit:</strong> {quiz.timeLimit} Minutes
          </div>
          <div className="mb-3">
            <strong>Multiple Attempts:</strong> {quiz.multipleAttempts ? "Yes" : "No"}
          </div>
          {quiz.multipleAttempts && (
            <div className="mb-3">
              <strong>How Many Attempts:</strong> {quiz.howManyAttempts}
            </div>
          )}
          <div className="mb-3">
            <strong>Show Correct Answers:</strong> {quiz.showCorrectAnswers}
          </div>
          <div className="mb-3">
            <strong>Access Code:</strong> {quiz.accessCode || "None"}
          </div>
          <div className="mb-3">
            <strong>One Question at a Time:</strong> {quiz.oneQuestionAtTime ? "Yes" : "No"}
          </div>
          <div className="mb-3">
            <strong>Webcam Required:</strong> {quiz.webcamRequired ? "Yes" : "No"}
          </div>
          <div className="mb-3">
            <strong>Lock Questions After Answering:</strong> {quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}
          </div>
          <div className="mb-3">
            <strong>Due Date:</strong> {quiz.dueDate}
          </div>
          <div className="mb-3">
            <strong>Available Date:</strong> {quiz.availableDate}
          </div>
          <div className="mb-3">
            <strong>Until Date:</strong> {quiz.untilDate}
          </div>
          <div className="mb-3">
            <strong>Number of Questions:</strong> {questions.length}
          </div>

          {!isFaculty && latestAttempt && (
            <div className="mb-3">
              <strong>Your Score:</strong> {latestAttempt.score} / {totalPoints}
            </div>
          )}
        </Card.Body>
      </Card>

      {!isFaculty && (
        <div className="mt-3">
          <Button variant="danger" onClick={handleTakeQuiz}>
            Take Quiz
          </Button>
        </div>
      )}
    </div>
  );
}