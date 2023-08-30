import React from "react";
import Form from "./Task/Form";
import Task from "./Task/Task";

export default function Main({
  userData,
  setuserData,
  fetchUserData,
  BASE_URL,
  userId,
}) {
  return (
    <section className="w-[80%] px-5 py-3 bg-neutral-300">
      <p className="text-5xl text-left">Tasks</p>
      <Form
        placeholder="Enter Your Task"
        userId={userId}
        fetchUserData={fetchUserData}
        BASE_URL={BASE_URL}
      />
      <Task
        userData={userData}
        setuserData={setuserData}
        fetchUserData={fetchUserData}
        BASE_URL={BASE_URL}
        userId={userId}
      />
    </section>
  );
}
