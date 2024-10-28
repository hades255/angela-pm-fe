import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useWebSocket } from '@contexts/WebSocketContext'

const StatusMonitor = () => {
  const { isAdmin, status } = useSelector(state => state.auth)
  const { socket } = useWebSocket()
  const { selectedUser, room } = useSelector(state => state.message)
  const [last, setLast] = useState(0)

  const sendStatus = useCallback(
    (socket, status) => {
      console.log(status)
      socket.send(
        JSON.stringify({
          room: isAdmin ? selectedUser || 'admin-room' : room,
          type: isAdmin ? 'status' : 'user-status',
          data: status
        })
      )
    },
    [isAdmin, selectedUser, room]
  )

  useEffect(() => {
    console.log(socket.readyState, last, status)
    if (last === status) return
    setLast(status)
    if (socket.readyState === 1) sendStatus(socket, status)
  }, [status, last, socket, sendStatus])

  return <></>
}

export default StatusMonitor
