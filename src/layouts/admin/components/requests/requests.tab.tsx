import {ActionIcon, Button, Divider, Group, Stack, Text, TextInput, Title} from "@mantine/core";
import {IconEdit, IconPlus, IconRefresh, IconSearch, IconTrash} from "@tabler/icons-react";
import {useEffect, useState} from "react";
import type {Requests} from "../../../../models/requests.ts";
import RequestsModal from "./requests.modal.tsx";
import CommonTable from "../../../../components/dataTable/common.table.tsx";
import InventoryService from "../../../../services/operations/inventory.service.ts";
import {DatabaseTables} from "../../../../enums/tables.ts";

export default function RequestsTab() {

    const [requests, setRequests] = useState<Requests[]>([])

    const [keyword, setKeyword] = useState<string>("")

    const [selectedItem, setSelectedItem] = useState<Requests | null>(null)
    const [openItemModal, setOpenItemModal] = useState<boolean>(false)

    useEffect(() => {
        (async () => await fetchRequests())();
    }, []);

    async function fetchRequests() {
        const service = InventoryService.getInstance();
        const data = await service.getAllRows(DatabaseTables.Requests);
        setRequests(data)
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
            render: ({id} : Requests, index: number) => {
                return <Group key={`item-id-${index}`}>
                    <Text>
                        {id}
                    </Text>
                </Group>
            }
        },
        {
            accessor: 'name',
            title: 'Name',
            sortable: true,
            render: ({name}: Requests, index: number) => {
                return <Group key={`item-name-${index}`} >{name}
                </Group>
            }
        },
        {
            accessor: 'created_at',
            title: 'Created At',
            sortable: true,
            render: ({created_at}: Requests, index: number) => {
                return <Group key={`item-created-at-${index}`}>{created_at}
                </Group>
            }
        },
        {
            accessor: 'updated_at',
            title: 'Last Updated At',
            sortable: true,
            render: ({updated_at}: Requests, index: number) => {
                return <Group key={`item-updated-at-${index}`}>
                    {updated_at}
                </Group>
            }
        },
        {
            accessor: 'id',
            title: 'Actions',
            sortable: true,
            render: ({id}: Requests, index: number) => {
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
                    Requests Management
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

                <CommonTable data={requests} columns={columns}/>
            </Stack>

            {/*Item modal*/}
            <RequestsModal request={selectedItem} open={openItemModal} refresh={fetchRequests} close={handleCloseItemModal}/>
        </>
    )
}