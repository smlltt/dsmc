"use client";

import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  type ChangeEvent,
  type JSX,
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { useDebounce } from "use-debounce";
import { Spinner } from "../ui/spinner";

export const SEARCH_QUERY_KEY = "search";

export const MovieSearchInput = (): JSX.Element => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchText, setSerchText] = useState(
    searchParams.get(SEARCH_QUERY_KEY) || "",
  );
  const [debouncedValue] = useDebounce(searchText, 300);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSerchText(e.target.value);
  }, []);

  const isFirstRender = useRef(true);
  useEffect(() => {
    if (!isFirstRender.current) {
      startTransition(() => {
        if (debouncedValue) {
          router.replace(
            `${pathname}?${new URLSearchParams({ [SEARCH_QUERY_KEY]: debouncedValue })}`,
          );
        } else {
          router.replace(pathname);
        }
      });
    }
    isFirstRender.current = false;
  }, [debouncedValue, pathname, router]);

  return (
    <div className="relative">
      <Input placeholder="Add a movie" value={searchText} onChange={onChange} />
      {isPending && <Spinner className="absolute top-2.5 right-2.5" />}
    </div>
  );
};
