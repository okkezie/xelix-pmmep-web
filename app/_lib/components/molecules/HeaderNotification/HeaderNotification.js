import NotificationsButton from "@/components/atoms/NotificationsButton/NotificationsButton";
import NotificationsDropdownList from "@/components/molecules/NotificationsDropdownList/NotificationsDropdownList";
import { useLayoutEffect, useRef, useState } from "react";

export default function HeaderNotification() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const closeDropdown = () => {
        setDropdownOpen(false);
    }
    
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
            <NotificationsButton dropdownOpen={dropdownOpen} setDropdownOpen={setDropdownOpen} />
            <NotificationsDropdownList dropdownOpen={dropdownOpen} closeDropdown={closeDropdown} ref={dropdownRef} />
        </div>
    )
}
