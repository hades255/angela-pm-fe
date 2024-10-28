import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import clsx from 'clsx'

import { SendIcon, EmojiIcon, AttachmentIcon } from '@icons'
import { addMessage, getSelectedUser, setStatus } from '@redux/messageSlice'
import { setStatus as setAuthStatus } from '@redux/authSlice'
import { MEDIA_TYPES } from '@constants'
import { SERVER_ADDRESS } from '@constants/config'
import { useAuth } from '@contexts/AuthContext'
import { useWebSocket } from '@contexts/WebSocketContext'

const ChatInput = () => {
  const dispatch = useDispatch()
  const { room, selectedUser } = useSelector(state => state.message)
  const _selectedUser = useSelector(getSelectedUser)
  const user = useAuth()
  const { socket } = useWebSocket()
  const textAreaRef = useRef(null)
  const [input, setInput] = useState('')
  const [files, setFiles] = useState([])

  const handleInputChange = useCallback(
    ({ target: { value } }) => {
      setInput(value)
      dispatch(setAuthStatus(3))
      const timer = setTimeout(() => {
        dispatch(setAuthStatus(0))
      }, 3000)
      return () => clearTimeout(timer)
    },
    [dispatch]
  )

  const handleClickRemoveFile = useCallback(
    src => setFiles(files.filter(item => item !== src)),
    [files]
  )

  const handleSetFiles = useCallback(
    src => setFiles([...files, ...src]),
    [files]
  )

  const onSendMessage = useCallback(
    (message, files) => {
      const _msg = {
        room: user.isAdmin ? selectedUser : room,
        id: uuidv4(),
        text: message,
        from: user.id,
        to: user.isAdmin ? _selectedUser.id : user.admin.id,
        attachments: files,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        status: user.isAdmin ? 'read' : 'unread'
      }
      if (!user.isAdmin) dispatch(setStatus(3))
      dispatch(
        addMessage({
          room: user.isAdmin ? selectedUser : room,
          data: _msg,
          type: 'send'
        })
      )
      if (socket) {
        socket.send(
          JSON.stringify({
            room: user.isAdmin ? selectedUser : room,
            type: user.isAdmin ? 'reply' : 'message',
            data: _msg
          })
        )
      }
      setInput('')
      setFiles([])
    },
    [dispatch, user, socket, room, selectedUser, _selectedUser]
  )

  const handleKeyDown = useCallback(
    event => {
      if (event.key === 'Enter' && event.ctrlKey) {
        event.preventDefault()
        if (input || files.length > 0) onSendMessage(input, files)
      }
    },
    [input, files, onSendMessage]
  )

  const handleSubmit = useCallback(
    e => {
      e.preventDefault()
      if (input || files.length > 0) onSendMessage(input, files)
    },
    [input, files, onSendMessage]
  )

  const addEmoji = useCallback(
    ({ id, native }) => {
      // console.log(id);
      // <em-emoji id="+1" size="2em"></em-emoji>
      setInput(input + native)
    },
    [input]
  )

  const handleFocus = useCallback(() => {
    console.log('focus')
    socket.send(
      JSON.stringify({
        room: selectedUser,
        type: 'select',
        data: null
      })
    )
  }, [socket, selectedUser])

  const handleBlur = useCallback(() => {
    console.log('blur')
    if (selectedUser) {
      socket.send(
        JSON.stringify({
          room: 'admin-room',
          type: 'select',
          data: selectedUser
        })
      )
    }
  }, [socket, selectedUser])

  const adjustHeight = () => {
    const maxRows = 10
    const lineHeight = 24
    const maxHeight = lineHeight * maxRows

    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto'
      textAreaRef.current.style.height = `${Math.min(
        textAreaRef.current.scrollHeight,
        maxHeight
      )}px`
      textAreaRef.current.style.overflowY =
        textAreaRef.current.scrollHeight > maxHeight ? 'auto' : 'hidden'
    }
  }

  useEffect(() => {
    adjustHeight()
  }, [input])

  return (
    <>
      <form
        className="absolute left-0 bottom-0 w-full h-24 p-5 flex items-end gap-5 bg-input-form"
        method="POST"
        onSubmit={handleSubmit}
      >
        {files && files.length > 0 && (
          <div
            className={clsx(
              'absolute -top-24 right-6 text-red-600 w-full flex justify-end items-end gap-1'
            )}
          >
            {files.map((item, index) => (
              <FileItem
                key={index}
                src={item.path}
                onClick={handleClickRemoveFile}
              />
            ))}
          </div>
        )}
        <div className="w-[calc(100%_-_80px)] min-h-[60px] bg-[#EEF1F4] rounded-xl overflow-auto px-14 py-2 flex items-center">
          <textarea
            ref={textAreaRef}
            value={input}
            onKeyDown={handleKeyDown}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            rows={1}
            placeholder="Type your message here"
            className="resize-none outline-none w-full bg-[#EEF1F4] text-lg text-[#34335B] overflow-hidden"
          />
        </div>
        <Emoji addEmoji={addEmoji} />
        <FileUploader setFiles={handleSetFiles} />
        <button
          type="submit"
          className="w-[60px] h-[60px] bg-chat-send-button rounded-xl flex justify-center items-center"
        >
          <SendIcon />
        </button>
      </form>
    </>
  )
}

export default ChatInput

const FileUploader = ({ setFiles }) => {
  const fileInputRef = useRef(null)

  const handleFileChange = useCallback(
    async ({ target: { files } }) => {
      const selectedFiles = [...files]
      const formData = new FormData()

      selectedFiles.forEach((file, index) => {
        formData.append(`file_${index}`, file)
      })
      console.log(selectedFiles)

      try {
        const response = await axios.post(
          SERVER_ADDRESS + '/api/upload',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        )

        console.log(response.data)

        if (response.status === 200) {
          console.log('Files uploaded successfully', selectedFiles)
          setFiles(response.data.path)
        } else {
          console.error('Error uploading files')
        }
      } catch (error) {
        console.error('Error:', error)
      }
    },
    [setFiles]
  )

  const openFileDialog = useCallback(() => {
    if (fileInputRef.current) fileInputRef.current.click()
  }, [])

  return (
    <>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        style={{ display: 'none' }}
        ref={fileInputRef}
      />
      <div
        className="absolute bottom-[38px] right-32 cursor-pointer"
        onClick={openFileDialog}
      >
        <AttachmentIcon />
      </div>
    </>
  )
}

const Emoji = ({ addEmoji }) => {
  const [showPicker, setShowPicker] = useState(0)

  const handleToggleEmoji = useCallback(
    () => setShowPicker(showPicker === 1 ? 2 : 0),
    [showPicker]
  )

  const handleShowEmoji = useCallback(() => setShowPicker(1), [])

  return (
    <>
      <div className="absolute bottom-20">
        {showPicker > 0 && (
          <Picker
            data={data}
            autoFocus={true}
            navPosition="bottom"
            previewPosition="none"
            emojiButtonColors={['rgba(49,59,67,.7)']}
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
  )
}

const FileItem = ({ src, onClick }) => {
  const ext = src.substring(src.lastIndexOf('.') + 1)
  const type = MEDIA_TYPES.includes(ext.toLowerCase()) ? 'media' : 'file'
  const title = src.substring(src.indexOf('-') + 1)

  const handleClick = useCallback(() => onClick(src), [src, onClick])

  return (
    <div>
      <div className="h-20 w-24 overflow-hidden flex justify-center items-center border rounded-lg relative bg-white">
        <div
          className="absolute top-0 left-0 w-full h-full rounded-xl flex items-center justify-center text-[#FFF0] hover:cursor-pointer hover:bg-[#0008] hover:text-[#FFF] font-bold transition-all"
          onClick={handleClick}
        >
          X
        </div>
        {type === 'file' && (
          <div className="flex flex-col">
            <span className="text-center font-bold">{ext}</span>
            <span className="text-center text-xs w-16 break-words overflow-hidden">
              {title.length > 15 ? `${title.substring(0, 15)}...` : title}
            </span>
          </div>
        )}
        {type === 'media' && (
          <img
            alt="file"
            src={`${SERVER_ADDRESS}/${src}`}
            width={96}
            height={80}
            className="w-full rounded"
          />
        )}
      </div>
    </div>
  )
}
