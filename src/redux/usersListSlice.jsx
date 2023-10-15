import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    usersList: [],
};

const UsersListSlice = createSlice({
    name: "UserList",
    initialState: initialState,
    reducers: {
        addUsers: (state, action) => {
            state.usersList = action.payload;
        },

    }
});

export default UsersListSlice.reducer;

export const { addUsers } = UsersListSlice.actions;