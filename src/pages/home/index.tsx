import "/src/index.css";
import React, { useState } from "react";

export default function Home() {
  const [doneCount, setDoneCount] = useState(0);
  function addTask() {
    const inputBox = document.getElementById("input-box");
    const listContainer = document.getElementById("list-container");

    if (!inputBox) {
      alert("Input box not found");
      return;
    }

    if (inputBox.value === "") {
      alert("There is no task to add");
    } else {
      let input = document.createElement("input");
      input.setAttribute("type", "checkbox");

      let li = document.createElement("li");
      li.classList.add("text-center p-5")
      li.appendChild(input);

      // Create a separate span element for the text content
      let textElement = document.createElement("span");
      textElement.textContent = inputBox.value;
      li.appendChild(textElement);

      listContainer?.appendChild(li);

      let span = document.createElement("span");
      span.innerHTML = "\u00d7";
      li.appendChild(span);

      input.addEventListener("change", handleCheckboxChange);

      // Add event listener for removing the task
      if (span) {
        span.addEventListener("click", () => removeTask(li));
      }
    }

    inputBox.value = "";
    updateDoneCount(); // Update the Done count after adding a task
  }

  function handleCheckboxChange() {
    updateDoneCount();
  }

  function updateDoneCount() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let count = 0;

    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        count++;
      }
    });

    setDoneCount(count);
  }

  function removeTask(li) {
    const listContainer = document.getElementById("list-container");
    listContainer?.removeChild(li);
    updateDoneCount(); // Update the Done count after removing a task
  }

  function addEventListenersToTasks() {
    const listItems = document.querySelectorAll("#list-container li");
    listItems.forEach((li) => {
      let span = li.querySelector("span");
      if (span) {
        span.addEventListener("click", () => removeTask(li));
      }
    });
  }

  // Call addEventListenersToTasks after rendering to add listeners to existing tasks
  addEventListenersToTasks();

  return (
    <>
      <div className="container mx-auto">
        <h1 className="text-7xl text-center p-5">Chores ToDo List</h1>
        <ul id="list-container" className="flex-col items-center mb-4"></ul>
        <h2 className="text-4xl text-center p-5"> Done: {doneCount} </h2>
        <p className="font-bold ">Add ToDo</p>
        <input
          id="input-box"
          type="text"
          placeholder="Insert your to do list!"
          className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <button
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          onClick={addTask}
        >
          Add Task
        </button>
      </div>
    </>
  );
}
