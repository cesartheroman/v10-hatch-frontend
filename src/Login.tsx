import * as React from "react";
import axios from "axios";
import { useState } from "react";
import { Label, Input, Button, Card, Box, Anchor } from "@twilio-paste/core";
import { Buffer } from "buffer";
import { useNavigate } from "react-router-dom";
import  background  from "./twilio-background.png";
import { Link } from "react-router-dom";
import { loginUser } from "./auth_service/authService.service";

export default function Login() {
  const baseURL: string = "http://localhost:9876/";
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loggedIn, setLoggedIn] = React.useState<boolean>(false);

  // React.useEffect(() => {
  //   console.log("Login state: " + loggedIn);
  // }, [loggedIn]);

  let navigate = useNavigate();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
<<<<<<< HEAD
   try {
     const userResponseToLogin = await loginUser(user)
     navigate("../", { replace: true });
   } catch (err) {
     console.log(err)
   }
=======
    axios
      .get(baseURL + "login", {
        auth: {
          username: user.email,
          password: user.password,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setLoggedIn(true);
          console.log(response.data);
          localStorage.setItem(
            "token",
            "Bearer " + response.data.token
          );
          axios
            .get(baseURL + "auth/check-token", {
              headers: { Authorization: "Bearer " + response.data.token },
            })
            .then((response) => {
              localStorage.setItem("user", JSON.stringify(response.data));
              let userinfo: any = localStorage.getItem("user");
              let userInfo: string = JSON.parse(userinfo);

              navigate("/", { replace: true });
              location.reload();

            });
          
        } else {
          alert("Login did not work. Please check your information and try again.");
        }
      })
      .catch((error) => alert("Error: " + error.status));
>>>>>>> 60ab98eb4e973d965325049934960268ca5f840b
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement)
        .value,
    });
  };

  // const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
  //     e.preventDefault();
  //     console.log("login state:", loggedIn)
  //     setLoggedIn(false);
  // }

  return (
    <div id="loginBG" style={{ backgroundImage: `url(${background})`, backgroundSize: 'auto', height: '90vh', overflow: "hidden"}}>
    <div id="loginComponent">
      <Card style={{ margin: "10px" }}>
        {/* <div>
          <Button
            variant="primary"
            onClick={() => {
              setLoggedIn(false);
            }}
          >
            Logout
          </Button>
        </div> */}
        <div id="loginForm">
          <form onSubmit={handleSubmit}>
            <div id="loginHelloSubmit">
            <h1> Welcome to Twilio Hatch Evaluations!</h1>
            <p>Please login to the system to access your available evaluations. </p>
            </div>
            <Box marginBottom="space80" style={{ width: "500px" }}>
              <Label htmlFor="email" required>
                User Email:
              </Label>
              <Input
                id="email"
                name="email"
                type="text"
                placeholder="example@twilio.com"
                onChange={handleChange}
                required
              />
            </Box>
            <Box marginBottom="space80" style={{ width: "500px" }}>
              <Label htmlFor="password" required>
                Password:
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                onChange={handleChange}
                required
              />
            </Box>
            <div id="loginHelloSubmit">
            <Button type="submit" variant="primary">
              Login
            </Button>
<br />< br/>
            <Link to="/registration" style={{color: "rgb(235, 86, 86)", textDecoration: "none"}}>Not registered yet? <strong> Click here!</strong></Link> 
            </div>
          </form>
        </div>
      </Card>
    </div>
    </div>
  );
}
