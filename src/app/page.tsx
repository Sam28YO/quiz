"use client";
import React, { useState } from "react";
import Button from "@/components/ui/Button";
import DropOptions from "@/components/ui/DropDown";
import { useQuiz } from "@/store";


const Home = () => {
  const { config, addQuestionNumber } = useQuiz();
  console.log(config);
  return (
      <section
        className="flex flex-col justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/img.jpg')" }}
      >
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Trivia Quiz
        </h1>
        <section className="p-10 my-10 rounded-lg shadow-xl w-[90%] md:w-[75%] bg-white dark:bg-gray-800/90">
          <div>
            <label
              htmlFor="question_count"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Write the number of questions
            </label>
            <input
              type="number"
              onChange={(e) => {
                const value = Number(e.target.value);
                if (!isNaN(value)) {
                  addQuestionNumber(value);
                }
              }}
              id="question_count"
              defaultValue={10}
              max={50}
              min={1}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ex-5"
              required
            />
          </div>
          <DropOptions />
          <Button />
        </section>
      </section>
  );
};

export default Home;
