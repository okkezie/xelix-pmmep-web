import Link from "next/link"
import { Constants } from "@/utils/Constants"
import { useState, useEffect } from "react"
import { useParams, usePathname } from "next/navigation"
import { toTitleCase, unpluralize } from "@/utils/helpers"

const PageBreadcrumb = () => {
    const params = useParams()
    const [pageTitle, setPageTitle] = useState("")
    const [crumbs, setCrumbs] = useState([])
    const pathname = usePathname()

    useEffect(() => {
        const sanitize = (path) => {
            path = path.replaceAll('_', " ").replaceAll('-', ' ')
            path = path.split(' ').map(p => toTitleCase(p)).join(' ')
            return path
        }

        const crumbsList = []
        let paths = pathname.split("/").slice(1)
        setPageTitle(sanitize(paths[0]))

        const slug = params?.slug
        if (slug) {
            paths.pop()
            if (paths.length > 1) {
                paths[paths.length - 1] = paths[paths.length - 1] + ' ' + unpluralize(paths[paths.length - 2])
            }
        }

        paths.map( (p, index) => 
            crumbsList.push(
                {
                    title: sanitize(p), 
                    href: `/${paths.slice(0, index+1).join('/')}` 
                }
            )
        )

        setCrumbs(crumbsList)

    }, [pathname, params])

    return (
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
                {pageTitle}
            </h2>
            <nav>
                <ol className="flex items-center gap-1.5">
                    <li className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                        <Link href={Constants.Paths.Dashboard}>
                            Home
                        </Link>
                        <Svg />
                    </li>
                    { crumbs.length > 0 && (
                        crumbs.map( (i, index) => 
                        <li key={i.title} className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                        { (index < crumbs.length - 1) ? (
                            <>
                            <Link href={i.href}>
                                {i.title}
                            </Link>
                            <Svg />
                            </>
                        ) : (
                            i.title
                        )}
                        </li>
                        )
                    )}
                </ol>
            </nav>
        </div>
    )
}

const Svg = () => {
    return <svg
        className="stroke-current"
        width="17"
        height="16"
        viewBox="0 0 17 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
            stroke=""
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
}

export default PageBreadcrumb;