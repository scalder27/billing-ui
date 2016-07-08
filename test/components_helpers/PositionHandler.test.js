import { expect } from "chai";
import { getPosition, getPositionType } from "../../components/Tooltip/PositionHandler.js";
import PositionType from "../../components/Tooltip/PositionType";

describe("Position handler", () => {
    describe("getPosition", () => {
        const target = {
            getBoundingClientRect: () => {
                return {
                    top: 300,
                    left: 700,
                    width: 20,
                    height: 30
                }
            }
        };

        const tooltip = {
            offsetWidth: 200,
            offsetHeight: 150
        };

        const mainWrapper = {
            scrollTop: 0,
            scrollLeft: 0
        };

        it("getPosition снизу", () => {
            let position = getPosition(PositionType.bottomLeft, target, tooltip, mainWrapper);
            expect(position).to.deep.equal({
                top: "345px",
                left: "675px"
            });

            position = getPosition(PositionType.bottomCenter, target, tooltip, mainWrapper);
            expect(position).to.deep.equal({
                top: "345px",
                left: "610px"
            });

            position = getPosition(PositionType.bottomRight, target, tooltip, mainWrapper);
            expect(position).to.deep.equal({
                top: "345px",
                left: "540px"
            });
        });

        it("getPosition сверху", () => {
            let position = getPosition(PositionType.topLeft, target, tooltip, mainWrapper);
            expect(position).to.deep.equal({
                top: "135px",
                left: "675px"
            });


            position = getPosition(PositionType.topCenter, target, tooltip, mainWrapper);
            expect(position).to.deep.equal({
                top: "135px",
                left: "610px"
            });

            position = getPosition(PositionType.topRight, target, tooltip, mainWrapper);
            expect(position).to.deep.equal({
                top: "135px",
                left: "540px"
            });
        });

        it("getPosition справа", () => {
            let position = getPosition(PositionType.rightTop, target, tooltip, mainWrapper);
            expect(position).to.deep.equal({
                top: "285px",
                left: "735px"
            });

            position = getPosition(PositionType.rightMiddle, target, tooltip, mainWrapper);
            expect(position).to.deep.equal({
                top: "240px",
                left: "735px"
            });

            position = getPosition(PositionType.rightBottom, target, tooltip, mainWrapper);
            expect(position).to.deep.equal({
                top: "195px",
                left: "735px"
            });
        });

        it("getPosition слева", () => {
            let position = getPosition(PositionType.leftTop, target, tooltip, mainWrapper);
            expect(position).to.deep.equal({
                top: "285px",
                left: "485px"
            });


            position = getPosition(PositionType.leftMiddle, target, tooltip, mainWrapper);
            expect(position).to.deep.equal({
                top: "240px",
                left: "485px"
            });

            position = getPosition(PositionType.leftBottom, target, tooltip, mainWrapper);
            expect(position).to.deep.equal({
                top: "195px",
                left: "485px"
            });
        });
    });

    describe("getPositionType", () => {
        let positionTarget = {
            top: 300,
            left: 700,
            width: 20,
            height: 30
        };

        let target = {
            getBoundingClientRect: () => positionTarget
        };

        let tooltip = {
            offsetWidth: 200,
            offsetHeight: 150
        };

        let mainWrapper = {
            scrollTop: 0,
            scrollLeft: 0,
            clientWidth: 1200,
            clientHeight: 700
        };

        it("getPositionType не поместился вниз", () => {
            positionTarget.top = 700;
            positionTarget.left = 700;

            let positionType = getPositionType(PositionType.bottomLeft, target, tooltip, mainWrapper);
            expect(positionType).to.equal(PositionType.topLeft);

            positionType = getPositionType(PositionType.leftTop, target, tooltip, mainWrapper);
            expect(positionType).to.equal(PositionType.leftBottom);

            positionType = getPositionType(PositionType.leftMiddle, target, tooltip, mainWrapper);
            expect(positionType).to.equal(PositionType.leftBottom);

            positionType = getPositionType(PositionType.rightTop, target, tooltip, mainWrapper);
            expect(positionType).to.equal(PositionType.rightBottom);

            positionType = getPositionType(PositionType.rightMiddle, target, tooltip, mainWrapper);
            expect(positionType).to.equal(PositionType.rightBottom);
        });

        it("getPositionType не поместился вверх", () => {
            positionTarget.top = 0;
            positionTarget.left = 700;

            let positionType = getPositionType(PositionType.topLeft, target, tooltip, mainWrapper);
            expect(positionType).to.equal(PositionType.bottomLeft);

            positionType = getPositionType(PositionType.leftBottom, target, tooltip, mainWrapper);
            expect(positionType).to.equal(PositionType.leftTop);

            positionType = getPositionType(PositionType.leftMiddle, target, tooltip, mainWrapper);
            expect(positionType).to.equal(PositionType.leftTop);

            positionType = getPositionType(PositionType.rightBottom, target, tooltip, mainWrapper);
            expect(positionType).to.equal(PositionType.rightTop);

            positionType = getPositionType(PositionType.rightMiddle, target, tooltip, mainWrapper);
            expect(positionType).to.equal(PositionType.rightTop);
        });

        it("getPositionType не поместился слева", () => {
            positionTarget.top = 300;
            positionTarget.left = 0;

            let positionType = getPositionType(PositionType.leftTop, target, tooltip, mainWrapper);
            expect(positionType).to.equal(PositionType.rightTop);

            positionType = getPositionType(PositionType.topRight, target, tooltip, mainWrapper);
            expect(positionType).to.equal(PositionType.topLeft);

            positionType = getPositionType(PositionType.topCenter, target, tooltip, mainWrapper);
            expect(positionType).to.equal(PositionType.topLeft);

            positionType = getPositionType(PositionType.bottomRight, target, tooltip, mainWrapper);
            expect(positionType).to.equal(PositionType.bottomLeft);

            positionType = getPositionType(PositionType.bottomCenter, target, tooltip, mainWrapper);
            expect(positionType).to.equal(PositionType.bottomLeft);
        });

        it("getPositionType не поместился справа", () => {
            positionTarget.top = 300;
            positionTarget.left = 1200;

            let positionType = getPositionType(PositionType.rightTop, target, tooltip, mainWrapper);
            expect(positionType).to.equal(PositionType.leftTop);

            positionType = getPositionType(PositionType.topLeft, target, tooltip, mainWrapper);
            expect(positionType).to.equal(PositionType.topRight);

            positionType = getPositionType(PositionType.topCenter, target, tooltip, mainWrapper);
            expect(positionType).to.equal(PositionType.topRight);

            positionType = getPositionType(PositionType.bottomLeft, target, tooltip, mainWrapper);
            expect(positionType).to.equal(PositionType.bottomRight);

            positionType = getPositionType(PositionType.bottomCenter, target, tooltip, mainWrapper);
            expect(positionType).to.equal(PositionType.bottomRight);
        });
    });
});
