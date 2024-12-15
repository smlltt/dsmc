"use client";

import HeaderWithSort from "@/components/molecules/all-movies-table/header-with-sort";
import { ReactionRate } from "@/components/molecules/movie-reaction-panel";
import { Progress } from "@/components/ui/progress";
import type {
  CreditDbI,
  FetchAllMoviesReturnType,
  TmdbGenreI,
  TmdbProductionCountryI,
} from "@/lib/definitions";
import type { MovieReaction, User } from "@prisma/client";
import type { ColumnDef, RowData } from "@tanstack/react-table";
import MultipleItemsCellWrapper from "./multiple-items-cell-wrapper";
import TableHeader from "./table-header";
import { calculateMovieInterest } from "./utils";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    usersCount: number;
    userId?: string;
  }
}

//TODO implement filters https://tanstack.com/table/v8/docs/framework/react/examples/filters

export const columns: ColumnDef<FetchAllMoviesReturnType[number]>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return <HeaderWithSort column={column} title={"Title"} />;
    },
    cell: ({ row }) => {
      const imdbId = row.getValue("imdb_id") as string;
      const title = row.getValue("title") as string;

      return (
        <div className={"max-w-52 text-center"}>
          <a
            href={`https://www.imdb.com/title/${imdbId}`}
            className="text-red-400 hover:text-red-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className={"text-center"}>{title}</p>
          </a>
        </div>
      );
    },
  },
  {
    accessorKey: "crew_members",
    header: ({ column }) => (
      <HeaderWithSort
        column={column}
        title={"Director"}
        wrapperProps={{ className: "w-32" }}
      />
    ),
    cell: ({ row }) => {
      const crew = row.getValue("crew_members") as CreditDbI[];

      return (
        <MultipleItemsCellWrapper>
          <p className={"text-center"}>
            {crew.map((c) => c.person.name).join(", ")}
          </p>
        </MultipleItemsCellWrapper>
      );
    },
  },
  {
    accessorKey: "production_countries",
    header: ({ column }) => (
      <HeaderWithSort
        column={column}
        title={"Countries"}
        wrapperProps={{ className: "w-28" }}
      />
    ),
    cell: ({ row }) => {
      const countries = row.getValue(
        "production_countries",
      ) as TmdbProductionCountryI[];

      return (
        <MultipleItemsCellWrapper>
          <p className={"max-w-28 text-center"}>
            {countries.map((c) => c.iso_3166_1).join(", ")}
          </p>
        </MultipleItemsCellWrapper>
      );
    },
  },
  {
    accessorKey: "original_language",
    header: ({ column }) => (
      <HeaderWithSort
        column={column}
        title={"Language"}
        wrapperProps={{ className: "w-28" }}
      />
    ),
    cell: ({ row }) => {
      const language = row.getValue("original_language") as string;
      return <p className={"pl-5 text-center"}>{language.toUpperCase()}</p>;
    },
  },
  {
    accessorKey: "imdb_id",
    header: () => null,
    cell: () => null,
  },
  {
    accessorKey: "release_date",
    header: ({ column }) => (
      <HeaderWithSort
        column={column}
        title={"Year"}
        wrapperProps={{ className: "w-28" }}
      />
    ),
    cell: ({ row }) => {
      const releaseDate = row.getValue("release_date") as string;
      const formattedReleaseDate = releaseDate.slice(0, 4);

      return <p className={"text-center"}>{formattedReleaseDate}</p>;
    },
  },
  {
    accessorKey: "genres",
    header: ({ column }) => (
      <HeaderWithSort
        column={column}
        title={"Genres"}
        wrapperProps={{ className: "w-28" }}
      />
    ),
    cell: ({ row }) => {
      const genres = row.getValue("genres") as TmdbGenreI[];

      return (
        <MultipleItemsCellWrapper>
          <p className={"text-center"}>
            {genres.map((c) => c.name).join(", ")}
          </p>
        </MultipleItemsCellWrapper>
      );
    },
  },
  {
    accessorKey: "user",
    header: ({ column }) => (
      <HeaderWithSort
        column={column}
        title={"Added by"}
        wrapperProps={{ className: "w-28" }}
      />
    ),
    cell: ({ row }) => {
      const user = row.getValue("user") as User;
      if (!user.name) return null;
      return <p className={"text-center"}>{user.name.split(" ")[0]}</p>;
    },
  },
  {
    accessorKey: "movieReactions",
    header: () => <TableHeader text={"Want to see"} />,
    cell: ({ row, table }) => {
      const userId = table?.options?.meta?.userId || null;
      const reactions = row.getValue("movieReactions") as MovieReaction[];
      const userReaction = reactions.find(
        (reaction) => reaction.userId === userId,
      );
      return (
        <ReactionRate
          wantToSee={userReaction?.wantToSee}
          movieId={reactions[0]?.movieId}
        />
      );
    },
  },
  {
    accessorKey: "movieReactions",
    id: "watchMovieMatch",
    header: ({ column }) => (
      <HeaderWithSort
        column={column}
        title={"Watch Together"}
        wrapperProps={{ className: "w-36" }}
      />
    ),
    cell: ({ row, table }) => {
      const reactions = row.getValue("movieReactions") as MovieReaction[];
      const usersCount = table?.options?.meta?.usersCount || 1;
      const movieInterest = calculateMovieInterest(
        usersCount,
        reactions.map((reaction) => reaction.wantToSee),
      );
      return (
        <div className={"flex flex-col gap-1"}>
          <p
            className={"text-center text-xs"}
          >{`${reactions.length} / ${usersCount} voted`}</p>
          <Progress value={movieInterest} />
        </div>
      );
    },
  },
];
