import { Avatar, Button, Container, Group, Menu } from "@mantine/core";
import {
    BG_COLOR,
    BORDER_COLOR,
    NAV_BAR_HEIGHT,
    ZIndexLevel,
} from "../../enums/styling.ts";
import { LocalStorage } from "../../enums/localStorage.ts";
import { IconLogout, IconSettings, IconUser } from "@tabler/icons-react";

export default function NavigationBar() {
    const cachedData = localStorage.getItem(LocalStorage.userData);

    const isLoggedIn = Boolean(cachedData);

    const loginData = JSON.parse(cachedData!);

    return (
        <Container
            fluid
            style={{
                width: "100%",
                position: "fixed",
                left: 0,
                top: 0,
                height: NAV_BAR_HEIGHT,
                backgroundColor: BG_COLOR,
                borderBottom: `1px solid ${BORDER_COLOR}`,
                zIndex: ZIndexLevel.HIGHEST,
            }}>
            <Group pt={5} justify={"space-between"}>
                <img src={"/logo.png"} height={25} />

                <Group>
                    {isLoggedIn ? (
                        <Menu>
                            <Menu.Target>
                                <Avatar />
                            </Menu.Target>

                            <Menu.Dropdown>
                                <Menu.Label>{loginData.user.email}</Menu.Label>
                                <Menu.Divider></Menu.Divider>
                                <Menu.Item leftSection={<IconUser />}>
                                    User Details
                                </Menu.Item>
                                <Menu.Item leftSection={<IconSettings />}>
                                    Settings
                                </Menu.Item>
                                <Menu.Divider></Menu.Divider>
                                <Menu.Item
                                    leftSection={<IconLogout />}
                                    color="red">
                                    Log out
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    ) : (
                        <Button size={"xs"}>Login</Button>
                    )}
                </Group>
            </Group>
        </Container>
    );
}
