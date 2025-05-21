import WelcomePage from "./pages/WelcomePage";
import LoginPage from "./pages/LoginPage";
import { useCookies } from "react-cookie";

function App() {
  const [cookies, setCookie] = useCookies(["userBearer"]);

  const handleLogin = (user: {
    username: string;
    password: string;
    bearer: string;
  }) => {
    setCookie("userBearer", user.bearer, { path: "/" });
  };

  return (
    <div>
      {cookies.userBearer ? (
        <WelcomePage bearer={cookies.userBearer} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
