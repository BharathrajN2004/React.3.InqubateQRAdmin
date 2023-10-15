import { useEffect } from "react";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";
import { collection, query, where, getDocs, onSnapshot } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";

import { addUsers } from "../../../redux/usersListSlice";
import { addLog, addDepartments } from "../../../redux/departmentSlice";
import { firestore } from "../../../Firebase/config";

import Widget from "components/widget/Widget";
import DailyTraffic from "views/admin/default/components/DailyTraffic";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { usersList } = useSelector(state => state.usersList);
  const { log, departments } = useSelector(state => state.departments);

  console.log(usersList, log, departments);


  useEffect(() => {
    const userQuerySnapshot =
      onSnapshot(collection(firestore, "users"), (querySnapshot) => {

        const users = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          users.push(data);
        });
        dispatch(addUsers(users));
      });

    // DataStore Data
    const dataStoreQuerySnapshot = onSnapshot(collection(firestore, "datastore"), (querySnapshot) => {
      const dataCatagory = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const id = doc.id;
        if (id == "logistics") {
          dispatch(addLog(data));
        } else {
          dataCatagory.push({ id, ...data });
        }
      });
      dispatch(addDepartments(dataCatagory));
    });

    return () => {
      userQuerySnapshot();
      dataStoreQuerySnapshot();
    }
  }, []);


  return (
    <div>
      {/* Card widget */}

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Users"}
          subtitle={usersList.length ?? 0}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"Products"}
          subtitle={log.length ?? 0}
        />
        <Widget
          icon={<MdDashboard className="h-6 w-6" />}
          title={"Departments"}
          subtitle={departments.length ?? 0}
        />
      </div>

      {/* Chart */}

      <div className="mt-5">
        <DailyTraffic />
      </div>

    </div>
  );
};

export default Dashboard;
