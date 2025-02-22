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

  return (
    <div className="flex pb-3 gap-3 items-center flex-wrap">
      {users.map((user) => (
        <div key={user.id}>
          <Label className="pl-1 text-slate-500">{user.name}</Label>
          <Select
            key={user.id}
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
      <Button className="mt-5" onClick={() => setUserWantToSee(null)}>
        Reset
      </Button>
    </div>
  );
};

export default WantToSeeFilters;
