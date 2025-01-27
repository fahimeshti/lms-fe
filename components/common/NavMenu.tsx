import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronDown, LucideBookCheck, LucideLogOut, User } from 'lucide-react'
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function NavMenu() {
    const { userProfile, logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        window.location.href = "/";
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer hover:bg-black/5 py-1 xmd:py-1.5 rounded-md px-1.5 xmd:px-2.5">
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full text-black">
                        <Avatar className="h-7 w-7">
                            <AvatarImage src="/avatars/01.png" alt={userProfile?.full_name} />
                            <AvatarFallback>
                                <User className="h-4 w-4" />
                            </AvatarFallback>
                        </Avatar>
                    </Button>
                    <p className="text-sm font-medium leading-none max-w-20 truncate hidden xmd:block">{userProfile?.full_name}</p>
                    <ChevronDown size={20} className="ml-2 hidden xmd:block" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 z-[999]" align="end">
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{userProfile?.full_name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {userProfile?.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem className="py-0 px-0">
                        <Link href="/profile" className="w-full py-1.5 px-2 flex items-center gap-3">
                          <LucideBookCheck />  আমার কোর্সমূহ
                        </Link>
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem>
                        Billing
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Settings
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem> */}
                </DropdownMenuGroup>
                {/* <DropdownMenuSeparator /> */}
                {/* <DropdownMenuGroup>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem>Email</DropdownMenuItem>
                                <DropdownMenuItem>Message</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>More...</DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuItem>
                        New Team
                        <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup> */}
                {/* <DropdownMenuSeparator />
                <DropdownMenuItem>Support</DropdownMenuItem> */}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="hover:!text-red-500 gap-3 pl-2.5">
                   <LucideLogOut /> লগআউট
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

