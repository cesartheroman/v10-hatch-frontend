import * as React from "react";
import "../styles.css";
import logo from "../assets/logo-twilio.png";
import { Button } from "@twilio-paste/core/button";
import { Box } from "@twilio-paste/core/box";
import { Stack } from "@twilio-paste/core/stack";

const Header = () => {
  return (
    <nav className="nav">
      <Stack orientation="vertical" spacing="space0">
        <Box className="logo">
          <img src={logo} alt="Twilio Logo" width="75px" height="75px" />
        </Box>
        <Box className="navItems">
          <Button variant="secondary">Home</Button>
          <Button variant="secondary">Login/Logout</Button>
        </Box>
      </Stack>
    </nav>
  );
};

export default Header;
