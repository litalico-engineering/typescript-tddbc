import { VendingMachine } from "../src/VendingMachine";

test("new", () => {
  expect(new VendingMachine()).toBeDefined();
});
