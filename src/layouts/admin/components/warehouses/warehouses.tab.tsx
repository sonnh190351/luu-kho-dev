import {
    ActionIcon,
    Button,
    Divider,
    Group,
    Stack,
    Text,
    TextInput,
    Title,
} from "@mantine/core";
import {
    IconEdit,
    IconPlus,
    IconRefresh,
    IconSearch,
    IconTrash,
} from "@tabler/icons-react";
import {useEffect, useState} from "react";
import type {Warehouses} from "../../../../models/warehouses.ts";
import CommonTable from "../../../../components/dataTable/common.table.tsx";
import InventoryService from "../../../../services/operations/inventory.service.ts";
import WarehousesModal from "./warehouses.modal.tsx";
import {DatabaseTables} from "../../../../enums/tables.ts";

export default function WarehousesTab() {
    const [items, setWarehouses] = useState<Warehouses[]>([]);

    const [keyword, setKeyword] = useState<string>("");

    const [selectedItem, setSelectedItem] = useState<Warehouses | null>(null);
    const [openItemModal, setOpenItemModal] = useState<boolean>(false);

    useEffect(() => {
        (async () => await fetchWarehouses())();
    }, []);

    async function fetchWarehouses() {
        const service = InventoryService.getInstance();
        const data = await service.getAllRows(DatabaseTables.Warehouses);
        setWarehouses(data);
    }

    function handleCloseItemModal() {
        setSelectedItem(null);
        setOpenItemModal(false);
    }

    const columns: any[] = [
        {
            accessor: "id",
            title: "ID",
            sortable: true,
            render: ({id}: Warehouses, index: number) => {
                return (
                    <Group key={`item-id-${index}`}>
                        <Text>{id}</Text>
                    </Group>
                );
            },
        },
        {
            accessor: "name",
            title: "Name",
            sortable: true,
            render: ({name}: Warehouses, index: number) => {
                return <Group key={`item-name-${index}`}>{name}</Group>;
            },
        },
        {
            accessor: "created_at",
            title: "Created At",
            sortable: true,
            render: ({created_at}: Warehouses, index: number) => {
                return (
                    <Group key={`item-created-at-${index}`}>{created_at}</Group>
                );
            },
        },
        {
            accessor: "updated_at",
            title: "Last Updated At",
            sortable: true,
            render: ({updated_at}: Warehouses, index: number) => {
                return (
                    <Group key={`item-updated-at-${index}`}>{updated_at}</Group>
                );
            },
        },
        {
            accessor: "id",
            title: "Actions",
            sortable: true,
            render: ({id}: Warehouses, index: number) => {
                return (
                    <Group key={`item-actions-id-${index}`}>
                        <ActionIcon onClick={() => console.log(id)} size={"lg"}>
                            <IconTrash/>
                        </ActionIcon>
                        <ActionIcon size={"lg"}>
                            <IconEdit/>
                        </ActionIcon>
                    </Group>
                );
            },
        },
    ];

    return (
        <>
            <Stack pt={"lg"} pl={"sm"}>
                <Title>Warehouses Management</Title>

                <Group justify={"end"}>
                    <Stack gap={5}>
                        <Text>Filter</Text>
                        <Group>
                            <TextInput
                                placeholder={"Search by Name"}
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                            />
                            <ActionIcon size={"lg"}>
                                <IconSearch/>
                            </ActionIcon>
                        </Group>
                    </Stack>
                    <Divider orientation={"vertical"}/>
                    <Stack gap={5}>
                        <Text>Controls</Text>
                        <Group>
                            <Button
                                onClick={() => setOpenItemModal(true)}
                                leftSection={<IconPlus/>}>
                                Add
                            </Button>
                            <Button leftSection={<IconRefresh/>}>
                                Refresh
                            </Button>
                        </Group>
                    </Stack>
                </Group>

                <CommonTable data={items} columns={columns}/>
            </Stack>

            {/*Item modal*/}
            <WarehousesModal
                warehouse={selectedItem}
                open={openItemModal}
                refresh={fetchWarehouses}
                close={handleCloseItemModal}
            />
        </>
    );
}
