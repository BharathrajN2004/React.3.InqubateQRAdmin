import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";
import {useSelector } from "react-redux";

import Widget from "components/widget/Widget";
import DailyTraffic from "views/admin/default/components/DailyTraffic";

const Dashboard = () => {
  const { usersList } = useSelector(state => state.usersList);
  const { log, departments } = useSelector(state => state.departments);

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
