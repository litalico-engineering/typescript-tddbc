import { Juice, Cola, RedBull, Water } from "./Juice";

// 自販機で管理する商品を管理するinterface
export interface Storage {
  add(juice: Juice): void;
  display(): { stock: number } & Juice;
  inStock(): boolean;
  pickup(): Juice;
}

export class StandardStorage implements Storage {
  private _stock: Juice[];

  constructor() {
    this._stock = [new Cola(), new Cola(), new Cola(), new Cola(), new Cola()];
  }

  inStock(): boolean {
    return this.display().stock > 0;
  }

  add(juice: Juice): void {
    if (
      juice instanceof Cola ||
      juice instanceof RedBull ||
      juice instanceof Water
    ) {
      this._stock.push(juice);
    }
  }

  display(): { stock: number } & Juice {
    return {
      name: "コーラ",
      price: 120,
      stock: this._stock.length,
    };
  }

  pickup(): Juice {
    return this._stock.pop();
  }
}

// export class Juices extends Array<Juice> {
//   public pickUp(name: string): Juice {
//     const index = this.findIndex((v) => v.name === name);
//     const juice = this[index];
//     this.splice(index, 1);
//     return juice;
//   }
// }
