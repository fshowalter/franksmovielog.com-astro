import { act, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { CastAndCrew } from "./CastAndCrew";
import { getData } from "./getData";
import { expect, it, describe } from "vitest";

describe("CastAndCrew", () => {
  it("can filter by name", async () => {
    expect.hasAssertions();

    const props = await getData();

    render(<CastAndCrew {...props} />);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await userEvent.type(screen.getByLabelText("Name"), "John Wayne");
      await new Promise((r) => setTimeout(r, 500));
    });

    expect(screen.getByTestId("list")).toMatchSnapshot();
  });

  it("can sort by name desc", async () => {
    expect.hasAssertions();

    const props = await getData();

    render(<CastAndCrew {...props} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Name (Z → A)",
    );

    expect(screen.getByTestId("list")).toMatchSnapshot();
  });

  it("can sort by name asc", async () => {
    expect.hasAssertions();

    const props = await getData();

    render(<CastAndCrew {...props} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Name (A → Z)",
    );

    expect(screen.getByTestId("list")).toMatchSnapshot();
  });

  it("can sort by title count desc", async () => {
    expect.hasAssertions();

    const props = await getData();

    render(<CastAndCrew {...props} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Title Count (Most First)",
    );

    expect(screen.getByTestId("list")).toMatchSnapshot();
  });

  it("can sort by title count asc", async () => {
    expect.hasAssertions();

    const props = await getData();

    render(<CastAndCrew {...props} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Title Count (Fewest First)",
    );

    expect(screen.getByTestId("list")).toMatchSnapshot();
  });

  it("can sort by review count desc", async () => {
    expect.hasAssertions();

    const props = await getData();

    render(<CastAndCrew {...props} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Review Count (Most First)",
    );

    expect(screen.getByTestId("list")).toMatchSnapshot();
  });

  it("can sort by review count asc", async () => {
    expect.hasAssertions();

    const props = await getData();

    render(<CastAndCrew {...props} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Review Count (Fewest First)",
    );

    expect(screen.getByTestId("list")).toMatchSnapshot();
  });

  it("can filter directors", async () => {
    expect.hasAssertions();

    const props = await getData();

    render(<CastAndCrew {...props} />);

    await userEvent.selectOptions(screen.getByLabelText("Credits"), "Director");

    expect(screen.getByTestId("list")).toMatchSnapshot();
  });

  it("can filter directors then show all", async () => {
    expect.hasAssertions();

    const props = await getData();

    render(<CastAndCrew {...props} />);

    await userEvent.selectOptions(screen.getByLabelText("Credits"), "Director");
    await userEvent.selectOptions(screen.getByLabelText("Credits"), "All");

    expect(screen.getByTestId("list")).toMatchSnapshot();
  });

  it("can filter writers", async () => {
    expect.hasAssertions();

    const props = await getData();

    render(<CastAndCrew {...props} />);

    await userEvent.selectOptions(screen.getByLabelText("Credits"), "Writer");

    expect(screen.getByTestId("list")).toMatchSnapshot();
  });

  it("can filter writers then show all", async () => {
    expect.hasAssertions();

    const props = await getData();

    render(<CastAndCrew {...props} />);

    await userEvent.selectOptions(screen.getByLabelText("Credits"), "Writer");
    await userEvent.selectOptions(screen.getByLabelText("Credits"), "All");

    expect(screen.getByTestId("list")).toMatchSnapshot();
  });

  it("can filter performers", async () => {
    expect.hasAssertions();

    const props = await getData();

    render(<CastAndCrew {...props} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Credits"),
      "Performer",
    );

    expect(screen.getByTestId("list")).toMatchSnapshot();
  });

  it("can filter performers then show all", async () => {
    expect.hasAssertions();

    const props = await getData();

    render(<CastAndCrew {...props} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Credits"),
      "Performer",
    );
    await userEvent.selectOptions(screen.getByLabelText("Credits"), "All");

    expect(screen.getByTestId("list")).toMatchSnapshot();
  });
});
