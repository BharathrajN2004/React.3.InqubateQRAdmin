import { useSelector } from "react-redux";
import { ref, listAll, getDownloadURL } from "firebase/storage";

import { storage } from "../../../Firebase/config";

import NftCard from "components/card/NftCard";
import { useEffect, useState } from "react";

const Inventories = () => {
  const { departments } = useSelector((state) => state.departments);
  const { usersList } = useSelector((state) => state.usersList);
  const [products, setProducts] = useState([]);
  const [selectedDepart, setSelectedDepartment] = useState(
    departments[0] ? departments[0].id : "cse"
  );

  useEffect(() => {
    for (var i in departments) {
      if (departments[i].id == selectedDepart) {
        const _products = { ...departments[i] };
        delete _products.id;
        setProducts(_products);
      }
    }
  }, [selectedDepart]);

  const findUserName = (email) => {
    for (var i in usersList) {
      if (usersList[i].email == email) {
        return usersList[i].name;
      }
    }
  };

  const getImageUrlList = (path) => {
    const listRef = ref(storage, path);
    const urlList = [];
    listAll(listRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
          getDownloadURL(ref(storage, itemRef._location.path_))
            .then((url) => {
              urlList.push(url);
            })
            .catch((error) => {
              console.log(error);
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
    return urlList;
  };

  return (
    <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
      <div className="mb-4 mt-5 flex flex-col justify-between px-4 md:flex-row md:items-center">
        <h4 className="ml-1 text-2xl font-bold text-navy-700 dark:text-white">
          Products of{" "}
          {selectedDepart != null ? selectedDepart.toUpperCase() : "ALL"}
        </h4>
        <div className="mt-4  gap-3 md:flex md:items-center md:justify-center">
          <label
            htmlFor="countries"
            className=" mb-2 block w-64 text-sm font-medium text-gray-900 dark:text-white md:mb-0"
          >
            Select an Department
          </label>
          <select
            id="countries"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            defaultValue={departments[0] ? departments[0].id : "cse"}
          >
            {Array.from(departments).map((value, index) => (
              <option
                key={value.id}
                value={value.id}
                onClick={() => setSelectedDepartment(value.id)}
              >
                {value.id.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* NFTs trending card */}
      <div className="z-20 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Object.entries(products).map(([key, value]) => {
          const imageurls = getImageUrlList(value.path);
          console.log(value.spec);
          return (
            <NftCard
              title={value.name}
              author={findUserName(value.faculty)}
              price={value.price}
              date={value.date}
              room={value.room}
              description={value.spec}
              qrcode={key}
              urlList= {imageurls}
              key={key}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Inventories;
