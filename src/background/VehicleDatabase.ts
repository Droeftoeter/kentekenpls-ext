import Dexie from "dexie";

import { ExtendedOpenDataVehicle } from "../common/types";

interface StoredRdwOpenDataVehicle extends ExtendedOpenDataVehicle {
  id?: number;
  queryKey: string;
  digest: string;
}

export default class VehicleDatabase extends Dexie {
  vehicles: Dexie.Table<StoredRdwOpenDataVehicle, number>;
  schemaVersion: number;

  constructor() {
    super("VehicleDatabase");

    this.schemaVersion = 2;

    const schemaColumns = [
      "++id",
      "[queryKey+digest]",
      "queryKey",
      "digest",
      "kenteken",
    ];

    this.version(this.schemaVersion).stores({
      vehicles: schemaColumns.join(", "),
    });

    this.vehicles = this.table("vehicles");
  }

  /**
   * Retrieves stored vehicles for the given queryKey and digest.
   */
  getByQueryKeyAndDigest(
    queryKey: string,
    digest: string,
  ): Promise<StoredRdwOpenDataVehicle[]> {
    return this.vehicles.where({ queryKey, digest }).toArray();
  }

  /**
   * Stores a vehicle
   */
  saveVehicle(
    queryKey: string,
    digest: string,
    vehicle: ExtendedOpenDataVehicle,
  ): void {
    this.vehicles.add({
      queryKey,
      digest,
      ...vehicle,
    });
  }

  /**
   * Removes a vehicle by the primary key.
   */
  removeById(id: number): void {
    this.vehicles.delete(id);
  }

  /**
   * Removes stored vehicles that have been fetched for the given queryKey with a different
   * digest than the current one.
   */
  removeByQueryKeyWhereDigestDoesNotMatch(
    queryKey: string,
    digest: string,
  ): void {
    this.vehicles
      .where({ queryKey })
      .and((vehicle) => vehicle.digest !== digest)
      .uniqueKeys()
      .then((vehicleIds) => {
        if (vehicleIds.length) {
          this.vehicles.bulkDelete(vehicleIds as number[]);
        }
      })
      .catch((error) => {
        console.error("Error while cleaning up internal database:", error);
      });
  }
}
