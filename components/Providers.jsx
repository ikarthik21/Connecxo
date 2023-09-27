"use client";

import store from "@store/store";
import { Provider } from "react-redux";

import { SessionProvider } from "next-auth/react";

function Providers({ children }) {
    return <SessionProvider>
        <Provider store={store}>
        {children}
        </Provider>
        


    </SessionProvider>;
}


export default Providers;
