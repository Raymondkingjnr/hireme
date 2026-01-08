"use client";

import { CustomBtn } from "@/app/components/custom-btn";
import { CustomInput } from "@/app/components/custom-input";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import { SparkleIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { GoogleIcon } from "@/app/components/icon";
import Link from "next/link";
import { Iprofile } from "@/modal/types";

type AuthMode = "signin" | "signup";

const AuthPage = () => {
  const [mode, setMode] = useState<AuthMode>("signin");
  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState<Iprofile | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const isSignIn = mode === "signin";
  const [isMagicLink, setIsMagicLink] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),

    password: Yup.string().when([], {
      is: () => !isMagicLink && mode === "signin", // only required for password sign-in
      then: (schema) =>
        schema
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
      otherwise: (schema) => schema.optional(), // not required for magic link or signup
    }),
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.replace("/login");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select(
          "full_name, username, state, city, postal_code, street,phone_number, avatar_url"
        )
        .eq("id", user.id)
        .single();

      if (error && error.code !== "PGRST116") {
        toast.error("Failed to load profile");
        console.error(error);
      }

      setUserProfile(data);
    };

    fetchProfile();
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);

      if (isMagicLink) {
        const { error } = await supabase.auth.signInWithOtp({
          email: values.email,
          options: {
            emailRedirectTo: `${
              userProfile?.username
                ? router.push("/")
                : `${window.location.origin}/callback`
            }`,
          },
        });

        if (error) {
          toast.error(error.message);
        } else {
          toast.success("Check your email! We sent you a magic link");
          formik.resetForm();
        }
      } else if (isSignIn) {
        const { error } = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        });

        if (error) {
          toast.error(error.message);
        } else {
          toast.success("Welcome back!");
          router.push("/");
        }
      } else {
        const { error } = await supabase.auth.signUp({
          email: values.email,
          password: values.password,
          options: {
            emailRedirectTo: `${window.location.origin}/callback`,
          },
        });

        if (error) {
          toast.error(error.message);
        } else {
          toast.success("Check your email to confirm your account!");
          formik.resetForm();
          router.push("/account");
        }
      }

      setIsLoading(false);
    },
  });

  const signInWithGoogle = async () => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${
          userProfile?.username
            ? router.push("/")
            : `${window.location.origin}/callback`
        }`,
      },
    });

    if (error) {
      toast.error(error.message);
    }
    // No need for success toast — user will be redirected
    setIsLoading(false);
  };

  const toggleMode = () => {
    setMode(isSignIn ? "signup" : "signin");
    setIsMagicLink(false);
    formik.resetForm();
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white shadow-lg rounded-2xl">
        {/* Header */}
        <div className="pt-8 pb-5  px-8">
          <h3 className="text-center text-base font-semibold pb-2">
            {isMagicLink
              ? "Sign in with Magic Link"
              : isSignIn
              ? "Welcome Back"
              : "Create an Account"}
          </h3>
          <p className="text-center text-sm pb-8 font-medium px-12 text-gray-600">
            {isMagicLink
              ? "We'll email you a login link (no password needed)"
              : isSignIn
              ? "Sign in to manage your account"
              : "Sign up to get started"}
          </p>
          <CustomBtn
            title="Use Magic Link (No Password)"
            icon={<SparkleIcon strokeWidth={2} size={18} />}
            className=" bg-green-500 text-white w-full mt-2 font-bold hover:opacity-100"
            onClick={() => {
              setIsMagicLink(true);
              setMode("signin");
              formik.setFieldValue("password", "");
              formik.setFieldTouched("password", false);
            }}
          />

          <button
            className="  w-full mt-4 h-[35px] rounded-full border-2 flex gap-2 items-center justify-center"
            onClick={signInWithGoogle}
            disabled={isLoading}
          >
            <GoogleIcon />
            <p className=" text-sm font-bold">Continue with Google</p>
          </button>

          <Separator className=" mt-7" />
        </div>

        {/* Form */}
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 px-8"
        >
          <CustomInput
            label="Email"
            placeholder="yulp@mail.com"
            className="w-full"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : undefined
            }
          />

          {!isMagicLink && (
            <CustomInput
              label="Password"
              placeholder="••••••••"
              type="password"
              className="w-full"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : undefined
              }
            />
          )}

          <CustomBtn
            title={isMagicLink ? "Send Magic Link" : "Continue"}
            isLoading={isLoading}
            disable={
              isLoading ||
              !formik.values.email ||
              !!formik.errors.email ||
              (!isMagicLink && mode === "signin" && !formik.values.password)
            }
            className="bg-green-darkbggreen h-[38px] text-green-lightbgGreen hover:opacity-80 w-full font-medium disabled:opacity-50"
          />

          <CustomBtn
            title="Cancel"
            onClick={() => router.replace("/")}
            className=" bg-green-lightbgGreen text-green-darkbggreen hover:opacity-100 w-full font-medium mt-2 h-[39px]"
          />
        </form>

        {/* Toggle Footer */}
        <div className="bg-gray-50 py-6 mt-4 rounded-b-2xl   text-sm">
          <div className="flex justify-center items-center gap-2">
            <p className="text-gray-600">
              {isSignIn ? "Don't have an account?" : "Already have an account?"}
            </p>
            <button
              type="button"
              onClick={toggleMode}
              className="font-semibold text-green-darkbggreen hover:underline"
            >
              {isSignIn ? "Sign up" : "Sign in"}
            </button>
          </div>
          {isSignIn && (
            <Link
              className="text-center flex justify-center items-center pt-1 font-semibold"
              href={"/"}
            >
              forget password?
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default AuthPage;
