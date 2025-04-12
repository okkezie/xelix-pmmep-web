'use client'
import MDAs from "@/components/pages/Admin/MDAs/MDAs"
import { useState, useEffect } from 'react'
import { get } from "@/utils/Api"
import { Constants } from "@/utils/Constants"
import MdaLoading from "./loading"

export default function MDAsPage() {
  const [loading, setLoading] = useState(true)
  const [mdas, setMdas] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const mdaData = await get(Constants.ApiPaths.MDAs, true)
      console.log({mdaData});
      setMdas(mdaData?.result ?? [])
      setLoading(false)
    }
    fetchData()
  }, [])

  return (
    loading ? <MdaLoading /> : <MDAs mdas={mdas} />
  )
}
