import { act, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Collections, getData } from "./";

const props = await getData();

describe("Collections", () => {
  it("can filter by name", async () => {
    expect.hasAssertions();

    render(<Collections {...props} />);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await userEvent.type(screen.getByLabelText("Name"), "Friday the 13th");
      await new Promise((r) => setTimeout(r, 500));
    });

    expect(screen.getByTestId("list")).toMatchSnapshot();
  });

  it("can sort by name desc", async () => {
    expect.hasAssertions();

    render(<Collections {...props} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Name (Z → A)",
    );

    expect(screen.getByTestId("list")).toMatchSnapshot();
  });

  it("can sort by name asc", async () => {
    expect.hasAssertions();

    render(<Collections {...props} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Name (A → Z)",
    );

    expect(screen.getByTestId("list")).toMatchSnapshot();
  });

  it("can sort by title count desc", async () => {
    expect.hasAssertions();

    render(<Collections {...props} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Title Count (Most First)",
    );

    expect(screen.getByTestId("list")).toMatchSnapshot();
  });

  it("can sort by title count asc", async () => {
    expect.hasAssertions();

    render(<Collections {...props} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Title Count (Fewest First)",
    );

    expect(screen.getByTestId("list")).toMatchSnapshot();
  });

  it("can sort by review count desc", async () => {
    expect.hasAssertions();

    render(<Collections {...props} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Review Count (Most First)",
    );

    expect(screen.getByTestId("list")).toMatchSnapshot();
  });

  it("can sort by review count asc", async () => {
    expect.hasAssertions();

    render(<Collections {...props} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Review Count (Fewest First)",
    );

    expect(screen.getByTestId("list")).toMatchSnapshot();
  });
});
