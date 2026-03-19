"use client"
import Link from "next/link"
import { useState} from 'react'
import {signIn} from "next-auth/react"
import toast from "react-hot-toast";


export default function Signup(){
   const [name , setName] = useState("");
   const [email , setEmail] = useState("");
   const [password , setPassword] = useState("");
   const [loading , setLoading] = useState(false);
   
   
    async function createAccountHandler(e : React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('/api/signup' , {
                method : "POST" ,
                headers : { 'Content-Type': 'application/json'},
                body:JSON.stringify({name,email,password})
            });

            const data = await response.json();

            if (!response.ok) {
                const message = typeof data?.error === "string" ? data.error : "Signup failed";
                toast.error(message);
                return;
            }

            toast.success("Account created successfully");
            setTimeout(() => {
                window.location.href = "/login";
            }, 700);

        } catch {
            console.log("error in signup");
            toast.error("Error in signup");
        }
        finally{
            setLoading(false);
        }
        
       
    }


   async function googleLoginHandler(){
           
           try {
               await signIn("google", { callbackUrl: "/" });
           } catch {
               toast.error("Something went wrong");
               
           }
   
       }
    return(
        <div className=" mt-4 max-w-xl mx-auto  items-center  flex flex-col  font-[family-name:var(--font-gloria)]">
            <div className="border-2 rounded-3xl m-4 p-4  ">
                <div className=" flex flex-col m-2 ">
                    <div className=" flex  p-2 ">
                         <h1 className=" text-2xl md:text-3xl">Create an account</h1>
                  
                    </div>
                  <h3 className="pl-4 text-gray-600">enter info below to create account</h3>
                  <h3 className="pl-4 text-gray-600">to your account</h3>
                </div>
                <form  onSubmit={createAccountHandler}>
                    <div className="flex flex-col m-4 ">
                         <h2 className="pl-4">Name</h2>
                        <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="border-2 w-[250px] md:w-[380px] p-2 pt-2  text-xl mt-2  ml-4 border-black rounded-2xl h-12" placeholder="anshit"/>
                        <h2 className="pl-4 mt-2">Email</h2>
                        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="border-2 w-[250px] md:w-[380px] p-2 pt-2  text-xl mt-2  ml-4 border-black rounded-2xl h-12" placeholder="anshit@gmial.com"/>
                         
                         <h2 className="pl-4 mt-4">Password</h2>
                        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="border-2 w-[250px] md:w-[380px] p-2 pt-2  text-xl mt-2  ml-4 border-black rounded-2xl h-12" placeholder="anshit's pass"/>

                        <button disabled={loading} type="submit" className="border-2 transition hover:scale-105 w-[250px] md:w-[380px] p-2 pt-2  text-xl mt-6 ml-4 text-white bg-black border-black rounded-2xl h-12 disabled:opacity-50 disabled:cursor-not-allowed">{loading ? "Creating..." : "Create account"}</button>
                        <button disabled={loading} type="button" onClick={googleLoginHandler} className="border-2 transition hover:scale-105 w-[250px] md:w-[380px] p-2 pt-2  text-xl mt-6 ml-4  border-black rounded-2xl h-12 disabled:opacity-50 disabled:cursor-not-allowed">Continue with google</button>
                        
                        <h2 className=" pl-6 md:pl-16 mt-4  text-base  ">
                            Already have an account?
                           <Link href ="/login" className="ml-3 transition inline-block hover:scale-110">
                           Login
                           </Link>
                        </h2>
                        
                    </div>
                </form>
            </div>

           
        </div>
    )
}