import { VendingMachine } from "../src/VendingMachine";

test("newできる", () => {
  expect(new VendingMachine()).toBeDefined();
});

test("お金を投入できる", () => {
  const vm = new VendingMachine();
  expect(vm.insert(10)).toEqual(10);
  expect(vm.insert(50)).toEqual(50);
  expect(vm.insert(100)).toEqual(100);
  expect(vm.insert(500)).toEqual(500);
  expect(vm.insert(1000)).toEqual(1000);
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
