import { PageDefaultContentWrapper } from "@/components/molecules/page-default-content-wrapper";
import { PageTitle } from "@/components/molecules/page-title";
import type { PropsWithChildren } from "react";

export default async ({ children }: PropsWithChildren) => {
  return (
    <div>
      <PageTitle>{"Movies added by your friends"}</PageTitle>
      <PageDefaultContentWrapper className="mt-10 gap-4">
        {children}
      </PageDefaultContentWrapper>
    </div>
  );
};
