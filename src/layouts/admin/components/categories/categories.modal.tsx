
import {Button, Modal, Stack} from "@mantine/core";
import {useForm} from "@mantine/form";
import type {Categories} from "../../../../models/categories.ts";

interface CategoriesModalProps {
    category: Categories | null;
    open: boolean,
    refresh: any
    close: any
}

interface CategoriesFormValues {
    name: string
}

export default function CategoriesModal({ category, open = false, close, refresh }: CategoriesModalProps){

    const isEdit = category !== null;

    const form = useForm<CategoriesFormValues>({
        initialValues: {
            name: isEdit ? category.name! : "",
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