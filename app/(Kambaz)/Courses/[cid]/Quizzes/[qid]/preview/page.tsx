"use client"

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Form, Card } from "react-bootstrap";
import * as quizzesClient from "../../client";

export default function QuizPreview() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<any>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetchQuizData();
  }, []);

  const fetchQuizData = async () => {
    const quizData = await quizzesClient.findQuizById(qid as string);
    const questionsData = await quizzesClient.findQuestionsForQuiz(qid as string);
    setQuiz(quizData);
    setQuestions(questionsData);
  };

  const handleAnswerChange = (questionId: string, answer: any) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = () => {
    let calculatedScore = 0;
    questions.forEach((question) => {
      const userAnswer = answers[question._id];
      if (question.type === "multiple-choice") {
        const correctChoice = question.choices.find((c: any) => c.isCorrect);
        if (userAnswer === correctChoice?.text) {
          calculatedScore += question.points;
        }
      } else if (question.type === "true-false") {
        if (userAnswer === question.correctAnswer) {
          calculatedScore += question.points;
        }
      } else if (question.type === "fill-in-blank") {
        const correctAnswers = question.correctAnswer.split(",").map((a: string) => a.trim().toLowerCase());
        if (correctAnswers.includes(userAnswer?.toLowerCase())) {
          calculatedScore += question.points;
        }
      }
    });
    setScore(calculatedScore);
    setShowResults(true);
  };

  const isCorrect = (question: any) => {
    const userAnswer = answers[question._id];
    if (question.type === "multiple-choice") {
      const correctChoice = question.choices.find((c: any) => c.isCorrect);
      return userAnswer === correctChoice?.text;
    } else if (question.type === "true-false") {
      return userAnswer === question.correctAnswer;
    } else if (question.type === "fill-in-blank") {
      const correctAnswers = question.correctAnswer.split(",").map((a: string) => a.trim().toLowerCase());
      return correctAnswers.includes(userAnswer?.toLowerCase());
    }
    return false;
  };

  const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);

  if (!quiz) return <div>Loading...</div>;

  return (
    <div id="wd-quiz-preview">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>{quiz.title} - Preview</h2>
        <Button variant="secondary" onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}`)}>
          Back to Details
        </Button>
      </div>

      {showResults && (
        <Card className="mb-3 bg-light">
          <Card.Body>
            <h4>Preview Results</h4>
            <p>Score: {score} / {totalPoints}</p>
            <p>Percentage: {((score / totalPoints) * 100).toFixed(2)}%</p>
          </Card.Body>
        </Card>
      )}

      {questions.map((question, index) => (
        <Card key={question._id} className={`mb-3 ${showResults ? (isCorrect(question) ? 'border-success' : 'border-danger') : ''}`}>
          <Card.Body>
            <div className="d-flex justify-content-between">
              <h5>Question {index + 1}</h5>
              <span>{question.points} pts</span>
            </div>
            <p>{question.question}</p>

            {question.type === "multiple-choice" && (
              <Form>
                {question.choices.map((choice: any, idx: number) => (
                  <Form.Check
                    key={idx}
                    type="radio"
                    label={choice.text}
                    name={`question-${question._id}`}
                    value={choice.text}
                    checked={answers[question._id] === choice.text}
                    onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                    disabled={showResults}
                  />
                ))}
              </Form>
            )}

            {question.type === "true-false" && (
              <Form>
                <Form.Check
                  type="radio"
                  label="True"
                  name={`question-${question._id}`}
                  value="true"
                  checked={answers[question._id] === "true"}
                  onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                  disabled={showResults}
                />
                <Form.Check
                  type="radio"
                  label="False"
                  name={`question-${question._id}`}
                  value="false"
                  checked={answers[question._id] === "false"}
                  onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                  disabled={showResults}
                />
              </Form>
            )}

            {question.type === "fill-in-blank" && (
              <Form.Control
                type="text"
                value={answers[question._id] || ""}
                onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                disabled={showResults}
                placeholder="Enter your answer"
              />
            )}

            {showResults && (
              <div className={`mt-2 ${isCorrect(question) ? 'text-success' : 'text-danger'}`}>
                {isCorrect(question) ? "✓ Correct" : "✗ Incorrect"}
              </div>
            )}
          </Card.Body>
        </Card>
      ))}

      {!showResults && (
        <Button variant="primary" onClick={handleSubmit}>
          Submit Preview
        </Button>
      )}

      {showResults && (
        <Button variant="secondary" onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/edit`)}>
          Edit Quiz
        </Button>
      )}
    </div>
  );
}