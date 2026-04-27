import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "../test-utils";
import PostcodeSelect from "../../components/PostcodeSelect";

describe("PostcodeSelect", () => {
  it("shows the correct label", () => {
    render(<PostcodeSelect postcode="CT12EH" onPostcodeChange={() => {}} />);

    expect(
      screen.getByRole("combobox", { name: /choose uk postcode/i }),
    ).toBeInTheDocument();
  });

  it("calls onPostcodeChange when user chooses a postcode", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <PostcodeSelect postcode="CT12EH" onPostcodeChange={handleChange} />,
    );

    await user.click(
      screen.getByRole("combobox", { name: /choose uk postcode/i }),
    );

    await user.click(await screen.findByRole("option", { name: "BS1 4DJ" }));

    expect(handleChange).toHaveBeenCalledWith("BS14DJ");
  });
});
