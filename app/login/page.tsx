"use client"

import {useState} from "react"
import {signIn} from "next-auth/react"
import { useRouter} from "next/navigation"
import toast from "react-hot-toast";

export default function Login(){
    const router = useRouter();
    const [isLoading , setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password,setPassword] =useState("");

    async function loginHandler(e : React.FormEvent<HTMLFormElement>){
      e.preventDefault();
      setIsLoading(true);

      try {
          const result = await signIn("credentials" , {
            email,
            password,
            redirect : false
          });
          if(result?.error) {
            toast.error("Invalid email or password");
            return;
          }
          toast.success("Login successful");
         router.push("/");
      } catch {
        toast.error("Something went wrong");
      }
      finally{
        setIsLoading(false);
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
        <div className=" mt-6 max-w-xl mx-auto  items-center  flex flex-col  font-[family-name:var(--font-gloria)]">
            <div className="border-2 rounded-3xl m-6 p-4">
                <div className=" flex flex-col m-2 ">
                    <div className=" flex  p-5 ">
                         <h1 className=" text-2xl md:text-3xl">Login to your account</h1>
                  
                    </div>
                  <h3 className="pl-4  text-gray-600">enter your email below to login  </h3>
                  <h3 className="pl-4 text-gray-600">to your account</h3>
                </div>
                <form onSubmit={loginHandler} >
                    <div className="flex flex-col m-4 ">
                        <h2 className="pl-4">Email</h2>
                        <input  value={email} onChange={(e)=>setEmail(e.target.value)} type="email" className="border-2 w-[250px] md:w-[380px] p-2 pt-2  text-xl mt-2  ml-4 border-black rounded-2xl h-12" placeholder="anshit@gmial.com"/>
                         
                         <h2 className="pl-4 mt-4">Password</h2>
                        <input value={password} onChange={(e)=>setPassword(e.target.value)}  type="password" className="border-2 w-[250px] md:w-[380px] p-2 pt-2  text-xl mt-2  ml-4 border-black rounded-2xl h-12" placeholder="anshit's pass"/>

                        <button disabled={isLoading} type="submit"  className="border-2 transition hover:scale-105 w-[250px] md:w-[380px] p-2 pt-2  text-xl mt-6 ml-4 text-white bg-black border-black rounded-2xl h-12 disabled:opacity-50 disabled:cursor-not-allowed">{isLoading ? "Logging in..." : "Login"}</button>
                        
                        <button disabled={isLoading} type="button" onClick={googleLoginHandler} className="border-2 transition hover:scale-105 w-[250px] md:w-[380px] p-2 pt-2  text-xl mt-6 ml-4  border-black rounded-2xl h-12 disabled:opacity-50 disabled:cursor-not-allowed">Login with google</button>
                    </div>
                </form>
            </div>
           
        </div>
        
    )
}