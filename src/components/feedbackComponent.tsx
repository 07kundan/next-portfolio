"use client";
import { client } from "@/sanity/client";
import { SanityDocument } from "next-sanity";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { Input } from "./ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import axios, { AxiosError } from "axios";
import HeadComponent from "./headComponent";
import { FaRegMessage } from "react-icons/fa6";
import { MdFeedback } from "react-icons/md";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import { ubuntu } from "@/app/fonts/fonts";

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
          setMessages((prevMessages) => [newMessage, ...prevMessages]);
        }
      });

    // Cleanup on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // console.log(messages);
  return (
    <>
      <HeadComponent>
        <FaRegMessage className="text-2xl" />
        <span className="text-3xl text-[#DD5746]">|</span>
        <span className="font-bold ">Feedbacks</span>
        <span className=" text-3xl text-[#DD5746]">|</span>
        <MdFeedback className="text-xl" />
      </HeadComponent>
      <div className="h-full flex p-3 gap-4">
        <div className="w-2/3">
          {messages.length === 0 ? (
            <div
              className={cn(
                `w-full h-full flex items-center justify-center font-semibold ${ubuntu.className} text-lg`
              )}
            >
              There is no message/feedback yet, write first🙂
            </div>
          ) : (
            <div className="w-full h-full overflow-y-scroll pointer-events-auto space-y-4">
              <Cards messages={messages} />
            </div>
          )}
        </div>

        <div className="w-1/2 px-6">
          <WriteFeedback />
        </div>
      </div>
    </>
  );
}

export default FeedbackComponent;

// cards subcomponent

function Cards({ messages }: { messages: SanityDocument[] }) {
  return (
    <div className=" p-3">
      <BentoGrid>
        {messages.map((item, index) => (
          <BentoGridItem
            key={index}
            className={`${(index + 1) % 4 === 1 || (index + 1) % 4 === 0 ? "md:col-span-3 " : "md:col-span-2"} text-[#6cd8ff] bg-transparent/50 outline outline-[#22657d]`}
            description={item.message}
            title={item.name}
            header={item.timestamp}
            // icon={item.icno}
          />
        ))}
      </BentoGrid>
    </div>
  );
}

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
      message: "Name is required when",
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
    setValue,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identification: "Anonymous",
      name: "",
      message: "",
    },
  });

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isUsingAI, setIsUsingAI] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState("Your Name");

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
  const generateMessage = async () => {
    const prompt = watch("message");

    if (prompt === "") {
      toast.error("please write prompt first");
      return;
    }
    // console.log("generating", prompt);

    setIsGenerating(true);
    try {
      setValue("message", "");
      const response = await axios.post(`/api/suggest-messages`, {
        keyword: prompt,
      });
      // console.log("response", response);
      setValue("message", response?.data?.data);
      toast.success("text generated successfully");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        // console.log("error", error.response);
        toast.error(`${error.response?.data.message}`); // Use error.message for a cleaner output
      } else {
        // console.log("An unexpected error occurred", error);
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className=" w-full pointer-events-auto h-full pt-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="text-center h-full space-y-3"
      >
        <div className="flex items-center justify-around text-base tracking-tighter ">
          {/* buttons */}
          <div className="inline-flex gap-1">
            <button
              type="button"
              onClick={() => setIsUsingAI(false)}
              className={cn(
                isUsingAI ? "" : "underline underline-offset-2 text-[#295b6d]",
                "font-bold"
              )}
            >
              Write your own
            </button>
            <span className="text-[#DD5746] text-2xl font-bold">/</span>
            <button
              type="button"
              onClick={() => setIsUsingAI(true)}
              className={cn(
                isUsingAI ? "underline underline-offset-2 text-[#295b6d]" : "",
                "font-bold"
              )}
            >
              generate using AI
            </button>
          </div>

          <div className=" text-sm flex flex-col items-center space-y-1.5">
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
                      console.log(e.target.value);
                      setSelectedValue(value); // Update local state
                      field.onChange(value); // Update react-hook-form state
                    }}
                    className="bg-[#295b6d] text-[#61cdf5] font-bold border rounded-md flex items-center justify-center py-1 px-2 tracking-normal border-[#122b34]"
                  >
                    <option
                      className="bg-[#295b6d] border-[#122b34] font-bold"
                      value="Your Name"
                    >
                      Your Name
                    </option>
                    <option
                      className="bg-[#295b6d] border-[#122b34] font-bold"
                      value="Anonymous "
                    >
                      Anonymous
                    </option>
                  </select>
                )}
              />
              {errors.identification && (
                <p className="text-red-500 text-xs font-bold">
                  {errors.identification.message}
                </p>
              )}
            </div>

            {/* Conditionally render the name input if "Your Name" is selected */}
            {selectedValue === "Your Name" && (
              <div className="space-y-0.5">
                <Input
                  className="text-sm w-[10vw] bg-[#295b6d] border border-[#122b34] text-[#61cdf5] font-bold py-1"
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
        <div className="space-y-0.5 relative w-11/12 h-[75%] text-[#65d3fc] m-auto text-pretty font-semibold rounded-lg">
          {errors.message && (
            <p className="text-red-500 text-xs">{errors.message.message}</p>
          )}
          <textarea
            disabled={isGenerating ? true : false}
            className={cn(
              isGenerating ? "bg-[#183845]" : "bg-[#255365]/70 ",
              " border-2  border-[#133441] w-full h-full p-4 rounded-lg"
            )}
            placeholder={
              isUsingAI
                ? isGenerating
                  ? ""
                  : "Write your Prompt or just some keyword e.g keyword1, keyword2..."
                : isGenerating
                  ? ""
                  : "Type your message here..."
            }
            {...register("message")}
          />
          {isGenerating && (
            <div
              id="skeleton"
              className="flex flex-col space-y-2  p-4 absolute left-0 top-0 w-full h-[95%]"
            >
              <div className="h-6 bg-cyan-800 rounded-lg w-32 animate-pulse"></div>
              <div className="h-6 bg-cyan-800 rounded w-2/3 animate-pulse"></div>

              <div className="h-4 bg-cyan-800 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-cyan-800 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-cyan-800 rounded w-3/4 animate-pulse"></div>

              <div className="h-4 bg-cyan-800 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-cyan-800 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-cyan-800 rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-cyan-800 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-cyan-800 rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-cyan-800 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-cyan-800 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-cyan-800 rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-cyan-800 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-cyan-800 rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-cyan-800 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-cyan-800 rounded w-3/4 animate-pulse"></div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="space-x-10 pt-4">
          <Button
            type="submit"
            variant={"outline"}
            className=" font-bold text-lg"
          >
            Submit
          </Button>
          {isUsingAI && (
            <Button
              className=" font-bold text-lg"
              type="button"
              variant={"outline"}
              onClick={generateMessage}
            >
              Generate
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
