"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import Task from "./Task";
import AlertDialog from "./AlertDialog";
import { addTask } from "../_services/taskService";
import { useUserAuth } from "../_utils/auth-context";
import { addUser } from "../_services/logInServices";
import { useRouter } from "next/navigation";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "../_utils/firebase";

function TaskPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [tasks, setTasks] = useState([]);
  const { user, logout } = useUserAuth();

  useEffect(() => {
    if (user) {
      const q = query(collection(db, "users", user.uid, "tasks"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const tasks = [];
        querySnapshot.forEach((doc) => {
          tasks.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setTasks(tasks);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  if (user == null) {
    return (
      <>
        <p>Unauthorized</p>
      </>
    );
  }

  const handleTitleChange = (event) => {
    const val = event.target?.value;
    setTitle(val);
  };

  const handleDescriptionChange = (event) => {
    const val = event.target?.value;
    setDescription(val);
  };

  const handleLogout = async (event) => {
    await logout();
    router.replace("LandingPage");
  };

  const handleAddNewTask = async () => {
    if (title == "") {
      setErrorMessage("Title can't be empty");
    } else {
      try {
        await addDoc(collection(db, "users", user.uid, "tasks"), {
          title: title,
          description: description,
          subTasks: [],
        });
        setTitle("");
        setDescription("");
        setDialogOpen(true);
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
  };
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <AlertDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        content={"Task is added successfully!"}
      />
      <AlertDialog
        isOpen={errorMessage != null}
        onClose={() => setErrorMessage(null)}
        content={errorMessage}
      />
      <button
        className="absolute left-4 top-4 bg-[#DC8686] text-white p-2 rounded-md hover:bg-[#bf7676]"
        onClick={handleLogout}
      >
        Logout
      </button>

      <header className="text-center p-4 bg-[#DC8686] text-white">
        <h1 className="text-4xl font-bold">Welcome to Simple Task</h1>
        <h2 className="text-2xl">Make your life easier</h2>
      </header>

      <div className="flex flex-1">
        <div className="w-1/4 p-4">
          <section className="mb-4">
            <div className="mb-4">
              <h4 className="text-xl font-bold mb-2 text-[#DC8686]">
                Adding your task
              </h4>
              <input
                value={title}
                onChange={handleTitleChange}
                className="w-full h-50 p-4 mb-4 rounded-md text-gray-800 placeholder-gray-500 bg-white"
                placeholder="Task Title"
              />
              <textarea
                className="w-full h-50 p-4   mb-4 rounded-md text-gray-800 placeholder-gray-500 bg-white"
                id="review-text"
                onChange={handleDescriptionChange}
                placeholder="Description ............"
                rows={2}
                value={description}
                style={{ color: "Gray" }}
              />
            </div>
          </section>

          <button
            onClick={handleAddNewTask}
            className="mt-2  w-full py-2 px-4 bg-[#DC8686] text-white rounded-md font-bold hover:bg-[#bf7676]"
          >
            Add your task
          </button>
        </div>

        {/* Add Task Section on the Left */}
        <aside className="w-3/4 p-4 bg-gray-200 ">
          <div className=" justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800">Your Task List</h3>
          </div>
          <div
            className="overflow-x-auto  "
            style={{ display: "flex", flexDirection: "row" }}
          >
            {tasks.map((task) => (
              <div className=" p-2 flex-shrink-0">
                <Task task={task} />
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

export default TaskPage;
