"use client";
import { CustomBtn } from "@/app/components/custom-btn";
import { CustomInput } from "@/app/components/custom-input";
import { CustomSelect } from "@/app/components/custom-select";
import Carousel from "@/components/Carousel";
import { Iprofile } from "@/modal/types";
import React, { useEffect, useState } from "react";
import { useFormik, FormikHelpers } from "formik";
import { createClient } from "@/utils/supabase/client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ENUGU_LGAS } from "@/app/(auth)/account/page";
import { pickImageFromGallery } from "@/utils/helpers";
import Image from "next/image";

type FormValues = {
  title: string;
  body: string;
  media_url: string;
  price: number;
  min_charge: number;
  max_charge: number;
  city: string;
  state: string;
  address: string;
  phone_number: string;
  whatsapp_link: string;
  instagram_link: string;
  website_link: string;
};

const workTypeOptions = [
  { label: "Plumber", value: "plumber" },
  { label: "Electrician", value: "electrician" },
];

const CreateAd = () => {
  const [profile, setProfile] = useState<Iprofile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const supabase = createClient();

  const router = useRouter();

  const formik = useFormik<FormValues>({
    initialValues: {
      title: "",
      body: "",
      media_url: "",
      price: 0,
      min_charge: 0,
      max_charge: 0,
      city: "",
      state: "",
      address: "",
      phone_number: "",
      whatsapp_link: "",
      instagram_link: "",
      website_link: "",
    },
    onSubmit: async (
      values: FormValues,
      { setSubmitting }: FormikHelpers<FormValues>,
    ) => {
      const user = (await supabase.auth.getUser()).data.user;

      if (!user) {
        toast.error("Not authenticated");
        return;
      }
      const { error } = await supabase.from("ads").insert({
        profile_id: user.id,
        title: values.title,
        body: values.body,
        media_url: values.media_url,
        price: values.price,
        min_charge: values.min_charge,
        max_charge: values.max_charge,
        state: values.state,
        city: values.city,
        address: values.address,
        phone_number: values.phone_number,
        whatsapp_link: values.whatsapp_link,
        instagram_link: values.instagram_link,
        website_link: values.website_link,
      });

      if (error) {
        toast.error("Failed to save artisian: " + error.message);
      } else {
        toast.success("artisian saved successfully!");
        router.push("/");
      }
      setSubmitting(false);
    },
  });

  const handleImagePick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setIsUploadingImage(true);
    const imageUrl = await pickImageFromGallery(file);
    setIsUploadingImage(false);

    if (!imageUrl) {
      toast.error("Failed to upload image");
      return;
    }

    formik.setFieldValue("media_url", imageUrl);
    toast.success("Image uploaded successfully");
  };

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
        .select(" state, city, street")
        .eq("id", user.id)
        .single();

      if (error && error.code !== "PGRST116") {
        toast.error("Failed to load profile");
      }

      setProfile(data);

      if (data) {
        formik.setValues({
          title: formik.values.title,
          body: formik.values.body,
          media_url: formik.values.media_url,
          price: formik.values.price,
          min_charge: formik.values.min_charge,
          max_charge: formik.values.max_charge,
          state: data.state || "",
          city: data.city || "",
          address: data.street || "",
          phone_number: formik.values.phone_number,
          whatsapp_link: formik.values.whatsapp_link,
          instagram_link: formik.values.instagram_link,
          website_link: formik.values.website_link,
        });
      }

      setLoading(false);
    };

    fetchProfile();
  }, [supabase, router]);

  return (
    <div>
      <div className="w-full max-w-[1300px] flex gap-8 mx-auto mt-6 px-6 py-8 bg-white shadow-md rounded-md">
        <div>
          <div style={{ position: "relative" }} className=" hidden md:flex">
            <Carousel
              baseWidth={600}
              autoplay={true}
              autoplayDelay={3000}
              pauseOnHover={false}
              loop={true}
              round={false}
            />
          </div>
        </div>
        <div className=" w-full">
          <div className=" mb-6">
            <h3>Create an ad and start earning</h3>
          </div>

          <form className=" flex flex-col gap-4" onSubmit={formik.handleSubmit}>
            <CustomSelect
              className=" w-full"
              placeholder="house cleaner"
              label="job title"
              options={workTypeOptions}
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div>
              <p className=" py-3 font-semibold">description</p>

              <textarea
                name="body"
                placeholder="description"
                value={formik.values.body}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className=" w-full h-[160px] border px-3 py-2 border-gray-gray50 rounded-lg bg-transparent 
    outline-none
    focus:outline-none
    focus:ring-0"
              />
            </div>
            <div>
              <p className=" py-3 font-semibold">Ad Image</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImagePick}
                className="w-full h-[45px] border px-3 py-2 border-gray-gray50 rounded-lg bg-transparent 
    outline-none
    focus:outline-none
    focus:ring-0"
              />
              {formik.values.media_url ?
                <Image
                  width={500}
                  height={500}
                  src={formik.values.media_url}
                  alt="Uploaded ad media"
                  className="mt-3 h-[300px] w-full rounded-lg object-cover border border-gray-gray50"
                />
              : null}
            </div>
            <div className="grid grid-cols-2 gap-14">
              <CustomInput
                className="w-full"
                name="min_charge"
                label="min charge"
                value={formik.values.min_charge}
                onChange={(e) =>
                  formik.setFieldValue("min_charge", Number(e.target.value))
                }
                onBlur={formik.handleBlur}
              />

              <CustomInput
                className="w-full"
                name="max_charge"
                label="max charge"
                value={formik.values.max_charge}
                onChange={(e) =>
                  formik.setFieldValue("max_charge", Number(e.target.value))
                }
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="grid grid-cols-2 gap-14">
              <CustomSelect
                className=" w-full"
                options={ENUGU_LGAS}
                name="state"
                value={formik.values.state}
                placeholder="Select your LGA"
                label="State"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <CustomInput
                className=" w-full"
                name="city"
                label="City / Town"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="New Heaven"
              />
            </div>
            <CustomInput
              className=" w-full"
              label="Phone Number"
              name="phone_number"
              value={formik.values.phone_number}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder=""
            />
            <CustomInput
              className=" w-full"
              label="Address"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="123 Independence Layout"
            />
            <CustomInput
              className=" w-full"
              label="Whatsapp  Link"
              name="whatsapp_link"
              value={formik.values.whatsapp_link}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="123 Independence Layout"
            />

            <div className="grid grid-cols-2 gap-14">
              <CustomInput
                className=" w-full"
                placeholder="https://:"
                label="Innstagram Link (optional)"
                name="instagram_link"
                value={formik.values.instagram_link}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <CustomInput
                className=" w-full"
                label="website link (optional)"
                name="website_link"
                value={formik.values.website_link}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="https://:"
              />
            </div>

            <CustomBtn
              title="Continue"
              onClick={formik.handleSubmit as any}
              isLoading={formik.isSubmitting || isUploadingImage}
              disable={
                formik.isSubmitting ||
                isUploadingImage ||
                !formik.isValid ||
                !formik.dirty
              }
              className=" bg-green-darkbggreen h-[45px] text-green-lightbgGreen mt-4"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAd;
