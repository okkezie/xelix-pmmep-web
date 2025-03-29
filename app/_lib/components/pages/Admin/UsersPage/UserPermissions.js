import { 
    assignPermission,
    getUserPermissions,
    unAssignPermission
} from "@/actions/userActions"
import Close from "@/svgs/close-line"
import Plus from "@/svgs/plus"
import { useEffect, useState } from "react"
import Spinner from "@/components/atoms/Spinner/Spinner"
import Tooltip from "@/components/molecules/Tooltip/Tooltip"

export default function UserPermissions({user, availablePermissions}) {
    const [permissions, setPermissions] = useState([])
    const [permissionsToAssign, setPermissionsToAssign] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUserPermissions = async () => {
            const userPermissions = await getUserPermissions(user?.id) 
            setPermissions(userPermissions)
            setLoading(false)
        }
        fetchUserPermissions()
        const toAssign = [...availablePermissions].filter(p => !permissions.includes(p))
        setPermissionsToAssign(toAssign)
    }, [user, permissions, availablePermissions])

    const removePermission = (p) => {
        setPermissions([...permissions].filter(x => x !== p))
        unAssignPermission(user?.id, p.id)
    }

    const addPermission = (p) => {
        setPermissions([...permissions, p])
        assignPermission(user?.id, p.id)
    }

    const isAssigned = (p) => {
        return [...permissions].find(x => x.id === p.id)
    }

    const getToolTipPosition = (index) => {
        if (index == 0) return "right"
        if (index == 1) {
            return "bottom"
        }
        return "top"
    }

    return ( 
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="col-span-1 gap-2">
                <h4 className="text-lg font-bold block border-b border-gray-200 pb-2">Assigned Permissions</h4>
                <div className="max-h-[400px] overflow-y-auto overflow-x-hidden flex flex-wrap gap-2">
                    { loading ? <Spinner />
                    : permissions.map((permission, index) =>
                        <Tooltip title={permission?.description} key={permission?.id} position={getToolTipPosition(index)}>
                            <span 
                                className="flex flex-row w-fit items-center gap-2 p-2 border border-gray-200 rounded-md" 
                                title={permission?.description}
                            >
                                {permission?.name} <button className="ml-2" onClick={() => removePermission(permission)}><Close /></button>
                            </span>
                        </Tooltip>
                    )}
                </div>
            </div>

            <div className="col-span-1 gap-2">
                <h4 className="text-lg font-bold block border-b border-gray-200 pb-2">Available Permissions</h4>
                <div className=" max-h-[400px] overflow-y-auto flex flex-wrap gap-2">
                { loading ? <Spinner /> 
                : permissionsToAssign.map((permission) =>
                    isAssigned(permission) ? null
                    : 
                    <Tooltip title={permission?.description} position="bottom" key={permission?.id}>
                        <span 
                            className="flex flex-row w-fit items-center gap-2 p-2 border border-gray-200 rounded-md" 
                            title={permission?.description}
                        >
                            {permission?.name} <button className="ml-2" onClick={() => addPermission(permission)}><Plus /></button>
                        </span>
                    </Tooltip>
                )}
                </div>
            </div>
        </div>
    )
}
