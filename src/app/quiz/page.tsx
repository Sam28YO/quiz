/*"use client";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useQuiz } from "@/store";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { Player } from "@lottiefiles/react-lottie-player";
import he from "he";

export default function Page() {
  const [questions, setQuestions] = useState([]);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    config,
    addLevel,
    addCategory,
    addType,
    addQuestionNumber,
    setScore,
    changeStatus,
  } = useQuiz();

  type QuestionT = {
    answers: string[];
    category: string;
    correct_answer: string;
    incorrect_answers: string[];
    difficulty: string;
    type: string;
  };

  useEffect(() => {
    async function getQuestions() {
      setLoading(true);

      try {
        const response = await axios.get("https://opentdb.com/api.php", {
          params: {
            amount: config.questionCount,
            category: config.category.id,
            difficulty: config.level,
            type: config.type,
          },
        });

        const { results } = response.data;

        const shuffledResults = results.map((e: QuestionT) => {
          const value = [...e.incorrect_answers, e.correct_answer]
            .map((value) => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
          e.answers = [...value];
          return e;
        });
        console.log(shuffledResults);

        setQuestions(shuffledResults);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    }

    getQuestions();
  }, [config.category.id, config.questionCount, config.level, config.type]);

  const handleNext = () => {
    let remaining = [...questions];
    remaining.shift();
    setQuestions(remaining);
    setAnswer("");
  };

  const checkAnswer = (ans: string) => {
    if (ans === questions[0].correct_answer) {
      setScore(0);
    }
    setAnswer(questions[0].correct_answer);
  };

  return (
    <section className="flex flex-col justify-center items-center mt-10">
      {questions?.length ? (
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Question No{" "}
          <span className="text-blue-600 dark:text-blue-500">
            #{config.questionCount - questions?.length + 1}
          </span>{" "}
          .
        </h1>
      ) : null}
      {loading && (
        <div className="flex flex-col">
          <Skeleton className="w-[600px] h-[60px] my-10 rounded-sm" />
          <Skeleton className="w-[600px] h-[500px] rounded-sm" />
        </div>
      )}
      {!loading && !!questions?.length && (
        <p className="text-2xl">Score: {config.score}</p>
      )}
      {!questions?.length && !loading && (
        <div className="flex flex-col justify-center items-center">
          <Player
            src="https://assets6.lottiefiles.com/packages/lf20_touohxv0.json"
            className="player"
            loop
            autoplay
            style={{ height: "400px", width: "400px" }}
          />
          <h1 className="mt-10 text-center font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            YOUR SCORE:{" "}
            <span className="font-extrabold text-transparent text-10xl bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              {config.score}
            </span>
          </h1>
          <button
            onClick={() => {
              window.location.reload();
            }}
            className="bg-white hover:bg-gray-100 my-10 text-gray-800 font-semibold py-2 px-10 border border-gray-400 rounded shadow"
          >
            Start Over
          </button>
        </div>
      )}
      {!questions && <p>loading...</p>}
      {!questions?.length && (
        <section className="shadow-2xl my-10 p-10 w-[90%] rounded-lg flex flex-col justify-center items-center shadow-blue-200">
          <h4 className="mb-4 text-2xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-5xl dark:text-white">
            {questions.length ? he.decode(questions[0].question) : null}
          </h4>
          <div className="flex justify-evenly items-center my-10 flex-wrap w-[90%]">
            {questions[0].answers.map((ans) => (
              <button
                key={ans}
                onClick={() => checkAnswer(ans)}
                className={cn(
                  "w-[40%] my-4 bg-white hover:bg-blue-600 hover:text-gray-100 text-gray-800 font-semibold py-4 px-4 shadow-blue-200 rounded-lg shadow-2xl",
                  {
                    "bg-blue-600": answer && ans === answer,
                    "bg-red-600": answer && ans !== answer,
                    "hover:bg-blue-600": answer && ans === answer,
                    "hover:bg-red-600": answer && ans !== answer,
                    "text-gray-200": !!answer,
                  }
                )}
              >
                {ans}
              </button>):null
            ))}
          </div>
          {questions.length ? <button
            type="button"
            onClick={handleNext}
            className="w-[45%] my-4 py-3.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-blue-900 hover:text-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Next
          </button> : null}
        </section>
      )}
    </section>
  );
}*/

"use client";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useQuiz } from "@/store";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { Player } from "@lottiefiles/react-lottie-player";
import he from "he";

export default function page() {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const { config, setScore } = useQuiz();

  type questionT = {
    answers: string[];
    category: string;
    correct_answer: string;
    incorrect_answers: string[];
    difficulty: string;
    type: string;
  };
  useEffect(() => {
    async function getQuestions() {
      setLoading(true);

      try {
        const response = await axios.get("https://opentdb.com/api.php", {
          params: {
            amount: config.questionCount,
            category: config.category.id,
            difficulty: config.level,
            type: config.type,
          },
        });

        const { results } = response.data;

        let shuffledResults = results.map((e: questionT) => {
          let value = [...e.incorrect_answers, e.correct_answer]
            .map((value) => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
          e.answers = [...value];
          return e;
        });
        console.log(shuffledResults, "shuffled");
        setQuestions([...shuffledResults]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    }

    getQuestions();
  }, [config.category.id, config.questionCount, config.level, config.type]);

  const handleNext = () => {
    let remaining = [...questions];
    remaining.shift();
    setQuestions([...remaining]);
    setSelectedAnswer("");
    setAnswer("");
  };
  const checkAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    if (answer === questions[0].correct_answer) {
      setScore(0);
    }
    setAnswer(questions[0].correct_answer);
  };
  return (
    <section className="flex flex-col justify-center items-center mt-10">
      {questions?.length ? (
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Question No{" "}
          <span className="text-blue-600 dark:text-blue-500">
            #{config.questionCount - questions?.length + 1}
          </span>{" "}
          .
        </h1>
      ) : null}
      {loading && (
        <div className="flex flex-col">
          <Skeleton className="w-[600px] h-[60px] my-10 rounded-sm" />

          <Skeleton className="w-[600px] h-[500px] rounded-sm" />
        </div>
      )}
      {!loading && !!questions?.length && (
        <p className="text-2xl ">Score: {config.score}</p>
      )}
      <section className="shadow-2xl my-10 p-10 w-[90%] rounded-lg flex flex-col justify-center items-center shadow-blue-200">
        <h4 className="mb-4 text-2xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-5xl dark:text-white">
          {questions.length ? he.decode(questions[0].question) : null}
        </h4>
        {loading && (
          <div className="flex flex-col">
            <Skeleton className="w-[600px] h-[60px] my-10 rounded-sm" />
            <Skeleton className="w-[600px] h-[500px] rounded-sm" />
          </div>
        )}
        {!questions.length && !loading && (
          <div className="flex flex-col justify-center items-center">
            <Player
              src="/Animation.json"
              className="player"
              loop
              autoplay
              style={{ height: "400px", width: "400px" }}
            />
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              Your Score:{config.score}
            </h1>
            <button
              type="button"
              onClick={() => (window.location.href = window.location.origin)}
              className=" my-4 py-3.5  px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-blue-900 hover:text-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Take Another Quiz
            </button>
          </div>
        )}
        <div className="flex justify-evenly items-center my-10 flex-wrap w-[90%]">
          {questions.length
            ? questions[0].answers.map((ans) => (
                <button
                  key={ans}
                  onClick={() => checkAnswer(ans)}
                  type="button"
                  className={cn(
                    "w-[45%] my-4 py-3.5 px-5 me-2 mb-2 text-lg font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-blue-600 hover:text-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700",
                    {
                      "bg-green-600": answer && ans === answer,
                      "bg-red-600":
                        selectedAnswer &&
                        ans !== answer &&
                        ans === selectedAnswer,
                      "text-gray-200": !!answer,
                    }
                  )}
                >
                  {ans}
                </button>
              ))
            : null}
        </div>
        {questions.length ? (
          <button
            type="button"
            onClick={() => handleNext()}
            className="w-[45%] my-4 py-3.5  px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-blue-900 hover:text-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Next{" "}
          </button>
        ) : null}
      </section>
    </section>
  );
}
