// ToastUtil.tsx
import { Toast, ToastTitle, ToastDescription, useToast } from "@/components/ui/toast";

type ToastType = 'error' | 'success' | 'info'; // Define possible toast types

export const useToastUtil = () => {
    const toast = useToast();

    const showToast = (message: string, type: ToastType) => {
        const toastId = Math.random().toString(); // Generate a random toast ID

        // Render based on the type
        toast.show({
            id: toastId,
            placement: 'top',
            duration: 3000,
            render: ({ id }) => {
                const uniqueToastId = "toast-" + id;

                return (
                    <Toast
                        nativeID={uniqueToastId}
                        action="muted"
                        variant="solid"
                        style={{
                            backgroundColor: type === 'error' ? 'red' : type === 'success' ? 'green' : 'blue',
                        }}
                    >
                        {/*<ToastTitle>{type.charAt(0).toUpperCase() + type.slice(1)}!</ToastTitle>*/}
                        <ToastDescription>{message}</ToastDescription>
                    </Toast>
                );
            },
        });
    };

    return { showToast };
};
