import { Juice, Cola, RedBull, Water } from "./Juice";

// 自販機で管理する商品を管理するinterface
export interface Storage {
  add(juice: Juice): void;
  display(): ({ stock: number } & Juice)[];
  inStock(): { name: string; price: number }[];
  pickup(name: string): Juice;
}

export class StandardStorage implements Storage {
  private _stock: Juice[];

  constructor() {
    this._stock = [new Cola(), new Cola(), new Cola(), new Cola(), new Cola()];
  }

  inStock(): { name: string; price: number }[] {
    return this.display()
      .filter((info) => info.stock > 0)
      .map((info) => {
        return { name: info.name, price: info.price };
      });
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

  display(): ({ stock: number } & Juice)[] {
    const waterInfo = this._stock.filter((juice) => juice instanceof Water);

    const colaInfo = this._stock.filter((juice) => juice instanceof Cola);

    const redBullInfo = this._stock.filter((juice) => juice instanceof RedBull);

    const water = new Water();
    const cola = new Cola();
    const redBull = new RedBull();

    return [
      {
        name: water.name,
        price: water.price,
        stock: waterInfo.length,
      },
      {
        name: cola.name,
        price: cola.price,
        stock: colaInfo.length,
      },
      {
        name: redBull.name,
        price: redBull.price,
        stock: redBullInfo.length,
      },
    ];
  }

  pickup(name: string): Juice {
    const index = this._stock.findIndex((v) => v.name === name);
    const juice = this._stock[index];
    this._stock.splice(index, 1);
    return juice;
  }
}
