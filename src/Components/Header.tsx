/* **
This component handles the header of the application.
The navbar provides the user navigation throughout the application.

The user can handle registration, login/logout through the navbar in the header.
** */

import * as React from "react";
import "../styles.css";
import logo from "../assets/logo-twilio.png";
import { Button } from "@twilio-paste/core/button";
import { Box } from "@twilio-paste/core/box";
import { Stack } from "@twilio-paste/core/stack";
import { Breadcrumb, BreadcrumbItem } from "@twilio-paste/core/breadcrumb";
import { Link } from "react-router-dom";
import { LogoTwilioIcon } from "@twilio-paste/icons/esm/LogoTwilioIcon";
import { nodeName } from "cypress/types/jquery";
import { Anchor } from "@twilio-paste/core";

// TODO: Add login/logout logic

const Header = () => {
  const styles = {
    
    links: {
      textDecoration: "none",
      color: "black"
    },
  };
  return (
    <nav className="nav">
      <Stack orientation="horizontal" spacing="space0">
        <Box className="logo">
          <LogoTwilioIcon
            decorative={true}
            title="Twilio logo"
            color="colorTextIconBrandInverse"
            size="sizeIcon90"
          />
        </Box>
        <Box className="navItems">
          <Anchor href="/" className="headerButton">
              Home
            </Anchor>
          <div className="navButton">
            <Button variant="secondary">
              <Link to="/CreateEvaluation" style={styles.links}>
                Create Evaluation
              </Link>
            </Button>
            <Button variant="secondary">
              <Link to="/login" style={styles.links}>
                Login
              </Link>
            </Button>
            <Button variant="secondary">
              <Link to="/registration" style={styles.links}>
                Registration
              </Link>
            </Button>
            <Button variant="secondary">Login/Logout</Button>
          </div>
        </Box>
        {/* <Breadcrumb>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/login">Login</BreadcrumbItem>
          <BreadcrumbItem href="/registration">Register</BreadcrumbItem>
        </Breadcrumb> */}
      </Stack>
    </nav>
  );
};

export default Header;
