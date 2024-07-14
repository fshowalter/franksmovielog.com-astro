import { NavListItems } from "./NavListItems";
import { SiteSearchForm } from "./SiteSearchForm";

export function Mast({ currentPath }: { currentPath: string }) {
  return (
    <header className="border-bottom px-pageMargin bg-default desktop:sticky desktop:top-4 desktop:z-40 desktop:flex-row desktop:flex-wrap desktop:justify-between desktop:py-8 desktop:text-left flex flex-col items-center gap-6 py-6 text-center">
      <div className="items-inherit justify-items-inherit flex flex-col">
        <h1
          className="whitespace-nowrap font-normal leading-8"
          style={{ fontSize: "1.5625rem" }}
        >
          <a className="text-default" href="/">
            Frank&apos;s Movie Log
          </a>
        </h1>
        <p
          className={"text-muted desktop:pl-px w-full text-sm italic leading-4"}
        >
          My life at the movies.
        </p>
      </div>
      <div className="desktop:w-auto max:order-4 w-full max-w-prose">
        <SiteSearchForm />
      </div>
      <nav className="max:w-auto w-full">
        <ul className="tablet:gap-x-6 text-accent desktop:justify-start flex flex-wrap justify-center gap-x-4 gap-y-2">
          <NavListItems
            activeClassName="text-muted"
            currentPath={currentPath}
          />
        </ul>
      </nav>
    </header>
  );
}
