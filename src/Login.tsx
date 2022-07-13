import * as React from "react";
import axios from 'axios'
import { useState } from "react";
import { Label, Input, Button, Card, Box } from "@twilio-paste/core";
import {Buffer} from "buffer";



export default function Login() {

    const baseURL: string = 'http://localhost:9876/login'
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [loggedIn, setLoggedIn] = React.useState<boolean>(false)

    
    // var config = {
    //     method: 'GET',
    //     url: 'http://localhost:9876/login',
    //     headers: { 
    //       'Authorization': + basicAuth
    //     }
    //   };
  
      

    React.useEffect(() => {
        console.log("Login state: " + loggedIn);}
    , [loggedIn]);

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.get(baseURL, {auth: {
            username: user.email,
            password: user.password
        }}).then((response) => {
            if (response.status === 200) {
                setLoggedIn(true);
                console.log(response.data)
                localStorage.setItem("token", "Authentication: Basic " + response.data.token);
                
            } else {
                alert('Login did not work. Please check your work and try again.')
            }
        })
        .catch((error) => alert('Error: ' + error.status))
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
        <div style={{maxWidth: 600, padding: 10, margin: 10}}>
        <Card style={{margin: '10px'}}>
        <div>
            <Button variant="primary" onClick={()=>{setLoggedIn(false)}}>Logout</Button>
        </div>
        <div>

            <form onSubmit={handleSubmit}>
                <h1> Welcome to Hatch Evaluations!</h1>
                <p>Please login to the system to access your available evals. </p>
                <Box marginBottom="space80" style= {{width: '500px'}}>
                    <Label htmlFor="email" required>User Email:</Label>
                    <Input id="email" name="email" type="text" placeholder="example@twilio.com" onChange={handleChange} required />
                </Box>
                <Box marginBottom="space80" style= {{width: '500px'}}>
                    <Label htmlFor="password" required>Password:</Label>
                    <Input id="password" name="password" type="password" onChange={handleChange} required />
                </Box>
                <Button type="submit" variant="primary">Submit</Button>
            </form>
        </div>
        </Card>
        </div>
    )

}