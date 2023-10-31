import { getVehicles } from "../src/api/client";
import categories from "../src/app/categories";
import { Category, Query } from "../src/common/types";

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
