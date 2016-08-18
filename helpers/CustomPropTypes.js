import React from "react";
import moment from "../libs/moment";

const CustomPropTypes = {
    children: (customType) => (props, propName, componentName) => {
        var prop = props[propName];
        React.Children.forEach(prop, (child) => {
            if (child.type !== customType) {
                throw Error(`Invalid child type: ${child.type.name}. All children must be instances of ${componentName}.`);
            }
        })
    },

    date: (props, propName, componentName) => {
        var date = props[propName];
        if (!moment(date, moment.ISO_8601).isValid()) {
            throw Error(`Failed prop type: Invalid prop ${propName} supplied to ${componentName}. Prop ${propName} must be in ISO format.`);
        }
    }
};

export default CustomPropTypes;
