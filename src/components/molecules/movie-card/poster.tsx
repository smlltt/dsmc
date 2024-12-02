import { RiCloseCircleLine } from "react-icons/ri";

export const Poster = ({ url }: { url: string | null }): JSX.Element => (
  <div className="flex h-full w-32">
    {url ? (
      <img
        className="relative"
        src={`https://image.tmdb.org/t/p/original${url}`}
        alt="poster"
      />
    ) : (
      <div className="flex h-full w-full items-center justify-center bg-slate-500">
        <RiCloseCircleLine size={32} className="text-slate-400" />
      </div>
    )}
  </div>
);
