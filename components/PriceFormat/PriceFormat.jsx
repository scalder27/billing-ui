import { Component, PropTypes } from "react";
import iconType from "../Icon";
import specialCharacters from "../SpecialCharacters";
import { priceFormatter } from "./PriceFormatter";

const CurrencySymbol = () => (
    <span className="currency-ruble">
        {`${specialCharacters.NonBreakingSpace}${iconType.Ruble}`}
    </span>
);

const PriceFormat = ({amount, hasCurrencySymbol}) => (
    <span className="base-priceFormat">
        {priceFormatter(amount).replace(/ /g, "\u00a0")}
        { hasCurrencySymbol && <CurrencySymbol /> }
    </span>
);

PriceFormat.propTypes = {
    amount: PropTypes.number.isRequired,
    hasCurrencySymbol: PropTypes.bool
};

export default PriceFormat;
