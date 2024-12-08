"use client";

import { ColumnDef, RowData } from "@tanstack/react-table";
import {
  CreditDbI,
  TmdbGenreI,
  TmdbProductionCountryI,
  FetchMoviesReturnType,
} from "@/lib/definitions";
import { calculateMovieInterest, formatListItemsWithDelimiter } from "./utils";
import { useSession } from "next-auth/react";
import MultipleItemsCellWrapper from "./multiple-items-cell-wrapper";
import { ReactionRate } from "@/components/molecules/movie-reaction-panel";
import TableHeader from "./table-header";
import { Progress } from "@/components/ui/progress";
import type { MovieReaction, User } from "@prisma/client";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    usersCount: number;
  }
}

export const columns: ColumnDef<FetchMoviesReturnType["movies"][number]>[] = [
  {
    accessorKey: "title",
    header: () => <TableHeader text={"Title"} />,
    cell: ({ row }) => {
      const imdbId = row.getValue("imdb_id") as string;
      const title = row.getValue("title") as string;

      return (
        <a
          href={`https://www.imdb.com/title/${imdbId}`}
          className="hover:text-red-600"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className={"text-center"}>{title}</p>
        </a>
      );
    },
  },
  {
    accessorKey: "crew_members",
    header: () => <TableHeader text={"Director"} />,
    cell: ({ row }) => {
      const crew = row.getValue("crew_members") as CreditDbI[];

      return (
        <MultipleItemsCellWrapper>
          {crew.map(({ person }, index) => (
            <p key={person.id} className={"text-center"}>
              {formatListItemsWithDelimiter(person.name, crew.length, index)}
            </p>
          ))}
        </MultipleItemsCellWrapper>
      );
    },
  },
  {
    accessorKey: "production_countries",
    header: () => <TableHeader text={"Production Countries"} />,
    cell: ({ row }) => {
      const countries = row.getValue(
        "production_countries",
      ) as TmdbProductionCountryI[];

      return (
        <MultipleItemsCellWrapper>
          {countries.map((country, index) => (
            <p key={country.iso_3166_1}>
              {formatListItemsWithDelimiter(
                country.iso_3166_1,
                countries.length,
                index,
              )}
            </p>
          ))}
        </MultipleItemsCellWrapper>
      );
    },
  },
  {
    accessorKey: "original_language",
    header: () => "Language",
    cell: ({ row }) => {
      const language = row.getValue("original_language") as string;
      return <p className={"pl-5"}>{language.toUpperCase()}</p>;
    },
  },
  {
    accessorKey: "imdb_id",
    header: () => null,
    cell: () => null,
  },
  {
    accessorKey: "release_date",
    header: "Year",
    cell: ({ row }) => {
      const releaseDate = row.getValue("release_date") as string;
      const formattedReleaseDate = releaseDate.slice(0, 4);

      return <p>{formattedReleaseDate}</p>;
    },
  },
  {
    accessorKey: "genres",
    header: () => <TableHeader text={"Genres"} />,
    cell: ({ row }) => {
      const genres = row.getValue("genres") as TmdbGenreI[];

      return (
        <MultipleItemsCellWrapper>
          {genres.map((genre, index) => (
            <p key={genre.id}>
              {formatListItemsWithDelimiter(genre.name, genres.length, index)}
            </p>
          ))}
        </MultipleItemsCellWrapper>
      );
    },
  },
  {
    accessorKey: "user",
    header: () => <TableHeader text={"Added by"} />,
    cell: ({ row }) => {
      const user = row.getValue("user") as User;
      if (!user.name) return null;
      return <p className={"text-center"}>{user.name.split(" ")[0]}</p>;
    },
  },
  {
    accessorKey: "movieReactions",
    header: () => <TableHeader text={"Want to see"} />,
    cell: ({ row }) => {
      const userId = useSession().data?.user?.id;
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
    header: () => <TableHeader text={"Watch Together"} />,
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
