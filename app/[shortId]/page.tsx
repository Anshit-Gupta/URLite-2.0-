import {prisma} from "@/lib/prisma"

import { notFound, redirect } from "next/navigation"

type ShortIdPageProps = {
   params:Promise<{ shortId: string }>;
   
}

export default async function Page({ params }: ShortIdPageProps) {
    const {shortId} = await params;
       const  urlRecord= await prisma.url.findUnique({  //urlreacod ->url
         where :{
          shortId
         }
       })

       if(!urlRecord) return notFound();

    //updating the visitHistory  with the urlid
       await prisma.visitHistory.create({
        data:{
             urlId:urlRecord.id
        }
      
       })
      
      return redirect(urlRecord.redirectUrl);
}