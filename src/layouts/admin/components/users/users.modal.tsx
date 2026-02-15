import { Button, Grid, Modal, Select, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import type { UserDetails } from "../../../../models/user.ts";
import { USER_ROLES } from "../../../../enums/roles.ts";
import { DatePicker, DatePickerInput } from "@mantine/dates";

interface UserDetailsModalProps {
    user: UserDetails | null;
    open: boolean;
    refresh: any;
    close: any;
}

interface UserDetailsFormValues {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    address: string;
    dob: Date;
    role: number;
}

export default function UserDetailsModal({
    user,
    open = false,
    close,
    refresh,
}: UserDetailsModalProps) {
    const isEdit = user !== null;

    const form = useForm<UserDetailsFormValues>({
        initialValues: {
            email: user ? user.email! : "",
            password: user ? user.password! : "",
            first_name: user ? user.first_name! : "",
            last_name: user ? user.last_name! : "",
            address: user ? user.address! : "",
            dob: user ? new Date(user.dob!) : new Date(),
            role: user ? user.role! : -1,
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
            title={isEdit ? "Edit User" : "Add User"}>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack gap="xs">
                    <TextInput
                        required
                        label={"Email"}
                        value={form.values.email}
                        onChange={(e) =>
                            form.setValues({
                                email: e.target.value,
                            })
                        }
                    />
                    <TextInput
                        required
                        label={"Password"}
                        value={form.values.password}
                        onChange={(e) =>
                            form.setValues({
                                password: e.target.value,
                            })
                        }
                    />
                    <DatePickerInput
                        label={"Date of Birth"}
                        required={true}
                        value={form.values.dob}
                        onChange={(e) => {
                            if (e) {
                                form.setValues({
                                    dob: new Date(e.getDate()),
                                });
                            }
                        }}
                    />
                    <Select
                        value={String(form.values.role)}
                        onChange={(value) => {
                            if (value) {
                                form.setValues({
                                    role: Number(value),
                                });
                            }
                        }}
                        required
                        searchable
                        label={"Role"}
                        data={Object.entries(USER_ROLES)
                            .filter(([_, v]) => v > 0)
                            .map(([k, v]) => {
                                return { label: k, value: String(v) };
                            })}
                    />

                    <TextInput
                        required
                        label={"Name"}
                        value={form.values.email}
                        onChange={(e) =>
                            form.setValues({
                                email: e.target.value,
                            })
                        }
                    />
                    <Grid>
                        <Grid.Col span={6}>
                            <TextInput
                                required
                                label={"First Name"}
                                value={form.values.first_name}
                                onChange={(e) =>
                                    form.setValues({
                                        first_name: e.target.value,
                                    })
                                }
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput
                                required
                                label={"Last Name"}
                                value={form.values.last_name}
                                onChange={(e) =>
                                    form.setValues({
                                        last_name: e.target.value,
                                    })
                                }
                            />
                        </Grid.Col>
                    </Grid>
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
