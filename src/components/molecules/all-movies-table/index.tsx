"use client";

import { useMovies } from "@/queries/movies";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { FC } from "react";

interface AllMoviesTableProps {
  usersCount: number;
  userId?: string;
}

const AllMoviesTable: FC<AllMoviesTableProps> = ({ usersCount, userId }) => {
  const { data } = useMovies();
  if (!data) return null;

  return (
    <DataTable
      columns={columns}
      data={data}
      usersCount={usersCount}
      userId={userId}
    />
  );
};

export default AllMoviesTable;
