"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import Typewriter from "typewriter-effect";

interface IMessage {
  role: string;
  content: string;
  id: number;
}

const AiChatbot = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    try {
      setLoading(true);

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "user",
          content: message,
          id: Math.floor(100000000 + Math.random() * 900000000),
        },
      ]);

      const response = await fetch("https://api.x.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer xai-cHEM9KhcBIOWnPUj2y6WwfXH6CB3ujl1MCnhPxSbDzG75LUFy6FpdWed9DxVjCOc76pd69pK9FgJx174`,
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content:
                "You are chatbot that is designed to help young professionals grow thier personal/ professional skills in order to gain employment within the tech industry. Get started by asking the user what thier goals are and then make a suggestion.",
            },
            {
              role: "user",
              content: message,
            },
          ],
          model: "grok-2-vision-latest",
          stream: false,
          temperature: 0,
        }),
      });

      const data = await response.json();
      console.log('API Response:', data);


      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: data.choices[0].message.role,
          content: data.choices[0].message.content,
          id: Math.floor(100000000 + Math.random() * 900000000),
        },
      ]);

      setLoading(false);

      setMessage("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-16">
      <div>
        <div className="space-y-8">
          {messages.map((message) => (
            <Card key={message.id}>
              <CardHeader>
                <CardTitle>
                  {message.role === "assistant" ? "Grok 🤖" : "Me 🧑"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{message.content}</p>
              </CardContent>
            </Card>
          ))}

          {loading ? <Skeleton className="w-full h-[100px]" /> : null}
        </div>

        {messages.length < 1 ? (
          <div>
            <h1 className="text-3xl font-bold">
              <Typewriter
                onInit={(typewriter) => {
                  typewriter.typeString("Build a personal success plan today!").start();
                }}
              />
            </h1>
          </div>
        ) : null}

        <div className="mt-8 flex space-x-4 items-center justify-center">
          <Input
            type="text"
            placeholder="Write some stuff..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <Button onClick={sendMessage} disabled={loading}>
            {loading ? "Loading" : "Send"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AiChatbot;
