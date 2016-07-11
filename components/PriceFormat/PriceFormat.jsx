import { PropTypes } from "react";
import iconType from "../Icon";
import specialCharacters from "../SpecialCharacters";
import { priceFormatHelper } from "../../helpers/PriceHelper";

const CurrencySymbol = () => (
    <span className="currency-ruble">
        {`${specialCharacters.NonBreakingSpace}${iconType.Ruble}`}
    </span>
);

const PriceFormat = ({amount, hasCurrencySymbol, fractionSeparator, alwaysWithFraction}) => (
    <span className="base-priceFormat">
        { priceFormatHelper(amount, {fractionSeparator, alwaysWithFraction}).replace(/ /g, "\u00a0") }
        { hasCurrencySymbol && <CurrencySymbol /> }
    </span>
);

PriceFormat.propTypes = {
    amount: PropTypes.number.isRequired,
    hasCurrencySymbol: PropTypes.bool,
    fractionSeparator: PropTypes.string,
    alwaysWithFraction: PropTypes.bool
};

PriceFormat.defaultProps = {
    hasCurrencySymbol: false,
    fractionSeparator: ".",
    alwaysWithFraction: false
};

export default PriceFormat;
