"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { RiEyeFill } from "react-icons/ri";

interface ReactionOverviewProps {
  reactions: {
    hasSeenMovie: boolean | null;
    wantToSee: number | null;
    user: {
      id: string;
      name: string | null;
      email: string | null;
      image: string;
    };
  }[];
}

const ReactionItem = ({
  user,
  wantToSee,
}: ReactionOverviewProps["reactions"][number]) => (
  <Avatar
    className={cn("-ml-1.5 relative first:ml-0", {
      "border-4": wantToSee !== null,
      "border-red-500": wantToSee === 0,
      "border-yellow-500": wantToSee === 1,
      "border-green-500": wantToSee === 2,
    })}
    key={user.id}
  >
    <AvatarImage src={user.image} />
    <AvatarFallback>
      {user.name
        ?.split(" ")
        ?.map((n) => n[0])
        ?.join("")}
    </AvatarFallback>
    <div
      className={cn("absolute inset-0", {
        "bg-red-500/50": wantToSee === 0,
        "bg-yellow-500/50": wantToSee === 1,
        "bg-green-500/50": wantToSee === 2,
      })}
    />
  </Avatar>
);

export const ReactionOverview = ({ reactions }: ReactionOverviewProps) => {
  const reactionsWantToSee = reactions
    .toSorted((a, b) => a.user.id.localeCompare(b.user.id))
    .filter(
      (reaction) => reaction.hasSeenMovie == null && reaction.wantToSee != null,
    );
  const reactionsHasSeen = reactions
    .toSorted((a, b) => a.user.id.localeCompare(b.user.id))
    .filter(
      (reaction) => reaction.wantToSee == null && reaction.hasSeenMovie != null,
    );

  return (
    <div className="flex items-center">
      {reactionsWantToSee.map((reaction) => (
        <ReactionItem key={reaction.user.id} {...reaction} />
      ))}
      {!!reactionsHasSeen.length && (
        <>
          <RiEyeFill className="mr-3 ml-6 size-6" />
          {reactionsHasSeen.map((reaction) => (
            <ReactionItem key={reaction.user.id} {...reaction} />
          ))}
        </>
      )}
    </div>
  );
};
