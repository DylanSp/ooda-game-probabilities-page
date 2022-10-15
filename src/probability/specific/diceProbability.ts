export type DiceType = {
  numDice: number;
  numSides: number;
};

export const probabilityOfRollExceedingValue = (diceType: DiceType, value: number): number => {
  if (diceType.numDice === 1) {
    return (diceType.numSides - value) / diceType.numSides;
  }

  if (diceType.numDice === 2) {
    const resultDistribution = new Map<number, number>(); // key is a possible sum of both dice rolls, value is the probability of it happening

    const rangeOfValues = [...Array(diceType.numSides).keys()].map((n) => n + 1); // .map() needed to convert 0..(n - 1) to 1..n
    const probabilityOfSingleRoll = 1 / (diceType.numSides * diceType.numSides);
    for (const firstRoll of rangeOfValues) {
      for (const secondRoll of rangeOfValues) {
        const totalRoll = firstRoll + secondRoll;
        if (!resultDistribution.has(totalRoll)) {
          resultDistribution.set(totalRoll, 0);
        }
        const updatedProbability = resultDistribution.get(totalRoll)! + probabilityOfSingleRoll;
        resultDistribution.set(totalRoll, updatedProbability);
      }
    }

    let sumOfProbabilities = 0;
    for (const [rollValue, probability] of resultDistribution.entries()) {
      if (rollValue > value) {
        sumOfProbabilities += probability;
      }
    }
    return sumOfProbabilities;
  }

  throw new Error("Does not support more than 2 dice");
};
