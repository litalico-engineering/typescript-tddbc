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
