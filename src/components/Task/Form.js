import axios from "axios";
import React, { useState } from "react";

export default function Form({ placeholder, userId, fetchUserData, BASE_URL }) {
  const [style, setStyle] = useState("hidden");
  const [task, setTask] = useState("");

  const handleClose = (event) => {
    setStyle("hidden");
  };

  const submitTask = async () => {
    try {
      const data = {
        task: task,
      };

      const res = await axios.post(`${BASE_URL}/createTask/${userId}`, data);

      if (res.data.success) {
        fetchUserData();
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitTask();
    setTask("");
    setStyle("hidden");
  };
  const handleClick = () => {
    setStyle("");
  };
  return (
    <>
      <div
        onClick={handleClick}
        className="h-12 absolute top-[8rem] right-4 w-1/5 bg-violet-700 text-neutral-300  border-neutral-600 border-2 text-xl font-medium cursor-pointer hover:opacity-90  "
      >
        <p className="h-full w-full flex justify-center items-center ">
          Add Task
        </p>
      </div>

      <div className="absolute bg-slate-700 w-1/2 top-1/2 right-60">
        {/* className={style} */}
        <div className={style}>
          <div onClick={handleClose} className="text-end mr-2">
            <strong className="text-4xl text-white cursor-pointer  ">
              &times;
            </strong>
          </div>
          <form
            action="#"
            method="post"
            onSubmit={handleSubmit}
            className="flex flex-col "
          >
            <input
              className="w-auto bg-transparent border-neutral-300 border-2 text-neutral-300 outline-none active:border-stone-400 p-1 m-2 "
              type="text"
              name="todo"
              id="todo"
              placeholder={placeholder}
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <input
              type="submit"
              value="Submit"
              className="bg-violet-700 border-neutral-300 border-2 w-auto h-10 text-xl font-medium text-neutral-300 cursor-pointer hover:opacity-90 m-2 "
            />
          </form>
        </div>
      </div>
    </>
  );
}
