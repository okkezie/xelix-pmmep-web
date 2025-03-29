
export default function UserDetails({user}) {

    return (
        <div className="flex flex-col gap-4 divide-y divide-gray-300 dark:divide-gray-700">
            <div className="grid grid-cols-2 gap-2 pt-3 pl-4">
                <h3 className="text-sm text-gray-500 col-span-1">Email</h3>
                <p className="col-span-1">{user?.email}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-3 pl-4">
                <h3 className="text-sm text-gray-500 col-span-1">Phone Number</h3>
                <p className="col-span-1">{user?.phone}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-3 pl-4">
                <h3 className="text-sm text-gray-500 col-span-1">Gender</h3>
                <p className="col-span-1">{user?.gender}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-3 pl-4">
                <h3 className="text-sm text-gray-500 col-span-1">MDA</h3>
                <p className="col-span-1">{user?.mda?.name}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-3 pl-4">
                <h3 className="text-sm text-gray-500 col-span-1">User Type</h3>
                <p className="col-span-1">{user?.userType}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-3 pl-4">
                <h3 className="text-sm text-gray-500 col-span-1">Role</h3>
                <p className="col-span-1">{user?.role?.name}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-3 pl-4">
                <h3 className="text-sm text-gray-500 col-span-1">Status</h3>
                <p className="col-span-1">{user?.status}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-3 pl-4">
                <h3 className="text-sm text-gray-500 col-span-1">Created At</h3>
                <p className="col-span-1">{user?.createdAt}</p>
            </div>
        </div>
    )
}
