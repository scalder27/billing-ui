import { expect } from "chai";
import freeze from "deep-freeze";
import { addValueByKey, justConstants, enumInfoMapper } from "../../helpers/ObjectHelpers";

describe("Object helper", () => {
    describe("object helper addValueByKey ", () => {
        it("should add key and value to passed object", () => {
            const actual = addValueByKey("key", "value", {});
            expect(actual).to.deep.equal({ key: "value" });
        });

        it("should mutate passed object", () => {
            const passedObject = {};
            const actual = addValueByKey("key", "value", passedObject);
            expect(actual).to.equal(passedObject);
        });
    });

    describe("object helper justConstants ", () => {
        it("should filter keys that not a constant", () => {
            const testObject = freeze({ key: "value", KEY: "VALUE", KEY_CONST: 2 });
            const expectedObject = { KEY: "VALUE", KEY_CONST: 2 };

            const actual = justConstants(testObject);
            expect(actual).to.deep.equal(expectedObject);
        });
    });

    describe("object description creator", () => {
        it("should return proper description", () => {
            const initialObject = {
                Test: "Test",
                Mock: "Mock"
            };
            const testDescription = "testDescription";
            const mockDescription = "mockDescription";
            initialObject.getDescription = enumInfoMapper({
                [initialObject.Test]: testDescription,
                [initialObject.Mock]: mockDescription
            });

            const actualTestDescription = initialObject.getDescription(initialObject.Test);
            const actualMockDescription = initialObject.getDescription(initialObject.Mock);

            expect(actualTestDescription).to.equal(testDescription);
            expect(actualMockDescription).to.equal(mockDescription);
        });
    });
});
