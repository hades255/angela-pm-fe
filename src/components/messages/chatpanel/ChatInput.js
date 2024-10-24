import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { v4 as uuidv4 } from "uuid";

import { addMessage, setStatus } from "../../../redux/messageSlice";
import SendIcon from "../../../assets/icons/input/Send";
import EmojiIcon from "../../../assets/icons/input/Emoji";
import AttachmentIcon from "../../../assets/icons/input/Attachment";

import { useWebSocket } from "../../../WebSocketContext";
import { useAuth } from "../../../contexts/AuthContext";
import axios from "axios";

const ChatInput = () => {
  const dispatch = useDispatch();
  const { room, selectedUser } = useSelector((state) => state.message);
  const user = useAuth();
  const { socket } = useWebSocket();
  const textAreaRef = useRef(null);
  const [input, setInput] = useState("");
  const [files, setFiles] = useState([]);

  const handleInputChange = useCallback(
    ({ target: { value } }) => setInput(value),
    []
  );

  const onSendMessage = useCallback(
    (message) => {
      const _msg = {
        room: user.isAdmin ? selectedUser.room : room,
        id: uuidv4(),
        text: message,
        from: user.id,
        to: user.isAdmin ? selectedUser.id : user.admin.id,
        attachments: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        status: "unread",
      };
      if (!user.isAdmin) dispatch(setStatus(3));
      dispatch(addMessage(_msg));
      if (socket) {
        socket.send(
          JSON.stringify({
            room: user.isAdmin ? selectedUser.room : room,
            type: user.isAdmin ? "reply" : "message",
            data: _msg,
          })
        );
      }
      setInput("");
    },
    [dispatch, user, socket, room, selectedUser]
  );

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter" && event.ctrlKey) {
        event.preventDefault();
        if (input) onSendMessage(input);
      }
    },
    [onSendMessage, input]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (input) onSendMessage(input);
    },
    [input, onSendMessage]
  );

  const addEmoji = useCallback(
    ({ id, native }) => {
      // console.log(id);
      // <em-emoji id="+1" size="2em"></em-emoji>
      setInput(input + native);
    },
    [input]
  );

  const adjustHeight = () => {
    const maxRows = 10;
    const lineHeight = 24;
    const maxHeight = lineHeight * maxRows;

    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${Math.min(
        textAreaRef.current.scrollHeight,
        maxHeight
      )}px`;
      textAreaRef.current.style.overflowY =
        textAreaRef.current.scrollHeight > maxHeight ? "auto" : "hidden";
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [input]);

  return (
    <>
      <form
        className="absolute left-0 bottom-0 w-full h-24 p-5 flex items-end gap-5 bg-input-form"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="w-[calc(100%_-_80px)] min-h-[60px] bg-[#EEF1F4] rounded-xl overflow-auto px-14 py-2 flex items-center">
          <textarea
            ref={textAreaRef}
            value={input}
            onKeyDown={handleKeyDown}
            onChange={handleInputChange}
            rows={1}
            placeholder="Type your message here"
            className="resize-none outline-none w-full bg-[#EEF1F4] text-lg text-[#34335B] overflow-hidden"
          />
        </div>
        <Emoji addEmoji={addEmoji} />
        <FileUploader setFiles={setFiles} />
        <button
          type="submit"
          className="w-[60px] h-[60px] bg-chat-send-button rounded-xl flex justify-center items-center"
        >
          <SendIcon />
        </button>
      </form>
    </>
  );
};

export default ChatInput;

const FileUploader = ({ setFiles }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = useCallback(
    async ({ target: { files } }) => {
      const selectedFiles = [...files];
      const formData = new FormData();

      selectedFiles.forEach((file) => {
        formData.append("fileToUpload", file);
      });

      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          console.log("Files uploaded successfully", selectedFiles);
          setFiles(selectedFiles);
        } else {
          console.error("Error uploading files");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
    [setFiles]
  );

  const openFileDialog = useCallback(() => {
    if (fileInputRef.current) fileInputRef.current.click();
  }, []);

  return (
    <>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        style={{ display: "none" }}
        ref={fileInputRef}
      />
      <div
        className="absolute bottom-[38px] right-32 cursor-pointer"
        onClick={openFileDialog}
      >
        <AttachmentIcon />
      </div>
    </>
  );
};

const Emoji = ({ addEmoji }) => {
  const [showPicker, setShowPicker] = useState(0);

  const handleToggleEmoji = useCallback(
    () => setShowPicker(showPicker === 1 ? 2 : 0),
    [showPicker]
  );

  const handleShowEmoji = useCallback(() => setShowPicker(1), []);

  return (
    <>
      <div className="absolute bottom-20">
        {showPicker > 0 && (
          <Picker
            data={data}
            autoFocus={true}
            navPosition="bottom"
            previewPosition="none"
            emojiButtonColors={["rgba(49,59,67,.7)"]}
            onEmojiSelect={addEmoji}
            onClickOutside={handleToggleEmoji}
          />
        )}
      </div>
      <div
        className="absolute bottom-[38px] left-10 cursor-pointer"
        onClick={handleShowEmoji}
      >
        <EmojiIcon />
      </div>
    </>
  );
};
