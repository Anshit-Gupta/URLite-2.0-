import Link from "next/link"


export default function Signup(){
    return(
        <div className=" mt-6 max-w-xl mx-auto  items-center  flex flex-col  font-[family-name:var(--font-gloria)]">
            <div className="border-2 rounded-3xl m-4 p-4">
                <div className=" flex flex-col m-2 ">
                    <div className=" flex  p-4 ">
                         <h1 className=" text-2xl md:text-3xl">Create an account</h1>
                  
                    </div>
                  <h3 className="pl-4 text-gray-600">enter info below to create account</h3>
                  <h3 className="pl-4 text-gray-600">to your account</h3>
                </div>
                <form >
                    <div className="flex flex-col m-4 ">
                         <h2 className="pl-4">Name</h2>
                        <input type="email" className="border-2 w-[250px] md:w-[380px] p-2 pt-2  text-xl mt-2  ml-4 border-black rounded-2xl h-12" placeholder="anshit"/>
                        <h2 className="pl-4 mt-2">Email</h2>
                        <input type="email" className="border-2 w-[250px] md:w-[380px] p-2 pt-2  text-xl mt-2  ml-4 border-black rounded-2xl h-12" placeholder="anshit@gmial.com"/>
                         
                         <h2 className="pl-4 mt-4">Password</h2>
                        <input type="password" className="border-2 w-[250px] md:w-[380px] p-2 pt-2  text-xl mt-2  ml-4 border-black rounded-2xl h-12" placeholder="anshit's pass"/>

                        <button className="border-2 transition hover:scale-105 w-[250px] md:w-[380px] p-2 pt-2  text-xl mt-6 ml-4 text-white bg-black border-black rounded-2xl h-12">Create account</button>
                        
                        <h2 className=" pl-6 md:pl-16 mt-4 text-base  ">
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