import { test, expect } from "vitest";

import { getLicensePlateCount } from "../src/api/client";

test("successfully retrieves amount of blue vehicles", async () => {
  const count = getLicensePlateCount('eerste_kleur = "BLAUW"');

  await expect(count).resolves.not.toThrow();
});
