"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { login } from "@/lib/actions/authentication";
import { clsx } from "clsx";
import Image from "next/image";
import { useActionState } from "react";
import google from "./google.svg";

const LoginForm = () => {
  const [_, formAction, isPending] = useActionState(login, {
    message: "",
  });
  return (
    <form className={"flex justify-center"}>
      <button
        type="submit"
        className={clsx(
          "mt-12 flex items-center gap-2.5 rounded-md border border-gray-500 px-3 py-2",
          isPending && "pointer-events-none opacity-25",
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
            <div className={"font-roboto"}>Sign in with Google</div>
          </>
        )}
      </button>
    </form>
  );
};

export default LoginForm;
