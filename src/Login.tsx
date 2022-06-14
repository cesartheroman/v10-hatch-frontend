import * as React from "react";
import { useState } from "react";
import { Label, Input, HelpText, Button } from "@twilio-paste/core";

export default function Login() {

const [username, setUsername] = useState("");
const [password, setPassword] = useState("");

function Submit() {
    console.log({username});
    console.log({password});
}



  return (
    <div id="loginform">
        
      <Label htmlFor="email_address" required>
        Username
      </Label>
      <Input
        aria-describedby="username"
        id="username"
        name="username"
        type="text"
        placeholder="username"
        value={username}
        onChange={() => setUsername(username)}
        required
      />
      {/* <HelpText id="username">Please enter your Evaluation System username.</HelpText> */}
<br />
      <Label htmlFor="password" required>
        Password
      </Label>
      <Input
        aria-describedby="password"
        id="password"
        name="password"
        type="password"
        placeholder="password"
        value={password}
        onChange= {() => setPassword(password)}
        required
      />
      <Button variant="primary" onClick={Submit}> Login </Button>
    </div>
  );
}