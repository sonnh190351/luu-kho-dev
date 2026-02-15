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
import { useEffect, useState } from "react";
import type { Inventories } from "../../../../models/inventories.ts";
import CommonTable from "../../../../components/dataTable/common.table.tsx";
import InventoryService from "../../../../services/operations/inventory.service.ts";
import InventoriesModal from "./inventories.modal.tsx";
import { DatabaseTables } from "../../../../enums/tables.ts";
import { InformationService } from "../../../../services/notifications/information.service.ts";
import { NotificationsService } from "../../../../services/notifications/notifications.service.ts";

export default function InventoriesTab() {
    const [items, setInventories] = useState<Inventories[]>([]);

    const [keyword, setKeyword] = useState<string>("");

    const [selectedItem, setSelectedItem] = useState<Inventories | null>(null);
    const [openItemModal, setOpenItemModal] = useState<boolean>(false);

    useEffect(() => {
        (async () => await fetchInventories())();
    }, []);

    async function fetchInventories() {
        const service = InventoryService.getInstance();
        const data = await service.getAllRows(DatabaseTables.Inventories);
        setInventories(data);
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
            render: ({ id }: Inventories, index: number) => {
                return (
                    <Group key={`item-id-${index}`}>
                        <Text>{id}</Text>
                    </Group>
                );
            },
        },
        {
            accessor: "warehouse_id",
            title: "Warehouse ID",
            sortable: true,
            render: ({ warehouse_id }: Inventories, index: number) => {
                return <Group key={`item-name-${index}`}>{warehouse_id}</Group>;
            },
        },
        {
            accessor: "created_at",
            title: "Created At",
            sortable: true,
            render: ({ created_at }: Inventories, index: number) => {
                return (
                    <Group key={`item-created-at-${index}`}>{created_at}</Group>
                );
            },
        },
        {
            accessor: "updated_at",
            title: "Last Updated At",
            sortable: true,
            render: ({ updated_at }: Inventories, index: number) => {
                return (
                    <Group key={`item-updated-at-${index}`}>{updated_at}</Group>
                );
            },
        },
        {
            accessor: "id",
            title: "Actions",
            sortable: true,
            render: ({ id }: Inventories, index: number) => {
                return (
                    <Group key={`item-actions-id-${index}`}>
                        <ActionIcon
                            onClick={() => handleDelete(id)}
                            size={"lg"}>
                            <IconTrash />
                        </ActionIcon>
                        <ActionIcon size={"lg"} onClick={() => handleEdit(id)}>
                            <IconEdit />
                        </ActionIcon>
                    </Group>
                );
            },
        },
    ];

    function handleDelete(id: number) {
        InformationService.getInstance().confirm(async () => {
            try {
                const service = InventoryService.getInstance();
                await service.deleteById(DatabaseTables.Inventories, id);
                NotificationsService.success(
                    "Delete Inventory",
                    "Inventory has been deleted!",
                );
            } catch (e: any) {
                NotificationsService.error("Delete Inventory", e.toString());
            }
            await fetchInventories();
        });
    }

    function handleEdit(id: number) {
        const matching = items.find((i) => i.id === id);
        if (matching) {
            setSelectedItem(matching);
            setOpenItemModal(true);
        }
    }

    return (
        <>
            <Stack pt={"lg"} pl={"sm"}>
                <Title>Inventories Management</Title>

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
                                <IconSearch />
                            </ActionIcon>
                        </Group>
                    </Stack>
                    <Divider orientation={"vertical"} />
                    <Stack gap={5}>
                        <Text>Controls</Text>
                        <Group>
                            <Button
                                onClick={() => setOpenItemModal(true)}
                                leftSection={<IconPlus />}>
                                Add
                            </Button>
                            <Button leftSection={<IconRefresh />}>
                                Refresh
                            </Button>
                        </Group>
                    </Stack>
                </Group>

                <CommonTable data={items} columns={columns} />
            </Stack>

            {/*Item modal*/}
            <InventoriesModal
                inventory={selectedItem}
                open={openItemModal}
                refresh={fetchInventories}
                close={handleCloseItemModal}
            />
        </>
    );
}
