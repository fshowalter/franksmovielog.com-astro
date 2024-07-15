import type { PosterImageData } from "src/api/posters";
import { ListItem } from "./ListItem";
import { ListItemMediumAndVenue } from "./ListItemMediumAndVenue";
import { ListItemPoster } from "./ListItemPoster";
import { ListItemTitle } from "./ListItemTitle";
import { StatHeading } from "./StatHeading";

interface ViewingListItemData {
  sequence: number;
  date: string;
  venue: string | null;
  medium: string | null;
  title: string;
  year: string;
  slug: string | null;
}

export interface MostWatchedPeopleListItemData {
  name: string;
  slug: string | null;
  count: number;
  viewings: ViewingListItemData[];
}

export function MostWatchedPeople({
  people,
  header,
  posters,
}: {
  header: string;
  people: readonly MostWatchedPeopleListItemData[];
  posters: Record<string, PosterImageData>;
}): JSX.Element | null {
  if (people.length == 0) {
    return null;
  }

  return (
    <section className="shadow-all">
      <StatHeading>{header}</StatHeading>
      <header className="sticky top-10 z-30 flex justify-between bg-default px-gutter font-bold leading-[calc(2.5rem_-_2px)] desktop:top-[calc(160px_+_2.5rem)] max:top-[calc(128px_+_2.5rem)]">
        <span className="text-left leading-10">Name</span>
        <span className="text-right leading-10">Viewings</span>
      </header>
      <ol>
        {people.map((person, index) => {
          return (
            <li key={person.name} className="block">
              <div
                style={{ zIndex: 1 + index }}
                className="sticky top-20 grid w-full grid-cols-[auto_1fr_calc(6ch_+_var(--gutter-width))] bg-stripe px-gutter leading-10 desktop:top-[calc(160px_+_5rem)] max:top-[calc(128px_+_5rem)]"
              >
                <span className="leading-10">
                  <Name data={person} />
                </span>
                <span className="leading-10">&nbsp;</span>
                <span className="bg-stripe text-right leading-10">
                  {person.count}
                </span>
              </div>
              <div className="col-start-1 col-end-4 leading-10">
                <details>
                  <summary className="px-gutter tracking-0.25px text-subtle">
                    Details
                  </summary>
                  <ol className="tablet:px-gutter">
                    {person.viewings.map((viewing) => {
                      return (
                        <MostWatchedPersonViewingListItem
                          key={viewing.sequence}
                          viewing={viewing}
                          imageData={posters[viewing.slug || "default"]!}
                        />
                      );
                    })}
                  </ol>
                </details>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function Name({ data }: { data: MostWatchedPeopleListItemData }): JSX.Element {
  if (data.slug) {
    return <a href={`/cast-and-crew/${data.slug}/`}>{data.name}</a>;
  }

  return <>{data.name}</>;
}

function MostWatchedPersonViewingListItem({
  viewing,
  imageData,
}: {
  viewing: ViewingListItemData;
  imageData: PosterImageData;
}) {
  return (
    <ListItem className="items-center">
      <ListItemPoster
        slug={viewing.slug}
        title={viewing.title}
        year={viewing.year}
        imageData={imageData}
      />
      <div className="grow">
        <div>
          <ListItemTitle
            title={viewing.title}
            year={viewing.year}
            slug={viewing.slug}
          />
          <div className="spacer-y-1 tablet:spacer-y-2" />
        </div>
        <div className="flex flex-col text-sm font-light tracking-0.5px text-subtle">
          <div className="spacer-y-1 tablet:spacer-y-0" />
          <div>
            {viewing.date}
            <div className="spacer-y-2" />
            <ListItemMediumAndVenue
              medium={viewing.medium}
              venue={viewing.venue}
            />
          </div>
        </div>
        <div className="spacer-y-2" />
      </div>
    </ListItem>
  );
}
