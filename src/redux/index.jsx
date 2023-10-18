import { configureStore } from "@reduxjs/toolkit";

import AuthSlice from "./authSlice";
import UsersListSlice from "./usersListSlice";
import DepartmentSlice from "./departmentSlice";

const store = configureStore({
    reducer: {
        auth: AuthSlice,
        usersList: UsersListSlice,
        departments: DepartmentSlice
    }
});

export default store;