"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CustomBtn } from "./custom-btn";
import { Review } from "./request";
import { Menu, XIcon } from "lucide-react";
import { motion, AnimatePresence, Variants } from "motion/react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import toast from "react-hot-toast";
import Image from "next/image";
import { defaultImg } from "@/assets";
import { Skeleton } from "@/components/ui/skeleton";
import { type User } from "@supabase/supabase-js";

const navLinks = [
  { id: 1, text: "home", href: "/" },
  { id: 2, text: "Artisians", href: "/market-place" },
  { id: 4, text: "blog", href: "/blog" },
  { id: 3, text: "contact", href: "/contact" },
];

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>();
  const [profile, setProfile] = useState<{ avatar_url?: string } | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        return;
      }

      setUser(user);

      const { data, error } = await supabase
        .from("profiles")
        .select("avatar_url")
        .eq("id", user.id)
        .single();

      if (error && error.code !== "PGRST116") {
        toast.error("Failed to load profile");
        console.error(error);
      }

      setProfile(data);

      setLoading(false);
    };

    fetchProfile();
  }, [supabase, router]);

  const menuVariants: Variants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const linkVariants: Variants = {
    closed: { opacity: 0, x: 50 },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        type: "spring" as const,
        stiffness: 300,
      },
    }),
  };

  return (
    <>
      <nav className="flex flex-row justify-between items-center max-w-[1540px] mx-auto md:py-6 py-4 px-5">
        {/* Logo */}
        <div>
          <h4 className="font-bold text-green-darkbggreen text-2xl">HireMe</h4>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex gap-10">
          {navLinks.map((item) => (
            <Link
              href={item.href}
              key={item.id}
              className="capitalize font-bold text-green-darkbggreen hover:text-green-700 transition"
            >
              {item.text}
            </Link>
          ))}
        </div>

        {/* Desktop Buttons */}

        <div className="hidden lg:flex items-center gap-6">
          <Review />
          {user && loading ?
            <Skeleton className=" w-[30px] h-[30px] rounded-full" />
          : profile ?
            <Link href={"/account-page"} prefetch={false}>
              <Image
                src={profile.avatar_url ?? defaultImg}
                alt="User avatar"
                width={30}
                height={30}
                className="rounded-full w-[30px] h-[30px] object-cover border border-green-darkbggreen"
              />
            </Link>
          : ""}
          {!user && (
            <CustomBtn
              title="Join"
              className="bg-green-darkbggreen text-green-lightbgGreen capitalize font-semibold hover:bg-opacity-90 px-6"
              onClick={() => router.replace("/login")}
            />
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-green-darkbggreen z-50"
        >
          <Menu size={28} />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            />

            {/* Sliding Menu */}
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 lg:hidden flex flex-col"
            >
              <div className="p-6 border-b flex justify-between items-center">
                <h4 className="font-bold text-green-darkbggreen text-lg">
                  HireMe
                </h4>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="lg:hidden text-green-darkbggreen z-50"
                >
                  <XIcon size={25} />
                </button>
              </div>

              <div className="flex flex-col p-6 space-y-8 flex-1">
                {navLinks.map((item, index) => (
                  <motion.div
                    key={item.id}
                    custom={index}
                    variants={linkVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block text-lg font-semibold text-gray-800 capitalize hover:text-green-darkbggreen transition"
                    >
                      {item.text}
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile Buttons */}
                <motion.div
                  custom={navLinks.length}
                  variants={linkVariants}
                  initial="closed"
                  animate="open"
                  className="pt-8 space-y-4"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <Review />
                    {!user && (
                      <CustomBtn
                        title="Join"
                        className="h-[30px] w-[100px] bg-green-darkbggreen capitalize text-green-lightbgGreen font-semibold hover:bg-opacity-90 text-lg"
                        // onClick={() => }
                        onClick={() => {
                          router.replace("/login");
                          setIsOpen(false);
                        }}
                      />
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
