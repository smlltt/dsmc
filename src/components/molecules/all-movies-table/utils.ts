export const formatListItemsWithDelimiter = (
  item: string,
  listLength: number,
  index: number,
) => `${item}${index < listLength - 1 ? "," : ""}`;

export const calculateMovieInterest = (usersCount: number, votes: number[]) => {
  if (votes.length === 0) {
    return 0;
  }

  const maxScore = usersCount * 3; // Maximum score possible
  const actualScore = votes.reduce((sum, vote) => sum + vote, 0); // Sum of all votes

  const interestPercentage = (actualScore / maxScore) * 100;

  return Number(interestPercentage.toFixed(2));
};
