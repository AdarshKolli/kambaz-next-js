import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modules: [],
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    setModules: (state, action) => {
      state.modules = action.payload;
    },
    addModule: (state, action) => {
      const newModule = {
        _id: new Date().getTime().toString(),
        name: action.payload.name,
        course: action.payload.course,
        lessons: [],
        description: ""
      };
      state.modules = [...state.modules, newModule];
    },
    deleteModule: (state, action) => {
      state.modules = state.modules.filter((m: any) => m._id !== action.payload);
    },
    updateModule: (state, action) => {
      state.modules = state.modules.map((m: any) =>
        m._id === action.payload._id ? action.payload : m
      );
    },
    editModule: (state, action) => {
      state.modules = state.modules.map((m: any) =>
        m._id === action.payload ? { ...m, editing: true } : m
      );
    },
  },
});

export const { setModules, addModule, deleteModule, updateModule, editModule } = modulesSlice.actions;
export default modulesSlice.reducer;