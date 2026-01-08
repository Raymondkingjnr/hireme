import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      toastOptions={{
        className: "",
        duration: 5000,
        style: {
          background: "#ffff",
          color: "#2f2d2d",
        },

        success: {
          duration: 3000,
          iconTheme: {
            primary: "green",
            secondary: "#fff",
          },
        },

        error: {
          duration: 6000,
          iconTheme: {
            primary: "#fe0606",
            secondary: "#fff",
          },
        },
      }}
    />
  );
}
