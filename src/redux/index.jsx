import { configureStore } from "@reduxjs/toolkit";

import AuthSlice from "./authSlice";
import UsersListSlice from "./usersListSlice";
import DepartmentSlice from "./departmentSlice";
import DepartmentDetailSlice from "./departmentDetailSlice";

const store = configureStore({
    reducer: {
        auth: AuthSlice,
        usersList: UsersListSlice,
        departments: DepartmentSlice,
        departmentsDetail : DepartmentDetailSlice,
    }
});

export default store;