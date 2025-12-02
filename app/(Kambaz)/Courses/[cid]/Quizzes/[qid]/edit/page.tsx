"use client"

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Form, Nav, NavItem, NavLink } from "react-bootstrap";
import * as quizzesClient from "../../client";

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("details");
  const [quiz, setQuiz] = useState<any>({
    title: "",
    description: "",
    quizType: "Graded Quiz",
    points: 0,
    assignmentGroup: "Quizzes",
    shuffleAnswers: true,
    timeLimit: 20,
    multipleAttempts: false,
    howManyAttempts: 1,
    showCorrectAnswers: "Immediately",
    accessCode: "",
    oneQuestionAtTime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    dueDate: "",
    availableDate: "",
    untilDate: "",
  });

  useEffect(() => {
    if (qid !== "new") {
      fetchQuiz();
    }
  }, []);

  const fetchQuiz = async () => {
    const quizData = await quizzesClient.findQuizById(qid as string);
    setQuiz(quizData);
  };

  const handleSave = async () => {
    if (qid === "new") {
      await quizzesClient.createQuizForCourse(cid as string, quiz);
    } else {
      await quizzesClient.updateQuiz({ ...quiz, _id: qid });
    }
    router.push(`/Courses/${cid}/Quizzes/${qid}`);
  };

  const handleSaveAndPublish = async () => {
    const updatedQuiz = { ...quiz, published: true };
    if (qid === "new") {
      await quizzesClient.createQuizForCourse(cid as string, updatedQuiz);
    } else {
      await quizzesClient.updateQuiz({ ...updatedQuiz, _id: qid });
    }
    router.push(`/Courses/${cid}/Quizzes`);
  };

  const handleCancel = () => {
    router.push(`/Courses/${cid}/Quizzes`);
  };

  useEffect(() => {
  if (activeTab === "questions") {
    router.push(`/Courses/${cid}/Quizzes/${qid}/questions`);
  }
}, [activeTab]);

  return (
    <div id="wd-quiz-editor">
      <Nav variant="tabs" className="mb-3">
        <NavItem>
          <NavLink active={activeTab === "details"} onClick={() => setActiveTab("details")}>
            Details
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={activeTab === "questions"} onClick={() => setActiveTab("questions")}>
            Questions
          </NavLink>
        </NavItem>
      </Nav>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={quiz.title}
            onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={quiz.description}
            onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Quiz Type</Form.Label>
          <Form.Select
            value={quiz.quizType}
            onChange={(e) => setQuiz({ ...quiz, quizType: e.target.value })}
          >
            <option>Graded Quiz</option>
            <option>Practice Quiz</option>
            <option>Graded Survey</option>
            <option>Ungraded Survey</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Assignment Group</Form.Label>
          <Form.Select
            value={quiz.assignmentGroup}
            onChange={(e) => setQuiz({ ...quiz, assignmentGroup: e.target.value })}
          >
            <option>Quizzes</option>
            <option>Exams</option>
            <option>Assignments</option>
            <option>Project</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Shuffle Answers"
            checked={quiz.shuffleAnswers}
            onChange={(e) => setQuiz({ ...quiz, shuffleAnswers: e.target.checked })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Time Limit (Minutes)</Form.Label>
          <Form.Control
            type="number"
            value={quiz.timeLimit}
            onChange={(e) => setQuiz({ ...quiz, timeLimit: parseInt(e.target.value) })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Allow Multiple Attempts"
            checked={quiz.multipleAttempts}
            onChange={(e) => setQuiz({ ...quiz, multipleAttempts: e.target.checked })}
          />
        </Form.Group>

        {quiz.multipleAttempts && (
          <Form.Group className="mb-3">
            <Form.Label>How Many Attempts</Form.Label>
            <Form.Control
              type="number"
              value={quiz.howManyAttempts}
              onChange={(e) => setQuiz({ ...quiz, howManyAttempts: parseInt(e.target.value) })}
            />
          </Form.Group>
        )}

        <Form.Group className="mb-3">
          <Form.Label>Show Correct Answers</Form.Label>
          <Form.Select
            value={quiz.showCorrectAnswers}
            onChange={(e) => setQuiz({ ...quiz, showCorrectAnswers: e.target.value })}
          >
            <option>Immediately</option>
            <option>After Due Date</option>
            <option>Never</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Access Code</Form.Label>
          <Form.Control
            type="text"
            value={quiz.accessCode}
            onChange={(e) => setQuiz({ ...quiz, accessCode: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="One Question at a Time"
            checked={quiz.oneQuestionAtTime}
            onChange={(e) => setQuiz({ ...quiz, oneQuestionAtTime: e.target.checked })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Webcam Required"
            checked={quiz.webcamRequired}
            onChange={(e) => setQuiz({ ...quiz, webcamRequired: e.target.checked })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Lock Questions After Answering"
            checked={quiz.lockQuestionsAfterAnswering}
            onChange={(e) => setQuiz({ ...quiz, lockQuestionsAfterAnswering: e.target.checked })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Due Date</Form.Label>
          <Form.Control
            type="date"
            value={quiz.dueDate}
            onChange={(e) => setQuiz({ ...quiz, dueDate: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Available From</Form.Label>
          <Form.Control
            type="date"
            value={quiz.availableDate}
            onChange={(e) => setQuiz({ ...quiz, availableDate: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Until</Form.Label>
          <Form.Control
            type="date"
            value={quiz.untilDate}
            onChange={(e) => setQuiz({ ...quiz, untilDate: e.target.value })}
          />
        </Form.Group>

        <div className="d-flex gap-2">
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
          <Button variant="success" onClick={handleSaveAndPublish}>
            Save & Publish
          </Button>
        </div>
      </Form>
    </div>
  );
}