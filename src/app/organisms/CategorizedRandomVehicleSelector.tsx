import React, { useState, useEffect, useCallback } from "react";

import { ExtendedOpenDataVehicle, Query } from "../../common/types";
import { ErrorMessage } from "../molecules";
import useRandomVehicle from "../hooks/useRandomVehicle";

import CategorySelector from "./CategorySelector";
import VehicleInfo from "./VehicleInfo";

type CategorizedRandomVehicleSelectorProps = {
  onVehicle: (vehicle: ExtendedOpenDataVehicle) => void;
  onCancel: () => void;
};

const CategorizedRandomVehicleSelector = ({
  onVehicle,
  onCancel,
}: CategorizedRandomVehicleSelectorProps) => {
  const [query, setQuery] = useState<Query | null>(null);
  const [vehicle, setVehicle] = useState<ExtendedOpenDataVehicle | null>(null);

  const { getVehicle, error } = useRandomVehicle();

  const fetchVehicle = useCallback(() => {
    if (!query) {
      return () => {};
    }

    getVehicle(query.id, query.where, setVehicle);
  }, [query]);

  useEffect(() => {
    setVehicle(null);

    fetchVehicle();
  }, [fetchVehicle]);

  useEffect(() => {
    if (vehicle) {
      onVehicle(vehicle);
    }
  }, [vehicle]);

  if (error) {
    return <ErrorMessage onClose={onCancel}>{error}</ErrorMessage>;
  }

  return !query ? (
    <CategorySelector
      onQuery={(query) => setQuery(query)}
      onCancel={onCancel}
    />
  ) : (
    <VehicleInfo
      onBack={() => setQuery(null)}
      onRefresh={() => fetchVehicle()}
      onCancel={onCancel}
      vehicle={vehicle || undefined}
    />
  );
};

export default CategorizedRandomVehicleSelector;
