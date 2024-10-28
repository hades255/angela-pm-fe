import React, { useCallback, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import ChatMediaModal from './modal'
import { useAuth } from '@contexts/AuthContext'
import { SERVER_ADDRESS } from '@constants/config'

const ChatMediasPanel = () => {
  const { isAdmin } = useAuth()
  const { attachments, selectedUser } = useSelector(state => state.message)

  const _attachments = useMemo(() => {
    if (isAdmin) {
      if (selectedUser) {
        return attachments.filter(
          item => item.room === selectedUser && item.type === 'media'
        )
      }
      return []
    }
    return (attachments || []).filter(item => item.type === 'media')
  }, [isAdmin, attachments, selectedUser])

  const [viewAll, setViewAll] = useState(false)

  const handleClickViewAll = useCallback(() => setViewAll(true), [])
  const handleCloseViewAll = useCallback(() => setViewAll(false), [])

  return (
    <>
      <div className="mt-5 flex justify-between">
        <span className="text-lg text-[#2B2929] font-bold">Chat Media</span>
        <span
          className="text-[#47548C] font-[500] cursor-pointer"
          onClick={handleClickViewAll}
        >
          View All
        </span>
      </div>
      <div className="flex flex-wrap -mx-1 gap-2">
        {_attachments &&
          _attachments.map(
            (item, index) =>
              index < 5 && (
                <a
                  className="w-full max-w-[75px] h-16 overflow-hidden flex justify-center items-center border rounded-lg cursor-pointer"
                  key={item.id}
                  href={`${SERVER_ADDRESS}/${item.url}`}
                  download={item.url.substring(item.url.indexOf('-') + 1)}
                >
                  <img
                    src={`${SERVER_ADDRESS}/${item.url}`}
                    alt="chat media"
                    className="w-full rounded"
                  />
                </a>
              )
          )}
        {_attachments && _attachments.length > 5 && (
          <div className="w-full max-w-[75px] h-16 overflow-hidden flex justify-center items-center border rounded-lg relative">
            <img
              src="/avatars/user4.png"
              alt="chat media"
              className="rounded-xl w-full max-w-[75px]"
            />
            <div className="absolute top-0 left-0 w-full h-full rounded-lg bg-[#000000A0] flex justify-center items-center text-sm font-bold text-white">
              +{_attachments.length - 5}
            </div>
          </div>
        )}
      </div>
      {viewAll && (
        <ChatMediaModal show={viewAll} onClose={handleCloseViewAll} />
      )}
    </>
  )
}

export default ChatMediasPanel
