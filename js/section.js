import {small_film_set, sideBar_data } from "../data/testdata.js";

const sideBar = {
    rows: [
        {
            view: "sidebar",
            width: 200,
            css: "color-background list-color",
            data: sideBar_data
        },
        {
            
            view: "label",
            css: "color-background green-template",
            template: "<span  class=\"webix_icon wxi-check\">Connected<span>"
            
        }
    ]
};

const dataTable = {
    view: "datatable",
    autoConfig: true,
    scroll: "y",
    data: small_film_set
};

const formButtons = {
    margin: 10,
    cols:[
        { 
            view: "button", 
            value: "Add new",
            css: "webix_primary",
        },
        { 
            view: "button", 
            value: "Clear"
        },
    ]
};

const form = {
    view: "form",
    width: 300,
    scroll: false,
    elements: [
        {
            view: "template",
            template: "edit films",
            type: "section",
            css: "section-font-size"
        },
        { 
            view: "text",
            label: "Title"
        },
        { 
            view: "text",
            label: "Year"
        },
        { 
            view: "text",
            label: "Rating"
        },
        { 
            view: "text",
            label: "Votes"
        },
        formButtons
        
    ]
};



export const section = {
    cols: [
       sideBar,
      { view: "resizer" },
       dataTable,
       {
        view: "form",
        width: 300,
        scroll: false,
        elements: [
            {
                view: "template",
                template: "edit films",
                type: "section",
                css: "section-font-size"
            },
            { 
                view: "text",
                label: "Title"
            },
            { 
                view: "text",
                label: "Year"
            },
            { 
                view: "text",
                label: "Rating"
            },
            { 
                view: "text",
                label: "Votes"
            },
            formButtons,
            {}
        ]
       }
    ]
}