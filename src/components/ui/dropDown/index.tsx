"use client";

import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { useQuiz } from "@/store";
import axios from "axios";

type CategoryType = {
  id: number;
  name: string;
};

function DropOptions() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const { config, addCategory, addLevel, addType } = useQuiz();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          "https://opentdb.com/api_category.php"
        );
        const { trivia_categories } = response.data;
        setCategories([...trivia_categories]);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategory();
  }, []);

  const handleCategory = (id: number, name: string) => {
    addCategory(id, name);
  };
  const renderDropdownItems = (label: string) => {
    switch (label) {
      case "Select Category":
        return categories.map((category) => (
          <DropdownMenuItem
            key={category.id}
            onClick={() => handleCategory(category.id, category.name)}
          >
            {category.name}
          </DropdownMenuItem>
        ));
      case "Select Level":
        return ["easy", "medium", "hard"].map((level) => (
          <DropdownMenuItem key={level} onClick={() => addLevel(level)}>
            {level}
          </DropdownMenuItem>
        ));
      case "Select Type":
        return ["boolean", "multiple"].map((type) => (
          <DropdownMenuItem key={type} onClick={() => addType(type)}>
            {type}
          </DropdownMenuItem>
        ));
      default:
        return null;
    }
  };

  return (
    <section className="flex flex-wrap justify-evenly items-center py-5 w-full">
      {["Select Category", "Select Level", "Select Type"].map(
        (label, index) => (
          <div key={index} className="px-2 py-2 mx-2 w-full sm:w-auto">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex outline-none justify-between w-full px-4 py-2 shadow-md rounded-lg hover:bg-blue-600 hover:text-white">
                {label === "Select Category"
                  ? `${
                      config.category.name
                        ? config.category.name
                        : "Select Category"
                    }`
                  : label === "Select Level"
                  ? `${config.level ? config.level : "Select Level"}`
                  : `${config.type ? config.type : "Seclect Type"}`}
                <ChevronDown />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="max-h-60 overflow-y-auto custom-scrollbar">
                <DropdownMenuLabel>{label}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {renderDropdownItems(label)}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      )}
    </section>
  );
}

export default DropOptions;
