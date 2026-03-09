export default function Login(){
    return(
        <div className=" mt-6 max-w-xl mx-auto  items-center  flex flex-col  font-[family-name:var(--font-gloria)]">
            <div className="border-2 rounded-3xl m-6 p-4">
                <div className=" flex flex-col m-2 ">
                    <div className=" flex justify-between gap-12 p-5 ">
                         <h1 className="text-3xl">Login to your account</h1>
                  
                    </div>
                  <h3 className="pl-4 text-gray-600">enter your email below to login  </h3>
                  <h3 className="pl-4 text-gray-600">to your account</h3>
                </div>
                <form >
                    <div className="flex flex-col m-4 ">
                        <h2 className="pl-4">Email</h2>
                        <input type="email" className="border-2 w-[250px] md:w-[380px] p-2 pt-2  text-xl mt-2  ml-4 border-black rounded-2xl h-12" placeholder="anshit@gmial.com"/>
                         
                         <h2 className="pl-4 mt-4">Password</h2>
                        <input type="password" className="border-2 w-[250px] md:w-[380px] p-2 pt-2  text-xl mt-2  ml-4 border-black rounded-2xl h-12" placeholder="anshit's pass"/>

                        <button className="border-2 transition hover:scale-105 w-[250px] md:w-[380px] p-2 pt-2  text-xl mt-6 ml-4 text-white bg-black border-black rounded-2xl h-12">Login</button>
                        
                        <button className="border-2 transition hover:scale-105 w-[250px] md:w-[380px] p-2 pt-2  text-xl mt-6 ml-4  border-black rounded-2xl h-12">Login with google</button>
                    </div>
                </form>
            </div>

           
        </div>
        
    )
}