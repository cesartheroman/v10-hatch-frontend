import * as React from "react";
import { useState } from "react";
import {
  Input,
  Box,
  Label,
  HelpText,
  Button,
  RadioGroup,
  Radio,
  Column,
  Grid,
  Card,
} from "@twilio-paste/core";
import axios from "axios";

const Registration = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("reviewer");
  const [name, setName] = useState<string>("");

  const baseURL: string = "http://localhost:3000/users";

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    postUser();
  };

  const postUser = () => {
    axios.post(baseURL, { name, email, password, role }).then((response) => {
      console.log("Response Data: ", response.data);
    });
  };

  return (
    <>
      <Grid gutter="space30">
        <Column span={8} offset={2}>
          <Card padding="space100">
            <h2>Register New Account</h2>
            <form onSubmit={handleSubmit}>
              <Label htmlFor="name" required>
                Name
              </Label>
              <Input
                aria-describedby="name_help_text"
                id="name"
                name="name"
                type="text"
                value={name}
                placeholder="John Doe"
                onChange={(e) => setName(e.target.value)}
                required
              />
              <HelpText id="password_help_text">
                Enter valid email address
              </HelpText>
              <Label htmlFor="email_address" required>
                Email address
              </Label>
              <Input
                aria-describedby="email_help_text"
                id="email_address"
                name="email_address"
                type="email"
                value={email}
                placeholder="example@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <HelpText id="password_help_text">
                Enter valid email address
              </HelpText>
              <Label htmlFor="password" required>
                Password
              </Label>
              <Input
                aria-describedby="password_help_text"
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <HelpText id="email_help_text"></HelpText>

              <RadioGroup
                name="controlled-radio-group"
                legend="Choose role"
                helpText="User role determines what access rights your account will be provided"
                value={role}
                onChange={(newValue) => {
                  setRole(newValue);
                }}
              >
                <Radio
                  id={"reviewer"}
                  value="reviewer"
                  name="controlled-radio-group"
                >
                  reviewer
                </Radio>
                <Radio
                  id={"apprentice"}
                  value="apprentice"
                  name="controlled-radio-group"
                >
                  apprentice
                </Radio>
              </RadioGroup>
              <br />

              <Button size="default" type="submit" variant="primary">
                Submit
              </Button>
            </form>
          </Card>
        </Column>
      </Grid>
    </>
  );
};

export default Registration;
