
import { NextResponse } from "next/server";
import { signupSchema } from "@/lib/schema/signup";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";



export async function POST(request : Request) {
   
    const body = await request.json();
    const result = signupSchema.safeParse(body);
    
    if(!result.success){
        return NextResponse.json({error: result.error.flatten()},{status:400});
    }
    // check if user with the email exist ??
    const userExist = await prisma.user.findUnique ({
      where:{email:result.data.email}
     
    })
    
    if(userExist)return NextResponse.json({error:"user with this email already exist"},{status:400});
   try {
    
   const hashedPassword = await bcrypt.hash(result.data.password, 10);
    await prisma.user.create({
        data:{
            name : result.data.name,
            email: result.data.email,
            password:hashedPassword
        }
    }) 
   
    return NextResponse.json({message:"signup succesfull"},{status:201});


   } catch (error) {
        console.log("error in signup",error);
        return NextResponse.json({error:"error in signup"},{status:500})
   }
    


    
}