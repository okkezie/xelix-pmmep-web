import { useLayoutEffect, useRef, useState, useEffect } from "react";
import HeaderUserButton from "@/components/atoms/Header/HeaderUserButton/HeaderUserButton";
import HeaderUserDropdownList from "@/components/molecules/Header/HeaderUserDropdownList/HeaderUserDropdownList";
import { getCookie } from "cookies-next";
import { Constants } from "@/utils/Constants";

export default function HeaderUserIcon() {
    const dropdownRef = useRef(null);
    const [user, setUser] = useState({name: "Unknown User", email: "unknown.user@example.com"});
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        setUser(JSON.parse(getCookie(Constants.Cookies.USER) ?? '{}'))
    }, [])

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
