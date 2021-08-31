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
})

test("投入金額", () => {
  const vm = new VendingMachine();
  expect(vm.total).toEqual(10);
})

test("払い戻しできる", () => {
  const vm = new VendingMachine();
  expect(vm.refund()).toEqual(0);

})
