import * as React from "react";
import { Heading } from "@twilio-paste/core";
import { Box } from "@twilio-paste/core/box";
import { LogoTwilioIcon } from "@twilio-paste/icons/esm/LogoTwilioIcon";
import { Anchor } from "@twilio-paste/core";

/* **
This component handles the header of the application. It is persistent on every page view and has the 
basic navigation between different views/components in the app. The links in the navItems box will differ 
depending on the user and their role.

The user can handle registration, login/logout through the navbar in the header.
** */

// TODO: Add login/logout toggle logic once user auth is implemented

const Header = () => {
  return (
    <nav className="nav">
      <Box className="logo">
        <LogoTwilioIcon
          decorative={true}
          title="Twilio logo"
          color="colorTextIconBrandInverse"
          size="sizeIcon90"
        />
        <Heading id="heading" as="h1" variant="heading10">
          Twilio Hatch Evaluations
        </Heading>
      </Box>
      <Box id="navItems">
        <Anchor href="/" variant="inverse" id="headerLink">
          Home
        </Anchor>
        <Anchor href="/userMaintenance" variant="inverse" id="headerLink">
          User Maintenance
        </Anchor>
        <Anchor href="/newreview" variant="inverse" id="headerLink">
          Complete Review
        </Anchor>
        <Anchor href="/CreateEvaluation" variant="inverse" id="headerLink">
          Create Evaluation
        </Anchor>
        <Anchor href="/Questions" variant="inverse" id="headerLink">
          Questions
        </Anchor>
        <Anchor href="/login" variant="inverse" id="headerLink">
          Login
        </Anchor>
        <Anchor href="/registration" variant="inverse" id="headerLink">
          Registration
        </Anchor>
      </Box>
    </nav>
  );
};

export default Header;
