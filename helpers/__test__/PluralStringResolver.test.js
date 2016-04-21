import { resolveString } from "../PluralStringResolver.js";

describe("plural string resolver", () => {
    it("resolves string for 1", () => {
        expect(resolveString(1, ["1", "4", "5"])).toBe("1");
    });

    it("resolves string for 4", () => {
        expect(resolveString(4, ["1", "4", "5"])).toBe("4");
    });

    it("resolves string for 5", () => {
        expect(resolveString(5, ["1", "4", "5"])).toBe("5");
    })
});
