import { useState } from "react";
import QRCode from "react-qr-code";
import { Carousel } from "flowbite-react";

import Card from "components/card";

const NftCard = ({
  title,
  author,
  price,
  date,
  room,
  description,
  qrcode,
  urlList,
}) => {
  const [heart, setHeart] = useState(true);
  return (
    <Card extra={`flex flex-col w-full h-full !p-4 3xl:p-![18px] bg-white `}>
      <div className="h-full w-full">
        <div className="relative mb-2 h-56 overflow-hidden rounded-lg md:h-72">
          <Carousel>
            {Array.from(urlList).map((value,index)=>(
              <img
              alt="..."
              key={value}
              className="mb-3 h-full w-full rounded-xl 3xl:h-full 3xl:w-full"
              src={value}
            />
            ))}
          </Carousel>
        </div>

        <div className="flex items-center justify-between md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col 2xl:items-start 3xl:flex-row 3xl:items-center 3xl:justify-between">
          <div className="mb-3 flex items-center justify-between px-1 md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col xl:items-start 3xl:flex-row 3xl:justify-between">
            <div className="mb-2">
              <p className="text-lg font-bold text-navy-700 dark:text-white">
                {" "}
                {title}{" "}
              </p>
              <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2">
                By {author}{" "}
              </p>
            </div>
          </div>
          <div className="flex h-20 w-20">
            <QRCode
              value={qrcode}
              className="mb-3 h-full w-full rounded-xl p-1"
            />
          </div>
        </div>

        <div className="mb-3 flex items-center justify-between px-1 md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col xl:items-start 3xl:flex-row 3xl:justify-between">
          <div className="mb-2">
            <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2">
              Room: {room}{" "}
            </p>
            <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2">
              Discription: {description}{" "}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col 2xl:items-start 3xl:flex-row 3xl:items-center 3xl:justify-between">
          <div className="flex">
            <p className="mb-2 text-sm font-bold text-brand-500 dark:text-white">
              Price: {price} <span>RS</span>
            </p>
          </div>
          <div className="flex">
            <p className="mb-2 text-sm font-bold text-brand-500 dark:text-white">
              Date: {date}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default NftCard;
