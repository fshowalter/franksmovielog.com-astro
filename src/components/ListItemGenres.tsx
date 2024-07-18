export function ListItemGenres({
  genres,
}: {
  genres: readonly string[];
}): JSX.Element | null {
  return (
    <div className="text-sm leading-4 tracking-0.5px text-subtle">
      {genres.map((genre, index) => {
        if (index === 0) {
          return <span key={genre}>{genre}</span>;
        }

        return <span key={genre}> | {genre}</span>;
      })}
    </div>
  );
}
