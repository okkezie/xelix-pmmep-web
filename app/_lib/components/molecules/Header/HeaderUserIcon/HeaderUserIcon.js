import { useLayoutEffect, useRef, useState } from "react";
import HeaderUserButton from "@/components/atoms/Header/HeaderUserButton/HeaderUserButton";
import HeaderUserDropdownList from "@/components/molecules/Header/HeaderUserDropdownList/HeaderUserDropdownList";

export default function HeaderUserIcon() {
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

    const userImg = "/assets/images/user/user-29.jpg";
    const userName = "MDA1 User";
    const email = "mda1@abiastate.gov.ng";

    return (
        <div className="relative">
            <HeaderUserButton userImg={userImg} userName={userName} dropdownOpen={dropdownOpen} setDropdownOpen={setDropdownOpen} />
            <HeaderUserDropdownList dropdownOpen={dropdownOpen} username={userName} email={email} ref={dropdownRef} />
        </div>
    )
}
