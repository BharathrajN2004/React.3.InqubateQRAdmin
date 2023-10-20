import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    departmentsDetail: [],
};

const DepartmentDetailSlice = createSlice({
    name: "departmentsDetail",
    initialState: initialState,
    reducers: {
        addDepDetail: (state, action) => {
            state.departmentsDetail = action.payload;
        },

    }
});

export default DepartmentDetailSlice.reducer;

export const { addDepDetail } = DepartmentDetailSlice.actions;