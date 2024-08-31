"use client";
import { ArrowBigLeft, ArrowLeftFromLine, RefreshCcw } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const formSchmea = z.object({
  answerBox: z
    .string()
    .min(3, { message: "String must be at least 3 characters long" })
    .max(10, { message: "String should not exceed 10 characters" }),
  answerBox0: z
    .string()
    .min(0, { message: "String must be at least 3 characters long" }),
  // .max(6, { message: "String should not exceed 6 characters" }),
  answerBox1: z
    .string()
    .min(0, { message: "String must be at least 3 characters long" }),
  // .max(6, { message: "String should not exceed 6 characters" }),
  answerBox2: z
    .string()
    .min(0, { message: "String must be at least 3 characters long" }),
  // .max(6, { message: "String should not exceed 6 characters" }),
  answerBox3: z
    .string()
    .min(0, { message: "String must be at least 3 characters long" }),
  // .max(6, { message: "String should not exceed 6 characters" }),
  answerBox4: z
    .string()
    .min(0, { message: "String must be at least 3 characters long" }),
  // .max(6, { message: "String should not exceed 6 characters" }),
  answerBox5: z
    .string()
    .min(0, { message: "String must be at least 3 characters long" }),
  // .max(6, { message: "String should not exceed 6 characters" }),
  answerBox6: z
    .string()
    .min(0, { message: "String must be at least 3 characters long" }),
  // .max(6, { message: "String should not exceed 6 characters" }),
  answerBox7: z
    .string()
    .min(0, { message: "String must be at least 3 characters long" }),
  // .max(6, { message: "String should not exceed 6 characters" }),
});

const wordToGuess: { [key: number]: string } = {
  1: "MOKSHA",
  2: "MAYA",
  3: "DHARMA",
  4: "SHANTI",
  5: "KRIPA",
  6: "KARMA",
  7: "CHAITANYA",
  8: "ANANDA",
  9: "SATYA",
  10: "CHHAYA",
};

type AnswerBoxNames =
  | "answerBox"
  | `answerBox0`
  | "answerBox1"
  | "answerBox2"
  | "answerBox3"
  | "answerBox4"
  | "answerBox5"
  | "answerBox6"
  | "answerBox7";

function PlayGround({ className }: { className: string }) {
  const [stringToCheck, setStringToCheck] = useState<string>("");
  const [randomNum, setRandomNum] = useState<number>(1); // Use the primitive number type
  const [message, setMessage] = useState<string>("");

  const form = useForm<z.infer<typeof formSchmea>>({
    resolver: zodResolver(formSchmea),
    defaultValues: {
      answerBox: "",
      answerBox0: "",
      answerBox1: "",
      answerBox2: "",
      answerBox3: "",
      answerBox4: "",
      answerBox5: "",
      answerBox6: "",
      answerBox7: "",
    },
  });

  // Function to generate a random number
  function getRandomNumber() {
    const num = Math.floor(Math.random() * 8) + 1; // Adjust to generate between 1 and 8
    setRandomNum(num);
  }

  const toSetGuessString = () => {
    const num = Math.floor(Math.random() * 10) + 1;
    setStringToCheck(wordToGuess[num]);
  };

  useEffect(() => {
    getRandomNumber();
    toSetGuessString();
  }, []);

  const onSubmit = (values: z.infer<typeof formSchmea>) => {
    console.log("submitting");
    const typedString = values.answerBox;
    if (typedString !== stringToCheck) {
      setMessage("You failed to type the correct string");
    } else {
      setMessage("Congrats!! You successfully typed the string");
    }

    setTimeout(() => {
      setMessage("");
      getRandomNumber();
      form.reset(); // Reset form values after each roundS
    }, 3000);
  };

  // function for random character

  function handleRandomChar(e: any, field: any) {
    if (
      e.key === "Backspace" ||
      e.key === "Delete" ||
      e.key === "ArrowLeft" ||
      e.key === "ArrowRight" ||
      !e.key.match(/[a-zA-Z]/)
    ) {
      return;
    }
    if (e.key && e.key.length === 1 && e.key.match(/[a-zA-Z]/)) {
      const randomChar = String.fromCharCode(
        Math.floor(Math.random() * 26) + 65
      ); // Generate a random lowercase letter
      const newValue = field.value + randomChar;
      field.onChange(newValue);
      e.preventDefault();
    }
  }
  function handleClosePlayGround() {}

  return (
    <div className={cn(`relative py-4  overflow-hidden`, className)}>
      <button
        className="absolute -right-2 top-1/2"
        onClick={handleClosePlayGround}
      >
        <ArrowLeftFromLine />
      </button>

      <div className="">
        <h1 className="text-center font-bold text-2xl underline py-2">
          Playground
        </h1>
        <h2 className="flex gap-3 justify-center py- text-xl py-2 ">
          Type the string: {stringToCheck}{" "}
          <button onClick={toSetGuessString}>
            <RefreshCcw />
          </button>
        </h2>

        <div className="text-xl text-center h-14 flex items-center justify-center">
          {message && <span className="">{message}</span>}
        </div>
      </div>

      <div className="">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" text-center flex flex-wrap justify-center py-5 gap-8 "
          >
            {Array(8)
              .fill("")
              .map((_, index) => {
                const inputName =
                  randomNum === index + 1
                    ? "answerBox"
                    : (`answerBox${index}` as const); // Use 'as const' to assert the type

                return (
                  <div
                    key={index}
                    className="flex items-center text-left h-fit"
                  >
                    <FormField
                      // disabled={randomNum !== index + 1} // Disable input if it's not the selected one
                      control={form.control}
                      name={inputName as AnswerBoxNames}
                      render={({ field }) => (
                        <FormItem className="w-[15vw]  space-y-1">
                          <FormLabel className="">Type here</FormLabel>
                          <FormControl>
                            <Input
                              className="text-base placeholder:text-sm font-normal focus-visible:ring-blue-950 read-only:"
                              // required={randomNum === index + 1}
                              readOnly={randomNum !== index + 1}
                              placeholder="Type here !!"
                              {...field}
                              onKeyDown={(e) => {
                                // console.log(e.key);
                                if (randomNum === index + 1) {
                                  handleRandomChar(e, field);
                                }
                              }}
                            />
                          </FormControl>
                          {randomNum === index + 1 && (
                            <FormMessage className="text-[0.7rem] text-red-800" />
                          )}
                        </FormItem>
                      )}
                    />
                  </div>
                );
              })}
            <Button
              className="px-10 text-lg hover:bg-zinc-950 hover:text-blue-700"
              variant={"outline"}
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default PlayGround;
