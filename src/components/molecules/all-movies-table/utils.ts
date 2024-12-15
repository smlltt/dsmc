export const calculateMovieInterest = (usersCount: number, votes: number[]) => {
  if (votes.length === 0) {
    return 0;
  }

  const maxScore = usersCount * 2;
  const actualScore = votes.reduce((sum, vote) => sum + vote, 0);

  const interestPercentage = (actualScore / maxScore) * 100;

  return Number(interestPercentage.toFixed(2));
};
