import { sum_to_n_a, sum_to_n_b, sum_to_n_c } from "./sum_to_n_three_ways";
import { describe, expect, test } from "@jest/globals";

describe("sum_to_n functions", () => {
  test("sum_to_n_a computes correct sum", () => {
    expect(sum_to_n_a(5)).toBe(15);
    expect(sum_to_n_a(10)).toBe(55);
    expect(sum_to_n_a(1)).toBe(1);
  });

  test("sum_to_n_b computes correct sum", () => {
    expect(sum_to_n_b(5)).toBe(15);
    expect(sum_to_n_b(10)).toBe(55);
    expect(sum_to_n_b(1)).toBe(1);
  });

  test("sum_to_n_c computes correct sum", () => {
    expect(sum_to_n_c(5)).toBe(15);
    expect(sum_to_n_c(10)).toBe(55);
    expect(sum_to_n_c(1)).toBe(1);
  });
});
