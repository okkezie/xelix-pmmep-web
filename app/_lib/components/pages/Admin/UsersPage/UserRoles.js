import { 
    assignRole,
    getUserRoles,
    unAssignRole
} from "@/actions/userActions"
import Close from "@/svgs/close-line"
import Plus from "@/svgs/plus"
import { useEffect, useState } from "react"
import Spinner from "@/components/atoms/Spinner/Spinner"
import Tooltip from "@/components/molecules/Tooltip/Tooltip"

export default function UserRoles({user, availableRoles}) {
    const [roles, setRoles] = useState([])
    const [rolesToAssign, setRolesToAssign] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUserRoles = async () => {
            const userRoles = await getUserRoles(user?.id) 
            setRoles(userRoles)
            setLoading(false)
        }
        fetchUserRoles()
        const toAssign = [...availableRoles].filter(r => !roles.includes(r))
        setRolesToAssign(toAssign)
    }, [user, roles, availableRoles])

    const removeRole = (r) => {
        setRoles([...roles].filter(x => x !== r))
        unAssignRole(user?.id, r.id)
    }

    const addRole = (r) => {
        setRoles([...roles, r])
        assignRole(user?.id, r.id)
    }

    const isAssigned = (r) => {
        return [...roles].find(x => x.id === r.id)
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
                <h4 className="text-lg font-bold block border-b border-gray-200 pb-2">Assigned Roles</h4>
                <div className="max-h-[400px] overflow-y-auto overflow-x-hidden flex flex-wrap gap-2">
                    { loading ? <Spinner />
                    : roles.map((role, index) =>
                        <Tooltip title={role?.description} key={role?.id} position={getToolTipPosition(index)}>
                            <span 
                                className="flex flex-row w-fit items-center gap-2 p-2 border border-gray-200 rounded-md" 
                                title={role?.description}
                            >
                                {role?.name} <button className="ml-2" onClick={() => removeRole(role)}><Close /></button>
                            </span>
                        </Tooltip>
                    )}
                </div>
            </div>

            <div className="col-span-1 gap-2">
                <h4 className="text-lg font-bold block border-b border-gray-200 pb-2">Available Roles</h4>
                <div className=" max-h-[400px] overflow-y-auto flex flex-wrap gap-2">
                { loading ? <Spinner /> 
                : rolesToAssign.map((role) =>
                    isAssigned(role) ? null
                    : 
                    <Tooltip title={role?.description} position="bottom" key={role?.id}>
                        <span 
                            className="flex flex-row w-fit items-center gap-2 p-2 border border-gray-200 rounded-md" 
                            title={role?.description}
                        >
                            {role?.name} <button className="ml-2" onClick={() => addRole(role)}><Plus /></button>
                        </span>
                    </Tooltip>
                )}
                </div>
            </div>
        </div>
    )
}
