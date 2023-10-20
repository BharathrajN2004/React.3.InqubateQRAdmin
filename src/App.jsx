import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getDocs, onSnapshot, collection } from "firebase/firestore";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUsers } from "./redux/usersListSlice";
import { addDepartments, addProducts } from "./redux/departmentSlice";
// import { addDepDetail } from "./redux/departmentDetailSlice";

import { firestore, auth, storage } from "./Firebase/config";
import { login } from "redux/authSlice";
import LoadingSpinner from "./components/loadingSpinner/loadingSpinner";
import AdminLayout from "./layouts/admin";
import LoginPage from "./layouts/auth/loginPage";
import SignupPage from "./layouts/auth/signupPage";

const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [userDetail, setUserDetail] = useState(null);
  let constUser = {};

  useEffect(() => {
    const userQuerySnapshot = onSnapshot(
      collection(firestore, "users"),
      (querySnapshot) => {
        const users = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          users.push(data);
        });
        dispatch(addUsers(users));
      }
    );

    // DataStore Data
    const dataStoreQuerySnapshot = onSnapshot(
      collection(firestore, "datastore/incubation/category"),
      (querySnapshot) => {
        const dataCatagory = [];
        const products = [];

        querySnapshot.forEach((docSnap) => {
          const data = docSnap.data();
          for (var i in data) {
            products.push(data[i]);
          }
          const id = docSnap.id;
          dataCatagory.push({ id, ...data });

        });
        dispatch(addDepartments(dataCatagory));
        dispatch(addProducts(products));
      }
    );

    const fetchUserData = async (email) => {
      try {
        // Get the user document based on the email
        const userDocRef = doc(firestore, "users", email);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          // User document exists, retrieve the data
          const userData = userDocSnap.data();
          setUserDetail((prevData) => ({
            ...prevData,
            ...userData,
          }));
          constUser = { ...constUser, ...userData };
          dispatch(login(constUser));
          setLoading(false);
        } else {
          // User document does not exist
          console.log("User document does not exist.");
          setLoading(false); // Set loading to false even if the document doesn't exist
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    // Check if the user is logged in
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in, fetch user data
        setUserDetail({ email: user.email });
        constUser = { email: user.email };
        fetchUserData(user.email);
      } else {
        // User is logged out, reset states
        setUserDetail(null);
        setLoading(false);
      }
    });

    // Return the cleanup function
    return () => {
      unsubscribe(); // Unsubscribe from the auth state change listener
      userQuerySnapshot();
      dataStoreQuerySnapshot();
    };
  }, [firestore, auth]);

  // useEffect(() => {
  //   const fetchUserData = async (email) => {
  //     try {
  //       const userDocRef = doc(firestore, "users", email);
  //       const userDocSnap = await getDoc(userDocRef);

  //       if (userDocSnap.exists()) {
  //         const userData = userDocSnap.data();
  //         setUserDetail({ email, ...userData });
  //         dispatch(login({ email, ...userData }));
  //       } else {
  //         console.log("User document does not exist.");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setUserDetail({ email: user.email });
  //       fetchUserData(user.email);
  //     } else {
  //       setUserDetail(null);
  //       setLoading(false);
  //     }
  //   });

  //   const unsubscribeUser = onSnapshot(collection(firestore, "users"), (querySnapshot) => {
  //     const users = querySnapshot.docs.map((doc) => doc.data());
  //     dispatch(addUsers(users));
  //   });

  //   const fetchDatastore = async () => {
  //     const querySnapshot = await getDocs(collection(firestore, "datastore/incubation/category"));
  //     const dataCategory = [];
  //     const products = [];
  //     const departmentDetailList = [];

  //     for (const docSnap of querySnapshot.docs) {
  //       const data = docSnap.data();
  //       for (const key in data) {
  //         products.push(data[key]);
  //       }
  //       const id = docSnap.id;
  //       dataCategory.push({ id, ...data });

  //       const path = `datastore/incubation/category/${id}/detail/creator`;
  //       const departmentDetailSnap = await getDoc(doc(firestore, path));

  //       if (departmentDetailSnap.exists()) {
  //         const detaildata = departmentDetailSnap.data();
  //         if (detaildata !== undefined) {
  //           departmentDetailList.push({
  //             department: id,
  //             faculty: detaildata.name,
  //           });
  //         } else {
  //           console.log(detaildata);
  //         }
  //       }
  //     }

  //     dispatch(addDepartments(dataCategory));
  //     dispatch(addProducts(products));
  //     dispatch(addDepDetail(departmentDetailList));
  //   };

  //   fetchDatastore().catch((error) => {
  //     console.error("Error fetching datastore data:", error);
  //   });

  //   return () => {
  //     unsubscribeAuth();
  //     unsubscribeUser();
  //   };
  // }, [firestore, auth, dispatch]);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Routes>
          {userDetail != null ? (
            <Route path="/*" element={<Navigate to="/admin" replace />} />
          ) : (
            <Route path="/*" element={<Navigate to="/auth/Login" replace />} />
          )}
          <Route path="/admin/*" element={<AdminLayout />} />
          <Route path="/auth/Login" element={<LoginPage />} />
          <Route path="/auth/Signup" element={<SignupPage />} />
        </Routes>
      )}
    </>
  );
};

export default App;
