"use client";
import React, { useActionState } from "react";
import Image from "next/image";
import google from "./google.svg";
import { roboto } from "@/fonts";
import { login } from "@/lib/actions/authentication";
import { clsx } from "clsx";
import { Skeleton } from "@/components/ui/skeleton";

const LoginForm = () => {
  const [_, formAction, isPending] = useActionState(login, {
    message: "",
  });
  return (
    <form className={"justify-center flex"}>
      <button
        type="submit"
        className={clsx(
          "flex gap-2.5 py-2 items-center border border-gray-500 px-3 rounded-md mt-12",
          isPending && "opacity-25",
        )}
        formAction={formAction}
        disabled={isPending}
      >
        {isPending ? (
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-10" />
            <Skeleton className="h-6 w-28" />
          </div>
        ) : (
          <>
            <Image priority alt="google" width={20} height={20} src={google} />
            <div className={`${roboto.className}`}>Sign in with Google</div>
          </>
        )}
      </button>
    </form>
  );
};

export default LoginForm;
