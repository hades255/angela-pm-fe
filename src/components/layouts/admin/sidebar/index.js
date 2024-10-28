import React from 'react'
import clsx from 'clsx'
import {
  MarkIcon,
  DashboardIcon,
  PartIcon,
  MessagesIcon,
  UsersIcon,
  SupportIcon,
  OpenSidebarIcon
} from '@icons'

import { useAuth } from '@contexts/AuthContext'

const Sidebar = () => {
  const user = useAuth()

  return (
    user.isAuthenticated && (
      <div className="fixed top-0 left-[-74px] sm:left-0 z-30 w-[74px] h-screen min-h-screen max-h-screen border border-[#E2E8F0] bg-white transition-all">
        <div className="h-full max-h-[1024px] flex flex-col justify-between relative">
          <div>
            <div className="pt-7 pb-10 flex justify-center">
              <div className="cursor-pointer">
                <MarkIcon />
              </div>
            </div>
            <div className="pt-5 flex flex-col items-center gap-4">
              <div
                className={clsx(
                  'cursor-pointer p-3 transition-all rounded-lg hover:bg-[#2B292940]',
                  {
                    'bg-[#2B2929] border-2 border-[#242222]': false
                  }
                )}
              >
                <DashboardIcon color={false ? 'white' : '#64748B'} />
              </div>
              <div
                className={clsx(
                  'cursor-pointer p-3 transition-all rounded-lg hover:bg-[#2B292940]',
                  {
                    'bg-[#2B2929] border-2 border-[#242222]': false
                  }
                )}
              >
                <PartIcon color={false ? 'white' : '#64748B'} />
              </div>
              <div
                className={clsx(
                  'cursor-pointer p-3 transition-all rounded-lg hover:bg-[#2B292940]',
                  {
                    'bg-[#2B2929] border-2 border-[#242222]': true
                  }
                )}
              >
                <MessagesIcon color={true ? 'white' : '#64748B'} />
              </div>
              <div
                className={clsx(
                  'cursor-pointer p-3 transition-all rounded-lg hover:bg-[#2B292940]',
                  {
                    'bg-[#2B2929] border-2 border-[#242222]': false
                  }
                )}
              >
                <UsersIcon color={false ? 'white' : '#64748B'} />
              </div>
            </div>
          </div>
          <div className="flex justify-center pb-10">
            <div
              className={clsx(
                'cursor-pointer p-3 transition-all rounded-lg hover:bg-[#2B292940]',
                {
                  'bg-[#2B2929] border-2 border-[#242222]': false
                }
              )}
            >
              <SupportIcon color={false ? 'white' : '#64748B'} />
            </div>
          </div>
          <div className="absolute top-1/2 right-[-15px] cursor-pointer">
            <OpenSidebarIcon />
          </div>
        </div>
      </div>
    )
  )
}

export default Sidebar
