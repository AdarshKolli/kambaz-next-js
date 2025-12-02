"use client"

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Card, Alert } from "react-bootstrap";
import * as quizzesClient from "../../client";

export default function QuizResults() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [latestAttempt, setLatestAttempt] = useState<any>(null);

  useEffect(() => {
    fetchResultsData();
  }, []);

  const fetchResultsData = async () => {
    const quizData = await quizzesClient.findQuizById(qid as string);
    const questionsData = await quizzesClient.findQuestionsForQuiz(qid as string);
    const attemptData = await quizzesClient.findLatestAttempt(qid as string);
    
    setQuiz(quizData);
    setQuestions(questionsData);
    setLatestAttempt(attemptData);
  };

  if (!quiz || !latestAttempt) return <div>Loading...</div>;

  const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);
  const percentage = ((latestAttempt.score / totalPoints) * 100).toFixed(2);

  const getQuestionById = (questionId: string) => {
    return questions.find((q) => q._id === questionId);
  };

  return (
    <div id="wd-quiz-results">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>{quiz.title} - Results</h2>
        <Button variant="secondary" onClick={() => router.push(`/Courses/${cid}/Quizzes`)}>
          Back to Quizzes
        </Button>
      </div>

      <Alert variant="info">
        <h4>Your Score: {latestAttempt.score} / {totalPoints}</h4>
        <p>Percentage: {percentage}%</p>
        <p>Attempt: {latestAttempt.attempt}</p>
        <p>Submitted: {new Date(latestAttempt.submittedAt).toLocaleString()}</p>
      </Alert>

      {quiz.showCorrectAnswers === "Immediately" && (
        <>
          <h4>Question Results</h4>
          {latestAttempt.answers.map((answer: any, index: number) => {
            const question = getQuestionById(answer.questionId);
            if (!question) return null;

            return (
              <Card key={answer.questionId} className={`mb-3 ${answer.isCorrect ? 'border-success' : 'border-danger'}`}>
                <Card.Body>
                  <div className="d-flex justify-content-between">
                    <h5>Question {index + 1}</h5>
                    <span>{question.points} pts</span>
                  </div>
                  <p>{question.question}</p>

                  {question.type === "multiple-choice" && (
                    <>
                      <p><strong>Your Answer:</strong> {answer.answer}</p>
                      {!answer.isCorrect && (
                        <p className="text-success">
                          <strong>Correct Answer:</strong> {question.choices.find((c: any) => c.isCorrect)?.text}
                        </p>
                      )}
                    </>
                  )}

                  {question.type === "true-false" && (
                    <>
                      <p><strong>Your Answer:</strong> {answer.answer}</p>
                      {!answer.isCorrect && (
                        <p className="text-success">
                          <strong>Correct Answer:</strong> {question.correctAnswer}
                        </p>
                      )}
                    </>
                  )}

                  {question.type === "fill-in-blank" && (
                    <>
                      <p><strong>Your Answer:</strong> {answer.answer}</p>
                      {!answer.isCorrect && (
                        <p className="text-success">
                          <strong>Possible Correct Answers:</strong> {question.correctAnswer}
                        </p>
                      )}
                    </>
                  )}

                  <div className={`mt-2 fw-bold ${answer.isCorrect ? 'text-success' : 'text-danger'}`}>
                    {answer.isCorrect ? "✓ Correct" : "✗ Incorrect"}
                  </div>
                </Card.Body>
              </Card>
            );
          })}
        </>
      )}

      {quiz.multipleAttempts && latestAttempt.attempt < quiz.howManyAttempts && (
        <Button variant="primary" onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/take`)}>
          Take Quiz Again
        </Button>
      )}
    </div>
  );
}