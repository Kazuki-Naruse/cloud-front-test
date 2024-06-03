"use client";

import { on } from "events";
import { useState, useEffect } from "react";

export default function Home() {
  const [address, setAddress] = useState<any>();
  const [inputText, setInputText] = useState<string>("");
  const fetchAddress = async () => {
    setAddress(
      await fetch(
        `https://zipcloud.ibsnet.co.jp/api/search?zipcode=1010041`
      ).then((res) => res.json())
    );
  };

  useEffect(() => {
    fetchAddress();
  }, []);
  console.log(address?.results?.address1);
  const onClickAddressSearch = async () => {
    // const inputText = document.getElementById("textInput") as HTMLInputElement;
    setAddress(
      await fetch(
        `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${inputText}`
      ).then((res) => res.json())
    );
  };
  const onChangeInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setInputText(e.target.value);
  };

  // const testData: any = await fetch(
  //   `https://openapi.city.shizuoka.jp/opendataapi/servicepoint/roadRegulation`
  // ).then((res) => res.json());
  // // console.log(testData);
  // const onClickBtn = () => {
  //   console.log(testData.Data.features[0].properties.regulation_type);
  // };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        {address?.results?.address1}
        {address?.results?.address2}
        {address?.results?.address3}
      </div>
      <input
        type="text"
        id="textInput"
        name={inputText}
        value={inputText}
        placeholder="ここにテキストを入力してください"
        onChange={(e) => {
          onChangeInputText(e);
        }}
      ></input>
      <button onClick={onClickAddressSearch}>住所検索</button>
      {/* <div>{testData.Data.features[0].properties.regulation_type}</div>
      <button onClick={onClickBtn}>交通情報取得</button> */}
    </main>
  );
}
