import React, { useCallback, useEffect, useState } from 'react'
import clsx from 'clsx'
import { LeftVectorIcon, RightVectorIcon } from '@icons'
import ChatPanel from './chatpanel'
import PinnedPanel from './pinnedpanel'
import { UserHeadItem } from './Message'

const AdminMessage = ({ setShowUsersPanel, hide }) => {
  const [showPinnedPanel, setShowPinnedPanel] = useState(false)

  const handleClickPinnedPanelView = useCallback(
    () => setShowPinnedPanel(!showPinnedPanel),
    [showPinnedPanel]
  )

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1280) setShowPinnedPanel(false)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="w-full h-full">
      <div
        className={clsx(
          'w-full h-[68px] rounded-tl-none rounded-tr-[12px] border border-[#E0E5F2] flex items-center justify-between px-[18px]',
          {
            'rounded-tl-[12px]': hide
          }
        )}
      >
        <div className="flex items-center gap-3">
          <div
            className="cursor-pointer px-2 xl:hidden"
            onClick={setShowUsersPanel}
          >
            {hide ? (
              <RightVectorIcon width={12} height={18} />
            ) : (
              <LeftVectorIcon width={12} height={18} />
            )}
          </div>
          <UserHeadItem />
        </div>
        <div
          className="cursor-pointer px-2 xl:hidden"
          onClick={handleClickPinnedPanelView}
        >
          {showPinnedPanel ? (
            <LeftVectorIcon width={12} height={18} />
          ) : (
            <RightVectorIcon width={12} height={18} />
          )}
        </div>
      </div>
      <div className="w-full h-[calc(100%_-_68px)] flex">
        <ChatPanel hide={showPinnedPanel} />
        <PinnedPanel show={showPinnedPanel} />
      </div>
    </div>
  )
}

export default AdminMessage
