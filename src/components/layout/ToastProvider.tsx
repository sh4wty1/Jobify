import { Toaster, toast } from "sonner";

export function ToastProvider() {
    return (
        <Toaster
            position="top-right"
            theme="dark"
            richColors
            closeButton
        />
    );
}

export const showSuccess = (message: string) => {
    toast.success(message);
};

export const showError = (message: string) => {
    toast.error(message);
};

export const showInfo = (message: string) => {
    toast(message);
};