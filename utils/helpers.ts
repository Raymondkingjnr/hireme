import { cloudinaryUrl, uploadPreset } from "@/utils/constant";

const fileToDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("Failed to read image file"));
    reader.readAsDataURL(file);
  });

export const uploadImageToCloudinary = async (
  file: File,
): Promise<string | null> => {
  try {
    const base64Img = await fileToDataUrl(file);

    if (!base64Img) {
      throw new Error("No image data found");
    }

    const response = await fetch(cloudinaryUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        file: base64Img,
        upload_preset: uploadPreset,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error?.message || "Failed to upload image");
    }

    if (data?.secure_url) {
      return data.secure_url as string;
    }

    throw new Error("No URL returned from Cloudinary");
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return null;
  }
};

export const pickImageFromGallery = async (
  file: File,
): Promise<string | null> => {
  return uploadImageToCloudinary(file);
};
