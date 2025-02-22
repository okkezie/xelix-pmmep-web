'use client'
import { useState, useEffect } from "react"

export default function PageLoader() {
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        if(document.readyState === "complete") {
            setLoaded(true)
        }
        else if(document.readyState === "interactive") {
            setLoaded(true)
        }
        else {
            window.addEventListener("DOMContentLoaded", () => {
                setTimeout(() => {
                    setLoaded(true)
                }, 2000)
            });
            window.addEventListener("load", () => {
                setLoaded(true)
            });
        }
        return () => {
            window.removeEventListener('DOMContentLoaded', () => {})
        }
    }, [])
    
    return loaded ? null : (
        <div
            className="fixed left-[0px] top-[0px] z-[999999] flex h-screen w-screen items-center justify-center bg-white dark:bg-black"
        >
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-green-500 border-t-transparent"></div>
        </div>
    )
}
