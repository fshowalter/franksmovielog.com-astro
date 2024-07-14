import Link from "next/link";
import { PageTitle } from "@/components/PageTitle";

export function Header(): JSX.Element {
  return (
    <>
      <div className="text-center">
        <Link href="/reviews/">Reviews</Link>
      </div>
      <PageTitle className="text-center">Underseen Gems</PageTitle>
      <div className="spacer-y-2" />
      <div className="text-subtle">
        <q className="block text-center text-subtle">
          My God, it&apos;s full of stars!
        </q>
        <div className="spacer-y-8" />
      </div>
      <p className="max-w-80 text-subtle">
        Four and five star movies with a below average number of IMDb votes.
      </p>
    </>
  );
}
