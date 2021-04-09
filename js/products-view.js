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
            header: "Film title",
            template:"{common.treetable()} #title#",
            fillspace: true
            
        },
        {
            id: "price",
            header: "Price",
            width: 200
        }
    ],
    select: "cell",
    on: {
        onAfterLoad: function(){
            this.openAll();
        }
    },
    url: ("../data/products.js"),
}