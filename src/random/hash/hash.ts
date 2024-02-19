type Tuple<L extends number, T extends readonly number[] = []> = T extends {
  length: L;
}
  ? T
  : Tuple<L, readonly [...T, number]>;

export type Hash<TSize extends number> = Tuple<TSize>;
