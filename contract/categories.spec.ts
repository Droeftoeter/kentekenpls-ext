import categories from "../src/app/categories";
import { getVehicles } from "./client";
import { getQueries } from "./util";

describe("vehicle category queries", () => {
  const queries = getQueries(categories);

  test.each(queries)(
    "succesfully requests vehicles in category $title ($id)",
    async ({ where }) => {
      const flatWhere = where.join(" AND ");
      const response = await getVehicles(flatWhere);

      expect(response.status).toBe(200);
    },
  );
});
