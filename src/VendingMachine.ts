interface IVendingMachine {
  insert: (money: number) => void;
  refund: () => number;
}

export class VendingMachine implements IVendingMachine {
  /**
   * お金を投入する
   */
  insert: (money: number) => void;
  /**
   * 払い戻し
   */
  refund: () => number;
}
