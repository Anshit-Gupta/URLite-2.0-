"use client"
import { useState } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export function UrlShortnerForm() {
    const {data : session  } = useSession();
    const displayName =
        session?.user?.name || session?.user?.email?.split("@")[0] || "Friend";
    const [url, setUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [copied,setCopied] = useState(false);
    
    const  handleSubmit=async(e : React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        try {
            const response = await fetch('/api/shorturl' , {
                method : "POST" ,
                headers : { 'Content-Type': 'application/json'},
                body:JSON.stringify({url})
            });
            const data = await response.json();
            setShortUrl(`http://localhost:3000/${data.shortId}`);
        } catch {
            toast.error("enter a valid url");
        }

    }
    const handleCopy = ()=>{
              navigator.clipboard.writeText(shortUrl);
              setCopied(true);
              setTimeout(()=>{
                  setCopied(false);
              },2000)
    }
    return (
        <div className="mt-20 max-w-xl mx-auto  items-center  flex flex-col  font-[family-name:var(--font-gloria)]">
            <div >
                  <div className=" flex flex-col  justify-center">
                          <h1 className="text-3xl md:text-5xl p-2">Shorten your URLs</h1>
                                                    {session?.user ? (
                                                        <h3 className="pl-2 text-sm md:text-xl text-gray-600 mt-4"> <span className="block">Welcome back, {displayName} !!!</span> <span className="block">Shorten a link and track clicks in Analytics</span> </h3>
                                                    ) : (
                                                        <h3 className="text-sm md:text-xl text-gray-600 m-2">Sign up to track your URLs and view analytics</h3>
                                                    )}
                          
                  </div>
                    <form  onSubmit={handleSubmit}>
                       <div className="mt-12">
                     
                     
                
                       <input value={url} onChange={(e)=>setUrl(e.target.value)} className="border-2 w-[250px] md:w-[380px] p-2 pt-2  text-xl   border-black rounded-2xl h-12" type="text" placeholder="Paste your url"/>
                       <button type="submit"  className="ml-6 cursor-pointer h-12 bg-black text-white text-xl transition  hover:scale-110  border-2 rounded-2xl p-2">Shorten </button>
                       
                       
                       
                   

                </div>
                
             </form>
             {shortUrl && (
              <div className="flex felx-col">
                             <div className=" w-[250px] md:w-[380px] flex flex-row h-12 mt-6 border-2 rounded-2xl">
                               <span className=" p-2 text-xl">{`${shortUrl}`}</span>
                               </div>
                               <div>
                                <button  onClick={handleCopy} className="ml-2 md:ml-6 mt-6 w-[95px] cursor-pointer bg-black transition hover:scale-110 text-white text-xl border-2 rounded-2xl  h-12 p-2">
                                    {copied ? "copied" : "copy"}
                                    </button>
                               </div>
                       </div>
                )}
             </div>
            
        </div>
    )
}