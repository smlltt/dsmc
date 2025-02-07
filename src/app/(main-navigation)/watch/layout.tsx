import { PageDefaultContentWrapper } from "@/components/molecules/page-default-content-wrapper";
import { PageTitle } from "@/components/molecules/page-title";
import type { PropsWithChildren } from "react";
import { Filters } from "./filters";

const WatchLayout = async ({ children }: PropsWithChildren) => {
  return (
    <div>
      <PageTitle>{"Choose a movie to watch"}</PageTitle>
      {/*  filters */}
      <Filters />
      {/*  results */}
      <PageDefaultContentWrapper className="mt-10 gap-3">
        {children}
      </PageDefaultContentWrapper>
    </div>
  );
};

export default WatchLayout;
