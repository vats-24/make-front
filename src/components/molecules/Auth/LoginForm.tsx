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
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";
import { useSignIn } from "@hooks/auth/useSignIn";

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export function LoginForm() {
  const [show, setShow] = React.useState(false);
  const signIn = useSignIn();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    signIn(data);
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
      <div className="flex flex-col gap-[24px] justify-center w-full">
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
                    <Input {...field} className="h-12" />
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
                  <div className="flex justify-between">
                    <FormLabel>Password</FormLabel>
                    <a href="/forgot" className="underline text-[12px]">
                      Forgot Password?
                    </a>
                  </div>
                  <FormControl>
                    <div className="flex items-center relative justify-center border">
                      <Input
                        {...field}
                        type={show ? "text" : "password"}
                        className="h-12"
                      />
                      {show ? (
                        <EyeOpenIcon
                          className="size-[24px] absolute top-1 right-1 cursor-pointer h-10"
                          onClick={() => setShow(false)}
                        />
                      ) : (
                        <EyeClosedIcon
                          className="size-[24px] absolute top-1 right-1 cursor-pointer h-10"
                          onClick={() => setShow(true)}
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
              <Button type="submit" className="h-12">
                Login
              </Button>
          </form>
        </Form>
        <div className="relative flex items-center">
          <div className="flex-grow border-t border-gray-400" />
          <span className="flex-shrink mx-2 text-gray-400">or</span>
          <div className="flex-grow border-t border-gray-400" />
        </div>
      </div>
      <p className="absolute bottom-8 font-thin text-[16px]">
        ©2024 ALL RIGHTS RESERVED DELTA FACTOR PVT LTD
      </p>
    </div>
  );
}
