import { useEffect, useState } from "react";
import ChatButton from "../components/ChatButton";
import axios from "axios";
import "react-cookie";
import { useCookies } from "react-cookie";

function WelcomePage({ bearer }: any) {
  const [user, setUser] = useState<any>({});
  const [cookie, setCookie, removeCookie] = useCookies();

  useEffect(() => {
    axios
      .get("https://api-dev.hrstudium.pt/users", {
        headers: {
          company: "dev",
          Authorization: "Bearer " + bearer,
        },
      })
      .then(function (response) {
        setUser(response.data);
      });
  });

  const handleOnClick = () => {
    console.log("Entrei!");

    removeCookie("userBearer", { path: "/" });
  };

  return (
    <>
      <div className="flex justify-center w-screen h-screen items-center flex-col">
        <h1 className="text-4xl font-bold text-primary">
          Hello, {user.nome_completo}!
        </h1>
        <button
          className="w-30 bg-red-100 mt-10 p-2 rounded-md border border-red-300 font-semibold text-red-500 hover:bg-red-50"
          onClick={handleOnClick}
        >
          Logout
        </button>
        <ChatButton bearer={bearer} />
      </div>
    </>
  );
}

export default WelcomePage;
