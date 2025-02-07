import { ToggleFilter } from "@/components/molecules/toggle-filter";
import { getUsers } from "@/lib/data/movies";
import Image from "next/image";
import type { JSX } from "react";

const genres = [
  {
    id: "1",
    label: (
      <>
        <Image alt="ghost" width={16} height={16} src="/image/ghost.png" />
        {"Horror"}
      </>
    ),
  },
  { id: "2", label: "Drama" },
  { id: "3", label: "Comedy" },
  { id: "4", label: "Thriller" },
];

const maxRuntime = [
  { id: "1", label: "Any" },
  { id: "2", label: "< 1:40h" },
  { id: "3", label: "< 2h" },
];

export const Filters = async (): Promise<JSX.Element> => {
  const users = await getUsers();

  return (
    <div className="mt-10 flex flex-wrap gap-6">
      <div className="min-w-40 flex-1">
        <p className="mb-2 font-bold">{"Who is watching?"}</p>
        <ToggleFilter
          queryKey="user"
          items={users.map((u) => ({ id: u.id, label: u.name }))}
        />
      </div>
      {/* <div className="min-w-40 flex-1">
        <p className="mb-2 font-bold">{"What genre?"}</p>
        <ToggleFilter queryKey="genre" items={genres} />
      </div>
      <div className="min-w-40 flex-1">
        <p className="mb-2 font-bold">{"How long?"}</p>
        <ToggleFilter queryKey="maxRuntime" items={maxRuntime} />
      </div> */}
    </div>
  );
};
