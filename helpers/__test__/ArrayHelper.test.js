import freeze from "deep-freeze";
import { replaceByIndex, findIndex, findIndexAndEntity, arrayReduceHelper, omitEntityByIndex } from "../ArrayHelper";

describe("replace element by index", () => {
    it("should replace element", () => {
        const initArr = freeze([1, 2, "a", 4, 5]);

        const actual1 = replaceByIndex("b", 2, initArr);
        expect(actual1).toEqual([1, 2, "b", 4, 5]);

        const actual2 = replaceByIndex("b", 0, initArr);
        expect(actual2).toEqual(["b", 2, "a", 4, 5]);

        const actual3 = replaceByIndex("b", initArr.length - 1, initArr);
        expect(actual3).toEqual([1, 2, "a", 4, "b"]);
    });

    it("should replace object element", () => {
        const initArr = freeze([1, 2, "a", 4, 5]);
        const expectedArr = [1, 2, {b: "b"}, 4, 5];

        const actual = replaceByIndex({b: "b"}, 2, initArr);

        expect(actual).toEqual(expectedArr);
    });

    it("should not modify array if element index inconsistent", () => {
        const initArr = freeze([1, 2, "a", 4, 5]);

        const actual1 = replaceByIndex("b", 23, initArr);
        expect(actual1).toBe(initArr);

        const actual2 = replaceByIndex("b", -1, initArr);
        expect(actual2).toBe(initArr);

        const actual3 = replaceByIndex("b", initArr.length, initArr);
        expect(actual3).toBe(initArr);
    });
});

describe("Array helper ", () => {
    it("it should omit array element by index", () => {
        const initialArray = freeze([ 1, 2, 3, 4, 5]);
        const expectedArray = [1, 2, 4, 5];

        const actual = omitEntityByIndex(2, initialArray);
        expect(actual).toEqual(expectedArray);
    });
});

describe("find index by predicate", () => {
    it("should find index in array", () => {
        const initArr = freeze([1, 2, "a", 4, 5]);
        const expectedResult = 2;

        const actual = findIndex(item => item === "a", initArr);
        expect(actual).toBe(expectedResult);
    });

    it("should find index in string", () => {
        const initString = "12a45";
        const expectedResult = 2;

        const actual = findIndex(item => item === "a", initString);
        expect(actual).toBe(expectedResult);
    });
});

describe("find index and entity", () => {
    const initArr = freeze([1, 2, "a", 4, 5]);

    it("should find element and return index and element", () => {
        const expectedIndex = 2;
        const expectedEntity = "a";

        const [ actualIndex, actualEntity ] = findIndexAndEntity(item => item === "a", initArr);
        expect(actualIndex).toBe(expectedIndex);
        expect(actualEntity).toBe(expectedEntity);
    });

    it("should return negative index and null if element couldn't be found", () => {
        const expectedIndex = -1;
        const expectedEntity = null;

        const [ actualIndex, actualEntity ] = findIndexAndEntity(item => item === "c", initArr);
        expect(actualIndex).toBe(expectedIndex);
        expect(actualEntity).toBe(expectedEntity);
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

        expect(newState).toEqual(expectedState);
    });

    it("shouldn't modify bypassed array if element wasn't found", () => {
        const expectedState = freeze([1, 2, "a", 4, 5]);

        const newState = arrayReduceHelper(
                el => el === "c",
                reducer,
                initArr,
                action
            );

        expect(newState).toEqual(expectedState);
    });

    it("shouldn't modify bypassed array if action type wasn't handled", () => {
        const expectedState = freeze([1, 2, "a", 4, 5]);

        const newState = arrayReduceHelper(
                el => el === "a",
                reducer,
                initArr,
                { type: "ANY_OTHER", payload: "b" }
            );

        expect(newState).toEqual(expectedState);
    });
});
