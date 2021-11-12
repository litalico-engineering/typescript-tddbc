const moneyKinds = [1, 5, 10, 50, 100, 500, 1000, 2000, 5000, 10000] as const;
type Money = typeof moneyKinds[number];

export { moneyKinds };
export default Money;