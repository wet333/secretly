import { useEffect, useState } from "react";
import API from "../lib/api.ts";

export type ApiStatus = "checking" | "online" | "offline";

const HEALTH_POLL_MS = 30_000;
const HEALTH_TIMEOUT_MS = 5_000;

export const useApiStatus = (): ApiStatus => {
    const [status, setStatus] = useState<ApiStatus>("checking");

    useEffect(() => {
        let cancelled = false;

        const check = async () => {
            try {
                const response = await API.get("health", { timeout: HEALTH_TIMEOUT_MS });
                if (cancelled) {
                    return;
                }

                const isUp =
                    response.status === 200 && response.data?.data?.status === "UP";
                setStatus(isUp ? "online" : "offline");
            } catch {
                if (!cancelled) {
                    setStatus("offline");
                }
            }
        };

        check();
        const interval = setInterval(check, HEALTH_POLL_MS);

        return () => {
            cancelled = true;
            clearInterval(interval);
        };
    }, []);

    return status;
};
