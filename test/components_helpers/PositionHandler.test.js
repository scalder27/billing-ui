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

        it("getPosition снизу", () => {
            let position = getPosition(PositionType.bottomLeft, target, tooltip);
            expect(position).to.deep.equal({
                left: "-25px",
                top: "45px"
            });

            position = getPosition(PositionType.bottomCenter, target, tooltip);
            expect(position).to.deep.equal({
                top: "45px",
                left: "-90px"
            });

            position = getPosition(PositionType.bottomRight, target, tooltip);
            expect(position).to.deep.equal({
                top: "45px",
                left: "-160px"
            });
        });

        it("getPosition сверху", () => {
            let position = getPosition(PositionType.topLeft, target, tooltip);
            expect(position).to.deep.equal({
                top: "-165px",
                left: "-25px"
            });

            position = getPosition(PositionType.topCenter, target, tooltip);
            expect(position).to.deep.equal({
                top: "-165px",
                left: "-90px"
            });

            position = getPosition(PositionType.topRight, target, tooltip);
            expect(position).to.deep.equal({
                top: "-165px",
                left: "-160px"
            });
        });

        it("getPosition справа", () => {
            let position = getPosition(PositionType.rightTop, target, tooltip);
            expect(position).to.deep.equal({
                top: "-15px",
                left: "35px"
            });

            position = getPosition(PositionType.rightMiddle, target, tooltip);
            expect(position).to.deep.equal({
                top: "-60px",
                left: "35px"
            });

            position = getPosition(PositionType.rightBottom, target, tooltip);
            expect(position).to.deep.equal({
                top: "-105px",
                left: "35px"
            });
        });

        it("getPosition слева", () => {
            let position = getPosition(PositionType.leftTop, target, tooltip);
            expect(position).to.deep.equal({
                top: "-15px",
                left: "-215px"
            });

            position = getPosition(PositionType.leftMiddle, target, tooltip);
            expect(position).to.deep.equal({
                top: "-60px",
                left: "-215px"
            });

            position = getPosition(PositionType.leftBottom, target, tooltip);
            expect(position).to.deep.equal({
                top: "-105px",
                left: "-215px"
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

            let positionType = getPositionType(PositionType.bottomLeft, target, tooltip, 15, mainWrapper);
            expect(positionType).to.equal(PositionType.topLeft);

            positionType = getPositionType(PositionType.leftTop, target, tooltip, 15, mainWrapper);
            expect(positionType).to.equal(PositionType.leftBottom);

            positionType = getPositionType(PositionType.leftMiddle, target, tooltip, 15, mainWrapper);
            expect(positionType).to.equal(PositionType.leftBottom);

            positionType = getPositionType(PositionType.rightTop, target, tooltip, 15, mainWrapper);
            expect(positionType).to.equal(PositionType.rightBottom);

            positionType = getPositionType(PositionType.rightMiddle, target, tooltip, 15, mainWrapper);
            expect(positionType).to.equal(PositionType.rightBottom);
        });

        it("getPositionType не поместился вверх", () => {
            positionTarget.top = 0;
            positionTarget.left = 700;

            let positionType = getPositionType(PositionType.topLeft, target, tooltip, 15, mainWrapper);
            expect(positionType).to.equal(PositionType.bottomLeft);

            positionType = getPositionType(PositionType.leftBottom, target, tooltip, 15, mainWrapper);
            expect(positionType).to.equal(PositionType.leftTop);

            positionType = getPositionType(PositionType.leftMiddle, target, tooltip, 15, mainWrapper);
            expect(positionType).to.equal(PositionType.leftTop);

            positionType = getPositionType(PositionType.rightBottom, target, tooltip, 15, mainWrapper);
            expect(positionType).to.equal(PositionType.rightTop);

            positionType = getPositionType(PositionType.rightMiddle, target, tooltip, 15, mainWrapper);
            expect(positionType).to.equal(PositionType.rightTop);
        });

        it("getPositionType не поместился слева", () => {
            positionTarget.top = 300;
            positionTarget.left = 0;

            let positionType = getPositionType(PositionType.leftTop, target, tooltip, 15, mainWrapper);
            expect(positionType).to.equal(PositionType.rightTop);

            positionType = getPositionType(PositionType.topRight, target, tooltip, 15, mainWrapper);
            expect(positionType).to.equal(PositionType.topLeft);

            positionType = getPositionType(PositionType.topCenter, target, tooltip, 15, mainWrapper);
            expect(positionType).to.equal(PositionType.topLeft);

            positionType = getPositionType(PositionType.bottomRight, target, tooltip, 15, mainWrapper);
            expect(positionType).to.equal(PositionType.bottomLeft);

            positionType = getPositionType(PositionType.bottomCenter, target, tooltip, 15, mainWrapper);
            expect(positionType).to.equal(PositionType.bottomLeft);
        });

        it("getPositionType не поместился справа", () => {
            positionTarget.top = 300;
            positionTarget.left = 1200;

            let positionType = getPositionType(PositionType.rightTop, target, tooltip, 15, mainWrapper);
            expect(positionType).to.equal(PositionType.leftTop);

            positionType = getPositionType(PositionType.topLeft, target, tooltip, 15, mainWrapper);
            expect(positionType).to.equal(PositionType.topRight);

            positionType = getPositionType(PositionType.topCenter, target, tooltip, 15, mainWrapper);
            expect(positionType).to.equal(PositionType.topRight);

            positionType = getPositionType(PositionType.bottomLeft, target, tooltip, 15, mainWrapper);
            expect(positionType).to.equal(PositionType.bottomRight);

            positionType = getPositionType(PositionType.bottomCenter, target, tooltip, 15, mainWrapper);
            expect(positionType).to.equal(PositionType.bottomRight);
        });
    });
});
