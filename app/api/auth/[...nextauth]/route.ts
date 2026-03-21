import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);
export {handler as GET , handler as POST}
//NextAuth(authOptions) returns a function that can handle auth HTTP requests.
// exporting one handler function under two names , e-exporting the same function twice:
//once as GET
//once as POST
