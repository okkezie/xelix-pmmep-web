
export default function Footer() {
    return (
        <footer className="mx-auto p-4 md:p-6 text-center text-gray-400 dark:text-gray-400 border-t border-gray-300 dark:border-gray-700 bg-white/90 dark:bg-gray-900">
            <div>
                &copy; { new Date().getFullYear() } - Abia State Government. All rights reserved.
            </div>
        </footer>
    )
}
