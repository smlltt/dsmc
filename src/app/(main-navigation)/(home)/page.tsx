import { PageDefaultContentWrapper } from "@/components/molecules/page-default-content-wrapper";
import { Suspense } from "react";
import { MovieSearchInput } from "./movie-search-input";
import { MovieSearchResults } from "./movie-search-results";

export default async ({
  searchParams,
}: { searchParams: Promise<{ search?: string }> }) => {
  const searchQuery = (await searchParams).search;

  return (
    <div>
      <div className="mb-8">
        <MovieSearchInput />
      </div>
      <PageDefaultContentWrapper className="gap-3">
        <Suspense fallback={"loading..."}>
          {searchQuery ? (
            <MovieSearchResults searchQuery={searchQuery} />
          ) : (
            <p>{"Type something!"}</p>
          )}
        </Suspense>
      </PageDefaultContentWrapper>
    </div>
  );
};
