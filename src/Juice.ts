export type JuiceType = "コーラ" | "レッドブル" | "水";

export class Juice {
  name: JuiceType;
  price: number; // 円

  constructor(name: JuiceType, price: number) {
    this.name = name;
    this.price = price;
  }

  static PriceFor(type: JuiceType): number {
    return {
      "コーラ": 120,
      "レッドブル": 200,
      "水": 100,
    }[type]
  }

  static Generate(type: JuiceType): Juice {
    if (type === "コーラ") return new Juice("コーラ", this.PriceFor("コーラ"))
    else if (type === "レッドブル") return new Juice("レッドブル", this.PriceFor("レッドブル"))
    else if (type === "水") return new Juice("水", this.PriceFor("水"))
  }

  static GenerateMulti(type: JuiceType, count: number): Juice[] {
    return [...Array(count)].map(() => Juice.Generate(type))
  }
}

export class JuiceLane {
  private type: JuiceType;
  private stock: Juice[] = [];

  constructor(type: JuiceType, count?: number) {
    this.type = type;
    if (count) this.stock = Juice.GenerateMulti(this.type, count)
  }

  get canSupply() {
    return this.stock.length > 0
  }

  get price() {
    return Juice.PriceFor(this.type)
  }

  get array() {
    return this.stock;
  }

  public restock(items: Juice[]) {
    this.stock = this.stock.concat(items)
  }

  public pickup() {
    return this.stock.pop()
  }
}

export class Juices extends Array<Juice> { }
