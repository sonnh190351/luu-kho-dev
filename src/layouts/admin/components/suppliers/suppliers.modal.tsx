
import {Button, Modal, Stack} from "@mantine/core";
import {useForm} from "@mantine/form";
import type {Suppliers} from "../../../../models/suppliers.ts";

interface SuppliersModalProps {
    supplier: Suppliers | null;
    open: boolean,
    refresh: any
    close: any
}

interface SuppliersFormValues {
    name: string
}

export default function SuppliersModal({ supplier, open = false, close, refresh }: SuppliersModalProps){

    const isEdit = supplier !== null;

    const form = useForm<SuppliersFormValues>({
        initialValues: {
            name: isEdit ? supplier.name! : "",
        },
        validate: {
        },
    });

    function handleSubmit() {
        refresh()
    }

    return (
        <Modal opened={open} onClose={close} centered title={isEdit ? "Edit Category" : "Add Category"}>
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