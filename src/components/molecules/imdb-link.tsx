import Image from "next/image";
import Link from "next/link";

export const ImdbLink = ({ imdbId }: { imdbId: string }) => (
  <Link
    className="shrink-0"
    target="_blank"
    href={`https://www.imdb.com/title/${imdbId}`}
  >
    <Image alt="imdb" width={64} height={32} src="/image/imdb.png" />
  </Link>
);
