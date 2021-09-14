export class Juice {
  name: string;
  price: number; // 円

  constructor() {
    this.name = 'コーラ';
    this.price = 120;
  }
}

export class Juices extends Array<Juice> {}
