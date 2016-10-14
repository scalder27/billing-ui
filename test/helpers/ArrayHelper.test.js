import { expect } from "chai";
import freeze from "deep-freeze";
import { replaceByIndex, findIndex, findEntity, findIndexAndEntity, arrayReduceHelper, omitEntityByIndex } from "../../helpers/ArrayHelper";

describe("ArrayHelper", () => {
    describe("replace element by index", () => {
        it("should replace element", () => {
            const initArr = freeze([1, 2, "a", 4, 5]);

            const actual1 = replaceByIndex("b", 2, initArr);
            expect(actual1).to.deep.equal([1, 2, "b", 4, 5]);

            const actual2 = replaceByIndex("b", 0, initArr);
            expect(actual2).to.deep.equal(["b", 2, "a", 4, 5]);

            const actual3 = replaceByIndex("b", initArr.length - 1, initArr);
            expect(actual3).to.deep.equal([1, 2, "a", 4, "b"]);
        });

        it("should replace object element", () => {
            const initArr = freeze([1, 2, "a", 4, 5]);
            const expectedArr = [1, 2, {b: "b"}, 4, 5];

            const actual = replaceByIndex({b: "b"}, 2, initArr);

            expect(actual).to.deep.equal(expectedArr);
        });

        it("should not modify array if element index inconsistent", () => {
            const initArr = freeze([1, 2, "a", 4, 5]);

            const actual1 = replaceByIndex("b", 23, initArr);
            expect(actual1).to.equal(initArr);

            const actual2 = replaceByIndex("b", -1, initArr);
            expect(actual2).to.equal(initArr);

            const actual3 = replaceByIndex("b", initArr.length, initArr);
            expect(actual3).to.equal(initArr);
        });
    });

    describe("omit entity by index ", () => {
        it("it should omit array element by index", () => {
            const initialArray = freeze([ 1, 2, 3, 4, 5]);
            const expectedArray = [1, 2, 4, 5];

            const actual = omitEntityByIndex(2, initialArray);
            expect(actual).to.deep.equal(expectedArray);
        });
    });

    describe("find index by predicate", () => {
        it("should find index in array", () => {
            const initArr = freeze([1, 2, "a", 4, 5]);
            const expectedResult = 2;

            const actual = findIndex(item => item === "a", initArr);
            expect(actual).to.equal(expectedResult);
        });

        it("should find index in string", () => {
            const initString = "12a45";
            const expectedResult = 2;

            const actual = findIndex(item => item === "a", initString);
            expect(actual).to.equal(expectedResult);
        });
    });

    describe("find entity", () => {
        const initArr = freeze([1, 2, "a", 4, 5]);

        it("should find element and return it", () => {
            const expectedEntity = "a";

            const actualEntity = findEntity(item => item === "a", initArr);
            expect(actualEntity).to.equal(expectedEntity);
        });

        it("should return null if element couldn't be found", () => {
            const expectedEntity = null;

            const actualEntity = findEntity(item => item === "c", initArr);
            expect(actualEntity).to.equal(expectedEntity);
        });
    });

    describe("find index and entity", () => {
        const initArr = freeze([1, 2, "a", 4, 5]);

        it("should find element and return index and element", () => {
            const expectedIndex = 2;
            const expectedEntity = "a";

            const [ actualIndex, actualEntity ] = findIndexAndEntity(item => item === "a", initArr);
            expect(actualIndex).to.equal(expectedIndex);
            expect(actualEntity).to.equal(expectedEntity);
        });

        it("should return negative index and null if element couldn't be found", () => {
            const expectedIndex = -1;
            const expectedEntity = null;

            const [ actualIndex, actualEntity ] = findIndexAndEntity(item => item === "c", initArr);
            expect(actualIndex).to.equal(expectedIndex);
            expect(actualEntity).to.equal(expectedEntity);
        });
    });

    describe("array reduce helper", () => {
        const initArr = freeze([1, 2, "a", 4, 5]);
        const action = { type: "ANY", payload: "b" };
        const reducer = (state, { type, payload }) => {
            if (type === "ANY") {
                return payload;
            }

            return state;
        };

        it("should find element and bypass it to reducer", () => {
            const expectedState = freeze([1, 2, "b", 4, 5]);

            const newState = arrayReduceHelper(
                el => el === "a",
                reducer,
                initArr,
                action
            );

            expect(newState).to.deep.equal(expectedState);
        });

        it("shouldn't modify bypassed array if element wasn't found", () => {
            const expectedState = freeze([1, 2, "a", 4, 5]);

            const newState = arrayReduceHelper(
                el => el === "c",
                reducer,
                initArr,
                action
            );

            expect(newState).to.deep.equal(expectedState);
        });

        it("shouldn't modify bypassed array if action type wasn't handled", () => {
            const expectedState = freeze([1, 2, "a", 4, 5]);

            const newState = arrayReduceHelper(
                el => el === "a",
                reducer,
                initArr,
                { type: "ANY_OTHER", payload: "b" }
            );

            expect(newState).to.deep.equal(expectedState);
        });
    });
});
