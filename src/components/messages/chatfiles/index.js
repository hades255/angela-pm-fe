import React, { useCallback, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'
import ChatFilesModal from './modal'
import { Mp4Icon, DocumentIcon } from '@icons'
import { sizeDecoration } from '@helpers'
import { useAuth } from '@contexts/AuthContext'
import { SERVER_ADDRESS } from '@constants/config'

const ChatFilesPanel = () => {
  const { isAdmin } = useAuth()
  const { attachments, selectedUser } = useSelector(state => state.message)

  const _attachments = useMemo(() => {
    if (isAdmin) {
      if (selectedUser) {
        return attachments.filter(
          item => item.room === selectedUser && item.type === 'file'
        )
      }
      return []
    }
    return (attachments || []).filter(item => item.type === 'file')
  }, [isAdmin, attachments, selectedUser])

  const [viewAll, setViewAll] = useState(false)

  const handleClickViewAll = useCallback(() => setViewAll(true), [])
  const handleCloseViewAll = useCallback(() => setViewAll(false), [])

  return (
    <>
      <div className="mt-5 flex justify-between">
        <span className="text-lg text-[#2B2929] font-bold">Chat Files</span>
        <span
          className="text-[#47548C] font-[500] cursor-pointer"
          onClick={handleClickViewAll}
        >
          View All
        </span>
      </div>
      <div>
        {_attachments &&
          _attachments.map(
            (item, index) =>
              index < 3 && (
                <ChatFileItem
                  key={item.id}
                  size={item.size}
                  url={item.url}
                  createdAt={moment
                    .utc(item.created_at)
                    .local()
                    .format('D MMMM YYYY')}
                />
              )
          )}
      </div>
      {viewAll && (
        <ChatFilesModal show={viewAll} onClose={handleCloseViewAll} />
      )}
    </>
  )
}

export default ChatFilesPanel

const ChatFileItem = ({ size, createdAt, url }) => {
  const title = url.substring(url.indexOf('-') + 1)
  const type = url.substring(url.lastIndexOf('.') + 1)

  return (
    <div className="h-[64px] flex items-center px-3 gap-3">
      <div className="w-12 min-w-12 h-12 rounded-[24px] bg-[#F1F5F9] flex justify-center items-center">
        {type === 'mp4' && <Mp4Icon />}
        {type === 'doc' && <DocumentIcon />}
        {!(type === 'mp4' || type === 'doc') && (
          <span className="font-bold capitalize">{type}</span>
        )}
      </div>
      <div className="flex flex-col">
        <a
          className="text-sm text-[#34335B] font-bold cursor-pointer"
          href={`${SERVER_ADDRESS}/${url}`}
          download={title}
        >
          {title.length > 20 ? `${title.substring(0, 20)}...` : title}
        </a>
        <div className="flex">
          <span className="text-xs text-[#34335B] min-w-14">
            {sizeDecoration(size)}
          </span>
          <span className="text-xs text-[#34335B] ">{createdAt}</span>
        </div>
      </div>
    </div>
  )
}
