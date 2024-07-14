import { NavListItems } from "./NavListItems";

export function Footer({ currentPath }: { currentPath: string }): JSX.Element {
  return (
    <footer
      className={
        "px-pageMargin bg-notcomingsoon text-inverse flex flex-col items-center gap-y-6 py-8"
      }
    >
      <ul className="tablet:gap-x-6 text-inverse max:w-auto flex w-full flex-wrap justify-center gap-x-4 gap-y-2">
        <NavListItems
          activeClassName="text-inverse"
          currentPath={currentPath}
        />
      </ul>
      <p className="text-sm font-light leading-4">
        All stills used in accordance with the{" "}
        <a
          href="http://www.copyright.gov/title17/92chap1.html#107"
          className="text-inherit"
        >
          Fair Use Law.
        </a>
      </p>
      <a href="#top" className="sr-only">
        To the top ↑
      </a>
    </footer>
  );
}
