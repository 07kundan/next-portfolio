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
import { AppDispatch, RootState } from "@/lib/store";
import { setIsActive } from "@/lib/features/playground.slice";
import { useDispatch, useSelector } from "react-redux";
import { toggleTriggered } from "@/lib/features/svgPosition.slice";

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

function SubComponent({
  className,
  dispatch,
  playgroundIsActive,
}: {
  className: string;
  dispatch: AppDispatch;
  playgroundIsActive: Boolean;
}) {
  const [stringToCheck, setStringToCheck] = useState<string>("");
  const [randomNum, setRandomNum] = useState<number>(1);
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
      ); // Generate a random UpperCase letter
      const newValue = field.value + randomChar;
      field.onChange(newValue);
      e.preventDefault();
    }
  }
  function handleTogglePlayground() {
    dispatch(setIsActive("toggle"));
  }
  const handleAnimationEnd = () => {
    dispatch(toggleTriggered());
  };

  return (
    <div
      onAnimationEnd={handleAnimationEnd}
      style={{
        transitionProperty: "all",
        transitionTimingFunction: "cubicBezier(0.4, 0, 0.2, 1)",
        transitionDuration: "400ms",
      }}
      className={cn(
        playgroundIsActive ? "w-[38vw] " : `w-[7vw] `,
        `relative py-4 overflow-hidden h-screen`,
        className
      )}
    >
      <button
        style={{
          transitionProperty: "all",
          transitionTimingFunction: "cubicBezier(0.4, 0, 0.2, 1)",
          transitionDuration: "400ms",
        }}
        className={cn(
          playgroundIsActive ? "rotate-0" : "-rotate-180",
          "absolute -right-2 p-2 top-1/2 z-40 pointer-events-auto"
        )}
        onClick={handleTogglePlayground}
      >
        <ArrowLeftFromLine />
      </button>

      <div
        style={{
          transitionProperty: "opacity",
          transitionTimingFunction: playgroundIsActive ? "step-end" : "linear",
          // transitionTimingFunction: "cubicBezier(0.4, 0, 0.2, 1)",
          transitionDuration: "250ms",
        }}
        className={cn(playgroundIsActive ? "opacity-100" : "opacity-0")}
      >
        <div>
          <h1 className="text-center font-bold text-2xl underline py-2">
            Playground
          </h1>
          <h2 className="flex gap-3 justify-center py- text-xl py-2 ">
            Type the string: {stringToCheck}{" "}
            <button onClick={toSetGuessString} className="pointer-events-auto">
              <RefreshCcw />
            </button>
          </h2>

          <div className="text-xl text-center h-14 flex items-center justify-center">
            {message && <span className="">{message}</span>}
          </div>
        </div>

        <div>
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
                        control={form.control}
                        name={inputName as AnswerBoxNames}
                        render={({ field }) => (
                          <FormItem className="w-[15vw]  space-y-1">
                            <FormLabel>Type here</FormLabel>
                            <FormControl>
                              <Input
                                className="text-base pointer-events-auto placeholder:text-sm font-normal focus-visible:ring-blue-950 read-only:"
                                // required={randomNum === index + 1}
                                readOnly={randomNum !== index + 1}
                                placeholder="Type here !!"
                                {...field}
                                onKeyDown={(e) => {
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
                className="px-10 text-lg hover:bg-zinc-950 hover:text-blue-700 pointer-events-auto"
                variant={"outline"}
                type="submit"
              >
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default function PlayGroundComponent({
  className,
}: {
  className: string;
}) {
  const playgroundIsActive: Boolean = useSelector(
    (state: RootState) => state.playgroud.isActive
  );
  const dispatch = useDispatch();
  return (
    <SubComponent
      className={className}
      dispatch={dispatch}
      playgroundIsActive={playgroundIsActive}
    />
  );
}
