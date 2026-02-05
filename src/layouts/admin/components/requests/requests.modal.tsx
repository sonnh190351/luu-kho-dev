import type {Requests} from "../../../../models/requests.ts";
import {Button, Modal, Stack} from "@mantine/core";
import {useForm} from "@mantine/form";

interface RequestsModalProps {
    request: Requests | null;
    open: boolean,
    refresh: any
    close: any
}

interface RequestFormValues {
    name: string
}

export default function RequestsModal({ request, open = false, close, refresh }: RequestsModalProps){

    const isEdit = request !== null;

    const form = useForm<RequestFormValues>({
        initialValues: {
            name: ""
        },
        validate: {
        },
    });


    function handleSubmit() {
        refresh()
    }

    return (
        <Modal opened={open} onClose={close} centered title={isEdit ? "Edit Request" : "Add Request"}>
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