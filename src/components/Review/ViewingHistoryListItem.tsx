import type { Review } from "src/api/reviews";
import { DateIcon } from "src/components/DateIcon";
import { RenderedMarkdown } from "src/components/RenderedMarkdown";

type Viewing = Review["viewings"][0];

const dateFormat = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

function Date({ date }: { date: Date }) {
  return (
    <>
      <span className="inline-block text-default">
        {dateFormat.format(date)}
      </span>{" "}
    </>
  );
}

function Medium({ viewing }: { viewing: Viewing }) {
  if (!viewing.medium) {
    return null;
  }
  return (
    <span className="font-light text-muted">
      <span>via</span> <span>{viewing.medium}</span>
    </span>
  );
}

function MediumNotes({ viewing }: { viewing: Viewing }) {
  if (!viewing.mediumNotes) {
    return null;
  }
  return (
    <span className="text-sm font-light leading-none text-subtle">
      (
      <RenderedMarkdown
        // eslint-disable-next-line react/no-danger
        text={viewing.mediumNotes}
        className="text-sm leading-none"
        as="span"
      />
      )
    </span>
  );
}

function VenueNotes({ viewing }: { viewing: Viewing }) {
  if (!viewing.venueNotes) {
    return null;
  }
  return (
    <span className="text-sm font-light leading-none text-subtle">
      (
      <RenderedMarkdown
        // eslint-disable-next-line react/no-danger
        text={viewing.venueNotes}
        as="span"
        className="text-sm leading-none"
      />
      )
    </span>
  );
}

function Venue({ viewing }: { viewing: Viewing }) {
  if (!viewing.venue) {
    return null;
  }
  return (
    <span className="font-light text-subtle">
      <span>at</span> <span>{viewing.venue}</span>
    </span>
  );
}

function ViewingNotes({ viewing }: { viewing: Viewing }) {
  if (!viewing.viewingNotes) {
    return null;
  }
  return (
    <div className="pb-6">
      <RenderedMarkdown
        className="leading-normal text-default"
        // eslint-disable-next-line react/no-danger
        text={viewing.viewingNotes}
      />
    </div>
  );
}

export function ViewingHistoryListItem({ viewing }: { viewing: Viewing }) {
  return (
    <li className="flex flex-col px-gutter even:bg-subtle">
      <div className="flex gap-x-[1ch] py-4">
        <div className="h-5 w-4">
          <DateIcon className="mt-1 w-4" />{" "}
        </div>
        <div className="grow">
          <Date date={viewing.date} />
          <Medium viewing={viewing} /> <MediumNotes viewing={viewing} />
          <Venue viewing={viewing} /> <VenueNotes viewing={viewing} />
        </div>
      </div>
      <div>
        <ViewingNotes viewing={viewing} />
      </div>
    </li>
  );
}
