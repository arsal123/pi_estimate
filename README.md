# Pi Estimation using Leibniz Formula and Taylor Series

A Node.js program that estimates the value of π using the Taylor Series over 20 iterations.

## Installation

Make sure you have Node.js installed. I have tested it on version 20 or higher

## Usage

Run the program using one of the following methods:

### Method 1: Using npm scripts
```bash
npm start
```

### Method 2: Direct node execution
```bash
node pi_estimate.js
```

## Testing
```bash
npm test
```

## How it works

The program uses the Leibniz formula for π:
```
π/4 = 1 - 1/3 + 1/5 - 1/7 + 1/9 - ...
```

Which can be rewritten as:
```
π = 4 × (1 - 1/3 + 1/5 - 1/7 + 1/9 - ...)
```

The general term is: `4 × ((-1)^n / (2n + 1))`

The program runs for 20 iterations and shows:
- The current estimate of π
- The error compared to the actual value of π
- Progress through each iteration

## Expected Output

The program will display the estimation progress for each iteration and show the final estimate after 20 iterations.