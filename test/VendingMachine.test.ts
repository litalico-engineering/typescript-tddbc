import { VendingMachine, Juice } from "../src/VendingMachine";

test("newできる", () => {
  expect(new VendingMachine()).toBeDefined();
});

test("お金を投入できる", () => {
  const vm = new VendingMachine();
  vm.insert(10);
  vm.insert(50);
  vm.insert(100);
  vm.insert(500);
  vm.insert(1000);

  expect(vm.total).toEqual(1660);
});

test("対応しているお金を投入するとnullが返る", () => {
  const vm = new VendingMachine();
  expect(vm.insert(10)).toBeNull();
});

test("非対応のお金を投入", () => {
  const vm = new VendingMachine();
  vm.insert(10);

  expect(vm.insert(1)).toEqual(1);
  expect(vm.insert(5)).toEqual(5);
  expect(vm.insert(2000)).toEqual(2000);
  expect(vm.insert(5000)).toEqual(5000);
  expect(vm.insert(10000)).toEqual(10000);

  expect(vm.total).toEqual(10);
});

test("投入金額", () => {
  const vm = new VendingMachine();
  vm.insert(10);
  vm.insert(1000);
  expect(vm.total).toEqual(1010);
});

describe("払い戻しできる", () => {
  let vm = null;

  beforeEach(() => {
    vm = new VendingMachine();
    vm.insert(10);
    vm.insert(1000);
  });

  test("合計金額が出力される", () => {
    expect(vm.refund()).toEqual(1010);
  });

  test("払い戻しされた後は合計金額は0円である", () => {
    vm.refund();
    expect(vm.total).toEqual(0);
  });
});

describe("ジュース", () => {
  test("名前がある", () => {
    const juice = new Juice();
    expect(juice.name).toEqual("コーラ");
  })

  test("値段がある", () => {
    const juice = new Juice();
    expect(juice.price).toEqual(120);
  })

})

// ステップ２　ジュースの管理
// * 値段と名前の属性からなるジュースを１種類格納できる。初期状態で、コーラ（値段:120円、名前”コーラ”）を5本格納している。
// * 格納されているジュースの情報（値段と名前と在庫）を取得できる。
// * 注意：責務を持ちすぎていませんか？責任を持ちすぎていたら分割しましょう
