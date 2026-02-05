import type {Items} from "../../../../models/items.ts";
import {Button, Modal, MultiSelect, NumberInput, Select, Stack, TextInput} from "@mantine/core";
import {useEffect, useState} from "react";
import type {Suppliers} from "../../../../models/suppliers.ts";
import type {Categories} from "../../../../models/categories.ts";
import {useForm} from "@mantine/form";
import InventoryService from "../../../../services/operations/inventory.service.ts";
import {DatabaseTables} from "../../../../enums/tables.ts";
import {QUANTITY_TYPES} from "../../../../enums/data.ts";
import type {Tags} from "../../../../models/tags.ts";

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

export default function ItemsModal({item, open = false, close, refresh}: ItemsModalProps) {

    const isEdit = item !== null;

    const [suppliers, setSuppliers] = useState<Suppliers[]>([])
    const [categories, setCategories] = useState<Categories[]>([])
    const [tags, setTags] = useState<Tags[]>([])

    const form = useForm<ItemFormValues>({
        initialValues: {
            category_id: isEdit ? item.category_id! : -1,
            name: isEdit ? item.name! : "",
            quantity_type: isEdit ? item.quantity_type! : "kg",
            supplier_id: isEdit ? item.supplier_id! : -1,
            tags: isEdit ? item.tags! : [],
            warning_limit: isEdit ? item?.warning_limit! : 0,
        },
        validate: {},
    });

    useEffect(() => {
        (async () => await fetchSuppliers())();
        (async () => await fetchCategories())();
        (async () => await fetchTags())();
    }, []);

    async function fetchSuppliers() {
        const service = InventoryService.getInstance();
        const data = await service.getAllRows(DatabaseTables.Suppliers)
        setSuppliers(data)
    }

    async function fetchCategories() {
        const service = InventoryService.getInstance();
        const data = await service.getAllRows(DatabaseTables.Categories)
        setCategories(data)
    }

    async function fetchTags() {
        const service = InventoryService.getInstance();
        const data = await service.getAllRows(DatabaseTables.Tags)
        setTags(data)
    }

    function handleSubmit() {
        refresh()
    }

    return (
        <Modal opened={open} onClose={close} centered title={isEdit ? "Edit Item" : "Add Item"}>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack gap="xs">
                    <TextInput required label={"Name"} value={form.values.name} onChange={(e) => form.setValues({
                        name: e.target.value,
                    })} />

                    <Select value={String(form.values.supplier_id)} onChange={(value) => {
                        if (value) {
                            form.setValues({
                                supplier_id: Number(value)
                            })
                        }
                    }} required searchable label={'Supplier'} data={suppliers.map((s) => {
                        return {label: s.name!, value: String(s.id)}
                    })}/>

                    <Select value={String(form.values.category_id)} onChange={(value) => {
                        if (value) {
                            form.setValues({
                                category_id: Number(value)
                            })
                        }
                    }} required searchable label={'Category'} data={categories.map((s) => {
                        return {label: s.name!, value: String(s.id)}
                    })}/>

                    <MultiSelect value={form.values.tags} onChange={(value) => {
                        form.setValues({
                            tags: value
                        })
                    }} required searchable label={'Tags'} data={tags.map((s) => {
                        return {label: s.name!, value: String(s.id)}
                    })}/>

                    <Select value={form.values.quantity_type} onChange={(value) => {
                        if (value) {
                            form.setValues({
                                quantity_type: value
                            })
                        }
                    }} required searchable label={'Quantity Type'} data={QUANTITY_TYPES}/>

                    <NumberInput required label={"Warning Limit"} value={form.values.name} onChange={(e) => form.setValues({
                        warning_limit: Number(e)
                    })} />

                    <Button type="submit" fullWidth mt="md">
                        Submit
                    </Button>
                </Stack>
            </form>
        </Modal>
    )
}