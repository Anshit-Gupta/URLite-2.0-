import { z } from "zod";

export const urlSchema = z.object({  //request body must contain a url field
  url: z
    .string()
    .url("Please enter a valid URL")  //should be of valid url format
    .refine((value) => {   //custom rule 
      try {
        const parsed = new URL(value);  //parse url safely 
        return parsed.protocol === "http:" || parsed.protocol === "https:"; //only allows http https
      } catch {
        return false;
      }
    }, "Only http/https URLs are allowed"),
});
