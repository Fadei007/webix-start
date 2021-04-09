const dataSortInterface= {
    cols:[
        {
            view: "text",
            id: "usersInput",
            on: {
                onTimedKeyPress: function(){
                    const value = this.getValue().toLowerCase();

                    $$("usersList").filter(function(obj){
                        return obj.name.toLowerCase().indexOf(value) !== -1     ||
                               obj.country.toLowerCase().indexOf(value) !== -1  ;
                    })

                }
            }
        },
        {
            view: "button", 
            value: "Sort asc",
            autowidth: true,
            css: "webix_primary",
            click: function(){
                $$("usersList").sort("age", "asc") 
            }
        },
        {
            view: "button", 
            value: "Sort desc",
            autowidth: true,
            css: "webix_primary",
            click: function(){
                $$("usersList").sort("age", "desc") 
            }
        }
    ]
}

const usersList = {
    view: "list",
    id: "usersList",
    scroll: "y",
    template: `<div class="fl">
                    <span>#name# from #country#</span>
                    <span class="webix_icon wxi-close icon-right"></span>
                </div>`,
    onClick: {
        "wxi-close":function(e, id){
            this.remove(id);
              return false;
        }
    },
    url: "../data/users.js"
}




export const users = {
        rows:[
            dataSortInterface,
            usersList,
        ] 
        
}


