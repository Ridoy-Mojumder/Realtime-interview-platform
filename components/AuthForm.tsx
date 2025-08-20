"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import Link from "next/link";
import FormField from "./FormField";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebase/client";
import { signIn, signUp } from "@/lib/actions/auth.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(6),
  });
};

function AuthForm({ type }: { type: FormType }) {
  const router = useRouter();
  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-up") {
        const { name, email, password } = values;

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const result = await signUp({
          uid: userCredential.user.uid,
          name: name!,
          email,
          password,
        });

         console.log("signUp result", result);

        if (!result?.success) {
          toast.error(result?.message);
          return;
        }

        toast.success("Sign Up Successful! Please sign in.");
        router.push("/sign-in");

        console.log("Sign Up", values);
      } else {
        const { email, password } = values;

        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const idToken = await userCredential.user.getIdToken();

        if (!idToken) {
          toast.error("Failed to retrieve ID token.");
          return;
        }

        await signIn({ email, idToken });

        toast.success("Sign In Successful!");
        router.push("/");

        console.log("Sign In", values);
      }
    } catch (error) {
      console.error(error);
      toast.error(`There is an error  ${error}`);
    }
  }

  const isSignIn = type === "sign-in";

  return (
    <div>
      <div className="card-border lg:min-w-[566px]">
        <div className="flex flex-col gap-9 card px-10 py-14">
          <div className="flex flex-row gap-2 justify-center ">
            <Image src="/logo.svg" alt="Description" width={38} height={38} />
            <h2 className="text-2xl font-bold ">TalentAI</h2>
          </div>
          <h3>AI-driven Job Interview Practice</h3>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-9 form"
            >
              {!isSignIn && (
                <FormField
                  control={form.control}
                  name="name"
                  label="Full Name"
                  placeholder="Enter your full name"
                />
              )}
              <FormField
                control={form.control}
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
              />
              <FormField
                control={form.control}
                name="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
              />

              <Button type="submit">{isSignIn ? "Sign In" : "Sign Up"}</Button>
            </form>
          </Form>

          <p className="text-center">
            {isSignIn ? "Not a account yet?" : "Already have an account?"}
            <Link
              href={isSignIn ? "/sign-up" : "/sign-in"}
              className="font-bold text-user-primary ml-1"
            >
              {isSignIn ? "Sign Up" : "Sign In"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
