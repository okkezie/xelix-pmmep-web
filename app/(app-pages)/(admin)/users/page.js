'use client'
import UsersPage from "@/components/pages/Admin/UsersPage/UsersPage"
import { get } from "@/utils/Api"
import { Constants } from "@/utils/Constants"
import { useState, useEffect } from "react"
import { getPromiseResult } from "@/utils/helpers"
import UsersLoading from "./loading"

export default function Users() {
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState([])
  const [roles, setRoles] = useState([])
  const [permissions, setPermissions] = useState([])
  const [userTypes, setUserTypes] = useState([])
  const [mdas, setMdas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const usersPromise = get(Constants.ApiPaths.Users, true)
      const rolesPromise = get(Constants.ApiPaths.Roles, true)
      const permissionsPromise = get(Constants.ApiPaths.Permissions, true)
      const userTypesPromise = get(Constants.ApiPaths.UserTypes, true)
      const mdasPromise = get(Constants.ApiPaths.MDAs, true)
      const [
        usersResult, 
        rolesResult, 
        permissionsResult, 
        userTypesResult, 
        mdasResult
      ] = await Promise.allSettled(
        [
          usersPromise, 
          rolesPromise, 
          permissionsPromise, 
          userTypesPromise, 
          mdasPromise
        ]
      )
      setUsers(getPromiseResult(usersResult))
      setRoles(getPromiseResult(rolesResult))
      setPermissions(getPromiseResult(permissionsResult))
      setUserTypes(getPromiseResult(userTypesResult))
      setMdas(getPromiseResult(mdasResult))
      setLoading(false)
    }
    fetchData()
  }, [])

  return (
    loading ? <UsersLoading /> :
      <UsersPage users={users} roles={roles} permissions={permissions} userTypes={userTypes} mdas={mdas} />
  )
}
