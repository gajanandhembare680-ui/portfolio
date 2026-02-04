import { useState, useEffect } from "react";

export const useBattery = () => {
    const [battery, setBattery] = useState({ level: 1, charging: false });

    useEffect(() => {
        let batteryManager;

        const updateBattery = (batt) => {
            setBattery({
                level: batt.level,
                charging: batt.charging,
            });
        };

        const initBattery = async () => {
            if (typeof navigator !== "undefined" && "getBattery" in navigator) {
                try {
                    batteryManager = await navigator.getBattery();
                    updateBattery(batteryManager);

                    batteryManager.addEventListener("levelchange", () =>
                        updateBattery(batteryManager)
                    );
                    batteryManager.addEventListener("chargingchange", () =>
                        updateBattery(batteryManager)
                    );
                } catch (e) {
                    console.warn("Battery API failed", e);
                }
            }
        };

        initBattery();

        return () => {
            if (batteryManager) {
                batteryManager.removeEventListener("levelchange", () =>
                    updateBattery(batteryManager)
                );
                batteryManager.removeEventListener("chargingchange", () =>
                    updateBattery(batteryManager)
                );
            }
        };
    }, []);

    return battery;
};
