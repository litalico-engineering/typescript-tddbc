import { Juice, JuiceLane, Juices, JuiceType } from "./Juice";

type Money = 1 | 5 | 10 | 50 | 100 | 500 | 1000 | 2000 | 5000 | 10000;

export class VendingMachine {
  private _amountOfMoney: number = 0;
  private _sales: number = 0;
  private _stocks = {
    "コーラ": new JuiceLane("コーラ"),
    "レッドブル": new JuiceLane("レッドブル"),
    "水": new JuiceLane("水"),
  }

  constructor(stock: Juices = new Juices()) {
    this.restock(stock)
  }

  get amountOfMoney() {
    return this._amountOfMoney;
  }

  get stock() {
    return [
      ...this._stocks["コーラ"].array,
      ...this._stocks["レッドブル"].array,
      ...this._stocks["水"].array
    ]
  }

  get sales() {
    return this._sales;
  }

  /**
   * お金を投入する
   */
  insert(money: Money): Money | null {
    if (
      money === 1 ||
      money === 5 ||
      money === 2000 ||
      money === 5000 ||
      money === 10000
    ) {
      return money;
    }

    this._amountOfMoney += money;
    return null;
  }

  /**
   * 払い戻し
   */
  refund() {
    const change = this._amountOfMoney;
    this._amountOfMoney = 0;
    return change;
  }

  /**
   * 購入できる？
   *
   * @return true: できるよ！, false: できないぞ！
   */
  canSupply(name: JuiceType): boolean {
    const enoughMoney = this._amountOfMoney >= this._stocks[name].price
    return this._stocks[name].canSupply && enoughMoney;
  }

  /**
   * 購入
   */
  supply(name: JuiceType): [Juice, number] | undefined {
    if (!this.canSupply(name)) return;

    const juice = this._stocks[name].pickup();
    this._sales += juice.price;
    this._amountOfMoney -= juice.price;
    return [juice, this._amountOfMoney];
  }

  /**
   * 在庫の補充
   * */
  restock(juices: Juices): void {
    const source = [...juices];
    let j = source.pop()
    while (j) {
      if (j.name === "コーラ") this._stocks["コーラ"].restock([j])
      else if (j.name === "レッドブル") this._stocks["レッドブル"].restock([j])
      else if (j.name === "水") this._stocks["水"].restock([j])

      j = source.pop()
    }
  }

  /**
   * 購入できる商品名返す
   *
   * @return 商品名の配列
   */
  suppliableJuiceTypes(): string[] {
    return Object.entries(this._stocks).
      filter(([name, stock]) => stock.canSupply).
      map(([name, _]) => name)
  }
}
