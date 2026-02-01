import {ActionIcon, Button, Divider, Group, Stack, Text, TextInput, Title} from "@mantine/core";
import {IconPlus, IconRefresh, IconSearch} from "@tabler/icons-react";
import {useEffect, useState} from "react";
import type {Items} from "../../../../models/items.ts";
import ItemsModal from "./items.modal.tsx";

export default function ItemsTab(){

    const [items, setItems] = useState<Items[]>([])

    const [displayItems, setDisplayItems] = useState<Items[]>([])

    const [keyword, setKeyword] = useState<string>("")

    const [selectedItem, setSelectedItem] = useState<Items | null>(null)
    const [openItemModal, setOpenItemModal] = useState<boolean>(false)

    useEffect(() => {
        (async () => await fetchItems())();
    }, []);

    async function fetchItems(){

    }

    function handleCloseItemModal() {
        setSelectedItem(null);
        setOpenItemModal(false)
    }

    return (
        <>
            <Stack pt={'lg'} pl={'sm'}>
                <Title>
                    Items Management
                </Title>

                <Group justify={'end'}>
                    <Stack gap={5}>
                        <Text>
                            Filter
                        </Text>
                        <Group>
                            <TextInput placeholder={"Search by Name"} value={keyword} onChange={(e) => setKeyword(e.target.value)} />
                            <ActionIcon size={'lg'}>
                                <IconSearch />
                            </ActionIcon>
                        </Group>
                    </Stack>
                    <Divider orientation={'vertical'} />
                    <Stack gap={5}>
                        <Text>
                            Controls
                        </Text>
                        <Group>
                            <Button onClick={() => setOpenItemModal(true)} leftSection={<IconPlus />}>Add</Button>
                            <Button leftSection={<IconRefresh />}>Refresh</Button>
                        </Group>
                    </Stack>
                </Group>
            </Stack>

            {/*Item modal*/}
            <ItemsModal item={selectedItem} open={openItemModal} refresh={fetchItems} close={handleCloseItemModal} />
        </>
    )
}