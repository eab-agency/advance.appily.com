"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("error") === "404") {
      // Show toast message for 404 error
      toast.error("Page not found. Redirected to the blog page.", {
        position: "top-right",
        autoClose: 5000, // Close after 5 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [searchParams]);

  return (
    <>
      <ToastContainer style={{ zIndex: 9999, position: "absolute", }} />
    </>
  );
};

export default Toast;
