"use client"

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Form, Card, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import * as quizzesClient from "../../client";

interface AccountState {
  currentUser: any;
}

export default function TakeQuiz() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const { currentUser } = useSelector((state: { accountReducer: AccountState }) => state.accountReducer);
  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<any>({});
  const [attempts, setAttempts] = useState<any[]>([]);
  const [canTakeQuiz, setCanTakeQuiz] = useState(true);

  useEffect(() => {
    fetchQuizData();
    fetchAttempts();
  }, []);

  const fetchQuizData = async () => {
    const quizData = await quizzesClient.findQuizById(qid as string);
    const questionsData = await quizzesClient.findQuestionsForQuiz(qid as string);
    setQuiz(quizData);
    setQuestions(quizData.shuffleAnswers ? shuffleArray(questionsData) : questionsData);
  };

const fetchAttempts = async () => {
  try {
    const attemptsData = await quizzesClient.findAttemptsForQuiz(qid as string);
    setAttempts(attemptsData);
  } catch (error) {
    // No attempts yet
  }
};

  const shuffleArray = (array: any[]) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const handleAnswerChange = (questionId: string, answer: any) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = async () => {
    if (!currentUser) {
      alert("Please sign in to submit quiz");
      return;
    }

    let calculatedScore = 0;
    const answersArray = questions.map((question) => {
      const userAnswer = answers[question._id];
      let isCorrect = false;

      if (question.type === "multiple-choice") {
        const correctChoice = question.choices.find((c: any) => c.isCorrect);
        isCorrect = userAnswer === correctChoice?.text;
      } else if (question.type === "true-false") {
        isCorrect = userAnswer === question.correctAnswer;
      } else if (question.type === "fill-in-blank") {
        const correctAnswers = question.correctAnswer.split(",").map((a: string) => a.trim().toLowerCase());
        isCorrect = correctAnswers.includes(userAnswer?.toLowerCase());
      }

      if (isCorrect) {
        calculatedScore += question.points;
      }

      return {
        questionId: question._id,
        answer: userAnswer,
        isCorrect,
      };
    });

    const attempt = {
      attempt: attempts.length + 1,
      score: calculatedScore,
      answers: answersArray,
    };

    await quizzesClient.submitQuizAttempt(qid as string, attempt);
    router.push(`/Courses/${cid}/Quizzes/${qid}/results`);
  };

  if (!quiz) return <div>Loading...</div>;

  if (!canTakeQuiz) {
    return (
      <div>
        <Alert variant="warning">
          You have exhausted all attempts for this quiz.
        </Alert>
        <Button onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}`)}>
          Back to Quiz Details
        </Button>
      </div>
    );
  }

  return (
    <div id="wd-take-quiz">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>{quiz.title}</h2>
        <div>
          <span className="me-3">Attempt {attempts.length + 1} of {quiz.howManyAttempts}</span>
          <span>Time Limit: {quiz.timeLimit} minutes</span>
        </div>
      </div>

      {quiz.accessCode && (
        <Alert variant="info">
          Access Code Required: Please enter the access code to continue.
        </Alert>
      )}

      {questions.map((question, index) => (
        <Card key={question._id} className="mb-3">
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
                />
                <Form.Check
                  type="radio"
                  label="False"
                  name={`question-${question._id}`}
                  value="false"
                  checked={answers[question._id] === "false"}
                  onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                />
              </Form>
            )}

            {question.type === "fill-in-blank" && (
              <Form.Control
                type="text"
                value={answers[question._id] || ""}
                onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                placeholder="Enter your answer"
              />
            )}
          </Card.Body>
        </Card>
      ))}

      <div className="d-flex gap-2">
        <Button variant="secondary" onClick={() => router.push(`/Courses/${cid}/Quizzes`)}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Submit Quiz
        </Button>
      </div>
    </div>
  );
}