import { Fieldset } from "./Fieldset";

export function ListWithFiltersLayout({
  header,
  filters,
  list,
}: {
  header: React.ReactNode;
  filters: React.ReactNode;
  list: React.ReactNode;
}): JSX.Element {
  return (
    <div className="flex flex-col items-center">
      <main className="flex w-full max-w-prose flex-col items-stretch gap-x-24 desktop:max-w-full desktop:flex-row desktop:px-pageMargin">
        <div className="flex basis-md flex-col items-center gap-y-8 px-gutter pt-8 desktop:px-0">
          <div className="flex flex-col items-center">{header}</div>
          <Fieldset
            legend="Filter & Sort"
            className="desktop:sticky desktop:top-[208px] desktop:self-start max:top-[160px]"
          >
            {filters}
          </Fieldset>
        </div>
        <div className="flex grow flex-col">
          <div className="h-0 min-h-0 desktop:h-8 desktop:min-h-8" />
          {list}
        </div>
      </main>
    </div>
  );
}
