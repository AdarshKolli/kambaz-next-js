import { createSlice } from "@reduxjs/toolkit";
import * as db from "../../(Kambaz)/Database";

const initialState = {
  courses: db.courses,
  course: {
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpeg",
    description: "New Description"
  }
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addNewCourse: (state) => {
      const newCourse = {
        ...state.course,
        _id: new Date().getTime().toString()
      };
      state.courses = [...state.courses, newCourse];
    },
    deleteCourse: (state, action) => {
      state.courses = state.courses.filter((c) => c._id !== action.payload);
    },
    updateCourse: (state) => {
      state.courses = state.courses.map((c) => {
        if (c._id === state.course._id) {
          return state.course;
        } else {
          return c;
        }
      });
    },
    setCourse: (state, action) => {
      state.course = action.payload;
    }
  }
});

export const { addNewCourse, deleteCourse, updateCourse, setCourse } = coursesSlice.actions;
export default coursesSlice.reducer;