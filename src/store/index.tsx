"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

export type ConfigType = {
  questionCount: number;
  category: { id: number; name: string };
  level: string;
  type: string;
  status: string;
  score: number;
};

const defaultConfig: ConfigType = {
  questionCount: 10,
  category: { id: 0, name: "" },
  level: "",
  type: "",
  status: "",
  score: 0,
};

interface QuizContextProps {
  config: ConfigType;
  addLevel: (level: string) => void;
  addCategory: (id: number, name: string) => void;
  addType: (type: string) => void;
  addQuestionNumber: (numberOfQuestion: number) => void;
  changeStatus: (status: string) => void;
  setScore: () => void;
}

const QuizContext = createContext<QuizContextProps | undefined>(undefined);

export const QuizProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [config, setConfig] = useState<ConfigType>(defaultConfig);

  const addLevel = (level: string) => {
    setConfig((prevConfig) => ({ ...prevConfig, level }));
  };

  const addCategory = (id: number, name: string) => {
    setConfig((prevConfig) => ({ ...prevConfig, category: { id, name } }));
  };

  const addType = (type: string) => {
    setConfig((prevConfig) => ({ ...prevConfig, type }));
  };

  const addQuestionNumber = (numberOfQuestion: number) => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      questionCount: numberOfQuestion,
    }));
  };

  const changeStatus = (status: string) => {
    setConfig((prevConfig) => ({ ...prevConfig, status }));
  };

  const setScore = () => {
    setConfig((prevConfig) => ({ ...prevConfig, score: prevConfig.score + 1 }));
  };

  return (
    <QuizContext.Provider
      value={{
        config,
        addLevel,
        addCategory,
        addType,
        addQuestionNumber,
        changeStatus,
        setScore,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = (): QuizContextProps => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
};
