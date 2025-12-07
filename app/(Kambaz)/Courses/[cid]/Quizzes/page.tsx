"use client"

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Dropdown } from "react-bootstrap";
import { FaEllipsisV, FaCheckCircle, FaBan } from "react-icons/fa";
import { useSelector } from "react-redux";
import * as quizzesClient from "./client";

interface AccountState {
  currentUser: any;
}

export default function Quizzes() {
  const { cid } = useParams();
  const router = useRouter();
  const { currentUser } = useSelector((state: { accountReducer: AccountState }) => state.accountReducer);
  const [quizzes, setQuizzes] = useState<any[]>([]);

  const isFaculty = currentUser?.role === "FACULTY";

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    const quizzesData = await quizzesClient.findQuizzesForCourse(cid as string);
    
    const quizzesWithQuestions = await Promise.all(
      quizzesData.map(async (quiz: any) => {
        const questions = await quizzesClient.findQuestionsForQuiz(quiz._id);
        const totalPoints = questions.reduce((sum: number, q: any) => sum + (q.points || 0), 0);
        
        // Fetch latest attempt for students
        let latestAttempt = null;
        if (!isFaculty) {
          try {
            latestAttempt = await quizzesClient.findLatestAttempt(quiz._id);
          } catch (error) {
            // No attempt yet
          }
        }
        
        return {
          ...quiz,
          questionCount: questions.length,
          totalPoints: totalPoints,
          latestAttempt: latestAttempt,
        };
      })
    );
    
    const filteredQuizzes = isFaculty 
      ? quizzesWithQuestions 
      : quizzesWithQuestions.filter((q: any) => q.published);

    // Sort by due date in ascending order
    const sortedQuizzes = filteredQuizzes.sort((a: any, b: any) => {
      const dueDateA = new Date(a.dueDate).getTime();
      const dueDateB = new Date(b.dueDate).getTime();
      return dueDateA - dueDateB;
    });

    setQuizzes(sortedQuizzes);
  };

  const handleAddQuiz = async () => {
    const newQuiz = {
      title: "New Quiz",
      course: cid,
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
      dueDate: new Date().toISOString().split('T')[0],
      availableDate: new Date().toISOString().split('T')[0],
      untilDate: new Date().toISOString().split('T')[0],
      published: false,
    };
    const createdQuiz = await quizzesClient.createQuizForCourse(cid as string, newQuiz);
    fetchQuizzes();
    router.push(`/Courses/${cid}/Quizzes/${createdQuiz._id}/edit`);
  };

  const handleDeleteQuiz = async (quizId: string, e: any) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this quiz?")) {
      await quizzesClient.deleteQuiz(quizId);
      fetchQuizzes();
    }
  };

  const handlePublishQuiz = async (quizId: string, e: any) => {
    e.stopPropagation();
    await quizzesClient.publishQuiz(quizId);
    fetchQuizzes();
  };

  const getAvailabilityStatus = (quiz: any) => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    
    const availableDate = new Date(quiz.availableDate);
    availableDate.setHours(0, 0, 0, 0);
    
    const dueDate = new Date(quiz.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    dueDate.setDate(dueDate.getDate() + 1);
    
    const untilDate = new Date(quiz.untilDate);
    untilDate.setHours(0, 0, 0, 0);
    untilDate.setDate(untilDate.getDate() + 1);

    if (isFaculty) {
      if (!quiz.published) {
        return "Closed";
      }
      if (now >= dueDate) {
        return "Closed";
      }
      return "Available";
    }

    if (!quiz.published) {
      return "Closed";
    }

    if (now < availableDate) {
      return `Not available until ${quiz.availableDate}`;
    } else if (now >= dueDate) {
      return "Closed";
    } else if (now >= untilDate) {
      return "Closed";
    } else {
      return "Available";
    }
  };

  const isPastDueDate = (quiz: any) => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const dueDate = new Date(quiz.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    dueDate.setDate(dueDate.getDate() + 1);
    return now >= dueDate;
  };

  const getQuizBorderStyle = (quiz: any) => {
    if (isFaculty) return {};
    if (quiz.latestAttempt) return { borderLeft: "4px solid #28a745" };
    if (isPastDueDate(quiz)) return { borderLeft: "4px solid #dc3545" };
    return {};
  };

  return (
    <div id="wd-quizzes" className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Quizzes</h2>
        {isFaculty && (
          <Button variant="danger" onClick={handleAddQuiz}>
            + Quiz
          </Button>
        )}
      </div>

      {quizzes.length === 0 && (
        <div className="text-center p-5 border rounded bg-light">
          <p className="text-muted mb-0">
            No quizzes yet. {isFaculty && "Click '+ Quiz' to create one!"}
          </p>
        </div>
      )}

      {quizzes.length > 0 && (
        <div className="border rounded">
          {quizzes.map((quiz, index) => (
            <div 
              key={quiz._id}
              className={`d-flex justify-content-between align-items-center p-3 ${
                index !== quizzes.length - 1 ? 'border-bottom' : ''
              }`}
              style={{ cursor: "pointer", ...getQuizBorderStyle(quiz) }}
              onClick={() => router.push(`/Courses/${cid}/Quizzes/${quiz._id}`)}
            >
              <div className="flex-grow-1">
                <div className="d-flex align-items-center mb-2">
                  {!isFaculty ? (
                    !quiz.latestAttempt && isPastDueDate(quiz) ? (
                      <span className="me-3 fs-4">⚠️</span>
                    ) : quiz.published ? (
                      <FaCheckCircle className="text-success me-3 fs-5" />
                    ) : (
                      <FaBan className="text-danger me-3 fs-5" />
                    )
                  ) : (
                    quiz.published ? (
                      <FaCheckCircle className="text-success me-3 fs-5" />
                    ) : (
                      <FaBan className="text-danger me-3 fs-5" />
                    )
                  )}
                  <h5 className="mb-0">{quiz.title}</h5>
                </div>
                <div className="text-muted small" style={{ marginLeft: "2.5rem" }}>
                  <span className="fw-semibold">{getAvailabilityStatus(quiz)}</span>
                  <span className="mx-2">|</span>
                  <span><strong>Due</strong> {quiz.dueDate}</span>
                  <span className="mx-2">|</span>
                  <span>{quiz.totalPoints} pts</span>
                  <span className="mx-2">|</span>
                  <span>{quiz.questionCount} Questions</span>
                  {!isFaculty && (
                    <>
                      <span className="mx-2">|</span>
                      {quiz.latestAttempt ? (
                        <>
                          <span className="text-success fw-semibold">Attempted</span>
                          <span className="mx-2">|</span>
                          <span className="fw-bold">Score: {quiz.latestAttempt.score}/{quiz.totalPoints}</span>
                        </>
                      ) : isPastDueDate(quiz) ? (
                        <>
                          <span className="text-danger fw-semibold">Not Attempted</span>
                          <span className="mx-2">|</span>
                          <span className="fw-bold text-danger">Score: 0/{quiz.totalPoints}</span>
                        </>
                      ) : (
                        <span className="text-muted fw-semibold">Not Attempted</span>
                      )}
                    </>
                  )}
                </div>
              </div>

              {isFaculty && (
                <Dropdown onClick={(e) => e.stopPropagation()}>
                  <Dropdown.Toggle variant="link" className="text-dark p-0">
                    <FaEllipsisV />
                  </Dropdown.Toggle>
                  <Dropdown.Menu align="end">
                    <Dropdown.Item onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/Courses/${cid}/Quizzes/${quiz._id}/edit`);
                    }}>
                      Edit
                    </Dropdown.Item>
                    <Dropdown.Item onClick={(e) => handleDeleteQuiz(quiz._id, e)}>
                      Delete
                    </Dropdown.Item>
                    <Dropdown.Item onClick={(e) => handlePublishQuiz(quiz._id, e)}>
                      {quiz.published ? "Unpublish" : "Publish"}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}