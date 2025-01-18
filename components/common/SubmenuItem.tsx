import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const SubmenuItem = ({ item }: any) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <div className="w-fit text-sm">
            <button onClick={() => setIsMenuOpen(old => !old)} className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium w-full text-left">
                {item.name}
                <ChevronDown className="ml-1 h-4 w-4 inline" />
            </button>

            <ul className={`pl-6 overflow-hidden transition-all duration-300 ${isMenuOpen ? "max-h-screen" : "max-h-0"}`}>
                {item.submenu.map((subItem: any) => (
                    <li key={subItem.name} className='py-2'>
                        <Link href={subItem.href} className="w-full">
                            {subItem.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SubmenuItem;