import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

interface LoginPageProps {
  onLogin: (user: { user: string; pass: string; bearer: string }) => void;
}

function LoginPage({ onLogin }: LoginPageProps) {
  const [user, setUsername] = useState("");
  const [pass, setPassword] = useState("");

  async function handleSubmit(event: any) {
    event.preventDefault();

    console.log("Teste");

    await axios
      .post(
        "https://api-dev.hrstudium.pt/login",
        {
          username: user,
          password: pass,
        },
        {
          headers: {
            company: "dev",
          },
        }
      )
      .then(function (response) {
        const bearer = response.data.access_token;
        console.log(bearer);

        onLogin({ user, pass, bearer });
      });
  }

  return (
    <div className="flex flex-col justify-center w-screen h-screen items-center ">
      <div className="p-10 flex flex-col items-center h-100 w-100 rounded-xl">
        <p className="font-semibold text-4xl text-primary">Login</p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center p-10 rounded-xl justify-center"
        >
          <input
            className="border border-slate-200 bg-light-grey rounded-md p-2 w-60"
            type="text"
            value={user}
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />

          <input
            className="border border-slate-200 bg-light-grey rounded-md p-2 w-60"
            placeholder="Enter password"
            type="password"
            value={pass}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <input
            type="submit"
            value="Submit"
            className="p-1 justify-center rounded-md bg-primary content w-60 text-xl font-semibold text-white"
          />
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
