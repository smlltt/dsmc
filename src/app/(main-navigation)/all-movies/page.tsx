import { auth } from "@/auth";
import AllMoviesTable from "@/components/molecules/all-movies-table";
import { fetchUsersCount } from "@/lib/data/user";

export default async function AllMoviesPage(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const session = await auth();
  const usersCount = await fetchUsersCount();

  if (!session?.user) {
    return null;
  }

  return (
    <>
      <AllMoviesTable usersCount={usersCount} />
    </>
  );
}
