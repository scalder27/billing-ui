import { expect } from "chai";

import { skipLines, createLog } from "../../../helpers/Logger/utils";

describe("Logger utils.js", () => {
    describe("skipLines", () => {
        it("должен выкидывать из текста заданное кол-во строчек", () => {
            const text1 = [
                "раз линия",
                "два линия",
                "три линия",
                "четыре линия"
            ].join("\n");

            const result1 = skipLines(2, text1);
            expect(result1).to.equal("три линия\nчетыре линия");

            const text2 = [
                "раз линия",
                "два линия",
                "!"
            ].join("\n");

            const result2 = skipLines(2, text2);
            expect(result2).to.equal("!");
        });

        it("должен удалить строки даже если строка единственная или последняя", () => {
            const text1 = "раз линия";
            const result1 = skipLines(2, text1);
            expect(result1).to.equal("");

            const text2 = "раз линия \n два линия";
            const result2 = skipLines(2, text2);
            expect(result2).to.equal("");
        });

        it("должен вернуть тот же текст если пропустили 0 линий", () => {
            const text = "раз линия \n два линия";
            const result2 = skipLines(0, text);
            expect(result2).to.equal(text);
        });
    });

    describe("createLog", () => {
        it("должен создать лог", () => {
            const logLevel = "logLevel";
            const result = createLog(logLevel, ["так быть не должно! Data: ", { hey: "hey!" }]);
            expect(result).to.have.all.keys("level", "location", "stackTrace", "message", "timestamp");
        });
    });
});
