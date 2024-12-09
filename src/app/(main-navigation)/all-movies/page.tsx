import { columns } from "@/components/molecules/all-movies-table/columns";
import { DataTable } from "@/components/molecules/all-movies-table/data-table";
import { fetchAllMovies } from "@/lib/data/movies";
import { fetchUsersCount } from "@/lib/data/user";
import { auth } from "@/auth";

export default async function AllMoviesPage(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const session = await auth();
  const allMoviesTest = await fetchAllMovies();
  const usersCount = await fetchUsersCount();

  if (!session?.user) {
    return null;
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={allMoviesTest}
        usersCount={usersCount}
        userId={session.user.id}
      />
    </div>
  );
}
