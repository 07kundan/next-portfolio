"use client";
import { client } from "@/sanity/client";
import { SanityDocument } from "next-sanity";
import React, { useEffect, useState } from "react";

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

    fetchData();

    // Listen for real-time updates
    const subscription = client
      .listen(`*[_type == "message"]`)
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

  return <div>feedbackComponent</div>;
}

export default FeedbackComponent;

function WriteFeedback() {
  const postMessage = async (username: string, message: string) => {
    const newMessage = {
      _type: "message",
      username,
      message,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await client.create(newMessage);
      console.log("Message created:", response);
    } catch (error) {
      console.error("Error posting message:", error);
    }
  };
}
