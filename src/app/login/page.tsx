import LoginForm from "@/components/molecules/LoginForm";

export default async function LoginPage() {
  return (
    <div className="justify-center flex pt-52 flex-col px-12">
      <div className={"h1 text-center"}>
        Join <span className={"text-red-600"}>Do Studzienki Movie Club</span>
      </div>
      <LoginForm />
    </div>
  );
}
