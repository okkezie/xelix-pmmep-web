'use client'
import MDAs from "@/components/pages/Admin/MDAs/MDAs"
import { useState, useEffect } from 'react'
import { get } from "@/utils/Api"
import { Constants } from "@/utils/Constants"

export default function MDAsPage() {
  const [mdas, setMdas] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const mdaData = await get(Constants.ApiPaths.MDAs, true)
      console.log({mdaData});
      setMdas(mdaData?.result ?? [])
    }
    fetchData()
  }, [])

  return (
    <MDAs mdas={mdas} />
  )
}
