import { useState } from 'react';
import {
    TextInput,
    PasswordInput,
    Button,
    Paper,
    Title,
    Text,
    Container,
    Checkbox,
    Group,
    Stack,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconMail, IconLock } from '@tabler/icons-react';

interface LoginFormValues {
    email: string;
    password: string;
    rememberMe: boolean;
}

export default function LoginLayout() {
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<LoginFormValues>({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate: {
            email: (value) => {
                if (!value) return 'Email is required';
                if (!/^\S+@\S+\.\S+$/.test(value)) return 'Invalid email format';
                return null;
            },
            password: (value) => {
                if (!value) return 'Password is required';
                if (value.length < 6) return 'Password must be at least 6 characters';
                return null;
            },
        },
    });

    const handleSubmit = async (values: LoginFormValues) => {
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            console.log('Login submitted:', values);
            alert(`Login successful!\nEmail: ${values.email}\nRemember me: ${values.rememberMe}`);
            setIsLoading(false);
        }, 1500);
    };

    return (
        <Container size={420} my={40} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
            <Paper radius="md" p="xl" withBorder style={{ width: '100%' }}>
                <Stack gap="md">
                    {/* Header */}
                    <div style={{ textAlign: 'center' }}>
                        <IconLock size={48} style={{ margin: '0 auto', color: '#228be6' }} />
                        <Title order={2} mt="md">
                            Welcome Back
                        </Title>
                        <Text c="dimmed" size="sm" mt={5}>
                            Sign in to your account
                        </Text>
                    </div>

                    {/* Form */}
                    <form onSubmit={form.onSubmit(handleSubmit)}>
                        <Stack gap="md">
                            <TextInput
                                label="Email Address"
                                placeholder="you@example.com"
                                leftSection={<IconMail size={16} />}
                                {...form.getInputProps('email')}
                                required
                            />

                            <PasswordInput
                                label="Password"
                                placeholder="Your password"
                                leftSection={<IconLock size={16} />}
                                {...form.getInputProps('password')}
                                required
                            />

                            <Group justify="space-between" mt="xs">
                                <Checkbox
                                    label="Remember me"
                                    {...form.getInputProps('rememberMe', { type: 'checkbox' })}
                                />
                            </Group>

                            <Button type="submit" fullWidth mt="md" loading={isLoading}>
                                Sign In
                            </Button>
                        </Stack>
                    </form>
                </Stack>
            </Paper>
        </Container>
    );
}