import { useState } from "react";
import browser from "webextension-polyfill";

import type { RdwOpenDataVehicle } from "../../common/types";

export default function useRandomVehicle() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getVehicle = async (
    id: string,
    where: string[],
    callback: (vehicle: RdwOpenDataVehicle) => void,
  ) => {
    setLoading(true);

    try {
      const vehicle = (await browser.runtime.sendMessage(undefined, {
        action: "fetch-vehicle",
        payload: { id, where },
      })) as RdwOpenDataVehicle;
      callback(vehicle);
    } catch (e: unknown) {
      console.error(e);

      setError(String(e));
    } finally {
      setLoading(false);
    }
  };

  return { getVehicle, loading, error };
}
