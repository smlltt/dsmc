import { signIn } from "@/auth";
import Image from "next/image";
import google from "./google.svg";
import { roboto } from "@/fonts";
import LoginForm from "@/components/molecules/login-form";

export default async function LoginPage() {
  return (
    <div className="justify-center flex pt-52 flex-col px-12">
      <div className={"h1 text-center"}>
        Join <span className={"text-red-600"}>Do Studzienki Movie Club</span>
      </div>
      <LoginForm />
      {/*<form*/}
      {/*  action={async () => {*/}
      {/*    "use server";*/}
      {/*    await signIn("google");*/}
      {/*  }}*/}
      {/*  className={"justify-center flex"}*/}
      {/*>*/}
      {/*  <button*/}
      {/*    type="submit"*/}
      {/*    className={*/}
      {/*      "flex gap-2.5 py-2 items-center border border-gray-500 px-3 rounded-md mt-12"*/}
      {/*    }*/}
      {/*  >*/}
      {/*    <Image priority alt="g" width={20} height={20} src={google} />*/}
      {/*    <div className={`${roboto.className}`}>Sign in with Google</div>*/}
      {/*  </button>*/}
      {/*</form>*/}
    </div>
  );
}
