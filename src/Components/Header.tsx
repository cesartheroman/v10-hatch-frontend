/* **
This component handles the header of the application.
The navbar provides the user navigation throughout the application.

The user can handle registration, login/logout through the navbar in the header.
** */

import * as React from "react";
import "../styles.css";
import logo from "../assets/logo-twilio.png";
import { Heading } from "@twilio-paste/core";
import { Button } from "@twilio-paste/core/button";
import { Box } from "@twilio-paste/core/box";
import { Stack } from "@twilio-paste/core/stack";
import { Breadcrumb, BreadcrumbItem } from "@twilio-paste/core/breadcrumb";
import { Link } from "react-router-dom";
import { LogoTwilioIcon } from "@twilio-paste/icons/esm/LogoTwilioIcon";
import { nodeName } from "cypress/types/jquery";
import { Anchor } from "@twilio-paste/core";

// TODO: Add login/logout toggle logic once user auth is implemented

/**
 * 
 * This is the Header for the app. It is persistant on every page view and has the basic navigation between
 * different views/components in the app. The links in the navItems box will differ depending on the user
 * and their role. 
 * 
 */


const Header = () => {
  const styles = {
    links: {
      textDecoration: "none",
      color: "black",
    },
  };
  return (
    <nav className="nav">
      <Box className="logo">
        <LogoTwilioIcon
          decorative={true}
          title="Twilio logo"
          color="colorTextIconBrandInverse"
          size="sizeIcon90"
        />
        <Heading id="heading" as="h1" variant="heading10">Twilio Hatch Evaluations</Heading>
      </Box>
      <Box id="navItems">
        <Anchor href="/" variant="inverse" id="headerLink">
          Home
        </Anchor>
        <Anchor href="/CreateEvaluation" variant="inverse" id="headerLink">
            Create Evaluation
          </Anchor>
        
        <Anchor href="/login" variant="inverse" id="headerLink">
            Login
          </Anchor>
        <Anchor href="/registration" variant="inverse" id="headerLink">
            Registration
          </Anchor>
        {/* <Button variant="secondary">Login/Logout</Button> */}
      </Box>
      {/* <Breadcrumb>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/login">Login</BreadcrumbItem>
          <BreadcrumbItem href="/registration">Register</BreadcrumbItem>
        </Breadcrumb> */}
    </nav>
  );
};

export default Header;
