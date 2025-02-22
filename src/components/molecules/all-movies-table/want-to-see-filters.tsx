"use client";

import { FC } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueryStates } from "nuqs";
import { getUsersQueryState } from "./utils";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export interface UserNameIdI {
  name: string;
  id: string;
}

interface WantToSeeFiltersProps {
  users: UserNameIdI[];
}

const WantToSeeFilters: FC<WantToSeeFiltersProps> = ({ users }) => {
  const [userWantToSee, setUserWantToSee] = useQueryStates(
    getUsersQueryState(users)
  );

  const handleFilterChange = (userId: string, value: string) => {
    setUserWantToSee({ ...userWantToSee, [userId]: value });
  };

  const handleEverybodyFilterChange = (value: string) => {
    handleReset();
    const newState = users.reduce(
      (acc, user) => {
        acc[user.id] = value;
        return acc;
      },
      {} as Record<string, string>
    );
    setUserWantToSee(newState);
  };

  const handleReset = () => {
    setUserWantToSee(null);
  };

  return (
    <div className="flex pb-3 gap-3 items-center flex-wrap">
      {users.map((user) => (
        <div key={user.id}>
          <Label className="pl-1 text-slate-500">{user.name}</Label>
          <Select
            key={user.id}
            value={userWantToSee[user.id] || "null"}
            onValueChange={(value) => handleFilterChange(user.id, value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={"No Selection"} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="null">No Selection</SelectItem>
                <SelectItem value="2">Want to See</SelectItem>
                <SelectItem value="1">Maybe</SelectItem>
                <SelectItem value="0">Don't want to see</SelectItem>
                <SelectItem value="-1">Seen</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      ))}
      <div>
        <Label className="pl-1 text-blue-700">Everybody</Label>
        <Select onValueChange={(value) => handleEverybodyFilterChange(value)}>
          <SelectTrigger className="w-[180px] bg-blue-900">
            <SelectValue placeholder={"No Selection"} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="null">No Selection</SelectItem>
              <SelectItem value="2">Want to See</SelectItem>
              <SelectItem value="1">Maybe</SelectItem>
              <SelectItem value="0">Don't want to see</SelectItem>
              <SelectItem value="-1">Seen</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Button className="mt-5" onClick={handleReset}>
        Reset
      </Button>
    </div>
  );
};

export default WantToSeeFilters;
