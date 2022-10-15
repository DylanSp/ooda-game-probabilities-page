import "jest";
import { DiceType, probabilityOfRollExceedingValue } from "./diceProbability";

// check floating-point equality up to this many digits after the decimal point
// for use with https://jestjs.io/docs/expect#tobeclosetonumber-numdigits
const CHECK_PRECISION = 6;

const _1d4: DiceType = {
  numDice: 1,
  numSides: 4,
};

const _1d8: DiceType = {
  numDice: 1,
  numSides: 8,
};

const _2d6: DiceType = {
  numDice: 2,
  numSides: 6,
};

describe("Specialized probability calculations for 1 or 2 dice", () => {
  describe("1 die", () => {
    it("Correctly calculates the probability of rolling >1 on 1d4 as 3/4 = 75%", () => {
      const probability = probabilityOfRollExceedingValue(_1d4, 1);

      expect(probability).toBeCloseTo(3 / 4, CHECK_PRECISION);
    });

    it("Correctly calculates the probability of rolling >5 on 1d8 as 3/8 = 37.5%", () => {
      const probability = probabilityOfRollExceedingValue(_1d8, 5);

      expect(probability).toBeCloseTo(3 / 8, CHECK_PRECISION);
    });
  });

  // see https://www.travellercentral.com/rules/dice.html for a reference on probabilities
  describe("2 dice", () => {
    describe("Smoke tests", () => {
      it("Correctly calculates the probability of rolling >1 on 2d6 as 100%", () => {
        const probability = probabilityOfRollExceedingValue(_2d6, 1);

        expect(probability).toBeCloseTo(1, CHECK_PRECISION);
      });

      it("Correctly calculates the probability of rolling >12 on 2d6 as 0%", () => {
        const probability = probabilityOfRollExceedingValue(_2d6, 12);

        expect(probability).toBeCloseTo(0, CHECK_PRECISION);
      });
    });

    it("Correctly calculates the probability of rolling >4 on 2d6 as 5/6 = 83.3%", () => {
      const probability = probabilityOfRollExceedingValue(_2d6, 4);

      expect(probability).toBeCloseTo(5 / 6, CHECK_PRECISION);
    });

    it("Correctly calculates the probability of rolling >10 on 2d6 as 1/12 = 8.3%", () => {
      const probability = probabilityOfRollExceedingValue(_2d6, 10);

      expect(probability).toBeCloseTo(1 / 12, CHECK_PRECISION);
    });
  });
});
