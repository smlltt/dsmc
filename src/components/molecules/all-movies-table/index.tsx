"use client";

import { useMovies } from "@/queries/movies";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { FC } from "react";

interface AllMoviesTableProps {
  usersCount: number;
}

const AllMoviesTable: FC<AllMoviesTableProps> = ({ usersCount }) => {
  const { data } = useMovies();
  if (!data) return null;

  return <DataTable columns={columns} data={data} usersCount={usersCount} />;
};

export default AllMoviesTable;
