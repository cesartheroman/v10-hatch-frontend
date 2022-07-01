import * as React from "react";
import "../styles.css";
import { Box } from "@twilio-paste/core/box";

const Footer = () => {
  return (
    <footer className="footer">
      <Box className="footerItems">
       Copyright © 2022 Twilio.  All Rights Reversed.  Created by Hatch cohort V10.
      </Box>
    </footer>
  );
};

export default Footer;
