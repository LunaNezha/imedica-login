import { PathNames } from "@src/constants/pathnames.const";
import Login from "@src/components/auth/login-initial";
import LoginWithPhone from "@src/components/auth/login-with-phone";
import LoginWithUsername from "@src/components/auth/login-with-username";

export default [
  {
    path: PathNames.Login,
    name: "Login",
    component: <Login />,
  },
  {
    path: PathNames.LoginWithPhone,
    name: "Login With Phone",
    component: <LoginWithPhone />,
  },
  {
    path: PathNames.LoginWithUsername,
    name: "Login With Username",
    component: <LoginWithUsername />,
  },
];
