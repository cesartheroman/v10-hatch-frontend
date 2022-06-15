import * as React from "react";
import Login from "./Login";
import Registration from "./Registration";
import { Theme } from "@twilio-paste/core/theme";
interface Props {
  name: string;
}

class App extends React.Component<Props> {
  render() {
    const { name } = this.props;
    return (
      <Theme.Provider theme="default">
        <h1>Hello {name}</h1>
        <Login />
        <Registration />
      </Theme.Provider>
    );
  }
}
export default App;
