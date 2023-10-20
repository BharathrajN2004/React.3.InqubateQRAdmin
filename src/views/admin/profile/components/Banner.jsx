import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import banner from "assets/img/profile/banner.png";
import Card from "components/card";

const Banner = () => {
  const { userDetail } = useSelector((state) => state.auth);
  // const { departmentsDetail } = useSelector((state) => state.departmentsDetail);
  // const [depCount, setDepCount] = useState(0);

  // useEffect(() => {
  //   setDepCount(0);
  //   for (var i in departmentsDetail){
  //     if (departmentsDetail[i].faculty){
  //       setDepCount((prev)=>prev+=1);
  //     }
  //   }
  // }, [departmentsDetail]);

  return (
    <Card extra={"items-center w-full h-full p-[16px] bg-cover"}>
      {/* Background and profile */}
      <div
        className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
          <img
            className="h-full w-full rounded-full"
            src={userDetail.photo}
            alt=""
          />
        </div>
      </div>

      {/* Name and position */}
      <div className="mt-16 flex flex-col items-center">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          {userDetail.name}
        </h4>
        <p className="text-base font-normal text-gray-500">
          {userDetail.email}
        </p>
      </div>

      {/* Post followers */}
      <div className="mb-3 mt-6 flex gap-4 md:!gap-14">
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-navy-700 dark:text-white">
            Incubation
          </p>
          <p className="text-sm font-normal text-gray-500">Collection</p>
        </div>
        {/* <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-navy-700 dark:text-white">
            9.7K
          </p>
          <p className="text-sm font-normal text-gray-600">Products</p>
        </div> */}
        {/* <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-navy-700 dark:text-white">
            {depCount}
          </p>
          <p className="text-sm font-normal text-gray-500">Departments</p>
        </div> */}
      </div>
    </Card>
  );
};

export default Banner;
