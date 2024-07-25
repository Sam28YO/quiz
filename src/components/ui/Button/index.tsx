"use client";
import React from "react";
import { useQuiz } from "@/store";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Button() {
  const { config, changeStatus } = useQuiz();
  const router = useRouter();

  const handleClick = () => {
    if (config.level && config.type && config.category.name) {
      changeStatus("start");
      router.push("/quiz");
    } else {
      toast.error("Please select all the options before starting the quiz.");
    }
  };

  return (
    <>
      <ToastContainer />
      <button
        type="button"
        onClick={handleClick}
        className="text-gray-900 bg-white border border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium rounded-lg py-4 text-sm me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 hover:bg-blue-600 hover:text-white dark:focus:ring-gray-700 w-1/4"
      >
        Begin
      </button>
    </>
  );
}

export default Button;
