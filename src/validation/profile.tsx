import { z } from "zod";


export const profileSchema = z.object({
  firstName: z.string().nonempty("First name is required"),
  lastName: z.string().nonempty("Last name is required"),
  profileName: z.string().nonempty("Profile name is required"),
  socialAccount: z.string().nonempty("Invalid social account URL"),
  phoneNumber: z.string().regex(/^[789]\d{9}$/, "Invalid phone number"),
  upiId: z.string().regex(/^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}/,"UPI ID is required"),
  expertise: z.array(z.string()).min(1, "At least one expertise is required"),
  availability: z.array(z.any()).nonempty("Availability is required"),
});

export const serviceSchema = z.object({
    
})