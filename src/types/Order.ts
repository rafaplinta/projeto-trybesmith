export type Order = {
  id: number;
  userId: number;
  productIds?: { id: number }[];
};

export type ReturnedOrder = {
  id: number;
  userId: number;
  productIds?: number[];
};
