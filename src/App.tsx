import * as React from 'react';
import Login from './Login';
import {Theme} from '@twilio-paste/core/theme';
interface Props {
   name: string
}
class App extends React.Component<Props> {
  render() {
    const { name } = this.props;
    return (
      <Theme.Provider theme="default">
        <h1>
          Hello {name}
        </h1>
        <Login />
      </Theme.Provider>
    );
  }
}
export default App;