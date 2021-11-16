import { Juice, Cola } from "./Juice";

// 自販機で管理する商品を管理するinterface
export interface Storage {
  add(cola: Cola): void;
  display(): { stock: number } & Juice;
}

export class StandardStorage implements Storage {
  private _stock: Juice[];

  constructor() {
    this._stock = [new Cola(), new Cola(), new Cola(), new Cola(), new Cola()];
  }

  add(cola: Cola): void {
    this._stock.push(cola);
  }

  display(): { stock: number } & Juice {
    return {
      name: "コーラ",
      price: 120,
      stock: this._stock.length,
    };
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
