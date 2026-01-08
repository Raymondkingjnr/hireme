"use client";

import { CustomBtn } from "@/app/components/custom-btn";
import { CustomInput } from "@/app/components/custom-input";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { Spinner } from "@/components/ui/spinner";
import { CustomSelect } from "@/app/components/custom-select";

export const ENUGU_LGAS = [
  { label: "Enugu", value: "enugu" },
  { label: "Port-harcourt", value: "port-harcourt" },
];

const validationSchema = Yup.object({
  full_name: Yup.string()
    .required("Full name is required")
    .test(
      "is-full-name",
      "Please enter your full name (at least two words, e.g. John Doe)",
      (value) => {
        if (!value) return false;
        const words = value.trim().split(/\s+/);
        return words.length >= 2 && words.every((word) => word.length >= 2);
      }
    ),
  username: Yup.string()
    .min(3, "Username too short")
    .required("Username is required"),
  state: Yup.string().required("Please select your LGA"),
  city: Yup.string().required("City is required"),
  street: Yup.string().required("Street address is required"),
  postal_code: Yup.string().required("postal code is required"),
  phone_number: Yup.string()
    .min(10, "phone number must be 11 digits")
    .max(10, "phone number can't be more than 11 digits"),
});

const Account = () => {
  const [loading, setLoading] = useState(true);
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
    validationSchema,
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
        router.push("/account-page"); // or wherever you want after completion
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
          "full_name, username, state, city, postal_code, street,       phone_number"
        )
        .eq("id", user.id)
        .single();

      if (error && error.code !== "PGRST116") {
        toast.error("Failed to load profile");
        console.error(error);
      }

      if (data?.username) {
        router.push("/");
      }

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

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className=" flex justify-center items-center">
            <Spinner
              className="w-[50px] h-[50px]"
              color="#16a34a"
              strokeWidth={2}
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl px-8 py-10">
        <h3 className="font-bold text-center text-2xl mb-2">
          Complete Your Profile
        </h3>
        <p className="text-center text-gray-600 text-sm mb-8">
          Help us personalize your experience
        </p>

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <CustomInput
            label="Full Name"
            placeholder="John Doe"
            name="full_name"
            className=" w-full"
            value={formik.values.full_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.full_name && formik.errors.full_name
                ? formik.errors.full_name
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
              formik.touched.username && formik.errors.username
                ? formik.errors.username
                : undefined
            }
          />

          <div className=" grid grid-cols-2 gap-8">
            <CustomSelect
              label="LGA(Enugu State)"
              name="state"
              value={formik.values.state}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.state && formik.errors.state
                  ? formik.errors.state
                  : undefined
              }
              options={ENUGU_LGAS}
              placeholder="Select your LGA"
            />
            <CustomInput
              label="City / Town"
              placeholder="New Heaven"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.city && formik.errors.city
                  ? formik.errors.city
                  : undefined
              }
            />
          </div>
          <CustomInput
            label="Street Address"
            placeholder="123 Independence Layout"
            name="street"
            value={formik.values.street}
            onChange={formik.handleChange}
            className=" w-full"
            onBlur={formik.handleBlur}
            error={
              formik.touched.street && formik.errors.street
                ? formik.errors.state
                : undefined
            }
          />
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
              formik.touched.phone_number && formik.errors.phone_number
                ? formik.errors.phone_number
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
              formik.touched.postal_code && formik.errors.postal_code
                ? formik.errors.state
                : undefined
            }
          />

          <CustomBtn
            title={"Save & Continue"}
            isLoading={formik.isSubmitting}
            disable={formik.isSubmitting || !formik.isValid || !formik.dirty}
            className="w-full h-[39px] bg-green-darkbggreen mt-5 text-white font-bold text-lg hover:bg-green-700 disabled:opacity-50"
          />
        </form>
      </div>
    </section>
  );
};

export default Account;
