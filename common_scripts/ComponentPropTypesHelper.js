import React from "react";

export const customChildrenPropTypes =  (props, propName, componentName, customType) => {
    var prop = props[propName];
    React.Children.forEach(prop, (child) => {
        if (child.type !== customType) {
            throw Error(`Invalid child type: ${child.type.name}. All children must be instances of ${componentName}.`);
        }
    });
};
