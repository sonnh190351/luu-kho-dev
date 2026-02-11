import {ActionIcon, Button, Divider, Group, Stack, Text, TextInput, Title} from "@mantine/core";
import {IconEdit, IconPlus, IconRefresh, IconSearch, IconTrash} from "@tabler/icons-react";
import {useEffect, useState} from "react";

import CommonTable from "../../../../components/dataTable/common.table.tsx";
import InventoryService from "../../../../services/operations/inventory.service.ts";
import UserDetailsModal from "./users.modal.tsx";
import {DatabaseTables} from "../../../../enums/tables.ts";
import type {UserDetails} from "../../../../models/user.ts";

export default function UserDetailsTab() {

    const [items, setUserDetails] = useState<any[]>([])

    const [keyword, setKeyword] = useState<string>("")

    const [selectedItem, setSelectedItem] = useState<any | null>(null)
    const [openItemModal, setOpenItemModal] = useState<boolean>(false)

    useEffect(() => {
        (async () => await fetchUserDetails())();
    }, []);

    async function fetchUserDetails() {
        const service = InventoryService.getInstance();
        const data = await service.getAllRows(DatabaseTables.UserDetails)
        setUserDetails(data)
    }

    function handleCloseItemModal() {
        setSelectedItem(null);
        setOpenItemModal(false)
    }

    const columns: any[] = [
        {
            accessor: 'id',
            title: 'ID',
            sortable: true,
            render: ({id} : UserDetails, index: number) => {
                return <Group key={`item-id-${index}`}>
                    <Text>
                        {id}
                    </Text>
                </Group>
            }
        },
        {
            accessor: 'created_at',
            title: 'Created At',
            sortable: true,
            render: ({created_at}: UserDetails, index: number) => {
                return <Group key={`item-created-at-${index}`}>{created_at}
                </Group>
            }
        },
        {
            accessor: 'updated_at',
            title: 'Last Updated At',
            sortable: true,
            render: ({updated_at}: UserDetails, index: number) => {
                return <Group key={`item-updated-at-${index}`}>
                    {updated_at}
                </Group>
            }
        },
        {
            accessor: 'id',
            title: 'Actions',
            sortable: true,
            render: ({id}: UserDetails, index: number) => {
                return <Group key={`item-actions-id-${index}`}>
                    <ActionIcon onClick={() => console.log(id)} size={'lg'}>
                        <IconTrash />
                    </ActionIcon>
                    <ActionIcon size={'lg'}>
                        <IconEdit  />
                    </ActionIcon>
                </Group>
            }
        },
    ]

    return (
        <>
            <Stack pt={'lg'} pl={'sm'}>
                <Title>
                    UserDetails Management
                </Title>

                <Group justify={'end'}>
                    <Stack gap={5}>
                        <Text>
                            Filter
                        </Text>
                        <Group>
                            <TextInput placeholder={"Search by Name"} value={keyword}
                                       onChange={(e) => setKeyword(e.target.value)}/>
                            <ActionIcon size={'lg'}>
                                <IconSearch/>
                            </ActionIcon>
                        </Group>
                    </Stack>
                    <Divider orientation={'vertical'}/>
                    <Stack gap={5}>
                        <Text>
                            Controls
                        </Text>
                        <Group>
                            <Button onClick={() => setOpenItemModal(true)} leftSection={<IconPlus/>}>Add</Button>
                            <Button leftSection={<IconRefresh/>}>Refresh</Button>
                        </Group>
                    </Stack>
                </Group>

                <CommonTable data={items} columns={columns}/>
            </Stack>

            {/*Item modal*/}
            <UserDetailsModal user={selectedItem} open={openItemModal} refresh={fetchUserDetails} close={handleCloseItemModal}/>
        </>
    )
}