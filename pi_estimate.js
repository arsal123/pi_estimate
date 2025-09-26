// Function to estimate pi using the Taylor Series Leibniz formula
function estimatePi(iterations = 20, verbose = true) {
  let piEstimate = 0;
  const exactPi = Math.PI;

  if (verbose) {
    console.log(`Estimating pi using the Leibniz formula over ${iterations} iterations:`);
    console.log("-----------------------------------------------------------------");
  }

  // The Leibniz formula is: pi/4 = 1 - 1/3 + 1/5 - 1/7 + ...
  // This is equivalent to: pi = 4 * (1 - 1/3 + 1/5 - 1/7 + ...)
  // The general term is 4 * ((-1)^n / (2n + 1))
  for (let n = 0; n < iterations; n++) {
    // Calculate the current term of the series
    const term = calculateLeibnizTerm(n);
    piEstimate += term;

    if (verbose) {
      // Calculate the error
      const error = Math.abs(exactPi - piEstimate);

      console.log(`Iteration ${n + 1}:`);
      console.log(`  Estimate: ${piEstimate}`);
      console.log(`  Error:    ${error}`);
      console.log("-----------------------------------------------------------------");
    }
  }

  if (verbose) {
    console.log(`Final estimate of pi after ${iterations} iterations: ${piEstimate}`);
    console.log(`Final error: ${Math.abs(exactPi - piEstimate)}`);
  }

  return piEstimate;
}

// Helper function to calculate a single term of the Leibniz series
function calculateLeibnizTerm(n) {
  return 4 * (Math.pow(-1, n) / (2 * n + 1));
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    estimatePi,
    calculateLeibnizTerm
  };
}

// Call the function to run the program (only if not being imported)
if (require.main === module) {
  estimatePi();
}
