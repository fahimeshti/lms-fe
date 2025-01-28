"use client"

import { Suspense, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Menu, Search, ChevronDown, X } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import SubmenuItem from './SubmenuItem'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { NavMenu } from './NavMenu'
import { SITE_NAME } from '@/utils/constants'
import { useAuth } from '@/context/AuthContext'
import { useApi } from '@/hooks/useApiCall'
import { getCourses } from '@/utils/api/courses'

type NavItemsType = {
    name: string;
    href: string;
    submenu?: { name: string; href: string }[];
}

const navItems = [
    {
        name: 'সকল কোর্স',
        href: '/courses',
        // submenu: [
        //     { name: 'Course 1', href: '/products/category-1' },
        //     { name: 'Course 2', href: '/products/category-2' },
        //     { name: 'Course 3', href: '/products/category-3' },
        // ]
    },
    { name: 'ব্লগ', href: '/blog' },
    // { name: 'যোগাযোগ', href: '/contact' },
]

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('query');
    const [searchInput, setSearchInput] = useState(searchQuery || '');
    const searchInputRef = useRef<HTMLInputElement>(null);
    const { isAuthenticated } = useAuth();

    const iconBaseClasses =
        "block absolute h-0.5 w-4 rounded-[2px] bg-current transform transition duration-300 ease-in-out";

    const handleSearchItemClick = (e: any, query: string) => {
        e.preventDefault();
        e.stopPropagation();
        router.push(`/search?query=${query}`);
    };

    useEffect(() => {
        if (isSearchBoxOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isSearchBoxOpen]);

    useEffect(() => {
        if (searchQuery) {
            setSearchInput(searchQuery);
            setIsSearchBoxOpen(false);
        }
    }, [searchQuery]);

    return (
        <Suspense>
            <nav className="bg-white text-gray-800 border-b sticky top-0 z-[99]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <Link href="/" className="text-2xl font-bold uppercase">
                                {SITE_NAME}
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden xmd:flex items-center gap-8">
                            <div className="relative min-w-80 z-10">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 size-5" />
                                <Input
                                    type="text"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleSearchItemClick(e, searchInput);
                                            searchInputRef.current?.blur();
                                        }
                                    }}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    value={searchInput}
                                    ref={searchInputRef}
                                    placeholder="কোর্স, কিংবা স্কুল প্রোগ্রাম সার্চ করুন..."
                                    className={`pl-10 bg-transparent border-gray-300 font-medium rounded-full ${isSearchBoxOpen ? "rounded-bl-none bg-white text-gray-700 placeholder:text-gray-500 rounded-br-none rounded-tl-2xl rounded-tr-2xl z-50" : "text-primary-text placeholder:text-gray-500"}`}
                                    onFocus={() => setIsSearchBoxOpen(true)}
                                />
                                {searchInput &&
                                    <span className='bg-gray-400 text-white rounded-full w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center justify-center'>
                                        <X
                                            className={`size-3 cursor-pointer ${searchQuery ? "" : "hidden"}`}
                                            onClick={() => {
                                                searchInputRef.current?.focus();
                                                if (searchInput) {
                                                    setSearchInput('');
                                                }
                                            }}
                                        />
                                    </span>
                                }

                                {isSearchBoxOpen &&
                                    <>
                                        <div
                                            className='bg-black bg-opacity-50 fixed inset-0 top-16 z-[-1]'
                                            onClick={() => setIsSearchBoxOpen(false)}
                                        />
                                        <div className='bg-white h-fit rounded-bl-2xl rounded-br-2xl w-full absolute top-10 py-2.5 overflow-hidden'>
                                            <span className='text-sm font-medium block ml-4 text-gray-500'>Popular searches</span>
                                            <ul className='my-2 space-y-0'>
                                                {
                                                    ['SSC', 'HSC 2025', 'HSC'].map((query) => (
                                                        <li
                                                            key={query}
                                                            className='flex items-center gap-2 hover:bg-gray-100 transition-colors duration-150 px-4 py-2.5 cursor-pointer'
                                                            onClick={(e) => handleSearchItemClick(e, query)}
                                                        >
                                                            <Search className='text-gray-500 size-4' />
                                                            <span className='text-gray-600 text-sm font-medium'>
                                                                {query}
                                                            </span>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    </>
                                }


                            </div>
                            <div className="flex gap-0 items-center">
                                {navItems.map((item: NavItemsType) => (
                                    <div key={item.name} className="relative group">
                                        {item.submenu ? (
                                            <>
                                                <button className="text-gray-800 hover:text-primary px-3 py-1.5 rounded-md text-sm font-medium flex items-center ring-focus peer transition-colors duration-200">
                                                    {item.name}
                                                    <ChevronDown className="ml-1 h-4 w-4" />
                                                </button>
                                                <div className="absolute left-0 mt-0 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible peer-focus-within:opacity-100 peer-focus-within:visible transition-all duration-300 ease-in-out z-50">
                                                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                                        {item.submenu.map((subItem) => (
                                                            <Link
                                                                key={subItem.name}
                                                                href={subItem.href}
                                                                className="block px-4 py-2 text-sm text-gray-950 hover:bg-primary hover:text-gray-50 ring-focus"
                                                                role="menuitem"
                                                            >
                                                                {subItem.name}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <Link href={item.href} className={`hover:text-primary px-3 py-2 rounded-md text-sm font-medium ring-focus transition-colors duration-200 ${pathname === item.href ? 'text-primary' : 'text-gray-700'
                                                }`}>
                                                {item.name}
                                            </Link>
                                        )}
                                    </div>
                                ))}
                            </div>
                            {isAuthenticated ?
                                <NavMenu />
                                :
                                <Link href="/auth/login">
                                    <Button variant="secondary" className={`font-semibold ${isSearchBoxOpen ? 'z-[-10]' : ''}`}>
                                        লগ-ইন
                                    </Button>
                                </Link>
                            }
                        </div>

                        {/* Mobile menu button */}
                        <div className="xmd:hidden flex items-center gap-1">
                            {isAuthenticated ?
                                <NavMenu />
                                :
                                <Link href="/auth/login">
                                    <Button variant="secondary" className={`font-semibold ${isSearchBoxOpen ? 'z-[-10]' : ''}`}>
                                        লগ-ইন
                                    </Button>
                                </Link>
                            }

                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="relative inline-flex items-center justify-center p-5 rounded-md text-gray-200 hover:text-gray-300 hover:bg-black hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-ring"
                            >
                                <span className="sr-only">{isMobileMenuOpen ? "Close menu" : "Open menu"}</span>
                                <div className="block w-4 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <span
                                        aria-hidden="true"
                                        className={`${iconBaseClasses} ${isMobileMenuOpen ? "rotate-45" : "-translate-y-1"
                                            }`}
                                    ></span>
                                    <span
                                        aria-hidden="true"
                                        className={`${iconBaseClasses} ${isMobileMenuOpen ? "-rotate-45" : "translate-y-1"
                                            }`}
                                    ></span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                {
                    true && (
                        <div className={`xmd:hidden bg-white h-screen overflow-hidden transition-all duration-300 fixed inset-0 top-16 ${isMobileMenuOpen ? "max-h-screen" : "max-h-0"}`}>
                            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                {/* <div className="relative mb-3">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-5" />
                            <Input type="text" placeholder="Search for course..." className="pl-10 w-full rounded-full" />
                        </div> */}
                                {navItems.map((item: NavItemsType) => (
                                    <div key={item.name}>
                                        {item.submenu ? (
                                            <SubmenuItem item={item} />
                                        ) : (
                                            <Link href={item.href} className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">
                                                {item.name}
                                            </Link>
                                        )}
                                    </div>
                                ))}
                                {/* <Button className="w-fit ml-2 !mt-4">Login</Button> */}
                            </div>
                        </div>
                    )
                }
            </nav>
        </Suspense>
    )
}

