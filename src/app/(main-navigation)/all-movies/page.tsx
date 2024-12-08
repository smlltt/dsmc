import { columns } from "@/components/molecules/all-movies-table/columns";
import { DataTable } from "@/components/molecules/all-movies-table/data-table";
import { fetchMovies } from "@/lib/data/movies";
import { SessionProvider } from "next-auth/react";
import { fetchUsersCount } from "@/lib/data/user";

export default async function AllMoviesPage(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  //TODO implement search/sort/filter
  // const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const allMovies = await fetchMovies(currentPage);
  const usersCount = await fetchUsersCount();

  return (
    //TODO add suspense
    <div className="container mx-auto py-10">
      <SessionProvider>
        <DataTable
          columns={columns}
          data={allMovies.movies}
          totalPages={allMovies.totalPages}
          usersCount={usersCount}
        />
      </SessionProvider>
    </div>
  );
}
