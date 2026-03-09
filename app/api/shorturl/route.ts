import {prisma} from "@/lib/prisma"
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";
import { urlSchema } from "@/lib/schema/url";


export  async function POST(request : Request)
{  
    const body = await request.json();
    const result = urlSchema.safeParse(body);
   if(!result.success)
   {
    return NextResponse.json({error: result.error.flatten()},{status:400});
   }

    try {
     const shortId = nanoid(8);
    
   
     await prisma.url.create({
        data:
        {
            shortId,
            redirectUrl:result.data.url,
            
        }
    })
   
   return NextResponse.json({shortId});  
    } catch (error) {
        console.log("error in generating new short url",error);
        return NextResponse.json({error:"error in generating short url"},{status:500})

    }
}
