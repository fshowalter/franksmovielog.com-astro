import { PageTitle } from "../PageTitle";

export function Header(): JSX.Element {
  return (
    <>
      <PageTitle className="text-center">Collections</PageTitle>
      <div className="spacer-y-2" />
      <q className="block text-center text-subtle">
        Okay ramblers, let&apos;s get rambling.
      </q>
    </>
  );
}
