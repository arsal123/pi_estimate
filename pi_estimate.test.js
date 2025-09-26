const { estimatePi, calculateLeibnizTerm } = require('./pi_estimate');

describe('Pi Estimation Tests', () => {
  describe('calculateLeibnizTerm', () => {
    test('should calculate correct first term (n=0)', () => {
      const result = calculateLeibnizTerm(0);
      expect(result).toBeCloseTo(4, 10); // 4 * ((-1)^0 / (2*0 + 1)) = 4 * (1/1) = 4
    });

    test('should calculate correct second term (n=1)', () => {
      const result = calculateLeibnizTerm(1);
      expect(result).toBeCloseTo(-4/3, 10); // 4 * ((-1)^1 / (2*1 + 1)) = 4 * (-1/3) = -4/3
    });

    test('should calculate correct third term (n=2)', () => {
      const result = calculateLeibnizTerm(2);
      expect(result).toBeCloseTo(4/5, 10); // 4 * ((-1)^2 / (2*2 + 1)) = 4 * (1/5) = 4/5
    });

    test('should calculate correct fourth term (n=3)', () => {
      const result = calculateLeibnizTerm(3);
      expect(result).toBeCloseTo(-4/7, 10); // 4 * ((-1)^3 / (2*3 + 1)) = 4 * (-1/7) = -4/7
    });
  });

  describe('estimatePi', () => {
    test('should return a number', () => {
      const result = estimatePi(1, false);
      expect(typeof result).toBe('number');
    });

    test('should approach pi as iterations increase', () => {
      const estimate1 = estimatePi(1, false);
      const estimate10 = estimatePi(10, false);
      const estimate100 = estimatePi(100, false);
      const estimate1000 = estimatePi(1000, false);

      // Each estimate should be closer to π than the previous one
      const actualPi = Math.PI;
      
      expect(Math.abs(actualPi - estimate10)).toBeLessThan(Math.abs(actualPi - estimate1));
      expect(Math.abs(actualPi - estimate100)).toBeLessThan(Math.abs(actualPi - estimate10));
      expect(Math.abs(actualPi - estimate1000)).toBeLessThan(Math.abs(actualPi - estimate100));
    });

    test('should give reasonable approximation with default 20 iterations', () => {
      const result = estimatePi(20, false);
      const actualPi = Math.PI;
      const error = Math.abs(actualPi - result);
      
      // With 20 iterations, error should be less than 0.1
      expect(error).toBeLessThan(0.1);
      expect(result).toBeGreaterThan(3.0);
      expect(result).toBeLessThan(3.5);
    });

    test('should work with single iteration', () => {
      const result = estimatePi(1, false);
      expect(result).toBeCloseTo(4, 10); // First term is 4
    });

    test('should work with two iterations', () => {
      const result = estimatePi(2, false);
      expect(result).toBeCloseTo(4 - 4/3, 10); // 4 - 4/3 = 8/3 ≈ 2.667
    });

    test('should handle zero iterations', () => {
      const result = estimatePi(0, false);
      expect(result).toBe(0);
    });

    test('should use default parameters when none provided', () => {
      // Capture console output to test verbose mode
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
      
      const result = estimatePi();
      
      // Should have called console.log multiple times (verbose mode)
      expect(consoleSpy).toHaveBeenCalled();
      expect(typeof result).toBe('number');
      
      consoleSpy.mockRestore();
    });

    test('should not log when verbose is false', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
      
      estimatePi(5, false);
      
      expect(consoleSpy).not.toHaveBeenCalled();
      
      consoleSpy.mockRestore();
    });

    test('should converge correctly for known series values', () => {
      // Test that the series follows the expected pattern
      const estimate2 = estimatePi(2, false);
      const estimate3 = estimatePi(3, false);
      const estimate4 = estimatePi(4, false);

      // Manually calculate expected values
      const expected2 = 4 - 4/3; // ≈ 2.667
      const expected3 = 4 - 4/3 + 4/5; // ≈ 3.467
      const expected4 = 4 - 4/3 + 4/5 - 4/7; // ≈ 2.896

      expect(estimate2).toBeCloseTo(expected2, 10);
      expect(estimate3).toBeCloseTo(expected3, 10);
      expect(estimate4).toBeCloseTo(expected4, 10);
    });

    test('should handle large number of iterations', () => {
      const result = estimatePi(10000, false);
      const actualPi = Math.PI;
      const error = Math.abs(actualPi - result);
      
      // With 10000 iterations, error should be quite small
      expect(error).toBeLessThan(0.01);
      expect(result).toBeGreaterThan(3.14);
      expect(result).toBeLessThan(3.15);
    });
  });

  describe('Mathematical Properties', () => {
    test('should demonstrate series convergence behavior', () => {
      // The Leibniz series converges slowly, alternating around π
      const estimates = [];
      for (let i = 1; i <= 10; i++) {
        estimates.push(estimatePi(i, false));
      }

      // Odd-indexed estimates should be greater than π, even-indexed should be less
      const actualPi = Math.PI;
      
      expect(estimates[0]).toBeGreaterThan(actualPi); // n=1: 4 > π
      expect(estimates[1]).toBeLessThan(actualPi);    // n=2: 4-4/3 < π
      expect(estimates[2]).toBeGreaterThan(actualPi); // n=3: 4-4/3+4/5 > π
      expect(estimates[3]).toBeLessThan(actualPi);    // n=4: 4-4/3+4/5-4/7 < π
    });

    test('should show decreasing error magnitude over time', () => {
      const actualPi = Math.PI;
      const errors = [];
      
      for (let i = 1; i <= 20; i++) {
        const estimate = estimatePi(i, false);
        errors.push(Math.abs(actualPi - estimate));
      }

      // Overall trend should be decreasing (though it may oscillate)
      const firstHalfAvg = errors.slice(0, 10).reduce((a, b) => a + b) / 10;
      const secondHalfAvg = errors.slice(10).reduce((a, b) => a + b) / 10;
      
      expect(secondHalfAvg).toBeLessThan(firstHalfAvg);
    });
  });
});