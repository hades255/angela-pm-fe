import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import clsx from 'clsx'
import { AnimTypingIcon } from '@icons'
import { login } from '@redux/authSlice'
import { initMessage } from '@redux/messageSlice'
import { useWebSocket } from '@contexts/WebSocketContext'
import { SERVER_ADDRESS } from '@constants/config'

const Signin = () => {
  const dispatch = useDispatch()
  const { socket } = useWebSocket()
  const [username, setUsername] = useState('admin')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleInputChange = useCallback(({ target: { value } }) => {
    setUsername(value)
  }, [])

  const signin = useCallback(async (username, dispatch, socket) => {
    setError('')
    try {
      const response = await axios.post(SERVER_ADDRESS + '/api/login', {
        name: username
      })
      console.log(response.data)
      if (response.data.error) {
        setError(response.data.message)
        setLoading(false)
        return
      }
      socket.send(
        JSON.stringify({
          room: response.data.user.room,
          type: 'login',
          data: response.data.user
        })
      )
      dispatch(login({ user: response.data.user, admin: response.data.admin }))
      const isAdmin = response.data.user.id === response.data.admin.id
      dispatch(
        initMessage({
          isAdmin,
          admin: response.data.admin,
          room: response.data.user.room,
          messages: response.data.messages,
          pinned: response.data.pinned,
          attachments: response.data.attachments,
          select: isAdmin ? null : response.data.admin.room,
          users: isAdmin ? response.data.users : [response.data.admin]
        })
      )
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }, [])

  const handleSubmit = useCallback(
    async e => {
      e.preventDefault()
      setLoading(true)
      signin(username, dispatch, socket)
    },
    [username, dispatch, socket, signin]
  )

  useEffect(() => {
    const _username = localStorage.getItem('chat-username')
    if (_username) {
      setUsername(_username)
      setLoading(true)
      if (socket.readyState === 1) signin(_username, dispatch, socket)
    }
  }, [dispatch, socket, socket.readyState, signin])

  return (
    <>
      <div
        className={clsx(
          'w-screen h-screen',
          'flex justify-center items-center',
          'bg-white'
        )}
      >
        <form method="POST" onSubmit={handleSubmit}>
          <div
            className={clsx(
              'flex flex-col',
              'relative',
              'w-[400px] max-w-full',
              'bg-primary/40',
              'rounded-xl',
              'p-8 mb-[100px]',
              'text-black',
              'shadow-xl'
            )}
          >
            <p className="text-black">Display name</p>
            <input
              className={clsx(
                'border-0 ring-0',
                'text-black dark:text-white',
                '!outline-none !shadow-input-normal',
                'focus:ring-0 focus:border-primary focus:shadow-input-focus',
                'w-full',
                'px-4 py-3',
                'rounded-md',
                'mt-2'
              )}
              value={username}
              onChange={handleInputChange}
              placeholder="Type your name..."
              required
            />
            {error && (
              <p className={clsx('my-1 text-red-500 text-sm font-semibold')}>
                {error}
              </p>
            )}
            <button
              type="submit"
              className={clsx(
                'bg-primary',
                'px-4 py-3',
                'rounded-md',
                'mt-3',
                'w-full',
                'text-white'
              )}
            >
              Login
            </button>
          </div>
        </form>
      </div>
      {(socket.readyState !== 1 || loading) && (
        <div
          className={clsx(
            'fixed top-0 left-0',
            'w-screen h-screen',
            'bg-[#00000050]',
            'flex justify-center items-center'
          )}
        >
          <span
            className={clsx(
              'text-white font-bold text-xl',
              'flex items-baseline'
            )}
          >
            Loading <AnimTypingIcon color={'white'} />
          </span>
        </div>
      )}
    </>
  )
}

export default Signin
