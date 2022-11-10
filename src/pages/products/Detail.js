import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Header from "../../layout/Header";
import { numberWithDot } from "../../utils/utils";
import { ReactComponent as CheckSquare } from "../../assets/check-square.svg";
import { ReactComponent as HeartRed } from "../../assets/heart-red.svg";

export default function Detail() {
  const { detail } = useParams();
  const [count, setCount] = useState(0);
  const [detailItem, setDetailItem] = useState(null);
  const [choose, setChoose] = useState("deskripsi");

  const [filter, setFilter] = useState({
    keyword: "",
    price: `10000,250000`,
    page: 1,
    limit: 10,
    order: "product_name,ASC",
  });
  const { data, status } = useQuery(["list-producst", filter], async (key) =>
    axios
      .get("product", {
        params: key.queryKey[1],
      })
      .then((res) => res.data)
  );

  useEffect(() => {
    if (data) {
      const newData = data?.data?.list?.find((element) => {
        return element.slug === detail;
      });
      setDetailItem(newData);
    }
  }, [status, data]);


  return (
    <div>
      <Header detailItem={detailItem} />
      {status === "loading" && (
        <div className="flex justify-center items-center h-screen">
          Loading..
        </div>
      )}

      <div className="mx-auto max-w-screen-xl grid md:grid-cols-12 gap-5 my-10">
        <div className="col-span-6 w-full">
          <div className="ml-20 p-0.5 flex justify-center">
            <img
              src={
                detailItem?.images?.find((x) => {
                  return x.is_primary === 1;
                }).image_url
              }
              className="w-96 h-96"
              alt="product detail"
            />
          </div>
          <div className="flex gap-2 ml-20 w-auto justify-center mt-5 overflow-auto">
            {detailItem?.images.map((value, idx) => (
              <div key={idx} className="border p-0.5">
                <img
                  src={value.image_url}
                  className="w-32 h-32"
                  alt="products"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-6">
          <h5 className="text-lg text-left uppercase font-semibold tracking-tight text-gray-500 ">
            {detailItem?.name}
          </h5>
          <p className="mt-2 text-base text-left uppercase font-medium text-gray-400">
            {detailItem?.short_description}
          </p>
          <div className="flex justify-start items-center mt-2.5 mb-5">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>First star</title>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Second star</title>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Third star</title>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Fourth star</title>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Fifth star</title>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <span className=" text-xs text-gray-400  ">
              ({detailItem?.seller_id})
            </span>
          </div>
          <div className="flex justify-between ">
            <span className="text-xl font-bold text-dangerious dark:text-white">
              Rp. {detailItem && numberWithDot(detailItem?.price)}
            </span>
            <div className="flex items-center">
              <CheckSquare />
              <span className="text-info text-xs">Tersedia</span>
            </div>
          </div>
          <div className="flex mt-5">
            <div className="flex items-center border">
              <span
                onClick={() => {
                  count > 0 && setCount(count - 1);
                }}
                className="cursor-pointer w-8 px-2 py-1  flex justify-center items-center text-gray-400"
              >
                -
              </span>
              <div className="w-8 px-2 py-1 border-l border-r flex justify-center items-center text-gray-400">
                {count}
              </div>
              <span
                onClick={() => setCount(count + 1)}
                className=" cursor-pointer w-8 px-2 py-1  flex justify-center items-center text-gray-400"
              >
                +
              </span>
            </div>
            <button className=" mx-5 px-3 py-2 bg-dangerious text-white text-lg uppercase">
              tambah ke keranjang
            </button>
            <span className="bg-gray-200 p-2">
              <HeartRed />
            </span>
          </div>
          <p className="font-medium text-gray-400 mt-5">
            {detailItem?.description}
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-screen-lg mb-20">
        <div className="flex justify-center">
          <span
            onClick={() => setChoose("deskripsi")}
            className={`${choose === "deskripsi" ? 'border-b border-dangerious': ''} cursor-pointer text-lg uppercase text-dangerious mr-5`}
          >
            Deskripsi
          </span>
          <span
            onClick={() => setChoose("informasi")}
            className={`${choose === "informasi" ? 'border-b border-dangerious': ''} cursor-pointer text-lg uppercase text-dangerious `}
            
          >
            Informasi
          </span>
        </div>
        {choose === "deskripsi" ? (
          <p className="font-medium text-gray-400 mt-5">
            {detailItem?.description}
          </p>
        ) : (
          <p className="font-medium text-gray-400 mt-5">INFORMASI</p>
        )}
      </div>
      <div className="mx-auto max-w-screen-lg mb-10">
        <div className="flex justify-center">
          <span className="cursor-pointer text-lg border-b border-dangerious uppercase text-gray-500 mr-5">
            Rekomendasi Untuk Anda
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {data?.data?.list?.map((item, i) => (
            <div
              key={i}
              className={`w-full max-w-sm bg-white rounded-md shadow-lg hover:opacity-50 ${i > 2 && 'hidden'}`}
            >
              <img
                className="p-5"
                src={
                  item.images.find((x) => {
                    return x.is_primary === 1;
                  }).image_url
                }
                alt="product"
              />
              <div className="px-5 pb-5">
                <h5 className="text-lg text-center uppercase font-semibold tracking-tight text-gray-500 ">
                  {item.name}
                </h5>
                <p className="mt-2 text-base text-center uppercase font-medium text-gray-400">
                  {item.short_description}
                </p>
                <div className="flex justify-center items-center mt-2.5 mb-5">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>First star</title>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Second star</title>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Third star</title>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Fourth star</title>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Fifth star</title>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <span className=" text-xs text-gray-400  ">
                    ({item.seller_id})
                  </span>
                </div>
                <div className="flex justify-center items-center">
                  <span className="text-xl font-bold text-dangerious dark:text-white">
                    Rp. {numberWithDot(item.price)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
