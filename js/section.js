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
    id: "filmsTable",
    autoConfig: true,
    scroll: "y",
    data: small_film_set
};

function addNewFilm(){

    if($$(form.id).validate()){
        let item = $$(form.id).getValues();
        $$(dataTable.id).add(item)
    }
}

function clearForm(){
    $$(form.id).clear()
}

const formButtons = {
    margin: 10,
    cols:[
        { 
            view: "button", 
            value: "Add new",
            css: "webix_primary",
            click: addNewFilm
            
        },
        { 
            view: "button", 
            value: "Clear",
            click: clearForm
        },
    ]
};

const form = {
    view: "form",
    id: 'filmForm',
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
            label: "Title",
            name: "title"
        },
        { 
            view: "text",
            label: "Year",
            name: "year"
        },
        { 
            view: "text",
            label: "Rating",
            name: "rating"
        },
        { 
            view: "text",
            label: "Votes",
            name: "votes"
        },
        formButtons,
        {}
    ],
    rules:{
        title: webix.rules.isNotEmpty,
        year: function(value){
            return value > 1970 && value < new Date().getFullYear()
        },
        rating: function(value){
            return webix.rules.isNotEmpty && value != 0
        },
        votes: function(value){
            return value < 100000
        }

    }
};

export const section = {
    cols: [
       sideBar,
      { view: "resizer" },
       dataTable,
       form
    ]
}