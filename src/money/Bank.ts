// 自販機に投入されるお金関連のinterface
export interface Bank {
  totalDeposit(): string;
  totalSales(): string;
  add(currency: Currency): Currency | null;
  buy(price: number): number;
  refund(): number;
}

export class StandardBank implements Bank {
  private _sales: number = 0;
  private _temporaryDeposit: number = 0;

  add(currency: Currency): Currency | null {
    if (this.checkSupport(currency)) {
      this._temporaryDeposit += currency;
      return null;
    } else {
      return currency;
    }
  }

  buy(price: number): number {
    this._temporaryDeposit -= price;
    this._sales += price;
    return this.refund();
  }

  refund(): number {
    const refoundValue = this._temporaryDeposit;
    this._temporaryDeposit = 0;
    return refoundValue;
  }

  totalDeposit(): string {
    return this._temporaryDeposit.toString();
  }

  totalSales(): string {
    return this._sales.toString();
  }

  private checkSupport(currency: Currency) {
    return (
      currency == 10 ||
      currency == 50 ||
      currency == 100 ||
      currency == 500 ||
      currency == 1000
    );
  }
}
