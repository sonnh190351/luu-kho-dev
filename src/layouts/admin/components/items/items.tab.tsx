import {ActionIcon, Badge, Button, Divider, Group, Stack, Text, TextInput, Title} from "@mantine/core";
import {IconEdit, IconPlus, IconRefresh, IconSearch, IconTrash} from "@tabler/icons-react";
import {useEffect, useState} from "react";
import type {Items} from "../../../../models/items.ts";
import ItemsModal from "./items.modal.tsx";
import CommonTable from "../../../../components/dataTable/common.table.tsx";
import InventoryService from "../../../../services/operations/inventory.service.ts";

export default function ItemsTab() {

    const [items, setItems] = useState<Items[]>([])

    const [keyword, setKeyword] = useState<string>("")

    const [selectedItem, setSelectedItem] = useState<Items | null>(null)
    const [openItemModal, setOpenItemModal] = useState<boolean>(false)

    useEffect(() => {
        (async () => await fetchItems())();
    }, []);

    async function fetchItems() {
        const service = InventoryService.getInstance();
        const data = await service.getItems();
        setItems(data)
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
            render: ({id} : Items, index: number) => {
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
            render: ({name}: Items, index: number) => {
                return <Group key={`item-name-${index}`} >{name}
                </Group>
            }
        },
        {
            accessor: 'tags',
            title: 'Tags',
            sortable: true,
            render: ({id, tags}: Items, index: number) => {
                return <Group key={`item-tag-${index}`}>
                    {tags ? tags.map((tag, idx) => <Badge key={`item-${id}-tag-${index}-${idx}`}>{tag}</Badge>) : "N/A"}
                </Group>
            }
        },
        {
            accessor: 'warning_limit',
            title: 'Warning Limit',
            sortable: true,
            render: ({warning_limit}: Items, index: number) => {
                return <Group key={`item-warning-limit-${index}`}>
                    {warning_limit ?? 0}
                </Group>
            }
        },
        {
            accessor: 'quantity_type',
            title: 'Quantity Type',
            sortable: true,
            render: ({quantity_type}: Items, index: number) => {
                return <Group key={`item-quantity-${index}`}>
                    {quantity_type}
                </Group>
            }
        },
        {
            accessor: 'created_at',
            title: 'Created At',
            sortable: true,
            render: ({created_at}: Items, index: number) => {
                return <Group key={`item-created-at-${index}`}>{created_at}
                </Group>
            }
        },
        {
            accessor: 'updated_at',
            title: 'Last Updated At',
            sortable: true,
            render: ({updated_at}: Items, index: number) => {
                return <Group key={`item-updated-at-${index}`}>
                    {updated_at}
                </Group>
            }
        },
        {
            accessor: 'category_id',
            title: 'Category ID',
            sortable: true,
            render: ({}: Items, index: number) => {
                return <Button key={`item-category-id-${index}`}>Details
                </Button>
            }
        },
        {
            accessor: 'supplier_id',
            title: 'Supplier ID',
            sortable: true,
            render: ({}: Items, index: number) => {
                return <Button key={`item-supplier-id-${index}`}>Details
                </Button>
            }
        },
        {
            accessor: 'id',
            title: 'Actions',
            sortable: true,
            render: ({id}: Items, index: number) => {
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
                    Items Management
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
            <ItemsModal item={selectedItem} open={openItemModal} refresh={fetchItems} close={handleCloseItemModal}/>
        </>
    )
}