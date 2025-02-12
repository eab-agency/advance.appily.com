"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("error") === "404") {
      toast.error("Page not found. Redirected to the blog page.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [searchParams]);

  return (
    <ToastContainer />
  );
};

export default Toast;
