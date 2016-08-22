import { expect } from "chai";
import {
    getPosition,
    getPositionType,
    MARGIN,
    ARROW_RIGHT_MARGIN,
    ARROW_LEFT_MARGIN,
    ARROW_VERTICAL_MARGIN,
    ARROW_HEIGHT
} from "../../components/Tooltip/PositionHandler.js";
import PositionType from "../../components/Tooltip/PositionType";
import TooltipType from "../../components/Tooltip/TooltipType";

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
            let position = getPosition(PositionType.bottomLeft, target, tooltip, TooltipType.tip);
            expect(position).to.deep.equal({
                left: "-25px",
                top: "45px"
            });

            position = getPosition(PositionType.bottomCenter, target, tooltip, TooltipType.tip);
            expect(position).to.deep.equal({
                top: "45px",
                left: "-90px"
            });

            position = getPosition(PositionType.bottomRight, target, tooltip, TooltipType.tip);
            expect(position).to.deep.equal({
                top: "45px",
                left: "-160px"
            });
        });

        it("getPosition сверху", () => {
            let position = getPosition(PositionType.topLeft, target, tooltip, TooltipType.tip);
            expect(position).to.deep.equal({
                top: "-165px",
                left: "-25px"
            });

            position = getPosition(PositionType.topCenter, target, tooltip, TooltipType.tip);
            expect(position).to.deep.equal({
                top: "-165px",
                left: "-90px"
            });

            position = getPosition(PositionType.topRight, target, tooltip, TooltipType.tip);
            expect(position).to.deep.equal({
                top: "-165px",
                left: "-160px"
            });
        });

        it("getPosition справа", () => {
            let position = getPosition(PositionType.rightTop, target, tooltip, TooltipType.tip);
            expect(position).to.deep.equal({
                top: "-15px",
                left: "35px"
            });

            position = getPosition(PositionType.rightMiddle, target, tooltip, TooltipType.tip);
            expect(position).to.deep.equal({
                top: "-60px",
                left: "35px"
            });

            position = getPosition(PositionType.rightBottom, target, tooltip, TooltipType.tip);
            expect(position).to.deep.equal({
                top: "-105px",
                left: "35px"
            });
        });

        it("getPosition слева", () => {
            let position = getPosition(PositionType.leftTop, target, tooltip, TooltipType.tip);
            expect(position).to.deep.equal({
                top: "-15px",
                left: "-215px"
            });

            position = getPosition(PositionType.leftMiddle, target, tooltip, TooltipType.tip);
            expect(position).to.deep.equal({
                top: "-60px",
                left: "-215px"
            });

            position = getPosition(PositionType.leftBottom, target, tooltip, TooltipType.tip);
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

        it("getPositionType не поместился вниз с типом tip", () => {
            positionTarget.top = 700;
            positionTarget.left = 700;

            positionTarget.top = mainWrapper.clientHeight - positionTarget.height - tooltip.offsetHeight - MARGIN + 1;
            let positionType = getPositionType(PositionType.bottomLeft, target, tooltip, TooltipType.tip, mainWrapper);
            expect(positionType).to.equal(PositionType.topLeft);

            positionTarget.top = mainWrapper.clientHeight - positionTarget.height / 2 - tooltip.offsetHeight + ARROW_VERTICAL_MARGIN + ARROW_HEIGHT + 1;
            positionType = getPositionType(PositionType.leftTop, target, tooltip, TooltipType.tip, mainWrapper);
            expect(positionType).to.equal(PositionType.leftBottom);

            positionTarget.top = mainWrapper.clientHeight - positionTarget.height / 2 - tooltip.offsetHeight / 2 + 1;
            positionType = getPositionType(PositionType.leftMiddle, target, tooltip, TooltipType.tip, mainWrapper);
            expect(positionType).to.equal(PositionType.leftBottom);

            positionTarget.top = mainWrapper.clientHeight - positionTarget.height / 2 - tooltip.offsetHeight + ARROW_VERTICAL_MARGIN + ARROW_HEIGHT + 1;
            positionType = getPositionType(PositionType.rightTop, target, tooltip, TooltipType.tip, mainWrapper);
            expect(positionType).to.equal(PositionType.rightBottom);

            positionTarget.top = mainWrapper.clientHeight - positionTarget.height / 2 - tooltip.offsetHeight / 2 + 1;
            positionType = getPositionType(PositionType.rightMiddle, target, tooltip, TooltipType.tip, mainWrapper);
            expect(positionType).to.equal(PositionType.rightBottom);
        });

        it("getPositionType не поместился вниз c типом validation", () => {
            positionTarget.left = 700;

            positionTarget.top = mainWrapper.clientHeight - positionTarget.height - tooltip.offsetHeight + 1 + 1;
            let positionType = getPositionType(PositionType.bottomLeft, target, tooltip, TooltipType.validation, mainWrapper);
            expect(positionType).to.equal(PositionType.topLeft);

            positionTarget.top = mainWrapper.clientHeight - positionTarget.height - tooltip.offsetHeight + ARROW_VERTICAL_MARGIN + ARROW_HEIGHT + 1;
            positionType = getPositionType(PositionType.leftTop, target, tooltip, TooltipType.validation, mainWrapper);
            expect(positionType).to.equal(PositionType.leftBottom);

            positionTarget.top = mainWrapper.clientHeight - positionTarget.height - tooltip.offsetHeight / 2 + 1;
            positionType = getPositionType(PositionType.leftMiddle, target, tooltip, TooltipType.validation, mainWrapper);
            expect(positionType).to.equal(PositionType.leftBottom);

            positionTarget.top = mainWrapper.clientHeight - positionTarget.height - tooltip.offsetHeight + ARROW_VERTICAL_MARGIN + ARROW_HEIGHT + 1;
            positionType = getPositionType(PositionType.rightTop, target, tooltip, TooltipType.validation, mainWrapper);
            expect(positionType).to.equal(PositionType.rightBottom);

            positionTarget.top = mainWrapper.clientHeight - positionTarget.height - tooltip.offsetHeight / 2 + 1;
            positionType = getPositionType(PositionType.rightMiddle, target, tooltip, TooltipType.validation, mainWrapper);
            expect(positionType).to.equal(PositionType.rightBottom);
        });

        it("getPositionType не поместился вверх с типом tip", () => {
            positionTarget.top = 0;
            positionTarget.left = 700;

            positionTarget.top = tooltip.offsetHeight + MARGIN - 1;
            let positionType = getPositionType(PositionType.topLeft, target, tooltip, TooltipType.tip, mainWrapper);
            expect(positionType).to.equal(PositionType.bottomLeft);

            positionTarget.top = tooltip.offsetHeight - ARROW_VERTICAL_MARGIN - ARROW_HEIGHT - positionTarget.height / 2 - 1;
            positionType = getPositionType(PositionType.leftBottom, target, tooltip, TooltipType.tip, mainWrapper);
            expect(positionType).to.equal(PositionType.leftTop);

            positionTarget.top = tooltip.offsetHeight / 2 - positionTarget.height / 2 - 1;
            positionType = getPositionType(PositionType.leftMiddle, target, tooltip, TooltipType.tip, mainWrapper);
            expect(positionType).to.equal(PositionType.leftTop);

            positionTarget.top = tooltip.offsetHeight - ARROW_VERTICAL_MARGIN - ARROW_HEIGHT - positionTarget.height / 2 - 1;
            positionType = getPositionType(PositionType.rightBottom, target, tooltip, TooltipType.tip, mainWrapper);
            expect(positionType).to.equal(PositionType.rightTop);

            positionTarget.top = tooltip.offsetHeight / 2 - positionTarget.height / 2 - 1;
            positionType = getPositionType(PositionType.rightMiddle, target, tooltip, TooltipType.tip, mainWrapper);
            expect(positionType).to.equal(PositionType.rightTop);
        });

        it("getPositionType не поместился вверх с типом validation", () => {
            positionTarget.top = 0;
            positionTarget.left = 700;

            positionTarget.top = tooltip.offsetHeight + MARGIN - 1;
            let positionType = getPositionType(PositionType.topLeft, target, tooltip, TooltipType.validation, mainWrapper);
            expect(positionType).to.equal(PositionType.bottomLeft);

            positionTarget.top = tooltip.offsetHeight - ARROW_VERTICAL_MARGIN - ARROW_HEIGHT - positionTarget.height - 1;
            positionType = getPositionType(PositionType.leftBottom, target, tooltip, TooltipType.validation, mainWrapper);
            expect(positionType).to.equal(PositionType.leftTop);

            positionTarget.top = tooltip.offsetHeight / 2 - positionTarget.height - 1;
            positionType = getPositionType(PositionType.leftMiddle, target, tooltip, TooltipType.validation, mainWrapper);
            expect(positionType).to.equal(PositionType.leftTop);

            positionTarget.top = tooltip.offsetHeight - ARROW_VERTICAL_MARGIN - ARROW_HEIGHT - positionTarget.height - 1;
            positionType = getPositionType(PositionType.rightBottom, target, tooltip, TooltipType.validation, mainWrapper);
            expect(positionType).to.equal(PositionType.rightTop);

            positionTarget.top = tooltip.offsetHeight / 2 - positionTarget.height - 1;
            positionType = getPositionType(PositionType.rightMiddle, target, tooltip, TooltipType.validation, mainWrapper);
            expect(positionType).to.equal(PositionType.rightTop);
        });

        it("getPositionType не поместился слева с типом tip", () => {
            positionTarget.top = 300;
            positionTarget.left = 0;

            positionTarget.left = tooltip.offsetWidth + MARGIN - 1;
            let positionType = getPositionType(PositionType.leftTop, target, tooltip, TooltipType.tip, mainWrapper);
            expect(positionType).to.equal(PositionType.rightTop);

            positionTarget.left = tooltip.offsetWidth - ARROW_RIGHT_MARGIN - positionTarget.width - 1;
            positionType = getPositionType(PositionType.topRight, target, tooltip, TooltipType.tip, mainWrapper);
            expect(positionType).to.equal(PositionType.topLeft);

            positionTarget.left = tooltip.offsetWidth / 2 - positionTarget.width / 2 - 1;
            positionType = getPositionType(PositionType.topCenter, target, tooltip, TooltipType.tip, mainWrapper);
            expect(positionType).to.equal(PositionType.topLeft);

            positionTarget.left = tooltip.offsetWidth - ARROW_LEFT_MARGIN - positionTarget.width - 1;
            positionType = getPositionType(PositionType.bottomRight, target, tooltip, TooltipType.tip, mainWrapper);
            expect(positionType).to.equal(PositionType.bottomLeft);

            positionTarget.left = tooltip.offsetWidth / 2 - positionTarget.width / 2 - 1;
            positionType = getPositionType(PositionType.bottomCenter, target, tooltip, TooltipType.tip, mainWrapper);
            expect(positionType).to.equal(PositionType.bottomLeft);
        });

        it("getPositionType не поместился слева c типом validation", () => {
            positionTarget.top = 300;
            positionTarget.left = 0;

            positionTarget.left = tooltip.offsetWidth + ARROW_HEIGHT - 1;
            let positionType = getPositionType(PositionType.leftTop, target, tooltip, TooltipType.validation, mainWrapper);
            expect(positionType).to.equal(PositionType.rightTop);

            positionTarget.left = tooltip.offsetWidth - positionTarget.width - 1;
            positionType = getPositionType(PositionType.topRight, target, tooltip, TooltipType.validation, mainWrapper);
            expect(positionType).to.equal(PositionType.topLeft);

            positionTarget.left = tooltip.offsetWidth / 2 - positionTarget.width / 2 - 1;
            positionType = getPositionType(PositionType.topCenter, target, tooltip, TooltipType.validation, mainWrapper);
            expect(positionType).to.equal(PositionType.topLeft);

            positionTarget.left = tooltip.offsetWidth - positionTarget.width - 1;
            positionType = getPositionType(PositionType.bottomRight, target, tooltip, TooltipType.validation, mainWrapper);
            expect(positionType).to.equal(PositionType.bottomLeft);

            positionTarget.left = tooltip.offsetWidth / 2 - positionTarget.width / 2 - 1;
            positionType = getPositionType(PositionType.bottomCenter, target, tooltip, TooltipType.validation, mainWrapper);
            expect(positionType).to.equal(PositionType.bottomLeft);
        });

        it("getPositionType не поместился справа с типом tip", () => {
            positionTarget.top = 300;
            positionTarget.left = 1200;

            positionTarget.left = mainWrapper.clientWidth - tooltip.offsetWidth - MARGIN - positionTarget.width + 1;
            let positionType = getPositionType(PositionType.rightTop, target, tooltip, TooltipType.tip, mainWrapper);
            expect(positionType).to.equal(PositionType.leftTop);

            positionTarget.left = mainWrapper.clientWidth - tooltip.offsetWidth + ARROW_LEFT_MARGIN + 1;
            positionType = getPositionType(PositionType.topLeft, target, tooltip, TooltipType.tip, mainWrapper);
            expect(positionType).to.equal(PositionType.topRight);

            positionTarget.left = mainWrapper.clientWidth - tooltip.offsetWidth / 2 - positionTarget.width / 2 + 1;
            positionType = getPositionType(PositionType.topCenter, target, tooltip, TooltipType.tip, mainWrapper);
            expect(positionType).to.equal(PositionType.topRight);

            positionTarget.left = mainWrapper.clientWidth - tooltip.offsetWidth + ARROW_LEFT_MARGIN + 1;
            positionType = getPositionType(PositionType.bottomLeft, target, tooltip, TooltipType.tip, mainWrapper);
            expect(positionType).to.equal(PositionType.bottomRight);

            positionTarget.left = mainWrapper.clientWidth - tooltip.offsetWidth / 2 - positionTarget.width / 2 + 1;
            positionType = getPositionType(PositionType.bottomCenter, target, tooltip, TooltipType.tip, mainWrapper);
            expect(positionType).to.equal(PositionType.bottomRight);
        });

        it("getPositionType не поместился справа c типом validation", () => {
            positionTarget.top = 300;
            positionTarget.left = 1200;

            positionTarget.left = mainWrapper.clientWidth - tooltip.offsetWidth - ARROW_HEIGHT - positionTarget.width + 1;
            let positionType = getPositionType(PositionType.rightTop, target, tooltip, TooltipType.validation, mainWrapper);
            expect(positionType).to.equal(PositionType.leftTop);

            positionTarget.left = mainWrapper.clientWidth - tooltip.offsetWidth + 1;
            positionType = getPositionType(PositionType.topLeft, target, tooltip, TooltipType.validation, mainWrapper);
            expect(positionType).to.equal(PositionType.topRight);

            positionTarget.left = mainWrapper.clientWidth - tooltip.offsetWidth / 2 - positionTarget.width / 2 + 1;
            positionType = getPositionType(PositionType.topCenter, target, tooltip, TooltipType.validation, mainWrapper);
            expect(positionType).to.equal(PositionType.topRight);

            positionTarget.left = mainWrapper.clientWidth - tooltip.offsetWidth + 1;
            positionType = getPositionType(PositionType.bottomLeft, target, tooltip, TooltipType.validation, mainWrapper);
            expect(positionType).to.equal(PositionType.bottomRight);

            positionTarget.left = mainWrapper.clientWidth - tooltip.offsetWidth / 2 - positionTarget.width / 2 + 1;
            positionType = getPositionType(PositionType.bottomCenter, target, tooltip, TooltipType.validation, mainWrapper);
            expect(positionType).to.equal(PositionType.bottomRight);
        });
    });
});
