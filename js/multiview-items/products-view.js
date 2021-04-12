webix.protoUI({
    name:"editTreeTable"
}, webix.EditAbility, webix.ui.treetable);

export const products = {
    view: "editTreeTable",
    columns:[
        {
            id: "id",
            header: "",
            width: 50
        
        },
        {
            id: "title",
            header: "Title",
            template:"{common.treetable()} #title#",
            fillspace: true,
            editor:"text"
            
        },
        {
            id: "price",
            header: "Price",
            width: 200,
            editor:"text"
        }
    ],
    select: true,
    editable: true,
    editaction:"dblclick",
    on: {
        onAfterLoad: function(){
            this.openAll();
        },
        onBeforeEditStop: function(state, editor, ignore){
            const value = editor.getValue();
            const check = ( value != "" );
            if (!ignore && !check || value.indexOf("<") != -1 || value.indexOf(">") != -1 || value.indexOf("/") != -1){
                webix.message({
                    text:"Name couldn't be empty or contain '<', '>', '/' symbols",
                    type:"error", 
                    expire: 2000,
                });
                return false;
            }
            if(isNaN(Number(value)) && editor.column == "price"){
                webix.message({
                    text:"Name couldn't be empty or not a number",
                    type:"error", 
                    expire: 2000,
                });
                return false;
            }
        },
        onBeforeEditStart: function(id){
            //Prevent editting cells that locate in 'price' column and have and have non-integers as id
            if(Number.isInteger(Number(id.row)) && id.column == "price") return false;
        }

    },
    url: ("../../data/products.js")
}