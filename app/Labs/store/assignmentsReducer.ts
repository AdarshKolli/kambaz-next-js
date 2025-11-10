import { createSlice } from "@reduxjs/toolkit";
import * as db from "../../(Kambaz)/Database";

const initialState = {
  assignments: db.assignments,
  assignment: {
    _id: "0",
    title: "New Assignment",
    course: "",
    description: "New Description",
    points: 100,
    dueDate: "2024-05-20",
    availableDate: "2024-05-06"
  }
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, action) => {
      const newAssignment = {
        ...state.assignment,
        ...action.payload,
        _id: new Date().getTime().toString()
      };
      state.assignments = [...state.assignments, newAssignment];
    },
    deleteAssignment: (state, action) => {
      state.assignments = state.assignments.filter((a: any) => a._id !== action.payload);
    },
    updateAssignment: (state, action) => {
      state.assignments = state.assignments.map((a: any) =>
        a._id === action.payload._id ? action.payload : a
      );
    },
    setAssignment: (state, action) => {
      state.assignment = action.payload;
    }
  }
});

export const { addAssignment, deleteAssignment, updateAssignment, setAssignment } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;