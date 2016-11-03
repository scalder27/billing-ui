import React from "react";
import { storiesOf, action } from "@kadira/storybook";
import { withKnobs, text, boolean, number, object } from "@kadira/storybook-addon-knobs";

import "./../../src/css/icon-fonts.scss";
import { TextInputWrapper } from "./TextInputWrapper";

storiesOf("TextInput", module)
    .add("main", () => (
        <TextInputWrapper value={text("value", "hello")}
                          onChange={action("changed")}
                          clearable={boolean("clearable", false)}
                          placeholder={text("placeholder", "если есть в кармане пачка")}
                          readonly={boolean("readonly", false)}
                          width={number("width", 400)}
                          height={number("height", undefined)}
                          styles={object("styles", undefined)}
        />
    ));
