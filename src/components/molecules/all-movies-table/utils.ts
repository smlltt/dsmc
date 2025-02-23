import { MovieReaction } from "@prisma/client";
import { UserNameIdI } from "./want-to-see-filters";
import { UseQueryStatesKeysMap } from "nuqs";

export const calculateMovieInterest = (usersCount: number, votes: number[]) => {
  if (votes.length === 0) {
    return 0;
  }

  const maxScore = usersCount * 2;
  const actualScore = votes.reduce((sum, vote) => sum + vote, 0);

  const interestPercentage = (actualScore / maxScore) * 100;

  return Number(interestPercentage.toFixed(2));
};

type WantToSeeState = Record<string, string>;

export const getUsersQueryState = (
  users: UserNameIdI[]
): UseQueryStatesKeysMap<WantToSeeState> =>
  users.reduce(
    (acc, user) => ({
      ...acc,
      [user.id]: {
        defaultValue: "",
        parse: (value: string) => value || "",
      },
      everybody: {
        defaultValue: "",
        parse: (value: string) => value || "",
      },
    }),
    {}
  );

const doesReactionMatchFilter = (
  reaction: MovieReaction,
  filterValue: string
) => {
  if (filterValue === "-1") return reaction.hasSeenMovie === true;
  return reaction.wantToSee === Number(filterValue);
};

export const matchesFilter = (
  reactions: MovieReaction[],
  filter: Record<string, string>
) => {
  const everybodyValue = filter["everybody"];
  const hasEverybody = everybodyValue !== "null" && everybodyValue !== "";
  let userIdsInFilter = Object.keys(filter).filter(
    (key) => key !== "everybody"
  );

  if (hasEverybody) {
    userIdsInFilter.forEach((userId) => {
      filter[userId] = everybodyValue;
    });
  } else {
    userIdsInFilter = userIdsInFilter.filter(
      (key) => filter[key] !== "" && filter[key] !== "null"
    );
  }
  return userIdsInFilter.every((userId) => {
    const userReaction = reactions.find((r) => r.userId === userId);
    if (!userReaction) return false; //selected user has no reaction

    const filterValue = filter[userId];
    return doesReactionMatchFilter(userReaction, filterValue);
  });
};
