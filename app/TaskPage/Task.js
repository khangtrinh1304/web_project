"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import SubTask from "./SubTask";
import AlertDialog from "./AlertDialog";
import { addUser } from "../_services/logInServices";
import { db } from "../_utils/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";
import { useUserAuth } from "../_utils/auth-context";

function Task({ task }) {
  const { user } = useUserAuth();

  const [value, setValue] = useState("");
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (event) => {
    const val = event.target?.value;
    setValue(val);
  };

  const handAddSubTask = async (event) => {
    try {
      if (value == "") {
        setErrorMessage("Sub-task must not be empty");
      } else {
        const id = task.id;
        let newTask = { ...task, subTasks: [...task.subTasks, value] };
        delete newTask.id;
        await setDoc(doc(db, "users", user.uid, "tasks", id), newTask);
        setValue("");
        setDialogOpen(true);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div
      className="bg-gray-100 text-gray-800 p-4 rounded-md shadow-md"
      style={{ maxWidth: "280px" }}
    >
      <h2 className="text-xl font-bold mb-2 ">{task.title}</h2>
      <p className=" text-sm italic mb-4">{task.description}</p>
      <div>
        {task.subTasks.map((index, subTask) => (
          <SubTask key={index} content={subTask} />
        ))}
        <AlertDialog
          isOpen={isDialogOpen}
          onClose={() => setDialogOpen(false)}
          content={"Sub-task is added successfully!"}
        />
        <AlertDialog
          isOpen={errorMessage != null}
          onClose={() => setErrorMessage(null)}
          content={errorMessage}
        />
      </div>

      <textarea
        className="w-full h-50 p-4   mb-4 rounded-md text-gray-800 placeholder-gray-500 bg-white"
        id="review-text"
        onChange={handleChange}
        placeholder="Adding your sub-task"
        rows={1}
        value={value}
        style={{ color: "Gray" }}
      />

      <button
        onClick={handAddSubTask}
        className="mt-2 py-2 px-4 bg-[#DC8686] text-white rounded-md font-bold hover:bg-[#bf7676]"
      >
        Add to the list
      </button>
    </div>
  );
}

export default Task;
