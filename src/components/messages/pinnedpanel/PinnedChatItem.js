import React, { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { PinIcon, MoreIcon } from '@icons'
import { useAuth } from '@contexts/AuthContext'
import { useWebSocket } from '@contexts/WebSocketContext'
import { getSelectedUser, setMessagePin } from '@redux/messageSlice'

const PinnedChatItem = ({ message }) => {
  const { text, from, created_at, id } = message

  const userId = useAuth().id
  const dispatch = useDispatch()
  const { socket } = useWebSocket()
  const selectedUser = useSelector(getSelectedUser)

  const username = useMemo(() => {
    if (userId.toString() === from.toString()) return 'You'
    if (selectedUser) return selectedUser.name
  }, [userId, selectedUser, from])

  const handlePin = useCallback(() => {
    dispatch(
      setMessagePin({ id, message: { ...message, id: message.message_id } })
    )
    socket.send(
      JSON.stringify({
        room: 'admin-room',
        type: 'pin',
        data: {
          room: message.room,
          id,
          message: { ...message, id: message.message_id }
        }
      })
    )
  }, [message, dispatch, socket, id])

  return (
    <div className="flex flex-col rounded bg-[#F4F6F8] p-2 gap-1">
      <div className="flex justify-between items-center">
        <div className="flex w-9 h-9 justify-center items-center">
          <PinIcon />
        </div>
        <div className="flex items-center gap-[14px]">
          <span className="text-xs text-[#919090]">
            {moment.utc(created_at).local().format('M/D/YY HH:mm')}
          </span>
          <div className="cursor-pointer" onClick={handlePin}>
            <MoreIcon width={18} height={18} color="#2B2929" />
          </div>
        </div>
      </div>
      <div className="text-sm text-[#2D396B] font-[500]">{username}</div>
      <div className="text-xs text-[#2B2929] font-[500]">
        {text.length > 100 ? text.substring(0, 100) + '...' : text}
      </div>
    </div>
  )
}

export default PinnedChatItem
