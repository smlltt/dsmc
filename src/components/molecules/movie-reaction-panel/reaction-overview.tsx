"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const users = [
  {
    id: "1",
    name: "Zachariasz Strus",
    wantToSee: 2,
    avatar:
      "https://lh3.googleusercontent.com/a/ACg8ocLCLA461nadKpdG-IK7jNMuBq_0QFQ4HZ2rTXxwTBkH_77MbzxG=s96-c",
  },
  {
    id: "2",
    name: "Samuel Liotta",
    wantToSee: 1,
    avatar:
      "https://lh3.googleusercontent.com/a/ACg8ocKNjaT3P-4F9U4gKkuN-hus9LAgOMCO0HmcKJ5IRhOM2RIQHQ=s96-c",
  },
  { id: "3", name: "Agnieszka Ryś", wantToSee: 0 },
];

export const ReactionOverview = () => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex">
        {users.map((user) => (
          <Avatar className={"-ml-1.5 relative first:ml-0"} key={user.id}>
            <AvatarImage src={user.avatar} />
            <AvatarFallback>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
            <div
              className={cn("absolute inset-0", {
                "bg-red-500/30": user.wantToSee === 0,
                "bg-yellow-500/30": user.wantToSee === 1,
                "bg-green-500/30": user.wantToSee === 2,
              })}
            />
          </Avatar>
        ))}
      </div>
      <p className="text-2xl">
        {Math.round((users.reduce((sum, u) => sum + u.wantToSee, 0) / 6) * 100)}
        {"%"}
        <span className="text-lg text-muted-foreground">{" match"}</span>
      </p>
    </div>
  );
};
