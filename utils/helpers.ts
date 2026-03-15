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

export const formatCurrency = (amount: number, currency: string) => {
  if (!amount) return null;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
    maximumFractionDigits: 0,
  }).format(amount);
};

export const timeAgo = (dateStr: string) => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
};
