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
  const [noAttempt, setNoAttempt] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResultsData();
  }, []);

  const fetchResultsData = async () => {
    try {
      const quizData = await quizzesClient.findQuizById(qid as string);
      const questionsData = await quizzesClient.findQuestionsForQuiz(qid as string);
      
      setQuiz(quizData);
      setQuestions(questionsData);
      
      try {
        const attemptData = await quizzesClient.findLatestAttempt(qid as string);
        setLatestAttempt(attemptData);
        setNoAttempt(false);
      } catch (error) {
        // No attempt - student never took the quiz
        setNoAttempt(true);
      }
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching results:", error);
      setLoading(false);
    }
  };

  if (loading) return <div className="p-3">Loading...</div>;
  if (!quiz) return <div className="p-3">Quiz not found</div>;

  const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);

  // Handle case where student never attempted the quiz
  if (noAttempt) {
    return (
      <div id="wd-quiz-results" className="p-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>{quiz.title} - Results</h2>
          <Button variant="secondary" onClick={() => router.push(`/Courses/${cid}/Quizzes`)}>
            Back to Quizzes
          </Button>
        </div>

        <Alert variant="danger">
          <h4>Your Score: 0 / {totalPoints}</h4>
          <p>Percentage: 0%</p>
          <p>Status: Not Attempted</p>
          <p>You did not attempt this quiz before the due date.</p>
        </Alert>

        <h4 className="mb-3">Question Results</h4>
        {questions.map((question, index) => (
          <Card key={question._id} className="mb-3 border-danger">
            <Card.Body>
              <div className="d-flex justify-content-between">
                <h5>Question {index + 1}</h5>
                <span>{question.points} pts</span>
              </div>
              <p>{question.question}</p>

              <p><strong>Your Answer:</strong> <span className="text-muted">Not Answered</span></p>

              {question.type === "multiple-choice" && (
                <p className="text-success">
                  <strong>Correct Answer:</strong> {question.choices.find((c: any) => c.isCorrect)?.text}
                </p>
              )}

              {question.type === "true-false" && (
                <p className="text-success">
                  <strong>Correct Answer:</strong> {question.correctAnswer}
                </p>
              )}

              {question.type === "fill-in-blank" && (
                <p className="text-success">
                  <strong>Possible Correct Answers:</strong> {question.correctAnswer}
                </p>
              )}

              <div className="mt-2 fw-bold text-danger">
                ✗ Incorrect (0/{question.points} pts)
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  }

  // Normal case - student attempted the quiz
  if (!latestAttempt) return <div className="p-3">Loading attempt data...</div>;

  const percentage = ((latestAttempt.score / totalPoints) * 100).toFixed(2);

  const getQuestionById = (questionId: string) => {
    return questions.find((q) => q._id === questionId);
  };

  const isPastDueDate = () => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const dueDate = new Date(quiz.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    dueDate.setDate(dueDate.getDate() + 1);
    return now >= dueDate;
  };

  return (
    <div id="wd-quiz-results" className="p-3">
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
          <h4 className="mb-3">Question Results</h4>
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
                      <p><strong>Your Answer:</strong> {answer.answer || <span className="text-muted">Not Answered</span>}</p>
                      {!answer.isCorrect && (
                        <p className="text-success">
                          <strong>Correct Answer:</strong> {question.choices.find((c: any) => c.isCorrect)?.text}
                        </p>
                      )}
                    </>
                  )}

                  {question.type === "true-false" && (
                    <>
                      <p><strong>Your Answer:</strong> {answer.answer || <span className="text-muted">Not Answered</span>}</p>
                      {!answer.isCorrect && (
                        <p className="text-success">
                          <strong>Correct Answer:</strong> {question.correctAnswer}
                        </p>
                      )}
                    </>
                  )}

                  {question.type === "fill-in-blank" && (
                    <>
                      <p><strong>Your Answer:</strong> {answer.answer || <span className="text-muted">Not Answered</span>}</p>
                      {!answer.isCorrect && (
                        <p className="text-success">
                          <strong>Possible Correct Answers:</strong> {question.correctAnswer}
                        </p>
                      )}
                    </>
                  )}

                  <div className={`mt-2 fw-bold ${answer.isCorrect ? 'text-success' : 'text-danger'}`}>
                    {answer.isCorrect ? `✓ Correct (${question.points}/${question.points} pts)` : `✗ Incorrect (0/${question.points} pts)`}
                  </div>
                </Card.Body>
              </Card>
            );
          })}
        </>
      )}

      {!isPastDueDate() && quiz.multipleAttempts && latestAttempt.attempt < quiz.howManyAttempts && (
        <Button variant="primary" onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/take`)}>
          Take Quiz Again
        </Button>
      )}
    </div>
  );
}