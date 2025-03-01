"use client";

import { FC } from "react";
import { Select } from "@/components/ui/select";
import { useQueryStates } from "nuqs";
import { getUsersQueryState } from "../utils";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import FilterContent from "./filter-content";

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
    setUserWantToSee({ ...userWantToSee, [userId]: value, everybody: "" });
  };

  const handleEverybodyFilterChange = (value: string) => {
    handleReset();
    setUserWantToSee({ everybody: value });
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
            <FilterContent />
          </Select>
        </div>
      ))}
      <div>
        <Label className="pl-1 text-sky-500">Everybody</Label>
        <Select
          onValueChange={(value) => handleEverybodyFilterChange(value)}
          value={userWantToSee["everybody"] || "null"}
        >
          <FilterContent selectTriggerClassName="bg-blue-900" />
        </Select>
      </div>
      <Button
        className="mt-5 ml-auto"
        onClick={handleReset}
        variant={"destructive"}
      >
        Remove Filters
      </Button>
    </div>
  );
};

export default WantToSeeFilters;
