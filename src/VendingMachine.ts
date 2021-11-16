import { Bank } from "./money/Bank";
import { Juice } from "./stock/Juice";
import { Storage } from "./stock/Storage";

export interface IVendingMachine {
  readonly amountOfMoney: number;
  readonly sales: number;
  insert(money: Currency): Currency | null;
  refund(): number;
  supply(name: string): [Juice, number] | undefined;
  canSupply(name: string): boolean;
  suppliableJuiceNames(): string[];
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
   * 購入
   */
  supply(name: string): [Juice, number] | undefined {
    if (!this.canSupply(name)) {
      return;
    }

    const juice = this._storage.pickup(name);
    const change = this._bank.buy(juice.price);
    return [juice, change];
  }

  /**
   * 購入できる？
   *
   * @return true: できるよ！, false: できないぞ！
   */
  canSupply(name: string): boolean {
    return this.suppliableJuiceNames().includes(name);
  }

  /**
   * 購入可能なジュースのリストの取得
   */
  suppliableJuiceNames(): string[] {
    return this._storage
      .inStock()
      .filter((juice) => this._bank.allowBuying(juice.price))
      .map((juice) => juice.name);
  }
}
