import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    departments: [],
    log: []
};

const DepartmentSlice = createSlice({
    name: "Auth",
    initialState: initialState,
    reducers: {
        addDepartments: (state, action) => {
            state.departments = action.payload;
        },
        addLog: (state, action) => {
            state.log = action.payload;
        },
    }
});

export default DepartmentSlice.reducer;

export const { addDepartments, addLog } = DepartmentSlice.actions;