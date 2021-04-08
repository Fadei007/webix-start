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

    const filmForm = $$(form.id);

    if(filmForm.validate()){

        // Protection from XSS 
        const title =  filmForm.elements.title;
        const value = title.getValue();
        const safeValue = webix.template.escape(value);
        title.setValue(safeValue);


        const item = filmForm.getValues();
        $$(dataTable.id).add(item);

        webix.message({
            text: "Validation is succsessful",
            type: "success",
            expire: 1000
        });
    }
};

function clearForm(){
    
    webix.confirm({
        title: "Form cleaning",
        text: "Do you realy want to clean up the form?"
    }).then(
        function(){
            $$(form.id).clear();
            $$(form.id).clearValidation();
        }
    )
};

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
    id: "filmForm",
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
            name: "title",
            invalidMessage: "Enter the title of the movie"
        },
        { 
            view: "text",
            label: "Year",
            name: "year",
            invalidMessage: `Year isn't between 1970 - ${new Date().getFullYear()}`
        },
        { 
            view: "text",
            label: "Rating",
            name: "rating",
            invalidMessage: "Rating cannot be empty or 0"
        },
        { 
            view: "text",
            label: "Votes",
            name: "votes",
            invalidMessage: "Votes must be less than 100000"
        },
        formButtons,
        {}
    ],
    rules:{
        title: function(value){
            return webix.rules.isNotEmpty(value) ;
        },
        year: function(value){
            return value >= 1970 && value <= new Date().getFullYear() && webix.rules.isNumber(value);
        },
        rating: function(value){
            return webix.rules.isNotEmpty(value) && value != 0 && webix.rules.isNumber(value);
        },
        votes: function(value){
            return value < 100000 && webix.rules.isNumber(value);
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