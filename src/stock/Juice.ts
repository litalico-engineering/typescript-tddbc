export type Juice = {
  readonly name: string;
  readonly price: number;
};

export class Cola implements Juice {
  name: "コーラ";
  price: 120;
}
