export class Juice {
  name: string;
  price: number; // 円

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }
}

export class Juices extends Array<Juice> {
  public pickUp(name: string): Juice {
    const index = this.findIndex((v) => v.name === name);
    const juice = this[index];
    this.splice(index, 1);
    return juice;
  }
}
