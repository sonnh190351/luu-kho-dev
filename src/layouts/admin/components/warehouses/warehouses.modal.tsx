import { Button, Modal, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import type { Warehouses } from "../../../../models/warehouses.ts";

interface WarehousesModalProps {
    warehouse: Warehouses | null;
    open: boolean;
    refresh: any;
    close: any;
}

interface WarehousesFormValues {
    name: string;
    address: string;
}

export default function WarehousesModal({
    warehouse,
    open = false,
    close,
    refresh,
}: WarehousesModalProps) {
    const isEdit = warehouse !== null;

    const form = useForm<WarehousesFormValues>({
        initialValues: {
            name: isEdit ? warehouse.name! : "",
            address: isEdit ? warehouse.address! : "",
        },
        validate: {},
    });

    function handleSubmit() {
        refresh();
    }

    return (
        <Modal
            opened={open}
            onClose={close}
            centered
            title={isEdit ? "Edit Warehouse" : "Add Warehouse"}>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack gap="xs">
                    <TextInput
                        required
                        label={"Name"}
                        value={form.values.name}
                        onChange={(e) =>
                            form.setValues({
                                name: e.target.value,
                            })
                        }
                    />
                    <TextInput
                        required
                        label={"Address"}
                        value={form.values.address}
                        onChange={(e) =>
                            form.setValues({
                                address: e.target.value,
                            })
                        }
                    />
                    <Button type="submit" fullWidth mt="md">
                        Submit
                    </Button>
                </Stack>
            </form>
        </Modal>
    );
}
