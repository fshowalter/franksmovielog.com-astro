import { NavListItems } from "./NavListItems";
import { SiteSearchForm } from "./SiteSearchForm";

export function Mast({ currentPath }: { currentPath: string }) {
  return (
    <header className="flex flex-col items-center gap-6 bg-default px-pageMargin py-6 text-center shadow-bottom desktop:sticky desktop:top-4 desktop:z-40 desktop:flex-row desktop:flex-wrap desktop:justify-between desktop:py-8 desktop:text-left">
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
          className={"w-full text-sm italic leading-4 text-muted desktop:pl-px"}
        >
          My life at the movies.
        </p>
      </div>
      <div className="w-full max-w-prose desktop:w-auto max:order-4">
        <SiteSearchForm />
      </div>
      <nav className="w-full max:w-auto">
        <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-accent tablet:gap-x-6 desktop:justify-start">
          <NavListItems
            activeClassName="text-muted"
            currentPath={currentPath}
          />
        </ul>
      </nav>
    </header>
  );
}
