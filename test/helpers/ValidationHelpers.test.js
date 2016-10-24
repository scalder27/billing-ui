import { expect } from "chai";
import Validation from "../../helpers/ValidationHelpers";

describe("ValidationHelpers", () => {
    const commonErrorMessage = "hello world";

    describe("Email", () => {
        it("should set passed error message", () => {
            expect(Validation.Email(commonErrorMessage)("").error).to.equal(commonErrorMessage);
        });

        it("should set isValid = true", () => {
            expect(Validation.Email()("").isValid).to.be.true;
            expect(Validation.Email()("emailWithNumb3rs@example.com").isValid).to.be.true;
            expect(Validation.Email()("Кириллический@Домен.рф").isValid).to.be.true;
        });

        it("should set isValid = false", () => {
            expect(Validation.Email()("hello%bad@email#yep").isValid).to.be.false;
        });
    });

    describe("Phone", () => {
        it("should set passed error message", () => {
            expect(Validation.Phone(commonErrorMessage)("").error).to.equal(commonErrorMessage);
        });

        it("should set isValid = true", () => {
            expect(Validation.Phone()("").isValid).to.be.true;
            expect(Validation.Phone()("+7 950 11-11-111").isValid).to.be.true;
            expect(Validation.Phone()("8 (343) 310 10 10").isValid).to.be.true;
        });

        it("should set isValid = false", () => {
            expect(Validation.Phone()("+7 95O 11-11-111").isValid).to.be.false;
        });
    });

    describe("Required", () => {
        it("should set passed error message", () => {
            expect(Validation.Required(commonErrorMessage)("").error).to.equal(commonErrorMessage);
        });

        it("should set isValid = true", () => {
            expect(Validation.Required()(commonErrorMessage).isValid).to.be.true;
        });

        it("should set isValid = false", () => {
            expect(Validation.Required()("").isValid).to.be.false;
        });
    });

    describe("StringMinLength", () => {
        it("should set passed error message", () => {
            expect(Validation.StringMinLength(2, commonErrorMessage)("").error).to.equal(commonErrorMessage);
        });

        it("should set isValid = true", () => {
            expect(Validation.StringMinLength(2)(commonErrorMessage).isValid).to.be.true;
        });

        it("should set isValid = false", () => {
            expect(Validation.StringMinLength(50)(commonErrorMessage).isValid).to.be.false;
        });
    });

    describe("StringMaxLength", () => {
        it("should set passed error message", () => {
            expect(Validation.StringMaxLength(2, commonErrorMessage)("").error).to.equal(commonErrorMessage);
        });

        it("should set isValid = true", () => {
            expect(Validation.StringMaxLength(50)(commonErrorMessage).isValid).to.be.true;
        });

        it("should set isValid = false", () => {
            expect(Validation.StringMaxLength(5)(commonErrorMessage).isValid).to.be.false;
        });
    });

    describe("Kpp", () => {
        it("should set passed error message", () => {
            expect(Validation.Kpp(commonErrorMessage)("").error).to.equal(commonErrorMessage);
        });

        it("should set isValid = true", () => {
            expect(Validation.Kpp()("").isValid).to.be.true;
            expect(Validation.Kpp()("123456789").isValid).to.be.true;
        });

        it("should set isValid = false", () => {
            expect(Validation.Kpp()("123").isValid).to.be.false;
        });
    });

    describe("SettlementAccount", () => {
        it("should set passed error message", () => {
            expect(Validation.SettlementAccount(commonErrorMessage)("").error).to.equal(commonErrorMessage);
        });

        it("should set isValid = true", () => {
            expect(Validation.SettlementAccount()("").isValid).to.be.true;
            expect(Validation.SettlementAccount()("12345678901234567890").isValid).to.be.true;
        });

        it("should set isValid = false", () => {
            expect(Validation.SettlementAccount()("123").isValid).to.be.false;
        });
    });

    describe("Anything", () => {
        it("should set isValid = true", () => {
            expect(Validation.Anything()("").isValid).to.be.true;
            expect(Validation.Anything()("123").isValid).to.be.true;
            expect(Validation.Anything()("abc").isValid).to.be.true;
        });
    });
});
