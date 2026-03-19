"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react";

export  function Navbar(){
    const pathname = usePathname();
    const {data : session } = useSession();
    return(
        <nav className="bg-white text-black font-[family-name:var(--font-gloria)]  ">
             <div className="flex   flex-row p-4 md:p-6 border-black border-b-2  rounded-3xl justify-between">
                 <h1 className="text-2xl md:text-4xl pl-4 md:pl-16 ">Urlite</h1>
                 <div className="  flex text-lg md:text-2xl flex-row  md:pr-[105px] gap-3 md:gap-8">
                    
                    <Link  className="hover:text-gray-500 hover:scale-110 transition " href="/">Home</Link>
                    <Link className="hover:text-gray-500 hover:scale-110 transition " href="/analytics">Analytics</Link>
                    { session?.user?(
                        <button
                            className="hover:text-gray-500 hover:scale-110 transition"
                            onClick={() => signOut({ callbackUrl: "/login" })}
                        >
                            Logout
                        </button>
                    ) : pathname === "/signup" ?(
                        <Link className="hover:text-gray-500 hover:scale-110 transition " href="/login">login</Link>
                       
                    ): (
                       <Link className="hover:text-gray-500 hover:scale-110 transition " href="/signup">SignUp</Link>
                    )}
                    
                 </div>


             </div>
        </nav>
        
    )
}