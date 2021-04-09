import {small_film_set, sideBar_data } from "../data/testdata.js";

const sideBar = {
    rows: [
        {
            view: "sidebar",
            id: "sidebar",
            width: 200,
            css: "color-background list-color",
            data: sideBar_data,
            on: {
                onAfterSelect: function(id){

                    $$(id).show();
    
                }
            },
            ready: function(){

               this.select("dashboard");

            }

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
    scroll: "y",
    hover: "datatable-hover",
    leftSplit: 1,
    
    columns: [
        { id:"rank", header: "", css: "rank-background", css:"align-center", width: 50, sort: "int"},
        { id:"title", header: ["Film title", {content:"textFilter"}], sort: "string", fillspace: true},
        { id:"year", header: [{text:"Released", css:"align-center"}, {content:"textFilter"}], css:"align-center", sort: "int", width: 80},
        { id:"votes", header: [{text:"Votes", css:"align-center"},{content:"textFilter"}], css:"align-center", sort: "int", width: 80},
        { id:"rating", header: [{text:"Raiting", css:"align-center"}, {content:"textFilter"}], css:"align-center",sort: "int", width: 80},
        { id:"delete", header: "", template:"{common.trashIcon()}", width: 60}

    ],
    onClick: {
        "wxi-trash":function(e, id){
            this.remove(id);
              return false;
        }
    },
    url: "./data/data.js",
};


function addNewFilm(){

    const filmForm = $$("filmForm");

    if(filmForm.validate()){
        
        const item = filmForm.getValues();

        //Protection against XSS
        item.title = webix.template.escape(item.title);

        $$("filmsTable").add(item);

        webix.message({
            text: "Validation is succsessful",
            type: "success",
            expire: 1000
        });
   }
};

function clearForm(){
    const formId = $$("filmForm");
    webix.confirm({
        title: "Form cleaning",
        text: "Do you realy want to clean up the form?"
    }).then(
        function(){
            formId.clear();
            formId.clearValidation();
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
        title:  webix.rules.isNotEmpty,
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
       {
           view: "multiview",
           cells: [
               {
                   id: "dashboard",
                   cols: [
                       dataTable,
                       form
                   ]
                },
                {
                    id: "users",
                    template: "Users"
                },
                {
                    id: "products",
                    template: "Products"
                },
                {
                    id: "admin",
                    template: "Admin"
                }
           ]
    
        } 
    ]
}