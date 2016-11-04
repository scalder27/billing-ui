import { storiesOf, action } from "@kadira/storybook";
import { boolean } from "@kadira/storybook-addon-knobs";
import { CheckboxWrapper } from "./CheckboxWrapper";

storiesOf("Checkbox", module)
    .add("main", () => (
        <CheckboxWrapper checked={boolean("checked", true)}
                         disabled={boolean("disabled", false)}
                         readonly={boolean("readonly", false)}
                         onChange={action("changed")}
        />
    ));
