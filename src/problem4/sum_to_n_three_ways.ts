// 1. Using a for loop (Iterative Solution)
// Time Complexity: O(n)
// This approach iterates from 1 to n and accumulates the sum in a variable.
export function sum_to_n_a(n: number): number {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i; // Add the current number to the sum
  }
  return sum; // Return the final sum
}

// 2. Using the mathematical formula (Gauss' formula)
// Time Complexity: O(1)
// This approach calculates the sum directly using the formula: (n * (n + 1)) / 2.
// It provides an immediate result without the need for iteration.
export function sum_to_n_b(n: number): number {
  return (n * (n + 1)) / 2; // Return the computed sum using the formula
}

// 3. Using recursion
// Time Complexity: O(n) (since there are n recursive calls)
// This approach recursively sums n with the sum of (n - 1) until it reaches the base case.
export function sum_to_n_c(n: number): number {
  if (n <= 1) return n; // Base case: when n is 1 or less, return n itself
  return n + sum_to_n_c(n - 1); // Recursive step: sum n with the result of sum_to_n_c(n - 1)
}

// Test cases
console.log(sum_to_n_a(5)); // Expected output: 15
console.log(sum_to_n_b(5)); // Expected output: 15
console.log(sum_to_n_c(5)); // Expected output: 15
