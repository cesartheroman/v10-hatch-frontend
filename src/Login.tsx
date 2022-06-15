import * as React from "react";
import axios from 'axios'
import { useState } from "react";
import { Label, Input, Button, Card } from "@twilio-paste/core";


export default function Login() {

    const baseURL: string = 'http://localhost:3000/users'
    const [user, setUser] = useState<object>({
        username: "",
        password: ""
    });
    const [loggedIn, setLoggedIn] = React.useState<boolean>(false)

    React.useEffect(() => {
        console.log("Login state: " + loggedIn);}
    , [loggedIn]);

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.post(baseURL, user).then((response) => {
            
            console.log("Response:", response)
            if (response.status === 201) {
                setLoggedIn(true)
                //Add redirect to dashboard  TODO
            } else {
                alert('Login did not work')
            }
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value
        })
    }

    // const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    //     e.preventDefault();
    //     console.log("login state:", loggedIn)
    //     setLoggedIn(false);
    // }

    return (
        <Card style={{margin:10}}>
        <div>
            <Button variant="primary" onClick={()=>{setLoggedIn(false)}}>Logout</Button>
        </div>
        <div>
            <form onSubmit={handleSubmit}>
                <>
                    <Label htmlFor="username" required>Username</Label>
                    <Input id="username" name="username" type="text" placeholder="example@twilio.com" onChange={handleChange} required />
                </>
                <>
                    <Label htmlFor="password" required>Password</Label>
                    <Input id="password" name="password" type="password" onChange={handleChange} required />
                </>
                <Button type="submit" variant="primary">submit</Button>
            </form>
        </div>
        </Card>
        
    )

    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");

    // function Submit() {
    //     console.log({username});
    //     console.log({password});
    // }



    //   return (
    //     <div id="loginform">

    //       <Label htmlFor="email_address" required>
    //         Username
    //       </Label>
    //       <Input
    //         aria-describedby="username"
    //         id="username"
    //         name="username"
    //         type="text"
    //         placeholder="username"
    //         value={username}
    //         onChange={() => setUsername(username)}
    //         required
    //       />
    //       {/* <HelpText id="username">Please enter your Evaluation System username.</HelpText> */}
    // <br />
    //       <Label htmlFor="password" required>
    //         Password
    //       </Label>
    //       <Input
    //         aria-describedby="password"
    //         id="password"
    //         name="password"
    //         type="password"
    //         placeholder="password"
    //         value={password}
    //         onChange= {() => setPassword(password)}
    //         required
    //       />
    //       <Button variant="primary" onClick={Submit}> Login </Button>
    //     </div>
    //   );
}