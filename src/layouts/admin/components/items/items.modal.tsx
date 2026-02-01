import type {Items} from "../../../../models/items.ts";
import {Button, Dialog, LoadingOverlay, Modal, Stack} from "@mantine/core";
import {useEffect, useState} from "react";
import type {Suppliers} from "../../../../models/suppliers.ts";
import type {Categories} from "../../../../models/categories.ts";
import {useForm} from "@mantine/form";

interface ItemsModalProps {
    item: Items | null;
    open: boolean,
    refresh: any
    close: any
}

interface ItemFormValues {
    category_id: number
    name: string
    quantity_type: string
    supplier_id: number
    tags: string[]
    warning_limit: number
}

export default function ItemsModal({ item, open = false, close, refresh }: ItemsModalProps){

    const isEdit = item !== null;

    const [suppliers, setSuppliers] = useState<Suppliers[]>([])
    const [categories, setCategories] = useState<Categories[]>([])

    const form = useForm<ItemFormValues>({
        initialValues: {
            category_id: isEdit ? item.category_id! : -1,
            name: isEdit ? item.name! : "",
            quantity_type: isEdit ? item.quantity_type! : "kg",
            supplier_id: isEdit ? item.supplier_id! : -1,
            tags: isEdit ? item.tags! : [],
            warning_limit: isEdit ? item?.warning_limit! : 0,
        },
        validate: {
        },
    });

    useEffect(() => {
        (async () => await fetchSuppliers())();
        (async () => await fetchCategories())();
    }, []);

    async function fetchSuppliers() {
        setSuppliers([])
    }

    async function fetchCategories() {
        setCategories([]);
    }

    function handleSubmit() {
        refresh()
    }

    return (
        <Modal opened={open} onClose={close} centered title={isEdit ? "Edit Item" : "Add Item"}>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack gap="md">
                    <Button type="submit" fullWidth mt="md">
                        Submit
                    </Button>
                </Stack>
            </form>
        </Modal>
    )
}