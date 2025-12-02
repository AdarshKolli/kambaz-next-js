import { configureStore } from "@reduxjs/toolkit";
import helloReducer from "../Lab4/ReduxExamples/HelloRedux/helloReducer";
import counterReducer from "../Lab4/ReduxExamples/CounterRedux/counterReducer";
import addReducer from "../Lab4/ReduxExamples/AddRedux/addReducer";
import todosReducer from "../Lab4/ReduxExamples/todos/todosReducer";
import coursesReducer from "./coursesReducer";
import modulesReducer from "./modulesReducer";
import accountReducer from "../../(Kambaz)/Account/reducer";
import assignmentsReducer from "./assignmentsReducer";
import enrollmentsReducer from "./enrollmentsReducer";
import quizzesReducer from "./quizzesReducer";

const store = configureStore({
  reducer: {
    helloReducer,
    counterReducer,
    addReducer,
    todosReducer,
    coursesReducer,
    modulesReducer,
    accountReducer,
    assignmentsReducer,
    enrollmentsReducer,
    quizzesReducer,
  },
});

export default store;