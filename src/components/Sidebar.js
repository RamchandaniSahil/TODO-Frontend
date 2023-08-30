import { React, useState, useEffect } from "react";
import Form from "./Todo/Form";
import Todo from "./Todo/Todo";
import axios from "axios";

const BASE_URL = "http://localhost:4000";

export default function Sidebar() {
  const [userData, setuserData] = useState(null);
  const [firstId, setFirstId] = useState(null);

  const fetchUserData = async () => {
    const res = await axios.get(`${BASE_URL}/showTodo`);
    // console.log("RES = ", res);

    setuserData(res.data.titles);
    const id = res && res.data.titles[0]._id;
    setFirstId(id);
    // console.log("FIRST ID = ", firstId);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      <Form fetchUserData={fetchUserData} BASE_URL={BASE_URL} />
      <section className="bg-slate-700 text-center shadow-inner shadow-slate-900">
        <Todo
          userData={userData}
          setuserData={setuserData}
          fetchUserData={fetchUserData}
          BASE_URL={BASE_URL}
          firstId={firstId}
        />
      </section>
    </>
  );
}
