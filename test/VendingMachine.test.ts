import { VendingMachine } from "../src/VendingMachine";

test("newできる", () => {
  expect(new VendingMachine()).toBeDefined();
});

test("お金を投入できる", () => {
  const vm = new VendingMachine();
  expect(() => vm.insert(50)).not.toThrow()
})

test("払い戻しできる", () => {
  const vm = new VendingMachine();
  expect(vm.refund()).toEqual(0)
})
