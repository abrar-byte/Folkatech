import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { Disclosure } from "@headlessui/react";
import { ReactComponent as ChevronDown } from "../../assets/chevron-down.svg";
import { ReactComponent as ChevronRight } from "../../assets/chevron-right.svg";
import { ReactComponent as ChevronLeft } from "../../assets/chevron-left.svg";

import MultiRangeSlider from "multi-range-slider-react";
import Header from "../../layout/Header";
import { numberWithDot } from "../../utils/utils";
import _ from "lodash"
import { Link } from "react-router-dom";

export default function Product() {
  const [minValue, set_minValue] = useState(10000);
  const [maxValue, set_maxValue] = useState(250000);
  const [offset, setOffset] = useState(0);

  const handleInput = (e) => {
    set_minValue(e.minValue);
    set_maxValue(e.maxValue);
  };
 
  
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

  const pageList = [5, 10, 12, 14, 16, 18, 20, 25, 30, 40, 50];
  const orderList = [
    { name: "Nama Produk", value: "product_name,ASC" },
    { name: "Harga", value: "price,ASC" },
    { name: "Tanggal", value: "date,ASC" },
  ];

  const filterList = [
    {
      name: "origin",
      items: [
        "aceh",
        "semarang",
        "bandung",
        "jawa",
        "amerika selatan",
        "lain-lain",
      ],
    },
    { name: "species", items: ["arabika", "robusta", "blend"] },
    {
      name: "roast level",
      items: [
        "light roast",
        "medium roast",
        "dark roast",
        "light to medium roast",
      ],
    },
    {
      name: "tasted",
      items: ["sweet", "floral", "fruity", "nutty", "cocoa", "spices"],
    },
    {
      name: "processing",
      items: ["honey white", "natural", "honey gold", "honey yellow"],
    },
  ];


  const debouncedFilter = _.debounce(() => {
    setFilter({
      ...filter,
      price: `${minValue},${maxValue}`,
    })
  }, 1000)

  useEffect(() => {
    debouncedFilter()
     
  }, [minValue,maxValue])

  return (
    <div>
      <Header setFilter={setFilter} filter={filter} />
      <div className="mx-auto md:mx-20 max-w-screen-xl grid md:grid-cols-12 gap-5 my-10">
        <div className="mx-auto col-span-4">
          <div>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between  text-xl uppercase font-medium text-gray-500 hover:text-gray-800 ">
                    <span>Urutkan Berdasarkan</span>
                    <ChevronDown
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-purple-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel>
                    <div className="my-2">
                      <h4 className="text-lg capitalize text-gray-400">
                        Harga
                      </h4>

                      <MultiRangeSlider
                        style={{
                          border: "none",
                          boxShadow: "none",
                          padding: "15px 10px",
                        }}
                        label="false"
                        ruler="false"
                        barInnerColor="#EB3F36"
                        thumbLeftColor="#EB3F36"
                        thumbRightColor="#EB3F36"
                        step={10000}
                        stepOnly = {true}

                        min={10000}
                        max={250000}
                        minValue={minValue}
                        maxValue={maxValue}
                        onInput={(e) => {
                          handleInput(e);
                        }}
                      />
                      <div className="flex justify-center items-center text-gray-400 text-sm">
                        <span>Rp</span>
                        <input
                          type="number"
                          value={minValue}
                          className="h-5 w-20 py-2 bg-gray-200 rounded border-gray-300 mx-2"
                          onChange={(e)=>set_minValue(e.target.value)}
                        />
                        <span>-</span>
                        <input
                          type="number"
                          value={maxValue}
                          className="h-5 w-20 py-2 bg-gray-200 rounded border-gray-300 mx-2"
                          onChange={(e)=>set_maxValue(e.target.value)}
                        />
                      </div>
                    </div>

                    {filterList.map((item, i) => (
                      <Disclosure key={i}>
                        {({ open }) => (
                          <>
                            <Disclosure.Button className="flex items-center shadow-md border-b border-gray-300 rounded-sm w-full bg-gray-200 p-2 justify-between  text-lg capitalize font-medium text-gray-500 hover:text-gray-800 ">
                              <span>{item.name}</span>
                              <ChevronDown
                                className={`${
                                  open ? "rotate-180 transform" : ""
                                } h-5 w-5 text-purple-500`}
                              />
                            </Disclosure.Button>
                            <Disclosure.Panel>
                              {item.items.map((value, idx) => (
                                <div
                                  key={idx}
                                  className="flex justify-between mt-2"
                                >
                                  <div className="flex items-center mb-4">
                                    <input
                                      id="checkbox"
                                      type="checkbox"
                                      value={value}
                                      className="w-4 h-4 text-gray-600 bg-gray-200 rounded border-gray-300 "
                                    />
                                    <label
                                      for="default-checkbox"
                                      className="ml-2 capitalize text-sm font-medium text-gray-400 dark:text-gray-300"
                                    >
                                      {value}
                                    </label>
                                  </div>
                                  <div className="text-sm text-gray-400">
                                    (8)
                                  </div>
                                </div>
                              ))}
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        </div>
        {status === "loading" && <div className="col-span-8">Loading..</div>}
        {status === "success" && (
          <div className="col-span-8">
            <div className="grid md:flex justify-between">
              <div className="text-gray-500 mb-2">
                <span className="mr-2">Menampilkan</span>
                <select
                  onChange={(e) =>
                    setFilter({
                      ...filter,
                      limit: e.target.value,
                    })
                  }
                  className="h-7	w-10"
                >
                  {pageList.filter(x=>x <= data?.data?.total).map((item, index) => (
                    <option
                      key={index}
                      value={item}
                      selected={filter.limit === item}
                    >
                      {item}
                    </option>
                  ))}
                </select>
                <span className="ml-2">dari {data?.data?.total}</span>
              </div>
              <div>
                <span className="mr-2">Urutkan</span>
                <select
                  onChange={(e) =>
                    setFilter({
                      ...filter,
                      order: e.target.value,
                    })
                  }
                  className="h-7	w-30"
                >
                  {orderList.map((item, index) => (
                    <option
                      key={index}
                      value={item.value}
                      selected={filter.order === item.value}
                    >
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {data?.data?.list?.map((item, i) => (
                <Link
                to={`/home/${item.slug}`}
                  key={i}
                  className="w-full max-w-sm bg-white rounded-md shadow-lg hover:opacity-50"
                >
                  <img
                    className="p-5"
                    src={item.images.find(x=>{ return x.is_primary === 1 }).image_url}
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
                </Link>
              ))}
            </div>
          <div className="flex justify-center mt-10 items-center">
              <div className="flex  items-center border">
                    <ChevronLeft
                      onClick={() => offset > 0 && setOffset(offset - 1)}
                      className="cursor-pointer text-3xl hover:text-black w-8 "
                      role="button"
                    />
            
                    {Array(data?.data?.total/filter.limit)
                      .fill(1)
                      .map((_, id) => id + 1)
                      .slice(offset)
                      .map((item, id) => (
                        <div key={id} className=" border">
                          <button
                            className={`${
                              filter.page === item
                                ? " bg-gray-300 w-8 text-gray-400"
                                : "text-gray-400 hover:text-black "
                            }  px-3 py-1 ${id > 3 - 1 ? "hidden" : ""}`}
                            onClick={() =>
                              setFilter({
                                ...filter,
                                page: item,
                              })
                            }
                          >
                            {item}
                          </button>
                        </div>
                      ))}
                    <ChevronRight
                      onClick={() =>
                        Array(data?.data?.total/filter.limit).length -
                          offset >
                          3 && setOffset(offset + 1)
                      }
                      className="cursor-pointer   text-3xl hover:text-black w-8 "
                    />
                  </div>
          </div>
          </div>
        )}
      </div>
    </div>
  );
}
