export function ListItemGenres({
  genres,
}: {
  genres: readonly string[];
}): JSX.Element | null {
  return (
    <div className="text-subtle tracking-0.5px text-sm leading-4">
      {genres.map((genre, index) => {
        if (index === 0) {
          return <span key={genre}>{genre}</span>;
        }

        return <span key={genre}> | {genre}</span>;
      })}
    </div>
  );
}
