"use client";

import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  type ChangeEvent,
  type JSX,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useDebounce } from "use-debounce";

export const SEARCH_QUERY_KEY = "search";

export const MovieSearchInput = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchText, setSerchText] = useState(
    searchParams.get(SEARCH_QUERY_KEY) || "",
  );
  const [debouncedValue] = useDebounce(searchText, 500);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSerchText(e.target.value);
  }, []);

  useEffect(() => {
    if (debouncedValue) {
      router.push(
        `${pathname}?${new URLSearchParams({ [SEARCH_QUERY_KEY]: debouncedValue })}`,
      );
    } else {
      router.push(pathname);
    }
  }, [debouncedValue, pathname, router]);

  return (
    <Input placeholder="Add a movie" value={searchText} onChange={onChange} />
  );
};
