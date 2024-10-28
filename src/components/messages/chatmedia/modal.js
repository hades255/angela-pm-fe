import React, { useCallback, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'
import clsx from 'clsx'

import { SearchIcon, DownloadIcon, MoreIcon, LeftVectorIcon } from '@icons'
import { useAuth } from '@contexts/AuthContext'
import { SERVER_ADDRESS } from '@constants/config'

const ChatMediaModal = ({ show, onClose }) => {
  const { isAdmin } = useAuth()
  const { attachments, selectedUser } = useSelector(state => state.message)
  const [close, setClose] = useState(false)
  const [input, setInput] = useState('')

  const handleInputChange = useCallback(
    ({ target: { value } }) => setInput(value),
    []
  )

  const _attachments = useMemo(() => {
    if (isAdmin) {
      if (selectedUser) {
        return attachments.filter(
          item =>
            item.room === selectedUser &&
            item.type === 'media' &&
            item.url.indexOf(input) !== -1
        )
      }
      return []
    }
    return (attachments || []).filter(
      item => item.type === 'media' && item.url.indexOf(input) !== -1
    )
  }, [isAdmin, attachments, selectedUser, input])

  const handleClickClose = useCallback(() => {
    setClose(true)
    setTimeout(() => {
      onClose()
    }, 300)
  }, [onClose])

  return (
    <>
      <div
        className={clsx(
          'fixed top-0 left-0 w-screen h-screen bg-[#535353C8] z-30',
          {
            'animate-fadeIn': show,
            'animate-fadeOut': close
          }
        )}
        onClick={handleClickClose}
      ></div>
      <div
        className={clsx(
          'fixed right-0 top-0 w-full max-w-[540px] h-screen bg-white z-30',
          {
            'animate-right-modal-in': show,
            'animate-right-modal-out': close
          }
        )}
      >
        <div className="min-h-[50px] h-[50px] text-2xl font-bold text-[#2B2929] px-10 mt-16 flex items-center">
          <span
            onClick={handleClickClose}
            className="md:hidden cursor-pointer px-2 mr-2"
          >
            <LeftVectorIcon width={12} height={18} />
          </span>
          Chat Media
        </div>
        <div className="px-10 min-h-[84px] h-[84px] flex items-center gap-5">
          <div className="w-full h-[44px] relative">
            <input
              className="w-full h-full border border-[#A3AED0] bg-[#F6F8FD] text-xs text-[#919090] rounded-lg pl-11 pe-4 py-3"
              placeholder="Search Files"
              value={input}
              onChange={handleInputChange}
            />
            <div className="absolute top-0 left-4 h-full flex items-center cursor-pointer">
              <SearchIcon />
            </div>
          </div>
          <div className="w-[44px] min-w-[44px] h-[44px] min-h-[44px] flex justify-center items-center cursor-pointer bg-[#F1F5F9] rounded-lg">
            <DownloadIcon />
          </div>
        </div>
        <div className="px-10 py-5 flex flex-wrap h-[calc(100%_-_240px)] overflow-y-scroll">
          {_attachments &&
            _attachments.map(item => (
              <MediaItem
                key={item.id}
                url={item.url}
                size={'480KB'}
                createdAt={moment
                  .utc(item.created_at)
                  .local()
                  .format('D MMMM YYYY')}
              />
            ))}
        </div>
      </div>
    </>
  )
}

export default ChatMediaModal

const MediaItem = ({ url, createdAt }) => {
  const title = url.substring(url.indexOf('-') + 1)

  return (
    <div className="w-1/3 p-2 gap-[15px] relative">
      <div className="flex flex-col gap-[15px]">
        <a
          className="w-full min-w-full h-32 overflow-hidden flex justify-center items-center rounded-xl border cursor-pointer"
          href={`${SERVER_ADDRESS}/${url}`}
          download={title}
        >
          <img
            alt="file"
            src={`${SERVER_ADDRESS}/${url}`}
            width={128}
            height={128}
            className="rounded"
          />
        </a>
        <div>
          <div className="text-[#34335B] font-bold w-full text-nowrap overflow-hidden">
            {title.length > 15 ? `${title.substring(0, 15)}...` : title}
          </div>
          <span className="text-xs text-[#34335B90]">{createdAt}</span>
        </div>
      </div>
      <div className="absolute top-2 right-3 cursor-pointer">
        <MoreIcon />
      </div>
    </div>
  )
}
