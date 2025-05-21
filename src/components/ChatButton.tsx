import {
  FileIcon,
  PaperPlaneRightIcon,
  RobotIcon,
} from "@phosphor-icons/react";
import { useState } from "react";
import ChatBubble from "./ChatBubble";
import FileUploader from "./FileUploader";
import axios from "axios";
import { SyncLoader } from "react-spinners";

const ChatButton = ({ bearer }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Olá! Como posso ajudar ?" },
  ]);
  const [session, setSession] = useState();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const handleMessageInput = () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("input", userMessage);
    if (session) {
      formData.append("session_id", session.toString());
    }
    if (selectedFile) {
      formData.append("uploaded_files", selectedFile);
    }

    axios
      .post("http://127.0.0.1:8000/chat_requests/input", formData, {
        headers: {
          Authorization: "Bearer " + bearer,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (response) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", text: response.data.chat_ai_message.content },
        ]);
        setSession(response.data.chat_ai_message.session_id);
      })
      .finally(() => {
        setIsLoading(false); // stop loader or animation
      });
  };

  const handleSend = () => {
    if (!userMessage.trim()) return;

    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    handleMessageInput();
    setUserMessage("");
  };

  const handleEnterInput = (e: any) => {
    if (e.key === "Enter") {
      if (!userMessage.trim()) return;

      setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
      handleMessageInput();
      setUserMessage("");
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div
        className={`transition-all duration-300 ease-in-out  shadow-2xl rounded-2xl overflow-hidden ${
          isOpen ? "w-160 h-136" : "w-14 h-14"
        }`}
      >
        {isOpen ? (
          <div className="bg-white h-full w-full flex flex-col">
            <div className="flex justify-between items-center mb-2 px-5 py-3 bg-primary">
              <div className="flex items-center">
                <div className="items-center bg-white rounded-full mr-2">
                  <img
                    src="../../src/assets/hr-logo.png"
                    className="w-10"
                    alt="logo"
                  />
                </div>
                <h2 className="text-lg font-semibold text-light-grey">Chat</h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-light-grey cursor-pointer text-3xl hover:text-red-300"
              >
                ×
              </button>
            </div>

            {/* Chat Div */}

            <div className="flex-1 overflow-y-auto rounded p-2 mb-2 ">
              {messages.map((msg, index) => (
                <ChatBubble
                  key={index}
                  role={msg.role}
                  avatar="../../src/assets/hr-logo.png"
                  text={msg.text}
                />
              ))}
              {isLoading ? (
                <div className="flex p-2 items-start">
                  <img
                    src="../../src/assets/hr-logo.png"
                    alt={`assistant avatar`}
                    className="w-10"
                  />
                  <div className="px-2 bg-light-grey ml-2 rounded-xl  max-w-60 p-2">
                    <SyncLoader size={4} color="#0080a4" />
                  </div>
                </div>
              ) : null}
            </div>
            {selectedFile ? (
              <div className="flex pl-2 pr-2 border border-primary ml-4 w-60 h-10 items-center rounded-lg bg-sky-50 justify-between text-secondary">
                <div className="flex items-center mr-2">
                  <FileIcon size={16} className="mr-2" />
                  <p className="truncate max-w-40">{selectedFile.name}</p>
                </div>
                <button
                  className="text-secondary cursor-pointer text-md"
                  onClick={() => setSelectedFile(null)}
                >
                  X
                </button>
              </div>
            ) : null}

            <div className="flex pl-4 pb-4 pr-4 pt-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 border border-primary rounded-xl px-3 py-2 text-sm focus:outline-sky-300"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                onKeyDown={handleEnterInput}
              />
              <FileUploader onFileSelect={(file) => setSelectedFile(file)} />
              <button
                className="bg-primary text-white ml-4 px-2 py-2 rounded-full hover:bg-secondary cursor-pointer"
                onClick={handleSend}
              >
                <PaperPlaneRightIcon size={24} />
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsOpen(true)}
            className="w-full h-full bg-secondary hover:bg-primary text-white flex items-center justify-center focus:outline-none rounded-full cursor-pointer"
          >
            <RobotIcon size={24} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatButton;
