"use client";

import { ColumnDef, RowData } from "@tanstack/react-table";
import {
  CreditDbI,
  TmdbGenreI,
  TmdbProductionCountryI,
  FetchAllMoviesReturnType,
} from "@/lib/definitions";
import { calculateMovieInterest, formatListItemsWithDelimiter } from "./utils";
import MultipleItemsCellWrapper from "./multiple-items-cell-wrapper";
import { ReactionRate } from "@/components/molecules/movie-reaction-panel";
import TableHeader from "./table-header";
import { Progress } from "@/components/ui/progress";
import type { MovieReaction, User } from "@prisma/client";
import HeaderWithSort from "@/components/molecules/all-movies-table/header-with-sort";

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
    header: (header) => {
      return <HeaderWithSort header={header} title={"Title"} />;
    },
    cell: ({ row }) => {
      const imdbId = row.getValue("imdb_id") as string;
      const title = row.getValue("title") as string;

      return (
        <div className={"text-center max-w-52"}>
          <a
            href={`https://www.imdb.com/title/${imdbId}`}
            className="hover:text-red-600"
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
    header: (header) => (
      <HeaderWithSort
        header={header}
        title={"Director"}
        wrapperProps={{ className: "w-32" }}
      />
    ),
    cell: ({ row }) => {
      const crew = row.getValue("crew_members") as CreditDbI[];

      return (
        <MultipleItemsCellWrapper>
          {crew.map(({ person }, index) => (
            <p key={person.id} className={"text-center max-w-32"}>
              {formatListItemsWithDelimiter(person.name, crew.length, index)}
            </p>
          ))}
        </MultipleItemsCellWrapper>
      );
    },
  },
  {
    accessorKey: "production_countries",
    header: (header) => (
      <HeaderWithSort
        header={header}
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
          {countries.map((country, index) => (
            <p key={country.iso_3166_1} className={"text-center max-w-28"}>
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
    header: (header) => (
      <HeaderWithSort
        header={header}
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
    header: (header) => (
      <HeaderWithSort
        header={header}
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
    header: (header) => (
      <HeaderWithSort
        header={header}
        title={"Genres"}
        wrapperProps={{ className: "w-28" }}
      />
    ),
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
    header: (header) => (
      <HeaderWithSort
        header={header}
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
    header: (header) => (
      <HeaderWithSort
        header={header}
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
