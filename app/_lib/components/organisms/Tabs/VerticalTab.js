'use client'
import { TabContent, TabIcon } from "./Tabs";
import Badge from '@/components/atoms/Badge/Badge'
import clsx from "clsx"
import { useState, useEffect } from 'react'

export default function VerticalTabs({ data }) {

    const [activeTab, setActiveTab] = useState()

    useEffect(() => {
      setActiveTab(data?.activeTabId ?? 0)
    }, [data])

    return (
        <div className="flex flex-col gap-6 sm:flex-row sm:gap-8 rounded-xl border border-gray-200 p-6 dark:border-gray-800">
            <VerticalTabButton tabs={data?.tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="flex-1">
                <div className="">
                    <TabContent  tabs={data?.tabs} activeTab={activeTab} showHeading={data?.showTabHeading} />
                </div>
            </div>
        </div>
    )
}

function VerticalTabButton({tabs, setActiveTab, activeTab}) {
    const btnClass = (tabIndex) =>  activeTab === tabIndex 
        ? ' text-brand-500 dark:bg-brand-400/20 dark:text-brand-400 bg-brand-50 ' 
        : 'bg-transparent text-gray-500 border-transparent hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-200'
    return (
        <div
            className={clsx("overflow-x-auto pb-2 sm:w-[200px] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-100 ",
                "dark:[&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-track]:bg-white ",
                "dark:[&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:h-1.5",
                "border-r border-gray-200 p-6 dark:border-gray-800")}
        >
            <nav className="flex w-full flex-row md:flex-col sm:space-y-2">
            { tabs?.map(tab => 
                <button
                    onClick={() => setActiveTab(tab?.id)}
                    key={tab?.id}
                    className={`flex flex-row justify-between gap-3 items-center inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ease-in-out sm:p-3 ${btnClass(tab?.id)}`}
                >
                    <span className="flex flex-row gap-3">
                        <TabIcon icon={tab?.icon} isActive={activeTab == tab?.id} />
                        { tab?.title }
                    </span>
                    { tab?.badge && <Badge color="light">{tab?.badge}</Badge> }
                </button>
            )}
            </nav>
        </div>
    )
}