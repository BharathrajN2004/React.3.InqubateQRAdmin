import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    departments: [],
};

const DepartmentSlice = createSlice({
    name: "Auth",
    initialState: initialState,
    reducers: {
        addDepartments: (state, action) => {
            state.departments = action.payload;
        }
    }
});

export default DepartmentSlice.reducer;

export const { addDepartments } = DepartmentSlice.actions;