import { render, screen } from "@testing-library/react";

// Example component test
function ExampleComponent({ text }: { text: string }) {
  return <div>{text}</div>;
}

describe("Example Test", () => {
  it("should render text", () => {
    render(<ExampleComponent text="Hello World" />);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("should pass simple assertion", () => {
    expect(1 + 1).toBe(2);
  });
});
