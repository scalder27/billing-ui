import { configure, setAddon, addDecorator } from '@kadira/storybook';
import infoAddon from "@kadira/react-storybook-addon-info";
import { withKnobs } from "@kadira/storybook-addon-knobs";
import backgrounds from "react-storybook-addon-backgrounds";

setAddon(infoAddon);

addDecorator(story => <div style={{ padding: "20px" }}>{story()}</div>);
addDecorator(withKnobs);
addDecorator(backgrounds([
    { name: "main", value: "#ffffff", default: true },
    { name: "menu", value: "#8e3b4b" },
    { name: "info", value: "#ffeccd" },
    { name: "error", value: "#ffaa9d" },
    { name: "body", value: "#e8e8e8" }
]));

const req = require.context("../stories", true, /.stories.js$/);

configure(() => {
    req.keys().forEach((filename) => req(filename));
}, module);
