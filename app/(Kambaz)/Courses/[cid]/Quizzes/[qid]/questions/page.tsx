"use client"

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, ListGroup, ListGroupItem, Form, Nav, NavItem, NavLink } from "react-bootstrap";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import * as quizzesClient from "../../client";

export default function QuestionsEditor() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const [questions, setQuestions] = useState<any[]>([]);
  const [editingQuestion, setEditingQuestion] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("questions");

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    const questionsData = await quizzesClient.findQuestionsForQuiz(qid as string);
    setQuestions(questionsData);
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      type: "multiple-choice",
      title: "New Question",
      points: 0,
      question: "",
      choices: [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ],
    };
    setEditingQuestion(newQuestion);
  };

  const handleSaveQuestion = async () => {
    if (editingQuestion._id) {
      await quizzesClient.updateQuestion(editingQuestion);
      setQuestions(questions.map((q) => (q._id === editingQuestion._id ? editingQuestion : q)));
    } else {
      const saved = await quizzesClient.createQuestionForQuiz(qid as string, editingQuestion);
      setQuestions([...questions, saved]);
    }
    setEditingQuestion(null);
  };

  const handleDeleteQuestion = async (questionId: string) => {
    if (confirm("Are you sure you want to delete this question?")) {
      await quizzesClient.deleteQuestion(questionId);
      setQuestions(questions.filter((q) => q._id !== questionId));
    }
  };

  const handleAddChoice = () => {
    setEditingQuestion({
      ...editingQuestion,
      choices: [...editingQuestion.choices, { text: "", isCorrect: false }],
    });
  };

  const handleRemoveChoice = (index: number) => {
    const newChoices = editingQuestion.choices.filter((_: any, i: number) => i !== index);
    setEditingQuestion({ ...editingQuestion, choices: newChoices });
  };

  const handleChoiceChange = (index: number, text: string) => {
    const newChoices = editingQuestion.choices.map((choice: any, i: number) =>
      i === index ? { ...choice, text } : choice
    );
    setEditingQuestion({ ...editingQuestion, choices: newChoices });
  };

  const handleCorrectChoiceChange = (index: number) => {
    const newChoices = editingQuestion.choices.map((choice: any, i: number) => ({
      ...choice,
      isCorrect: i === index,
    }));
    setEditingQuestion({ ...editingQuestion, choices: newChoices });
  };

  useEffect(() => {
  if (activeTab === "details") {
    router.push(`/Courses/${cid}/Quizzes/${qid}/edit`);
  }
}, [activeTab]);

  const totalPoints = questions.reduce((sum, q) => sum + (q.points || 0), 0);

  return (
    <div id="wd-questions-editor">
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

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Total Points: {totalPoints}</h4>
        <Button variant="danger" onClick={handleAddQuestion}>
          <FaPlus className="me-2" />
          New Question
        </Button>
      </div>

      {editingQuestion && (
        <div className="border p-3 mb-3">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Question Type</Form.Label>
              <Form.Select
                value={editingQuestion.type}
                onChange={(e) => setEditingQuestion({ ...editingQuestion, type: e.target.value })}
              >
                <option value="multiple-choice">Multiple Choice</option>
                <option value="true-false">True/False</option>
                <option value="fill-in-blank">Fill in the Blank</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={editingQuestion.title}
                onChange={(e) => setEditingQuestion({ ...editingQuestion, title: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Points</Form.Label>
              <Form.Control
                type="number"
                value={editingQuestion.points || 0}
                onChange={(e) => setEditingQuestion({ ...editingQuestion, points: parseInt(e.target.value) || 0 })}/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Question</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={editingQuestion.question}
                onChange={(e) => setEditingQuestion({ ...editingQuestion, question: e.target.value })}
              />
            </Form.Group>

            {editingQuestion.type === "multiple-choice" && (
              <>
                <Form.Label>Choices</Form.Label>
                {editingQuestion.choices.map((choice: any, index: number) => (
                  <div key={index} className="d-flex align-items-center mb-2">
                    <Form.Check
                      type="radio"
                      name="correctChoice"
                      checked={choice.isCorrect}
                      onChange={() => handleCorrectChoiceChange(index)}
                      className="me-2"
                    />
                    <Form.Control
                      type="text"
                      value={choice.text}
                      onChange={(e) => handleChoiceChange(index, e.target.value)}
                      className="me-2"
                    />
                    <Button variant="danger" size="sm" onClick={() => handleRemoveChoice(index)}>
                      <FaTrash />
                    </Button>
                  </div>
                ))}
                <Button variant="secondary" size="sm" onClick={handleAddChoice}>
                  Add Choice
                </Button>
              </>
            )}

            {editingQuestion.type === "true-false" && (
              <Form.Group className="mb-3">
                <Form.Label>Correct Answer</Form.Label>
                <Form.Check
                  type="radio"
                  label="True"
                  name="truefalse"
                  checked={editingQuestion.correctAnswer === "true"}
                  onChange={() => setEditingQuestion({ ...editingQuestion, correctAnswer: "true" })}
                />
                <Form.Check
                  type="radio"
                  label="False"
                  name="truefalse"
                  checked={editingQuestion.correctAnswer === "false"}
                  onChange={() => setEditingQuestion({ ...editingQuestion, correctAnswer: "false" })}
                />
              </Form.Group>
            )}

            {editingQuestion.type === "fill-in-blank" && (
              <Form.Group className="mb-3">
                <Form.Label>Correct Answer(s)</Form.Label>
                <Form.Control
                  type="text"
                  value={editingQuestion.correctAnswer || ""}
                  onChange={(e) => setEditingQuestion({ ...editingQuestion, correctAnswer: e.target.value })}
                  placeholder="Enter possible correct answers separated by commas"
                />
              </Form.Group>
            )}

            <div className="d-flex gap-2">
              <Button variant="secondary" onClick={() => setEditingQuestion(null)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSaveQuestion}>
                Save Question
              </Button>
            </div>
          </Form>
        </div>
      )}

      <ListGroup>
        {questions.map((question) => (
          <ListGroupItem key={question._id} className="d-flex justify-content-between align-items-center">
            <div>
              <strong>{question.title}</strong> - {question.points} pts
              <div className="small text-muted">{question.type}</div>
            </div>
            <div>
              <Button variant="warning" size="sm" className="me-2" onClick={() => setEditingQuestion(question)}>
                <FaEdit />
              </Button>
              <Button variant="danger" size="sm" onClick={() => handleDeleteQuestion(question._id)}>
                <FaTrash />
              </Button>
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}