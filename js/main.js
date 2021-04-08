import {footer} from "./footer.js"
import {header} from "./header.js"
import {section} from "./section.js"

webix.ui({
    id: "main ui",
    rows: [
        header,
        section,
        footer
    ]
});
