import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/atoms/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/atoms/ui/form";
import { Input } from "@/components/atoms/ui/input";
import { toast } from "@/components/atoms/ui/use-toast";
import { Checkbox } from "@/components/atoms/ui/checkbox";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";

const FormSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be atleast 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password must match",
    path: ["confirmPassword"],
  });

export function InputForm() {
  const [show, setShow] = React.useState(false);
  const [confirm,setConfirm] = React.useState(false)
  // const signUp

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-[24px] justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" flex flex-col gap-[24px] w-full"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} className="w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Choose Password</FormLabel>
                  <FormControl>
                  <div className="flex items-center relative">
                      <Input {...field} type={confirm ? "text" : "password"} />
                      {confirm ? (
                        <EyeOpenIcon className="size-[24px] absolute top-1 right-1 cursor-pointer" onClick={()=>setConfirm(false)}/>
                      ) : (
                        <EyeClosedIcon className="size-[24px] absolute top-1 right-1 cursor-pointer" onClick={()=> setConfirm(true)}/>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className="flex items-center relative">
                      <Input {...field} type={show ? "text" : "password"} />
                      {show ? (
                        <EyeOpenIcon className="size-[24px] absolute top-1 right-1 cursor-pointer" onClick={()=>setShow(false)}/>
                      ) : (
                        <EyeClosedIcon className="size-[24px] absolute top-1 right-1 cursor-pointer" onClick={()=> setShow(true)}/>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Create Account</Button>
          </form>
        </Form>
        <div className="relative flex py-0 items-center">
          <div className="flex-grow border-t border-gray-400" />
          <span className="flex-shrink mx-2 text-gray-400">or</span>
          <div className="flex-grow border-t border-gray-400" />
        </div>
        <div className="items-top flex space-x-2 ">
          <Checkbox id="terms1" />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="terms1"
              className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 "
            >
              I agree to the{" "}
              <a href="/terms" className="underline">
                Terms of Service
              </a>{" "}
              and acknowledge you've read our{" "}
              <a href="/privacy" className="underline">
                Privacy Policy
              </a>
              .
            </label>
          </div>
        </div>
      </div>
      <p className="absolute bottom-8 font-thin text-[16px]">
        ©2024 ALL RIGHTS RESERVED DELTA FACTOR PVT LTD
      </p>
    </div>
  );
}
