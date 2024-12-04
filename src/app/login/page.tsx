import LoginForm from "@/components/molecules/login-form";

export default async function LoginPage() {
  return (
    <div className="flex flex-col justify-center px-12 pt-52">
      <h1 className="dsmc-text-h1 text-center">
        Join <span className={"text-red-600"}>Do Studzienki Movie Club</span>
      </h1>
      <LoginForm />
    </div>
  );
}
