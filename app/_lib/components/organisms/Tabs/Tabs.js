'use client'
import Badge from '@/components/atoms/Badge/Badge'
import { useEffect, useState } from "react"

/* 
  const data = {
    activeTabId: 1,
    showTabHeading: true,
    tabs: [
      {
        id: 1,
        title: "Tab 1",
        content: <>This is tab one...</>,
        icon: <svg></svg>,
        badge: "0",
      },
      .
      .
      .
    ]
  }

*/
export default function Tabs({ data }) {
  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    setActiveTab(data?.activeTabId ?? 0)
  }, [data])

  return (
    <div
      className="rounded-xl border border-gray-200 p-6 dark:border-gray-800"
    >
      <TabHeader tabs={data?.tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      <TabContent tabs={data?.tabs} activeTab={activeTab} showHeading={data?.showTabHeading} />
    </div >
  )
}

const TabHeader = ({ tabs, activeTab, setActiveTab }) => {

  const getTabClass = (tabIndex) => {
    return activeTab === tabIndex ? ' text-brand-500 dark:border-brand-400 border-brand-600 dark:text-brand-400' : 'bg-transparent text-gray-900 border-transparent hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
  }

  return (
    <div className="border-b border-gray-200 dark:border-gray-800">
      <nav
        className="-mb-px flex space-x-2 overflow-x-auto [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600 dark:[&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:h-1.5"
      >
        {tabs?.map(tab =>
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`inline-flex items-center gap-2 border-b-2 px-2.5 py-2 text-sm font-medium transition-colors duration-200 ease-in-out ${getTabClass(tab?.id)}`}
          >
            <TabIcon icon={tab?.icon} isActive={activeTab == tab?.id} />
            {tab?.title}
            { tab?.badge && <Badge color="light">{tab?.badge}</Badge> }
          </button>
        )}
      </nav>
    </div>
  )
}

export const TabIcon = ({ icon, isActive }) => {
  return (
    <>
    <style>
      {`svg  {fill: 'currentColor' }`}
    </style>
    <span
      className={isActive ? 'fill-brand-500 dark:fill-brand-400' : 'fill-gray-900 dark:fill-gray-400'}
    >
      { icon }
    </span>
    </>
  )
}

export const TabContent = ({ tabs, activeTab, showHeading }) => {

  return (
    <div className="pt-4 dark:border-gray-800">
      {tabs?.map(tab =>
        <div key={tab.id} className={activeTab === tab?.id ? 'block' : 'hidden'}>
          {showHeading &&
            <h3 className="mb-1 text-xl font-medium text-gray-800 dark:text-white/90">
              {tab.title}
            </h3>
          }
          {tab?.content}
        </div>
      )}
    </div>
  )
}