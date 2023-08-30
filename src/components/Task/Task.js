import axios from "axios";
import React, { useState } from "react";

export default function Task({
  userData,
  setuserData,
  fetchUserData,
  BASE_URL,
  userId,
}) {
  // console.log("USERID = ", userData);
  const [style, setStyle] = useState("hidden");
  const [task, setTask] = useState("");
  const [arrayIndex, setArrayIndex] = useState();
  const [value, setValue] = useState(null);

  const handleClose = (event) => {
    setStyle("hidden");
  };

  const handleEdit = async () => {
    try {
      const data = {
        index: arrayIndex,
        new_value: task,
      };

      const res = await axios.put(`${BASE_URL}/editTask/${userId}`, data);
      // console.log("RESPONSE = ", res);

      if (res.data.success) {
        fetchUserData();
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleEdit();
    setTask("");
    setStyle("hidden");
  };

  const editTask = (index) => {
    // console.log("object");
    setStyle("");
    setArrayIndex(index);
  };

  // const deleteTask = async (ind) => {
  //   try {
  //     // let value;
  //     userData &&
  //       userData.map((response) => {
  //         if (response._id === userId) {
  //           console.log("RESPONCE = ", response);
  //           response.task.map((element, index) => {
  //             if (index === ind) {
  //               console.log("INDEX = ", index);
  //               console.log("IND = ", ind);
  //               console.log("ELEMENT = ", element);
  //               // value = element;
  //               setValue(element);
  //             }
  //             return;
  //           });
  //         }
  //         return;
  //       });
  //     if (value !== null) {
  //       console.log("VALUE = ", value);
  //       const data = {
  //         value: value,
  //       };

  //       const res = await axios.delete(
  //         `${BASE_URL}/deleteTask/${userId}`,
  //         data
  //       );
  //       console.log("RESPONSE = ", res);

  //       if (res.data.success) {
  //         console.log("SUCCESS");
  //         fetchUserData();
  //       }
  //     }
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // };

  return (
    <>
      <div className="mt-20">
        {userData &&
          userData.map((response) => {
            if (response._id === userId) {
              return response.task.map((tasks, index) => (
                <div
                  key={index}
                  className="flex bg-gray-400 shadow-xl shadow-slate-500 justify-between items-center  my-10 h-12"
                >
                  {/* <div className="flex">
                    <div className="px-1 h-auto w-full">
                      <input
                        type="checkbox"
                        name="checked"
                        id="checked"
                        className="px-3 w-full"
                      />
                    </div>
                  </div> */}
                  <p className="px-5 font-bold">{tasks}</p>
                  <div className="button">
                    <button
                      className="bg-violet-700 mx-2 px-5 py-1 border-neutral-300 border-2 w-auto text-neutral-300 text-lg hover:opacity-90 "
                      onClick={() => editTask(index)}
                    >
                      Edit
                    </button>
                    {/* <button
                      className="bg-violet-700 mx-2 px-5 py-1 border-neutral-300 border-2 w-auto text-neutral-300 text-lg hover:opacity-90 "
                      onClick={() => deleteTask(index)}
                    >
                      Delete
                    </button> */}
                  </div>
                </div>
              ));
            } else if (userId === null) {
              return response.task.map((tasks, index) => (
                <div
                  key={index}
                  className="flex bg-gray-400 shadow-xl shadow-slate-500 justify-between items-center  my-10 h-12"
                >
                  {/* <div className="flex">
                    <div className="px-1 h-auto w-full">
                      <input
                        type="checkbox"
                        name="checked"
                        id="checked"
                        className="px-3 w-full"
                      />
                    </div>
                  </div> */}
                  <p className="px-5 font-bold">{tasks}</p>
                  {/* <div className="button">
                    <button className="bg-violet-700 mx-2 px-5 py-1 border-neutral-300 border-2 w-auto text-neutral-300 text-lg hover:opacity-90 ">
                      Edit
                    </button>
                    <button className="bg-violet-700 mx-2 px-5 py-1 border-neutral-300 border-2 w-auto text-neutral-300 text-lg hover:opacity-90 ">
                      Delete
                    </button>
                  </div> */}
                </div>
              ));
            }
            return;
          })}
      </div>

      <div className="absolute bg-slate-700 w-1/2 top-1/2 right-60">
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
              placeholder="Edit Your task"
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
