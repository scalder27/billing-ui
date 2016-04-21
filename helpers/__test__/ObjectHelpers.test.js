import freeze from "deep-freeze";
import { addValueByKey, justConstants } from "../ObjectHelpers";

describe("object helper addValueByKey ", () => {
    it("should add key and value to passed object", () => {
        const actual = addValueByKey("key", "value", {});
        expect(actual).toEqual({ key: "value" });
    });

    it("should mutate passed object", () => {
        const passedObject = {};
        const actual = addValueByKey("key", "value", passedObject);
        expect(actual).toBe(passedObject);
    });
});

describe("object helper justConstants ", () => {
    it("should filter keys that not a constant", () => {
        const testObject = freeze({ key: "value", KEY: "VALUE", KEY_CONST: 2 });
        const expectedObject = { KEY: "VALUE", KEY_CONST: 2 };

        const actual = justConstants(testObject);
        expect(actual).toEqual(expectedObject);
    });
});
