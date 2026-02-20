/**
 * triggerAlert — lightweight toast/alert utility.
 *
 * In development mode this logs to console.
 * Replace with your real alert/toast implementation
 * (react-hot-toast, sonner, etc.) when the backend is wired up.
 */

type AlertType = "success" | "error" | "info" | "warning";

export function triggerAlert(
    title: string,
    message: string,
    type: AlertType = "info"
) {
    const styles: Record<AlertType, string> = {
        success: "color: #39ff14",
        error: "color: #ff4444",
        info: "color: #00E5FF",
        warning: "color: #fbbf24",
    };

    console.log(
        `%c[${type.toUpperCase()}] ${title}\n${message}`,
        styles[type] || styles.info
    );

    // TODO: Replace with a real toast library
    // e.g. toast[type](message, { title })
}
