import React, { useState } from "react";
import axios from "axios";

export default function Form({ fetchUserData, BASE_URL }) {
  // let style = "hidden";
  const [style, setStyle] = useState("hidden");
  const [userTitle, setUserTitle] = useState("");
  const [userTask, setUserTask] = useState("");

  const submitData = async () => {
    try {
      const data = {
        title: userTitle,
        task: userTask,
      };
      const res = await axios.post(`${BASE_URL}/createTodo`, data);

      if (res.data.success) {
        fetchUserData();
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitData();
    setUserTitle("");
    setUserTask("");
    setStyle("hidden");
  };
  const handleClick = () => {
    setStyle("");
  };
  const handleClose = () => {
    setStyle("hidden");
  };
  return (
    <>
      <div
        onClick={handleClick}
        className="text-neutral-300 bg-violet-700 border-neutral-300 border-2 w-auto h-12 mt-3 text-xl font-medium cursor-pointer mb-4 flex justify-center items-center hover:opacity-90 absolute left-32"
      >
        <p className="h-auto mx-8">Add Todo</p>
      </div>
      <div className="absolute top-1/3 left-1/3 bg-slate-700 w-1/3">
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
            className="flex flex-col m-4 "
          >
            <input
              className="w-auto bg-transparent border-neutral-300 border-2 text-neutral-300 outline-none active:border-stone-400 p-1 m-1 "
              type="text"
              name="todo"
              id="todo"
              placeholder="Enter Your Todo"
              value={userTitle}
              onChange={(e) => setUserTitle(e.target.value)}
            />
            <input
              className="w-auto bg-transparent border-neutral-300 border-2 text-neutral-300 outline-none active:border-stone-400 p-1 m-1 "
              type="text"
              name="task"
              id="task"
              placeholder="Enter Your Task"
              value={userTask}
              onChange={(e) => setUserTask(e.target.value)}
            />
            <input
              type="submit"
              value="Submit"
              className="bg-violet-700 border-neutral-300 border-2 w-auto h-10 mt-3 text-xl font-medium text-neutral-300 cursor-pointer hover:opacity-90 "
            />
          </form>
        </div>
      </div>
    </>
  );
}
