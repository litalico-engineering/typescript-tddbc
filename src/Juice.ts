export type JuiceType = "コーラ" | "レッドブル" | "水";

export class Juice {
  name: JuiceType;
  price: number; // 円

  constructor(name: JuiceType, price: number) {
    this.name = name;
    this.price = price;
  }

  static Generate(type: JuiceType): Juice {
    if (type === "コーラ") return new Juice("コーラ", 120)
    else if (type === "レッドブル") return new Juice("レッドブル", 200)
    else if (type === "水") return new Juice("水", 100)
  }
}

export class JuiceLane {
  private type: JuiceType;
  private stock: Juice[] = [];

  constructor(type: JuiceType, count?: number) {
    this.type = type;
    if (count) {
      this.stock = [...Array(count)].map(() => Juice.Generate(this.type))
    }
  }

  get canSupply() {
    return this.stock.length > 0
  }

  get price() {
    // TODO: 毎回生成してて環境に良くないのでなんとか
    return Juice.Generate(this.type).price;
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
