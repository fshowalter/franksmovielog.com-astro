import { PageTitle } from "src/components/PageTitle";

export function Header(): JSX.Element {
  return (
    <header className="flex flex-col items-center gap-x-8 px-pageMargin">
      <PageTitle className="pt-6 leading-none desktop:pt-8">
        Watchlist Progress
      </PageTitle>
      <div className="spacer-y-2" />
      <q className="text-subtle">I find your lack of faith disturbing.</q>
      <div className="spacer-y-8" />
      <p className="text-subtle">
        My progress working through{" "}
        <a href="/watchlist/">my movie-review bucketlist</a>.
      </p>
    </header>
  );
}
