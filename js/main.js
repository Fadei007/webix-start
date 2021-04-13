import {footer} from "./footer.js";
import {header} from "./header.js";
import {section} from "./section.js";
import {categories} from "./data-collections/collections.js";

webix.ui({
    rows: [
        header,
        section,
        footer
    ]
});


$$("categoriesTable").sync(categories);
$$("categoryForm").bind($$("categoriesTable"));
