"use client";

import { useMovies } from "@/queries/movies";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { FC } from "react";
import { User } from "@prisma/client";

interface AllMoviesTableProps {
  usersCount: number;
  userId?: string;
  users: { name: string; id: string }[];
}

const AllMoviesTable: FC<AllMoviesTableProps> = ({
  usersCount,
  userId,
  users,
}) => {
  const { data } = useMovies();
  if (!data) return null;

  return (
    <DataTable
      columns={columns}
      data={data}
      usersCount={usersCount}
      userId={userId}
      users={users}
    />
  );
};

export default AllMoviesTable;
