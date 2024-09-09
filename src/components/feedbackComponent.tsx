"use client";
import { client } from "@/sanity/client";
import { SanityClient, SanityDocument } from "next-sanity";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { Input } from "./ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";

function FeedbackComponent() {
  const [messages, setMessages] = useState<SanityDocument[]>([]);

  useEffect(() => {
    // Fetch initial data
    const fetchData = async () => {
      const initialMessages = await client.fetch(
        `*[_type == "feedbacks"] | order(_createdAt asc)`
      );
      setMessages(initialMessages);
    };

    fetchData();

    // Listen for real-time updates
    const subscription = client
      .listen(`*[_type == "feedbacks"]`)
      .subscribe((update) => {
        // Handle different types of updates
        if (update.result) {
          const newMessage = update.result;

          // Update the state based on new data
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
      });

    // Cleanup on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  console.log(messages);
  return (
    <div className="h-full relative">
      <div className="bg-sky-900 w-full h-full">
        {messages.length === 0 ? (
          <div className="">There is no message/feedback yet</div>
        ) : (
          <div className="">
            {messages.map((item) => (
              <div key={item._id} className="">
                {item.message}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full px-6 bg-red-800">
        <WriteFeedback />
      </div>
    </div>
  );
}

export default FeedbackComponent;

// Zod schema for validation
const formSchema = z
  .object({
    identification: z.string().nonempty("Please select identification"),
    name: z.string().optional(),
    message: z.string().min(5, "Message must be at least 5 characters long"),
  })
  .refine(
    (data) => {
      if (data.identification === "Your Name" && !data.name) {
        return false; // Fail validation if "Your Name" is selected but no name is provided
      }
      return true;
    },
    {
      message: "Name is required when 'Your Name' is selected",
      path: ["name"], // Path to the error message in the form
    }
  );

type data = {
  name: string;
  message: string;
  identification: string;
};

function WriteFeedback() {
  // react-hook-form setup with zod validation
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identification: "Anonymous",
      name: "",
      message: "",
    },
  });

  const [isUsingAI, setIsUsingAI] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState("");

  // onSubmitting message gets send to sanity
  const onSubmit = async (data: data) => {
    const { message, name, identification } = data;
    // console.log("submitting", data);
    const username = identification === "Anonymous" ? "Anonymous" : name;
    const newMessage = {
      _type: "feedbacks",
      name: username,
      message,
      timestamp: new Date().toISOString(),
    };

    // trycatch for creating message
    try {
      const response = await client.create(newMessage);
      // console.log("Message created:", response);
      if (response) {
        toast.success("Message sent successfully");
      }
    } catch (error) {
      // console.error("Error posting message:", error);
      if (error) {
        toast.error("Failed");
      }
    }
    setSelectedValue("");
    reset();
  };

  // generating message using AI
  const generateMessage = () => {
    const message = watch("message");
    console.log("generating", message);
    reset();
  };

  return (
    <div className=" w-full p-6 pointer-events-auto text-yellow-400">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <div className="flex items-center justify-between py-1 px-4 ">
          {/* buttons */}
          <div className="inline-flex gap-1">
            <button
              type="button"
              onClick={() => setIsUsingAI(false)}
              className={cn(
                isUsingAI ? "" : "underline underline-offset-2 text-red-700"
              )}
            >
              Write your own
            </button>
            <span>/</span>
            <button
              type="button"
              onClick={() => setIsUsingAI(true)}
              className={cn(
                isUsingAI ? "underline underline-offset-2 text-red-700" : ""
              )}
            >
              generate using AI
            </button>
          </div>

          <div className="inline-flex items-center gap-1">
            {/* Identification Select */}
            <div className="space-y-0.5">
              <Controller
                name="identification"
                control={control}
                render={({ field }) => (
                  <select
                    value={field.value}
                    onChange={(e) => {
                      const value = e.target.value;
                      setSelectedValue(value); // Update local state
                      field.onChange(value); // Update react-hook-form state
                    }}
                    className="bg-transparent border rounded-md py-1 px-1.5"
                  >
                    <option
                      className="bg-red-700 hover:bg-red-800"
                      value="Anonymous"
                    >
                      Anonymous
                    </option>
                    <option
                      className="bg-red-700 hover:bg-red-800"
                      value="Your Name"
                    >
                      Your Name
                    </option>
                  </select>
                )}
              />
              {errors.identification && (
                <p className="text-red-500 text-xs">
                  {errors.identification.message}
                </p>
              )}
            </div>

            {/* Conditionally render the name input if "Your Name" is selected */}
            {selectedValue === "Your Name" && (
              <div className="">
                <Input
                  type="text"
                  placeholder="Enter your name"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs">{errors.name.message}</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Message textarea */}
        <div className="space-y-0.5">
          <textarea
            className="bg-transparent border border-zinc-700 w-full p-2 "
            placeholder="Type your message here..."
            {...register("message")}
          />
          {errors.message && (
            <p className="text-red-500 text-xs">{errors.message.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="">
          <Button type="submit" variant={"outline"}>
            Submit
          </Button>
          {isUsingAI && (
            <Button type="button" variant={"outline"} onClick={generateMessage}>
              Generate
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
