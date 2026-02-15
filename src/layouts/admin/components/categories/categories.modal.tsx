import { Button, Modal, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import type { Categories } from "../../../../models/categories.ts";
import InventoryService from "../../../../services/operations/inventory.service.ts";
import { NotificationsService } from "../../../../services/notifications/notifications.service.ts";
import { useEffect } from "react";
import { DatabaseTables } from "../../../../enums/tables.ts";

interface CategoriesModalProps {
    category: Categories | null;
    open: boolean;
    refresh: any;
    close: any;
}

interface CategoriesFormValues {
    name: string;
}

export default function CategoriesModal({
    category,
    open = false,
    close,
    refresh,
}: CategoriesModalProps) {
    const isEdit = Boolean(category);
    console.log(category);

    const form = useForm<CategoriesFormValues>({
        initialValues: {
            name: "",
        },
        validate: {},
    });

    useEffect(() => {
        if (category) {
            form.setValues({
                name: category.name!,
            });
        }
    }, [isEdit]);

    async function handleSubmit() {
        try {
            const service = InventoryService.getInstance();
            await service.addItemWithUniqueName(
                DatabaseTables.Categories,
                form.getValues(),
            );
            refresh();
            handleClose();
            NotificationsService.success(
                "Add Category",
                "New category has been added successfully!",
            );
        } catch (e: any) {
            NotificationsService.error("Add Category", e.toString());
        }
    }

    function handleClose() {
        form.reset();
        close();
    }

    return (
        <Modal
            opened={open}
            onClose={handleClose}
            centered
            title={isEdit ? "Edit Category" : "Add Category"}>
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
                    <Button type="submit" fullWidth mt="md">
                        Submit
                    </Button>
                </Stack>
            </form>
        </Modal>
    );
}
