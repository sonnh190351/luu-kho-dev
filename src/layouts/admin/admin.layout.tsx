import {ActionIcon, Container, Group, Stack, Text} from "@mantine/core";
import {BORDER_COLOR, NAV_BAR_HEIGHT} from "../../enums/styling.ts";
import {useRef, useState} from "react";
import gsap from "gsap"
import {
    IconBuildingWarehouse,
    IconCategory,
    IconChevronLeft,
    IconChevronRight, IconPackage,
    IconTag,
    IconTemplate, IconUser, IconUserDollar
} from "@tabler/icons-react";
import ItemsTab from "./components/items.tab.tsx";

const openMenuWidth = 200;

const closedMenuWidth = 50;

const adminTabs = [
    {
        icon: <IconTemplate/>,
        title: "Items",
        item: <ItemsTab />,
    },
    {
        icon: <IconCategory/>,
        title: "Categories",
        item: <ItemsTab />,
    },
    {
        icon: <IconTag/>,
        title: "Tags",
        item: <ItemsTab />,
    },
    {
        icon: <IconPackage/>,
        title: "Inventories",
        item: <ItemsTab />,
    },
    {
        icon: <IconBuildingWarehouse/>,
        title: "Warehouses",
        item: <ItemsTab />,
    },
    {
        icon: <IconUserDollar/>,
        title: "Suppliers",
        item: <ItemsTab />,
    },
    {
        icon: <IconUser/>,
        title: "Users",
        item: <ItemsTab />,
    },
]


export default function AdminLayout() {

    const menuRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [openMenu, setOpenMenu] = useState<boolean>(false)

    const [currentTab, setCurrentTab] = useState<number>(0);

    function toggleMenu() {
        const tl = gsap.timeline({})

        tl.to(menuRef.current, {
            width: openMenu ? openMenuWidth : closedMenuWidth,
        }).to(containerRef.current, {
            marginLeft: openMenu ? openMenuWidth : closedMenuWidth,
        }, "<")

        setOpenMenu(!openMenu)
    }

    return (
        <Container fluid style={{
            paddingTop: NAV_BAR_HEIGHT,
        }}>
            <Group p={0} m={0}>
                <Stack justify={'space-between'} ref={menuRef} style={{
                    paddingTop: NAV_BAR_HEIGHT,
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    zIndex: 1,
                    borderRight: `1px solid ${BORDER_COLOR}`,
                    width: openMenuWidth,
                    height: '100%',
                }}>
                    <Stack p={5} gap={0}>
                        {
                            adminTabs.map((tab, index) => (
                                <Group p={5} onClick={() => setCurrentTab(index)} key={`admin-tab-${index}`} mt={5} style={{
                                    overflow: 'hidden',
                                    position: 'relative',
                                    cursor: 'pointer',
                                    backgroundColor: index === currentTab ? "rgba(255,255,255, 0.05)" : 'transparent',
                                    borderRadius: '5px'
                                }}>
                                    <ActionIcon variant={"outline"} color={'white.5'} onClick={toggleMenu}>
                                        {
                                            tab.icon
                                        }
                                    </ActionIcon>
                                    <Text style={{
                                        position: 'absolute',
                                        left: 50,
                                    }}>
                                        {tab.title}
                                    </Text>
                                </Group>
                            ))
                        }
                    </Stack>
                    <ActionIcon variant={"outline"} ml={'xs'} mb={'xs'} color={'white.5'} onClick={toggleMenu}>
                        {
                            openMenu ? <IconChevronRight/> : <IconChevronLeft/>
                        }
                    </ActionIcon>
                </Stack>
                <div ref={containerRef} style={{
                    width: "100%",
                    height: '100px',
                    zIndex: -1,
                    marginLeft: openMenuWidth,
                }}>{
                    adminTabs[currentTab].item
                }</div>
            </Group>
        </Container>
    )
}
