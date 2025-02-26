'use client'
import Roles from "@/components/pages/Admin/Roles/Roles"
import { get } from "@/utils/Api"
import { Constants } from "@/utils/Constants"
import { useState, useEffect } from "react"
import { getPromiseData } from "@/utils/helpers"

export default function RolesPage() {
  const [roles, setRoles] = useState([])  
  const [permissions, setPermissions] = useState([])
  const [roleAudiences, setRoleAudiences] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const rolesPromise = get(Constants.ApiPaths.Roles, true)
      const permissionsPromise = get(Constants.ApiPaths.Permissions, true)
      const roleAudiencesPromise = get(Constants.ApiPaths.RoleAudiences, true)
      const [rolesResult, permissionsResult, roleAudiencesResult] = await Promise.allSettled([rolesPromise, permissionsPromise, roleAudiencesPromise])

      setRoles(getPromiseData(rolesResult))
      setPermissions(getPromiseData(permissionsResult))
      setRoleAudiences(getPromiseData(roleAudiencesResult))
    }
    fetchData()
  }, [])

  return (
    <Roles roles={roles} permissions={permissions} roleAudiences={roleAudiences} />
  )
}
