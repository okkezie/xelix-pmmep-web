'use client'
import Roles from "@/components/pages/Admin/Roles/Roles"
import { get } from "@/utils/Api"
import { Constants } from "@/utils/Constants"
import { useState, useEffect } from "react"
import { getPromiseResult } from "@/utils/helpers"
import RolesLoading from "./loading"

export default function RolesPage() {
  const [loading, setLoading] = useState(true)
  const [roles, setRoles] = useState([])  
  const [permissions, setPermissions] = useState([])
  const [roleAudiences, setRoleAudiences] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const rolesPromise = get(Constants.ApiPaths.Roles, true)
      const permissionsPromise = get(Constants.ApiPaths.Permissions, true)
      const roleAudiencesPromise = get(Constants.ApiPaths.RoleAudiences, true)
      const [rolesResult, permissionsResult, roleAudiencesResult] = await Promise.allSettled([rolesPromise, permissionsPromise, roleAudiencesPromise])

      setRoles(getPromiseResult(rolesResult))
      setPermissions(getPromiseResult(permissionsResult))
      setRoleAudiences(getPromiseResult(roleAudiencesResult))
      setLoading(false)
    }
    fetchData()
  }, [])

  return (
    loading
    ? <RolesLoading />
    : <Roles roles={roles} permissions={permissions} roleAudiences={roleAudiences} />
  )
}
