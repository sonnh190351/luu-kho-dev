import {createTheme, MantineProvider} from "@mantine/core";
import {createBrowserRouter, RouterProvider} from "react-router";


import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import "@fontsource/andada-pro/400.css";
import "@fontsource/be-vietnam-pro/400.css";

import {Notifications} from "@mantine/notifications";

export default function App(){

    const router = createBrowserRouter([
        {
            path: "*",
            element: <HomepageLayout />
        }
    ])

    const theme = createTheme({
        fontFamily: "Be Vietnam Pro",
    })

    return (
        <MantineProvider theme={theme}>
            <Notifications />
            <RouterProvider router={router} />
        </MantineProvider>
    )
}