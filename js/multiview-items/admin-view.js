import {categories} from "../data-collections/collections.js";

export const admin = {
    view: "datatable",
    id: "categoriesTable",
    scroll: "y",
    select: true,
    hover: "datatable-hover",
    leftSplit: 1,
    
    columns: [
        { id:"id", header: {text:"id", css:"align-center"}, css: "rank-background align-center", width: 50, sort: "int"},
        { id:"value", header: {text:"Category", css:"align-center"}, sort: "string", fillspace:true},
        { id:"delete", header: "", template:"{common.trashIcon()}", width: 60}
    ],
    onClick: {
        "wxi-trash":function(e, id){
            webix.confirm({
                title: "Category deleting",
                text: "Do you really want to delete this category"
            }).then(
                function(){
                    const categoryForm = $$("categoryForm");
                    const formItemId = categoryForm.getValues().id;
        
                    categories.remove(id);

                    if(formItemId == id.row){
                        categoryForm.clear();
                    }
                }
            )
            return false;
        }
    }
}

const formButtons = {
    margin: 10,
    cols:[
        { 
            view: "button", 
            value: "Save",
            css: "webix_primary",
            click: saveCategory 
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
                $$("categoriesTable").unselectAll();
            }
        },
    ]
};

function saveCategory(){

    const categoryForm = $$("categoryForm");

    if(categoryForm.validate()){
        
        const formItem = categoryForm.getValues();
        const formItemId = formItem.id;
        const categoriesTable = $$("categoriesTable");
        
        if(categoryForm.isDirty()){
            //Protection against XSS
            formItem.value = webix.template.escape(formItem.value);


            if(categoriesTable.exists(formItemId)){
                
                categoryForm.save();

            }else{
                categories.add(formItem);      
            };

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
    const categoryForm = $$("categoryForm");
    webix.confirm({
        title: "Form cleaning",
        text: "Do you realy want to clean up the form?"
    }).then(
        function(){
            categoryForm.clear();
            categoryForm.clearValidation();
        }
    )
};

export const adminForm = {
    view: "form",
    id: "categoryForm",
    width: 300,
    scroll: false,
    elements: [
        {
            view: "template",
            template: "edit category",
            type: "section",
            css: "section-font-size"
        },
        { 
            view: "text",
            label: "Category",
            name: "value",
            invalidMessage: "Enter the category name"
        },
        formButtons,
        {}
    ],
    rules:{
        value:  webix.rules.isNotEmpty
    }
};

