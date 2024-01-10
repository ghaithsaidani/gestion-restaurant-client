// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import {Theme} from "./theme";
import {Routers} from "./routers";
import {Store} from "./redux/store";
import {Provider} from "react-redux";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export function App() {

    const queryClient = new QueryClient()
    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={Store}>
                <Theme>
                    <Routers/>
                </Theme>
            </Provider>
            { /*<ReactQueryDevtools initialIsOpen={true} /> */}
        </QueryClientProvider>
    );
}

export default App;
