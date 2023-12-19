"use client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormField } from "../ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Logo from "../shared/Logo";

const FormSchema = z.object({
  correo: z
    .string()
    .min(3, "El mail es requerido")
    .email("El mail no es válido"),
  password: z
    .string()
    .min(1, "Password es requerido")
    .min(6, "El password debe contener un mínimo de 6 caracteres")
    .max(100),
});

const SignInForm = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    console.log(values);
    setErrors([]);

    const responseNextAuth = await signIn("credentials", {
      correo: values.correo,
      password: values.password,
      redirect: false,
    });
    if (responseNextAuth?.error) {
      const errorMessage = responseNextAuth.error;
      setErrors([errorMessage]);
      return;
    }

    //TODO: redireccionar a la página PRINCIPAL
    // router.push("/dashboard");
    window.location.href = "/dashboard";
    
  };
  return (
    <>
      <div className="flex items-center justify-center mb-8">
        <Logo />
      </div>
      <h1 className="text-3xl uppercase text-center font-bold tracking-[5px] text-slate-700 mb-8">
        Iniciar <span className="text-primary">sesión</span>{" "}
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="correo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="tumail@ejemplo.com" {...field} />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Ingresa tu password"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button className="w-full mt-6" type="submit">
            Iniciar sesión
          </Button>
        </form>
        {/* <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
          o
        </div>
        <p className="text-center text-sm text-gray-600 mt-2">
          Si no tiene una cuenta, por favor &nbsp;
          <Link className="text-blue-600 hover:underline" href="/sign-up">
            Registrate
          </Link>
        </p> */}
        {errors.length > 0 && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4"
            role="alert"
          >
            <ul>
              <li>{errors}</li>
            </ul>
          </div>
        )}
      </Form>
    </>
  );
};
export default SignInForm;
