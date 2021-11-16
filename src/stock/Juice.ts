export type Juice = {
  readonly name: string;
  readonly price: number;
};

export class Cola implements Juice {
  get name(): string {
    return "コーラ";
  }
  get price(): number {
    return 120;
  }
}

export class RedBull implements Juice {
  get name(): string {
    return "レッドブル";
  }
  get price(): number {
    return 200;
  }
}

export class Water implements Juice {
  get name(): string {
    return "水";
  }
  get price(): number {
    return 100;
  }
}
