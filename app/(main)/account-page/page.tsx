"use client";

import { CustomBtn } from "@/app/components/custom-btn";
import { CustomInput } from "@/app/components/custom-input";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { Spinner } from "@/components/ui/spinner";
import { CustomSelect } from "@/app/components/custom-select";
import { Iprofile } from "@/modal/types";
import { ENUGU_LGAS } from "@/app/(auth)/account/page";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { defaultImg } from "@/assets";
import { accountvalidationSchema } from "./validator";

const AccountPage = () => {
  const [loading, setLoading] = useState(true);
  const [logingout, setlogingout] = useState(true);
  const [profile, setProfile] = useState<Iprofile | null>(null);

  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null); // for preview
  const fileInputRef = useRef<HTMLInputElement>(null);

  const supabase = createClient();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      full_name: "",
      username: "",
      state: "",
      city: "",
      street: "",
      postal_code: "",
      phone_number: "",
    },
    validationSchema: accountvalidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: values.full_name,
          username: values.username,
          state: values.state,
          city: values.city,
          street: values.street,
          postal_code: values.postal_code,
          phone_number: values.phone_number,
          updated_at: new Date().toISOString(),
        })
        .eq("id", (await supabase.auth.getUser()).data.user?.id);

      if (error) {
        toast.error("Failed to save profile: " + error.message);
      } else {
        toast.success("Profile saved successfully!");
        router.push("/");
      }
      setSubmitting(false);
    },
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
          "full_name, username, state, city, postal_code, street,phone_number, avatar_url",
        )
        .eq("id", user.id)
        .single();

      if (error && error.code !== "PGRST116") {
        toast.error("Failed to load profile");
        console.error(error);
      }

      setProfile(data);

      if (data) {
        formik.setValues({
          full_name: data.full_name || "",
          username: data.username || "",
          state: data.state || "",
          city: data.city || "",
          street: data.street || "",
          postal_code: data.postal_code || "",
          phone_number: data.phone_number || "",
        });
      }

      setLoading(false);
    };

    fetchProfile();
  }, [supabase, router]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Logout failed");
      console.error(error);
    } else {
      toast.success("See you soon!");
      router.push("/");
      router.refresh(); // This clears protected server components
    }

    setlogingout(false);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview immediately
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to Supabase
    await uploadAvatar(file);
  };

  const uploadAvatar = async (file: File) => {
    try {
      setUploading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("No user");

      const fileExt = file.name.split(".").pop()?.toLowerCase();
      const filePath = `${user.id}/avatar.${fileExt}`; // clean path

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true, // overwrites old avatar
        });

      if (
        uploadError &&
        uploadError.message !== "The resource already exists"
      ) {
        throw uploadError;
      }

      // Get the correct public URL
      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);

      // Update profile
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: data.publicUrl })
        .eq("id", user.id);

      if (updateError) throw updateError;

      setProfile((prev) =>
        prev ? { ...prev, avatar_url: data.publicUrl } : null,
      );
      setAvatarUrl(data.publicUrl);
      toast.success("Avatar updated!");
    } catch (error: any) {
      toast.error("Upload failed: " + error.message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <section className="min-h-screen flex  items-center justify-center bg-green-lightbgGreen px-4">
      <div className="w-full max-w-[1200px] mt-6 px-6 py-8 bg-white shadow-md rounded-xl">
        <div className=" flex gap-4">
          <aside>
            <h2 className=" font-bold text-xl">Account Setting</h2>
            <p className=" pb-5 text-sm text-gray-600">
              Edit your name, username etc.
            </p>
          </aside>
          <CustomBtn
            title="create an ad"
            onClick={() => router.push("/add-ad")}
            className=" border capitalize bg-green-darkbggreen text-green-lightbgGreen py-3"
          />
        </div>
        <main className=" md:grid md:grid-cols-12 gap-8 flex flex-col-reverse">
          <div className=" col-span-8">
            <div>
              <form onSubmit={formik.handleSubmit} className=" space-y-9">
                <CustomInput
                  label="Full Name"
                  placeholder="John Doe"
                  name="full_name"
                  className=" w-full"
                  value={formik.values.full_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.full_name && formik.errors.full_name ?
                      formik.errors.full_name
                    : undefined
                  }
                />

                <CustomInput
                  label="Username"
                  name="username"
                  className=" w-full"
                  placeholder="Doe"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.username && formik.errors.username ?
                      formik.errors.username
                    : undefined
                  }
                />

                <div className=" grid grid-cols-2 gap-14">
                  <CustomSelect
                    label="LGA(Enugu State)"
                    name="state"
                    value={formik.values.state}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.state && formik.errors.state ?
                        formik.errors.state
                      : undefined
                    }
                    options={ENUGU_LGAS}
                    placeholder="Select your LGA"
                  />
                  <CustomInput
                    label="City / Town"
                    placeholder="New Heaven"
                    className="w-full"
                    name="city"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.city && formik.errors.city ?
                        formik.errors.city
                      : undefined
                    }
                  />
                </div>

                <CustomInput
                  label="Phone Number"
                  placeholder="081*********"
                  name="phone_number"
                  type="number"
                  maxLength={10}
                  value={formik.values.phone_number}
                  onChange={formik.handleChange}
                  className=" w-full"
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.phone_number && formik.errors.phone_number ?
                      formik.errors.phone_number
                    : undefined
                  }
                />
                <CustomInput
                  label="Street Address"
                  placeholder="123 Independence Layout"
                  name="street"
                  value={formik.values.street}
                  onChange={formik.handleChange}
                  className=" w-full"
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.street && formik.errors.street ?
                      formik.errors.street
                    : undefined
                  }
                />
                <CustomInput
                  label="Postal Code"
                  placeholder="109910"
                  name="postal_code"
                  value={formik.values.postal_code}
                  onChange={formik.handleChange}
                  className=" w-full"
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.postal_code && formik.errors.postal_code ?
                      formik.errors.state
                    : undefined
                  }
                />
              </form>
              <div className="mt-7 flex flex-col-reverse gap-5 md:flex-row justify-between items-center">
                <CustomBtn
                  title="Log out"
                  onClick={handleLogout}
                  isLoading={!logingout}
                  className=" border border-red-600 w-[120px] text-red-600"
                />
                <div className=" flex justify-end gap-4 ">
                  <CustomBtn
                    title="Cancel"
                    className=" w-[150px]  border border-green-darkbggreen"
                    onClick={() => router.back}
                  />
                  <CustomBtn
                    title="Save changes"
                    isLoading={formik.isSubmitting}
                    disable={
                      formik.isSubmitting || !formik.isValid || !formik.dirty
                    }
                    onClick={formik.handleSubmit as any}
                    className=" bg-green-darkbggreen w-[150px]  text-white hover:opacity-70"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-4 mt-8">
            {loading ?
              <div className=" flex items-center justify-center">
                <Skeleton className="w-20 h-20 rounded-full " />
              </div>
            : <div className="flex flex-col items-center gap-3">
                <div className="relative">
                  <Image
                    src={avatarUrl || profile?.avatar_url || defaultImg}
                    alt="User avatar"
                    width={100}
                    height={100}
                    className="rounded-full w-[100px] h-[100px] object-cover border-2 border-green-darkbggreen"
                  />
                  {uploading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                      <Spinner className="text-white" />
                    </div>
                  )}
                </div>

                <div className="flex  gap-3 mb-3">
                  <CustomBtn
                    title="remove"
                    className=" border h-[30px] border-red-600 text-red-600 py-1"
                  />
                  <div className="bg-green-darkbggreen py-1 px-2 rounded-full cursor-pointer hover:opacity-90 transition">
                    <label
                      className="text-white font-medium cursor-pointer "
                      htmlFor="avatar-upload"
                    >
                      {uploading ?
                        <Spinner />
                      : "Upload"}
                    </label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      id="avatar-upload"
                      accept="image/*"
                      onChange={handleFileChange}
                      disabled={uploading}
                      className="hidden w-[200px]"
                    />
                  </div>
                </div>
              </div>
            }
          </div>
        </main>
      </div>
    </section>
  );
};

export default AccountPage;
