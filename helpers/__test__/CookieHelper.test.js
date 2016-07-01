import freeze from "deep-freeze";
import cookie from "../Cookie";

describe("cookie helper", () => {
    it("should generate valid cookie string with expires seconds", () => {
        const expires = 3600;
        const str = cookie._generateCookieString("billy", "test", { expires: expires });
        let date = new Date();
        date.setTime(date.getTime() + expires * 1000);

        expect(str).toBe(`billy=%22test%22; expires=${date.toUTCString()}`);
    });

    it("should generate valid cookie string with expires date object", () => {
        const date = freeze(new Date());
        const str = cookie._generateCookieString("billy", "test", { expires: date });

        expect(str).toBe(`billy=%22test%22; expires=${date.toUTCString()}`);
    });

    it("should generate valid cookie string with different options", () => {
        const date = new Date();
        const str = cookie._generateCookieString("billy", "test", {
            expires: date,
            path: "/newpath",
            domain: "example.com",
            secure: true
        });

        expect(str).toBe(`billy=%22test%22; expires=${date.toUTCString()}; path=/newpath; domain=example.com; secure`);
    });

    it("should throw error on null value", () => {
        expect(() => { cookie.set("billy", null) }).toThrow(new Error("Invalid value passed: null"));
    });

    it("should throw error on undefined value", () => {
        expect(() => { cookie.set("billy", undefined) }).toThrow(new Error("Invalid value passed: undefined"));
    });

    it("should save and get cookie", () => {
        cookie.set("billy", "hi");
        const result = cookie.get("billy");
        expect(result).toBe("hi");
    });

    it("should save an object", () => {
        cookie.set("billy:2.0", { a: [ 1, 2, "hello" ]});
        const result = cookie.get("billy:2.0");
        expect(result).toEqual({ a: [ 1, 2, "hello" ]});
    });

    it("should delete cookie", () => {
        cookie.set("billy", "hi");
        cookie.delete("billy");
        const result = cookie.get("billy");
        expect(result).toBeUndefined();
    });

    it("should throw error on invalid type key", () => {
        expect(() => { cookie.set([1], "1") }).toThrow(new Error("Cookie key should be a string"));
        expect(() => { cookie.get([1]) }).toThrow(new Error("Cookie key should be a string"));
        expect(() => { cookie.delete([1]) }).toThrow(new Error("Cookie key should be a string"));
    });

    it("should throw error on invalid string key", () => {
        const patternString = "hello regexp \=\.\f\d\\\\\dseth:]})\\sd";
        const patternKey = "regexp \=\.\f\d\\\\\dseth:]})\\sd";
        cookie.set(patternKey, patternString);
        expect(() => { cookie.get(patternKey) }).toThrowError();
    });
});
