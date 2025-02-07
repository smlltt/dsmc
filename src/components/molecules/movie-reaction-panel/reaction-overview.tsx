"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export const ReactionOverview = ({
  reactions,
  usersCount,
}: {
  reactions: {
    wantToSee: number | null;
    user: {
      id: string;
      name: string | null;
      email: string | null;
      image: string;
    };
  }[];
  usersCount: number;
}) => {
  const maxScore = usersCount * 2;
  const score = reactions.reduce((sum, u) => sum + (u.wantToSee || 0), 0);
  const match = Math.round((score / maxScore) * 100);

  return (
    <div className="flex items-center gap-4">
      <div className="flex">
        {reactions.map(({ user, wantToSee }) => (
          <Avatar className={cn("-ml-1.5 relative border-4 border-white first:ml-0", {
            "border-red-500": wantToSee === 0,
            "border-yellow-500": wantToSee === 1,
            "border-green-500": wantToSee === 2,
          })} key={user.id}>
            <AvatarImage src={user.image} />
            <AvatarFallback>
              {user.name
                ?.split(" ")
                ?.map((n) => n[0])
                ?.join("")}
            </AvatarFallback>
            <div
              className={cn("absolute inset-0 bg-white/50", {
                "bg-red-500/50": wantToSee === 0,
                "bg-yellow-500/50": wantToSee === 1,
                "bg-green-500/50": wantToSee === 2,
              })}
            />
          </Avatar>
        ))}
      </div>
      {/* todo: calculate properly - take into consideration who is watching */}
      {/* <p className="text-2xl">
        {match}
        {"%"}
        <span className="text-lg text-muted-foreground">{" match"}</span>
      </p> */}
    </div>
  );
};
