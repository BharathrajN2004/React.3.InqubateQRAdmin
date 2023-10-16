import Banner from "./components/Banner";
import NFt2 from "assets/img/nfts/Nft2.png";
import NFt4 from "assets/img/nfts/Nft4.png";
import NFt3 from "assets/img/nfts/Nft3.png";
import NFt5 from "assets/img/nfts/Nft5.png";
import NFt6 from "assets/img/nfts/Nft6.png";
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";
import { useSelector } from "react-redux";

import HistoryCard from "./components/HistoryCard";
import TopCreatorTable from "./components/TableTopCreators";
import NftCard from "components/card/NftCard";
import { useState } from "react";

const Inventories = () => {
  const [selectedDepart, setSelectedDepartment] = useState(null);
  const { products, departments } = useSelector(state => state.departments);

  return (
    <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">

      <div className="mb-4 mt-5 flex flex-col justify-between px-4 md:flex-row md:items-center">
        <h4 className="ml-1 text-2xl font-bold text-navy-700 dark:text-white">
          Products of {selectedDepart!=null? selectedDepart.toUpperCase() :"ALL"}
        </h4>
        <ul className="mt-4 grid grid-cols-2 gap-5 md:grid-cols-5 items-center justify-between md:mt-0 md:justify-end md:!gap-5 2xl:!gap-12">
          {Array.from(departments).map((value, index) => (<li>
            <button
              className={selectedDepart==value.id.toLowerCase()?"rounded-md px-1.5 border-blue-300 bg-blue-100 text-blue-700":""+"text-base font-medium text-brand-500 hover:text-brand-500 dark:text-white "}
              onClick={() => setSelectedDepartment(value.id.toLowerCase())}
              key={value.id}
            >
              {value.id.toUpperCase()}
            </button>
          </li>))}
        </ul>
      </div>

      {/* NFTs trending card */}
      <div className="z-20 grid grid-cols-1 gap-5 md:grid-cols-3">
        
        <NftCard
          title="Mesh Gradients"
          author="Will Smith"
          price="2.91"
          description = "sdrfg sdfg"
          qrcode="kjhsdg"
        />
      </div>
    </div>
  );
};

export default Inventories;
