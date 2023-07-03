"use client";

import { AuthUser } from "@/model/user";
import React, { useState, useEffect, useRef } from "react";
import { io as ClientIO } from "socket.io-client";
import GridSpinner from "./GridSpinner";

interface IChatMessage {
  roomId?: string;
  userName: string;
  message: string;
}

type Props = {
  me: AuthUser;
  username: string;
};

export default function MessageRoom({ me, username }: Props) {
  const inputRef = useRef(null);

  // connected flag
  const [connected, setConnected] = useState<boolean>(false);

  // init chat and message
  const [chatMessages, setChatMessages] = useState<IChatMessage[]>([]);
  const [messageInput, setMessageInput] = useState<string>("");

  // dispatch message to other users
  const sendApiSocketChat = async (
    chatMessage: IChatMessage
  ): Promise<Response> => {
    return await fetch("/api/socket/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chatMessage),
    });
  };

  const sendMessage = async () => {
    if (messageInput) {
      const chatMessage: IChatMessage = {
        userName: me.username,
        message: messageInput,
      };

      const resp = await sendApiSocketChat(chatMessage);

      if (resp.ok) setMessageInput("");
    }

    (inputRef?.current as any).focus();
  };

  const getRoomMessages = async () => {
    /* db 에서 메시지를 가져오는 함수 */
  };

  useEffect((): any => {
    const socket = new (ClientIO as any)(process.env.NEXTAUTH_URL, {
      path: "/api/socket/io",
      addTrailingSlash: false,
    });

    // log socket connection
    socket.on("connect", () => {
      console.log("SOCKET CONNECTED!", socket.id);
      setConnected(true);
    });

    // update chat on new message dispatched
    socket.on("message", (message: IChatMessage) => {
      chatMessages.push(message);
      setChatMessages([...chatMessages]);
    });

    // socket disconnet onUnmount if exists
    if (socket) return () => socket.disconnect();
  }, []);

  if (!connected) {
    return (
      <div className="flex items-center p-4 mx-auto min-h-screen justify-center">
        <GridSpinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-screen">
      <div className="py-4 text-black border-b sticky top-0">
        <h2 className="mx-4 text-xl font-semibold">{username}</h2>
      </div>
      <div className="flex flex-col flex-1 bg-slate-50">
        <div className="flex-1 flex-col p-4 font-sans">
          {chatMessages.length ? (
            chatMessages.map((chatMessage, i) => (
              <div key={"msg_" + i} className="flex flex-row">
                {chatMessage.userName === me.username ? "" : ""}
                <span
                  className={`m-1 p-1 px-3 rounded-full ${
                    chatMessage.userName === me.username
                      ? "bg-blue-500 text-white ml-auto"
                      : "bg-gray-400 text-black"
                  }`}
                >
                  {chatMessage.message}
                </span>
              </div>
            ))
          ) : (
            <div className="text-lg text-center text-gray-600 py-6">
              Start new messages!
            </div>
          )}
        </div>
        <div className="bg-slate-300 p-4 h-20 sticky bottom-0">
          <div className="flex flex-row flex-1 h-full ">
            <div className="flex-1">
              <input
                ref={inputRef}
                type="text"
                value={messageInput}
                placeholder={connected ? "Message..." : "Connecting..."}
                className="w-full h-full rounded-l-full shadow border border-r-0 pl-2 border-gray-200 text-black "
                onChange={(e) => {
                  setMessageInput(e.target.value);
                }}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
              />
            </div>
            <button
              className="font-semibold text-blue-500 hover:text-black text-sm pr-2 rounded-r-full border border-l-0 border-gray-200 bg-white"
              onClick={() => {
                sendMessage();
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
