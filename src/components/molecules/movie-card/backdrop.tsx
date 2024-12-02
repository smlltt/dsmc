export const Backdrop = ({ url }: { url: string | null }): JSX.Element => (
  <>
    {url && (
      <>
        <img
          className="absolute top-0 right-0 left-0 z-0 sm:hidden"
          src={`https://image.tmdb.org/t/p/original${url}`}
          alt="poster"
        />
        <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent via-background to-background sm:hidden" />
      </>
    )}
  </>
);
