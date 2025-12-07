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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    await fetchQuizData();
    await fetchAttempts();
    setLoading(false);
  };

  const fetchQuizData = async () => {
    const quizData = await quizzesClient.findQuizById(qid as string);
    const questionsData = await quizzesClient.findQuestionsForQuiz(qid as string);
    setQuiz(quizData);
    setQuestions(quizData.shuffleAnswers ? shuffleArray(questionsData) : questionsData);
    return quizData;
  };

  const fetchAttempts = async () => {
    try {
      const attemptsData = await quizzesClient.findAttemptsForQuiz(qid as string);
      setAttempts(attemptsData);
      
      const quizData = quiz || await quizzesClient.findQuizById(qid as string);
      
      // Check if past due date (start of next day)
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      const dueDate = new Date(quizData.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      dueDate.setDate(dueDate.getDate() + 1); // Closes at start of next day
      
      if (now >= dueDate && attemptsData.length === 0) {
        // Past due date with no attempts - auto submit with score 0
        const zeroAttempt = {
          attempt: 1,
          score: 0,
          answers: [],
          submittedAt: new Date().toISOString(),
        };
        await quizzesClient.submitQuizAttempt(qid as string, zeroAttempt);
        router.push(`/Courses/${cid}/Quizzes/${qid}/results`);
        return;
      } else if (now >= dueDate && attemptsData.length > 0) {
        // Past due date with attempts - redirect to results
        router.push(`/Courses/${cid}/Quizzes/${qid}/results`);
        return;
      }
      
      // Check if student has exhausted attempts
      if (!quizData.multipleAttempts && attemptsData.length >= 1) {
        router.push(`/Courses/${cid}/Quizzes/${qid}/results`);
        return;
      } else if (quizData.multipleAttempts && attemptsData.length >= quizData.howManyAttempts) {
        router.push(`/Courses/${cid}/Quizzes/${qid}/results`);
        return;
      }
    } catch (error) {
      // No attempts yet - check due date
      const quizData = quiz || await quizzesClient.findQuizById(qid as string);
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      const dueDate = new Date(quizData.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      dueDate.setDate(dueDate.getDate() + 1); // Closes at start of next day
      
      if (now >= dueDate) {
        // Past due date with no attempts - auto submit with score 0
        const zeroAttempt = {
          attempt: 1,
          score: 0,
          answers: [],
          submittedAt: new Date().toISOString(),
        };
        await quizzesClient.submitQuizAttempt(qid as string, zeroAttempt);
        router.push(`/Courses/${cid}/Quizzes/${qid}/results`);
      }
    }
  };

  const shuffleArray = (array: any[]) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers((prev: any) => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmit = async () => {
    if (!currentUser) {
      alert("Please sign in to submit quiz");
      return;
    }

    // Check due date before submitting (start of next day)
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const dueDate = new Date(quiz.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    dueDate.setDate(dueDate.getDate() + 1); // Closes at start of next day
    
    if (now >= dueDate) {
      alert("This quiz is past the due date and can no longer be submitted.");
      router.push(`/Courses/${cid}/Quizzes`);
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
  const correctAnswers = question.correctAnswers || 
    (question.correctAnswer ? question.correctAnswer.split(",").map((a: string) => a.trim()) : []);
  
  const isCaseSensitive = question.caseSensitive || false;
  
  if (isCaseSensitive) {
    isCorrect = correctAnswers.includes(userAnswer);
  } else {
    isCorrect = correctAnswers.some((ans: string) => 
      ans.toLowerCase() === userAnswer?.toLowerCase()
    );
  }
  
  earnedPoints = isCorrect ? question.points : 0;
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
      submittedAt: new Date().toISOString(),
    };

    await quizzesClient.submitQuizAttempt(qid as string, attempt);
    router.push(`/Courses/${cid}/Quizzes/${qid}/results`);
  };

  if (loading || !quiz) return <div>Loading...</div>;

  return (
    <div id="wd-take-quiz" className="p-3">
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
                  <div key={`${question._id}-${idx}`} className="mb-2">
                    <Form.Check
                      type="radio"
                      id={`q-${question._id}-c-${idx}`}
                      label={choice.text}
                      name={`question-${question._id}`}
                      checked={answers[question._id] === choice.text}
                      onChange={() => handleAnswerChange(question._id, choice.text)}
                    />
                  </div>
                ))}
              </Form>
            )}

            {question.type === "true-false" && (
              <Form>
                <div className="mb-2">
                  <Form.Check
                    type="radio"
                    id={`q-${question._id}-true`}
                    label="True"
                    name={`question-${question._id}`}
                    checked={answers[question._id] === "True"}
                    onChange={() => handleAnswerChange(question._id, "True")}
                  />
                </div>
                <div className="mb-2">
                  <Form.Check
                    type="radio"
                    id={`q-${question._id}-false`}
                    label="False"
                    name={`question-${question._id}`}
                    checked={answers[question._id] === "False"}
                    onChange={() => handleAnswerChange(question._id, "False")}
                  />
                </div>
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