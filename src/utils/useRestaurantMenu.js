import { useEffect, useState } from "react";
import { MENU_API } from "./constants";

const useRestaurantMenu = (resId) => {
    const [resInfo, setResInfo] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
            try {
                const data = await fetch(MENU_API + resId, { signal: controller.signal });
                const json = await data.json();
                setResInfo(json.data);
            } catch (err) {
                if (err.name !== "AbortError") {
                    setError(err.message);
                }
            }
        };

        fetchData();

        return () => controller.abort();
    }, [resId]);

    return { resInfo, error };
}

export default useRestaurantMenu;