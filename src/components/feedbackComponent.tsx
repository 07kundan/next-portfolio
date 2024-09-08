"use client";
import { client } from "@/sanity/client";
import { SanityDocument } from "next-sanity";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

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
        `*[_type == "message"] | order(_createdAt asc)`
      );
      setMessages(initialMessages);
    };

    // fetchData();

    // Listen for real-time updates
    // const subscription = client
    //   .listen(`*[_type == "message"]`)
    //   .subscribe((update) => {
    //     // Handle different types of updates
    //     if (update.result) {
    //       const newMessage = update.result;

    //       // Update the state based on new data
    //       setMessages((prevMessages) => [...prevMessages, newMessage]);
    //     }
    //   });

    // Cleanup on unmount
    return () => {
      // subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="h-full relative">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full px-6">
        <WriteFeedback />
      </div>
    </div>
  );
}

export default FeedbackComponent;

// message section
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

function WriteFeedback() {
  // react-hook-form setup with zod validation
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue, // for setting form field values dynamically
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
  const [fomrData, setFormData] = useState();

  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
  };

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
    // Handle your form submission
  };

  return (
    <div className=" w-full p-6 pointer-events-auto text-yellow-400">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <div className="flex items-center justify-between py-1 px-4 ">
          {/* buttons */}
          <div className="inline-flex gap-1">
            <button
              onClick={() => setIsUsingAI(false)}
              className={cn(
                isUsingAI ? "" : "underline underline-offset-2 text-red-700"
              )}
            >
              Write your own
            </button>
            <span>/</span>
            <button
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
              {/* <label className="block text-white">Select Identification</label> */}
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
                {/* <label className="block text-white">Your Name</label> */}
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
        <Button type="submit" variant={"outline"}>
          Submit
        </Button>
      </form>
    </div>
  );
}
