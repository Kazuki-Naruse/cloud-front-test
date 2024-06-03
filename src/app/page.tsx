"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [address, setAddress] = useState<any[]>([]);
  const [inputText, setInputText] = useState("");

  const fetchAddress = async (zipCode: string = "1010041") => {
    const response = await fetch(
      `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipCode}`
    ).then((res) => res.json());
    if (response?.results[0]) {
      setAddress([...address, response.results[0]]);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  const onClickAddressSearch = async () => {
    fetchAddress(inputText);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-gradient-to-r from-indigo-400">
      {address.map((e: any, i) => (
        <div key={i} className="flex space-x-4 my-8 border-b-2 w-2/3">
          <div className="flex-1">{e.zipcode}</div>
          <div className="flex-1">{e.address1}</div>
          <div className="flex-1">{e.address2}</div>
          <div className="flex-1">{e.address3}</div>
        </div>
      ))}
      <div className="flex space-x-4">
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="郵便番号(ハイフンなし)"
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex-1"
          onClick={onClickAddressSearch}
        >
          住所検索
        </button>
      </div>
    </main>
  );
}
