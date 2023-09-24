import { Category, Query } from "../src/common/types";

const isQuery = (item: Category | Query): item is Query => "where" in item;

export const getQueries = (categories: Category): Query[] =>
  categories.items.flatMap((item) =>
    isQuery(item) ? [item] : getQueries(item),
  );
