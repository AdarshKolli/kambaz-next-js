import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizzes: [],
  quiz: {
    title: "New Quiz",
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
    published: false,
  },
  questions: [],
  question: {
    type: "multiple-choice",
    title: "",
    points: 0,
    question: "",
    choices: [],
    correctAnswer: "",
  },
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
    setQuiz: (state, action) => {
      state.quiz = action.payload;
    },
    addQuiz: (state, action) => {
      state.quizzes = [...state.quizzes, action.payload];
    },
    updateQuiz: (state, action) => {
      state.quizzes = state.quizzes.map((q: any) =>
        q._id === action.payload._id ? action.payload : q
      );
    },
    deleteQuiz: (state, action) => {
      state.quizzes = state.quizzes.filter((q: any) => q._id !== action.payload);
    },
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    setQuestion: (state, action) => {
      state.question = action.payload;
    },
    addQuestion: (state, action) => {
      state.questions = [...state.questions, action.payload];
    },
    updateQuestion: (state, action) => {
      state.questions = state.questions.map((q: any) =>
        q._id === action.payload._id ? action.payload : q
      );
    },
    deleteQuestion: (state, action) => {
      state.questions = state.questions.filter((q: any) => q._id !== action.payload);
    },
  },
});

export const {
  setQuizzes,
  setQuiz,
  addQuiz,
  updateQuiz,
  deleteQuiz,
  setQuestions,
  setQuestion,
  addQuestion,
  updateQuestion,
  deleteQuestion,
} = quizzesSlice.actions;

export default quizzesSlice.reducer;