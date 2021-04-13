export const products = {
    view: "treetable",
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
            const regexp = /[<>\/]/;
            const check = ( value != "" );
            if (!ignore && !check || value.match(regexp) != null){
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
        onBeforeEditStart: function(id, obj){
            //Prevent editting cells that locate in 'price' column and have and have non-integers as id
            if(this.getItem(id).$level == 1 && id.column == "price") return false;
        }

    },
    url: ("../../data/products.js")
}