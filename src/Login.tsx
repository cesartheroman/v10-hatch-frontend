import * as React from "react";
import axios from 'axios'
import { useState } from "react";
import { Label, Input, Button, Card, Box } from "@twilio-paste/core";


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
                    <Label htmlFor="username" required>Username:</Label>
                    <Input id="username" name="username" type="text" placeholder="example@twilio.com" onChange={handleChange} required />
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