import { useLayoutEffect, useRef, useState } from "react";
import HeaderUserButton from "@/components/atoms/Header/HeaderUserButton/HeaderUserButton";
import HeaderUserDropdownList from "@/components/molecules/Header/HeaderUserDropdownList/HeaderUserDropdownList";

export default function HeaderUserIcon({ user }) {
    const dropdownRef = useRef(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    
    useLayoutEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownOpen && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [dropdownOpen]);

    return (
        <div className="relative">
            <HeaderUserButton user={user} dropdownOpen={dropdownOpen} setDropdownOpen={setDropdownOpen} />
            <HeaderUserDropdownList dropdownOpen={dropdownOpen} user={user} ref={dropdownRef} />
        </div>
    )
}
