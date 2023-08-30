import axios from "axios";
import React, { useEffect, useState } from "react";
import Main from "../Main";

export default function Todo({
  userData,
  setuserData,
  fetchUserData,
  BASE_URL,
  firstId,
}) {
  const [style, setStyle] = useState(null);
  const [userId, setUserId] = useState(firstId);
  const changeBorder = (index, userId) => {
    setStyle(index);
    setUserId(userId);
  };

  const userTasks = () => {
    if (userId === null) {
      axios.get(`${BASE_URL}/showAllTask`);
    } else {
      axios.get(`${BASE_URL}/showTask/${userId}`);
    }
  };

  useEffect(() => {
    userTasks();
  });
  return (
    <>
      <div className="flex">
        <section className="w-[20%] h-screen">
          <h1 className="text-2xl w-auto my-4 text-neutral-300 font-bold text-left ">
            Todos
          </h1>
          <div className="my-4">
            <div className="justify-between my-6 h-12" key={0}>
              <div
                onClick={() => changeBorder(null, null)}
                className={style === null ? "border-2 border-slate-300" : ""}
              >
                <p className="text-neutral-300 text-start shadow-lg shadow-slate-900 px-1 font-bold h-auto py-2 cursor-pointer ">
                  All Todos
                </p>
              </div>
            </div>
            {userData &&
              userData.map((user, index) => (
                <div className="justify-between my-6 h-12" key={index}>
                  <div
                    onClick={() => changeBorder(index, user._id)}
                    className={
                      index === style ? "border-2 border-slate-300" : ""
                    }
                  >
                    <p className="text-neutral-300 text-start shadow-lg shadow-slate-900 px-1 font-bold h-auto py-2 cursor-pointer ">
                      {user.title}
                    </p>
                  </div>
                </div>
              ))}
            {/* <div className={style}>
            <div className="button w-full mt-2 flex flex-col">
              <button className="bg-violet-700 my-2 px-5 py-1 border-neutral-300 border-2 w-auto text-neutral-300 text-lg cursor-pointer hover:opacity-90 ">
                Edit
              </button>
              <button className="bg-violet-700 my-2 px-5 py-1 border-neutral-300 border-2 w-auto text-neutral-300 text-lg cursor-pointer hover:opacity-90 ">
                Delete
              </button>
            </div>
          </div> */}
          </div>
        </section>
        <Main
          userData={userData}
          setuserData={setuserData}
          fetchUserData={fetchUserData}
          BASE_URL={BASE_URL}
          userId={userId}
        />
      </div>
    </>
  );
}
