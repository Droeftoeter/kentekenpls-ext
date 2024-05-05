import { describe, test, expect } from "vitest";

import { getVehicles } from "../src/api/client";
import categories from "../src/app/categories";
import type { Category, Query } from "../src/common/types";

const isQuery = (item: Category | Query): item is Query => "where" in item;

const getQueries = (categories: Category): Query[] =>
  categories.items.flatMap((item) =>
    isQuery(item) ? [item] : getQueries(item),
  );

describe("vehicle category queries", () => {
  const queries = getQueries(categories);

  test.each(queries)(
    "succesfully requests vehicles in category $title ($id)",
    async ({ where }) => {
      const flatWhere = where.join(" AND ");
      const vehicles = getVehicles(flatWhere, 0, 2);

      await expect(vehicles).resolves.not.toThrow();
    },
  );
});
