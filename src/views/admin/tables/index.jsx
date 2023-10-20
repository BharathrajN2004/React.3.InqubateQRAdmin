import { useSelector } from "react-redux";

import { tableColumnsTopCreators } from "./variables/tableColumnsTopCreators.js";
import TopCreatorTable from "../inventories/components/TableTopCreators";


const Tables = () => {
  const { usersList } = useSelector(state => state.usersList);

  const definedUsersList = [];
  for (var user in usersList) {
    definedUsersList.push({
      "name": [
        usersList[user].name,
        usersList[user].photo,
      ],
      "email": usersList[user].email,
      "password": usersList[user].password
    })
  }

  return (
    <div className="mt-5 h-full w-full rounded-xl">
      <TopCreatorTable
        extra="mb-5"
        tableData={definedUsersList}
        columnsData={tableColumnsTopCreators}
      />
    </div>

  );
};

export default Tables;
