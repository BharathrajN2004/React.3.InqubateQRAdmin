import { useState, useEffect } from "react";
import BarChart from "components/charts/BarChart";
import { useSelector } from "react-redux";

import { barChartOptionsDailyTraffic , barChartDataDailyTraffic} from "variables/charts";
import Card from "components/card";

const DailyTraffic = () => {
  const { departments } = useSelector((state) => state.departments);
  const [nameList, setNameList] = useState([]);
  const [productsCount, setProductsCount] = useState([]);
  let departmentsNameList = [];
  let departmentsProductCounts = [];
  let [maximumProducts,setMaxProducts] = useState(0);
  let [departmentWithMaxProducts, setDepWithMaxProducts] = useState("");

  useEffect(() => {
    // Calculate data and update state when 'departments' change
    departmentsNameList = departments.map((value) => value.id);
    departmentsProductCounts = departments.map((value) => Object.keys(value).length - 1);
    setNameList(departmentsNameList);
    setProductsCount(departmentsProductCounts);
    setMaxProducts(Math.max(...departmentsProductCounts));
    setDepWithMaxProducts(departmentsNameList[departmentsProductCounts.indexOf(maximumProducts)]);
  }, [departments]);

  return (
    <Card extra="pb-7 p-[20px]">
      <div className="flex flex-row justify-between">
        <div className="ml-1 pt-2">
          <p className="text-sm font-medium leading-4 text-gray-600">
            Maximum Products
          </p>
          <p className="text-[34px] font-bold text-navy-700 dark:text-white">
            {maximumProducts.toString() + " "}
            <span className="text-sm font-medium leading-6 text-gray-600">
              in {departmentWithMaxProducts.toUpperCase()}
            </span>
          </p>
        </div>
      </div>

      <div className="h-[300px] w-full pt-10 pb-0">
        <BarChart
          chartData={barChartDataDailyTraffic(productsCount)}
          chartOptions={barChartOptionsDailyTraffic(nameList)}
        />
      </div>
    </Card>
  );
};

export default DailyTraffic;
