import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import  CredentialsProvider  from "next-auth/providers/credentials";
import {compare} from 'bcryptjs'
import {PrismaAdapter} from "@auth/prisma-adapter";
import {prisma} from "@/lib/prisma"


//[...nextauth] is a catch-all dynamic route in Next.js. 

export const authOptions: NextAuthOptions = {
    adapter:PrismaAdapter(prisma),
    providers : [
        GoogleProvider({
                 clientId: process.env.GOOGLE_CLIENT_ID!,
                 clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),

        CredentialsProvider({
            name:"Credentials",
            credentials : {   //metadata for the Credentials provider
                email : {label:"Email" , type:"email"},
                password : {label:"Password" , type:"password"}
            },
            async authorize(credentials){
                if(! credentials?.email || ! credentials?.password ){
                       return null;
                } 
               const user =  await prisma.user.findUnique(
                    {
                        where : {email : credentials.email}
                    }
                )
                if(!user) return null;
                if(! user.password) return null; // as password is optional in user schema 
                 const isValidPassword = await compare(credentials.password , user.password);

                if(! isValidPassword) return null;
                
                return {id:user.id , email:user.email , name: user.name}
                
                

            } 
        })
    ]
}

const handler = NextAuth(authOptions);
export {handler as GET , handler as POST}
//NextAuth(authOptions) returns a function that can handle auth HTTP requests.
// exporting one handler function under two names , e-exporting the same function twice:
//once as GET
//once as POST