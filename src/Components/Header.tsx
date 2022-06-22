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

const Header = () => {
  const styles = {
    navButton: {
      margin:0,
      padding: 0,
      display: 'flex',
      justifyContent: 'end',
      gap: 10
    },
    links: {
      textDecoration: 'none'
    }
  }
  return (
    <nav className="nav">
      <Stack orientation="vertical" spacing="space0">
        <Box className="logo">
          <img src={logo} alt="Twilio Logo" width="75px" height="75px" />
        </Box>
        <Box className="navItems">
          <Button variant="secondary"><Link to="/" style={styles.links} >Home</Link></Button>
          <div style={styles.navButton}>
            <Button variant="secondary"><Link to="/login" style={styles.links} >Login</Link></Button>
            <Button variant="secondary"><Link to="/registration" style={styles.links} >Registration</Link></Button>
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
