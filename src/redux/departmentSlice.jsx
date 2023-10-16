import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    departments: [],
    products: [],
};

const DepartmentSlice = createSlice({
    name: "Auth",
    initialState: initialState,
    reducers: {
        addDepartments: (state, action) => {
            state.departments = action.payload;
        },
        addProducts: (state, action)=>{
            state.products = action.payload;
        }
    }
});

export default DepartmentSlice.reducer;

export const { addDepartments, addProducts } = DepartmentSlice.actions;