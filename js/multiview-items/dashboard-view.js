import {randomInteger} from "../secondary-functions.js";
import {categories} from "../data-collections/collections.js";

export const dataTable = {
    view: "datatable",
    id: "filmsTable",
    scroll: "y",
    select: true,
    hover: "datatable-hover",
    leftSplit: 1,
    
    columns: [
        { id:"rank", header: {text:"#", css:"align-center"}, css: "rank-background align-center", width: 50, sort: "int"},
        { id:"title", header: ["Film title", {content:"textFilter"}], sort: "string", fillspace: true},
        { id:"category", header: [{text:"Category", css:"align-center"}, {content:"selectFilter"}], collection: categories, sort: "string", width: 100},
        { id:"votes", header: [{text:"Votes", css:"align-center"},{content:"textFilter"}], css:"align-center", sort: "int", width: 80},
        { id:"rating", header: [{text:"Raiting", css:"align-center"}, {content:"textFilter"}], css:"align-center",sort: "int", width: 80},
        { id:"year", header: [{text:"Released", css:"align-center"}], css:"align-center", sort: "int", width: 80},
        { id:"delete", header: "", template:"{common.trashIcon()}", width: 60}
        

    ],
    onClick: {
        "wxi-trash":function(e, id){
            webix.confirm({
                title: "Film deleting",
                text: "Do you really want to delete this film's information"
            }).then(
                function(){
                    const filmForm = $$("filmForm");
                    const formItemId = filmForm.getValues().id;
        
                    $$("filmsTable").remove(id);

                    if(formItemId == id.row){
                        filmForm.clear();
                    }
                }
            )
            return false;
        }
    },
    scheme:{
        $init: function(el){
            if (!el.category) el.category = randomInteger(1, categories.count())
        }
    },
    ready: function(){

        $$("filmForm").bind($$("filmsTable"));
        this.registerFilter(
            $$("yearsFilter"),
            { 
                columnId:"year", compare:function(value, filter, item){
                    switch(filter){
                        case "1": return value; break;
                        case "2": return value < 2000; break;
                        case "3": return value > 2000 && value < new Date().getFullYear(); break;
                        case "4": return value == new Date().getFullYear(); break;
                        default: return value; break;
                    } 
                }
            },
            { 
                getValue:function(node){
                    return node.getValue();
                },
                setValue:function(node, value){
                    node.setValue(value);
                }
            }
        )
    },
    url: "../../data/data.js",
}


function saveFilm(){

    const filmForm = $$("filmForm");

    if(filmForm.validate()){
        
        const formItem = filmForm.getValues();
        const formItemId = formItem.id;
        const filmsTable = $$("filmsTable");
        const rank = filmsTable.count() + 1;

        
        if(filmForm.isDirty()){
            //Protection against XSS
            formItem.title = webix.template.escape(formItem.title);

            if(filmsTable.exists(formItemId)){

                filmForm.save();

            }else{
                //Adding rank for new film
                formItem.rank = rank;

                filmForm.save(formItem);

                
            };

            filmsTable.unselect(formItemId);

            webix.message({
                text: "Validation is succsessful",
                type: "success",
                expire: 1000
            });
        }else{
            webix.message({
                text: "You have not edited the data",
                type: "info",
                expire: 1000
            });
        }
              
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
            value: "Save",
            css: "webix_primary",
            click: saveFilm
            
        },
        { 
            view: "button", 
            value: "Clear",
            click: clearForm
        },
        { 
            view: "button", 
            value: "Unselect",
            click: function(){
                $$("filmsTable").unselectAll();
            }
        },
    ]
};

export const filmsFilter = {
    view: "tabbar",
    id: "yearsFilter",
    options:[
        {id:1, value:"All"},
        {id:2, value:"Old"},
        {id:3, value:"Modern"},
        {id:4, value:"New"}
      ],
      on:{
        onChange:function(){
            $$("filmsTable").filterByAll();
          }
      }
}


export const form = {
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
        { 
            view:"richselect",
            label:"Category",
            name: "category", 
            options:{
                data: categories
            }
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