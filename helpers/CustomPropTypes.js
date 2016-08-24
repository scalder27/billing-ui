import React from "react";
import moment from "../libs/moment";

const required = handler => (props, propName, componentName) => {
    const prop = props[propName];
    if (prop === undefined) {
        throw Error(`Failed prop type: Invalid prop ${propName} supplied to ${componentName}. Prop ${propName} is required.`);
    }

    handler(prop, propName, componentName);
};

const CustomPropTypes = {
    children: (customType) => (props, propName, componentName) => {
        const prop = props[propName];
        React.Children.forEach(prop, (child) => {
            if (child.type !== customType) {
                throw Error(`Invalid child type: ${child.type.name}. All children must be instances of ${componentName}.`);
            }
        })
    },

    date: (props, propName, componentName) => {
        const date = props[propName];
        if (date && !moment(date, moment.ISO_8601).isValid()) {
            throw Error(`Failed prop type: Invalid prop ${propName} supplied to ${componentName}. Prop ${propName} must be in ISO format.`);
        }
    }
};

Object.keys(CustomPropTypes).forEach((propType) => {
    const handler = CustomPropTypes[propType];
    handler.isRequired = required(handler);
});

export default CustomPropTypes;
