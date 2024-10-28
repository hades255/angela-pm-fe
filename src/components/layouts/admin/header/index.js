import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import clsx from 'clsx'

import { useAuth } from '@contexts/AuthContext'
import { logout } from '@redux/authSlice'
import { useWebSocket } from '@contexts/WebSocketContext'
import { BellIcon, DownVectorIcon, MarkIcon } from '@icons'

const Header = () => {
  const user = useAuth()

  return (
    user.isAuthenticated && (
      <div
        className={clsx(
          'fixed top-0 left-0',
          'w-screen h-[74px]',
          'border border-[#F4F7FE]',
          'bg-white',
          'shadow-[0_1px_2px_#0000000F,0_1px_3px_#0000001A]',
          'px-8 z-20'
        )}
      >
        <div className="w-full h-full flex justify-between items-center">
          <div className="sm:invisible">
            <MarkIcon />
          </div>
          <div className="flex items-center">
            <div className="flex justify-center items-center w-10 h-10 rounded-lg bg-[#F2F4F1] hover:bg-[#ced1cc] relative mr-3 cursor-pointer transition-all">
              <BellIcon />
              <span className="absolute top-3 left-[22px] w-[6px] h-[6px] rounded bg-red-500"></span>
            </div>
            <div className="flex items-center">
              <div className="px-3 flex flex-col items-end">
                <div className="text-[20px] font-bold">{user.name}</div>
                <div className="text-sm text-[#64748B]">Project Manager</div>
              </div>
              <Dropdown user={user} />
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default Header

const Dropdown = ({ user }) => {
  const dispatch = useDispatch()
  const { setLogout } = useWebSocket()
  const [show, setShow] = useState(false)

  const handleClickOpen = useCallback(() => setShow(!show), [show])

  const handleSignout = useCallback(() => {
    setLogout(prev => !prev)
    setShow(false)
    dispatch(logout())
  }, [dispatch, setLogout])

  return (
    <div
      className="flex items-center cursor-pointer relative"
      onClick={handleClickOpen}
    >
      <div className="mx-1 w-10 h-10 rounded-[40px] bg-[#F2F4F1]">
        <img
          src={`/avatars/${user.avatar || 'user0.png'}`}
          alt="user avatar"
          className="w-10 h-10 rounded-[40px]"
        />
      </div>
      <div className="px-1">
        <DownVectorIcon />
      </div>
      {show && (
        <div
          className={clsx(
            'absolute top-12 right-0',
            'w-32 h-12',
            'rounded-lg border',
            'bg-white shadow-xl',
            'flex items-center justify-center',
            'hover:bg-slate-300'
          )}
          onClick={handleSignout}
        >
          Logout
        </div>
      )}
    </div>
  )
}
