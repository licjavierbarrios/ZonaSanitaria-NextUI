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

const FormSchema = z
  .object({
    username: z
      .string()
      .min(3, "El nombre de usuario debe contener más de tres caracteres")
      .max(50, "El nombre de usuario no debe contener más de 50 caracteres"),
    email: z
      .string()
      .min(3, "El mail es requerido")
      .email("El mail no es válido"),
    password: z
      .string()
      .min(1, "Password es requerido")
      .min(8, "El password debe contener más de 8 caracteres")
      .max(100),
    confirmPassword: z
      .string()
      .min(1, "Confirmación de password es requerida")
      .min(8, "El password debe contener más de 8 caracteres")
      .max(100),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password no coincide",
  });

const SignUpForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    console.log(values);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre de Usuario</FormLabel>
                <FormControl>
                  <Input placeholder="juanperez" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
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

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirma el password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirma el password"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full mt-6" type="submit">
          Registrarse
        </Button>
      </form>
      <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
        o
      </div>
      <p className="text-center text-sm text-gray-600 mt-2">
        Si tienes una cuenta, &nbsp;
        <Link className="text-blue-600 hover:underline" href="/sign-in">
          Iniciar seción
        </Link>
      </p>
    </Form>
  );
};
export default SignUpForm;
