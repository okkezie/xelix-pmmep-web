'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Home() {

    return (
        <div className="bg-white h-screen">
            <div className="relative isolate px-6 pt-14 lg:px-8">
                <div className="mx-auto max-w-2xl py-24 sm:py-30 lg:py-36">
                    <div className="text-center">
                        <div className="flex justify-center mb-[50px]">
                            <Image
                                alt=""
                                src="/abia-state-logo.png"
                                className="h-[120px] w-auto"
                                width={100}
                                height={100}
                            />
                        </div>
                        <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl mt-8 mb-8">
                            Whistle Blower Portal
                        </h1>
                        <div className="text-lg font-medium text-pretty text-gray-500 sm:text-xl/8 mt-8 mb-8">
                            <p>A platform for Abia State residents to report corrupt practices and get rewarded for their efforts.</p>
                        </div>
                        <div className="mt-10 flex items-center justify-center gap-x-6 mt-8 mb-8">
                            <Link
                                href="/report"
                                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Submit Report
                            </Link>
                            <Link href="/" className="text-sm/6 font-semibold text-gray-900">
                                Learn more <span aria-hidden="true">→</span>
                            </Link>
                        </div>
                    </div>

                </div>

                <div className="flex flex-col justify-center gap-y-2 items-center text-sm font-medium text-gray-900 mb-10">
                    <p>
                        &copy; {new Date().getFullYear()} {' '}
                        <Link href="https://www.abia.gov.ng" className="">
                            Abia State Government.
                        </Link>
                        {' '} All rights reserved.
                    </p>
                    <p>
                        <em>
                            Powered by {' '}
                            <Link href="https://stablebuildltd.com" className="">
                                Stablebuild Ltd.
                            </Link>
                        </em>
                    </p>
                </div>

            </div>
        </div>
    )
}
