// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import {Theme} from "./theme";
import {Routers} from "./routers";

export function App() {
  return (
        <Theme>
            <Routers/>
        </Theme>
  );
}

export default App;
