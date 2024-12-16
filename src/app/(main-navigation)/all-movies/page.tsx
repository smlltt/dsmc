import { auth } from "@/auth";
import { columns } from "@/components/molecules/all-movies-table/columns";
import { DataTable } from "@/components/molecules/all-movies-table/data-table";
import { fetchAllMovies } from "@/lib/data/movies";
import { fetchUsersCount } from "@/lib/data/user";

export default async function AllMoviesPage(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const session = await auth();
  const allMoviesData = fetchAllMovies();
  const usersCountData = fetchUsersCount();
  const [allMovies, usersCount] = await Promise.all([
    allMoviesData,
    usersCountData,
  ]);

  if (!session?.user) {
    return null;
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={allMovies}
        usersCount={usersCount}
        userId={session.user.id}
      />
    </div>
  );
}
