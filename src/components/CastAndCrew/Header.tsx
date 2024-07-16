import { PageTitle } from "src/components/PageTitle";

export function Header(): JSX.Element {
  return (
    <>
      <PageTitle className="text-center">Cast & Crew</PageTitle>
      <div className="spacer-y-2" />
      <q className="block text-center text-subtle">
        Round up the usual suspects.
      </q>
    </>
  );
}
