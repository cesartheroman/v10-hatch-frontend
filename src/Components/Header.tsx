import * as React from "react";
import {Stack} from '@twilio-paste/core/stack';

const Header = () => {
    return (
    <nav>
        <Stack orientation='horizontal' spacing='space40'>
            <li><a href='#'>Home</a></li>
            <li><a href='#'>About</a></li>
            <li><a href='#'>Contact</a></li>
        </Stack>
    </nav>
    )
}

export default Header;