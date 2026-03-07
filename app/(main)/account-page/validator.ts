import * as Yup from "yup";

export const accountvalidationSchema = Yup.object({
  full_name: Yup.string()
    .required("Full name is required")
    .test(
      "is-full-name",
      "Please enter your full name (at least two words, e.g. John Doe)",
      (value) => {
        if (!value) return false;
        const words = value.trim().split(/\s+/);
        return words.length >= 2 && words.every((word) => word.length >= 2);
      },
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
