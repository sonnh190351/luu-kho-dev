import {createTheme, MantineProvider} from "@mantine/core";
import {createBrowserRouter, RouterProvider} from "react-router";

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import "@fontsource/be-vietnam-pro/200.css";

import {Notifications} from "@mantine/notifications";
import HomepageLayout from "./layouts/homepage/homepage.layout.tsx";
import LoginLayout from "./layouts/auth/login/login.layout.tsx";
import ProtectedRoute from "./routes/protected.route.ts";
import NavigationBar from "./components/navigation/navigationBar.tsx";
import AdminLayout from "./layouts/admin/admin.layout.tsx";

export default function App(){

    const router = createBrowserRouter([
        {
            path: "*",
            element: <ProtectedRoute>
                <NavigationBar />
                <HomepageLayout />
            </ProtectedRoute>
        },
        {
            path: "/admin",
            element: <ProtectedRoute>
                <NavigationBar />
                <AdminLayout />
            </ProtectedRoute>
        },
        {
            path: "/login",
            element: <LoginLayout />
        }
    ])

    const theme = createTheme({
        fontFamily: "Be Vietnam Pro",
    })

    return (
        <MantineProvider theme={theme} defaultColorScheme={"dark"}>
            <Notifications />
            <RouterProvider router={router} />
        </MantineProvider>
    )
}