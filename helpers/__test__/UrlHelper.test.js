import freeze from "deep-freeze";
import { getUrlWithQuery } from "../UrlHelper";

describe("generate url with query parameters", () => {
    it("should generate query with all parameters", () => {
        const initUrl = "/controller/action";
        const initParams = freeze({
            documentId: "documentId1",
            billId: "billId2"
        });
        const expectedUrl = "/controller/action?documentId=documentId1&billId=billId2";

        const actual = getUrlWithQuery(initUrl, initParams);
        expect(actual).toEqual(expectedUrl);
    });

    it("should return raw url if no parameters sent", () => {
        const initUrl = "/controller/action";
        const initParams = freeze({});
        const expectedUrl = "/controller/action";

        const actual = getUrlWithQuery(initUrl, initParams);
        expect(actual).toEqual(expectedUrl);
    });
});
