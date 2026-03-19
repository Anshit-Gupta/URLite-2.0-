import { z} from "zod"

export const signupSchema = z.object({
    name: z.string().min(2),
    email : z.email({message:"plases enter a valid email address"}),
    password : z.string().min(6,{message:"Password must be atleast 6 characters long"}),

});