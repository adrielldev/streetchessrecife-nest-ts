function Probability(rating1: number, rating2: number) {
  return (
    (1.0 * 1.0) / (1 + 1.0 * Math.pow(10, (1.0 * (rating1 - rating2)) / 400))
  );
}

export function EloRating(Ra: number, Rb: number, d: string, K = 30) {
  const Pb = Probability(Ra, Rb);

  const Pa = Probability(Rb, Ra);

  if (d === 'w') {
    Ra = Ra + K * (1 - Pa);
    Rb = Rb + K * (0 - Pb);
  } else if (d === 'b') {
    Ra = Ra + K * (0 - Pa);
    Rb = Rb + K * (1 - Pb);
  }

  return {
    rating_a: Ra,
    rating_b: Rb,
  };
}
