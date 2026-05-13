import { describe, it, expect } from "vitest";
import { cn } from "../utils";

describe("cn", () => {
  it("should merge multiple class names", () => {
    expect(cn("text-red-500", "bg-blue-500")).toBe("text-red-500 bg-blue-500");
  });

  it("should handle conditional classes in an object", () => {
    expect(cn("text-red-500", { "bg-blue-500": true, "underline": false })).toBe(
      "text-red-500 bg-blue-500"
    );
  });

  it("should handle conditional classes in an array", () => {
    expect(cn(["text-red-500", "bg-blue-500"])).toBe("text-red-500 bg-blue-500");
  });

  it("should filter out falsy values", () => {
    expect(cn("text-red-500", undefined, null, false, "", "bg-blue-500")).toBe(
      "text-red-500 bg-blue-500"
    );
  });

  it("should merge conflicting tailwind classes correctly using twMerge", () => {
    // p-4 should override p-2
    expect(cn("p-2", "p-4")).toBe("p-4");

    // px-2 py-2 p-4: p-4 overrides px-2 and py-2
    expect(cn("px-2 py-2", "p-4")).toBe("p-4");

    // text-red-500 text-blue-500: text-blue-500 overrides text-red-500
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });

  it("should handle complex nested structures", () => {
    expect(
      cn("base-class", [
        "nested-class",
        { "conditional-true": true, "conditional-false": false },
      ], "another-base")
    ).toBe("base-class nested-class conditional-true another-base");
  });
});
