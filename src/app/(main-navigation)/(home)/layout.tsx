import { MovieSearchInput } from "@/components/molecules/movie-search-input";
import { PageDefaultContentWrapper } from "@/components/molecules/page-default-content-wrapper";
import { PropsWithChildren, Suspense } from "react";

const SearchPageLayout = async ({ children }: PropsWithChildren) => {
  return (
    <PageDefaultContentWrapper className="gap-3">
      <div className="mb-8">
        <Suspense>
          <MovieSearchInput />
        </Suspense>
      </div>
      {children}
    </PageDefaultContentWrapper>
  );
};

export default SearchPageLayout;
