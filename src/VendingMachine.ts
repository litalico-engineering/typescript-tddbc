import { Bank } from "./money/Bank";
import { Storage } from "./stock/Storage";

export interface IVendingMachine {
  readonly amountOfMoney: number;
  readonly sales: number;
  insert(money: Currency): Currency | null;
  refund(): number;
  canSupply(name: string): boolean;
}

export class VendingMachine implements IVendingMachine {
  private _bank: Bank = null;
  private _storage: Storage = null;

  constructor(bank: Bank, storage: Storage) {
    this._bank = bank;
    this._storage = storage;
  }

  get amountOfMoney(): number {
    return Number(this._bank.totalDeposit());
  }

  get sales(): number {
    return Number(this._bank.totalSales());
  }

  /**
   * お金を投入する
   */
  insert(money: Currency): Currency | null {
    return this._bank.add(money);
  }

  /**
   * 払い戻し
   */
  refund() {
    return this._bank.refund();
  }

  /**
   * 購入できる？
   *
   * @return true: できるよ！, false: できないぞ！
   */
  canSupply(name: string): boolean {
    const info = this._storage.display();

    // 在庫がない場合
    if (info.stock === 0) {
      return false;
    }

    // 投入金額に対して金額が不十分な場合
    if (info.price > Number(this._bank.totalDeposit())) {
      return false;
    }

    return true;
  }

  // /**
  //  * 購入
  //  */
  // supply(name: string): [Juice, number] | undefined {
  //   if (!this.canSupply(name)) {
  //     return;
  //   }

  //   const juice = this._stock.pickUp(name);
  //   const change = this._bank.buy(juice.price);
  //   return [juice, change];
  // }

  // /**
  //  * 在庫の補充
  //  * */
  // restock(juices: Juices): void {
  //   this._stock = new Juices(...this._stock, ...juices);
  // }

  // /**
  //  * 購入できる商品名返す
  //  *
  //  * @return 商品名の配列
  //  */

  // suppliableJuiceTypes(): string[] {
  //   const types = new Set<string>();
  //   this._stock.forEach((juice, index) => {
  //     if (Number(this._bank.totalDeposit()) >= juice.price) {
  //       types.add(juice.name);
  //     }
  //   });
  //   return [...types.values()];
  // }
}
