
import {Button, Modal, Stack} from "@mantine/core";
import {useForm} from "@mantine/form";
import type {Tags} from "../../../../models/tags.ts";

interface TagsModalProps {
    tag: Tags | null;
    open: boolean,
    refresh: any
    close: any
}

interface TagsFormValues {
    name: string
}

export default function TagsModal({ tag, open = false, close, refresh }: TagsModalProps){

    const isEdit = tag !== null;

    const form = useForm<TagsFormValues>({
        initialValues: {
            name: isEdit ? tag.name! : "",
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