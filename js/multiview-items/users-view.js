import {randomInteger} from "../secondary-functions.js";

const dataSortInterface= {
    cols:[
        {
            view: "text",
            id: "usersInput",
            on: {
                onTimedKeyPress: function(){
                    const inputValue = this.getValue().toLowerCase();
                    filterData("usersList", inputValue);
                }
            }
        },
        {
            view: "button", 
            value: "Sort asc",
            autowidth: true,
            css: "webix_primary",
            click: function(){
                sortData("asc");
            }
        },
        {
            view: "button", 
            value: "Sort desc",
            autowidth: true,
            css: "webix_primary",
            click: function(){
                sortData("desc");
            }
        },
        {
            view: "button", 
            value: "Add new",
            autowidth: true,
            css: "webix_primary",
            click: function(){
                const usersList = $$("usersList");
                const countries = ["USA", "Germany", "Canada", "Russia", "China", "France", "Italy", "Spain"];
                const names = ["Sam Smith", "Alan Walker", "John Doe", "Mike Simpson", "David Jones"];
                const id = usersList.count() + 1;

                $$("usersList").add({
                    "id": id, 
                    "name": names[randomInteger(0, 4)], 
                    "age": randomInteger(20, 60), 
                    "country": countries[randomInteger(0, 7)]
                })
            }
        }
    ]
}

function filterData(viewId, inputValue){
    $$(viewId).filter(function(obj){
            return obj.name.toLowerCase().indexOf(inputValue) !== -1     ||
                   obj.country.toLowerCase().indexOf(inputValue) !== -1  ;
        })

};

function sortData(sortingType){
    $$("usersList").sort("age", sortingType);
};

webix.protoUI({
    name:"editList"
}, webix.EditAbility, webix.ui.list);



const usersList = {
    view: "editList",
    id: "usersList",
    template: `<div class="fl">
                    <span>#name# from #country#</span>
                    <span class="webix_icon wxi-close"></span>
                </div>`,
    onClick: {
        "wxi-close":function(e, id){
            webix.confirm({
                title: "User deleting",
                text: "Do you really want to delete this user's information"
            }).then(
                function(){
                    $$("usersList").remove(id);
                    return false;
                }
            )

        }
    },
    editable: true,
    editaction:"dblclick",
    editor: "text",
    editValue: "name",
    url: "../../data/users.js",
    scheme:{
        $init: function(el){
            el.age < 26 ? el.$css = "user-background" : false ;
        }
    },
    rules:{
        name: function(value){ 
            if(value == ""){
                webix.message({
                    text:"Name couldn't be empty",
                    type:"error", 
                    expire: 1000,
                });
                return false;
            }else{
                return true;
            }
        }
    },
    ready: function(){
        $$("ageChart").sync(this, function(){
            this.group({
                by: "country",
                map:{
                    country: ["country", "any"],
                    amount: ["country", "count"],
                    users: ["name", "names"]
                }
            });
        });
        
    }
}

webix.GroupMethods.names = function(prop, data){
    if (!data.length) return 0;
    let str = '';
    for (let i = data.length - 1; i >= 0; i--) {
        if(i == 0){
            str += prop(data[i])
        }else{
            str += prop(data[i]) + ", ";
        }
      };
    return str;
};

const ageChart = {
    view: "chart",
    id: "ageChart",
    type: "bar",
    barWidth: 30,
    value: "#amount#",
    tooltip: {
        template: "#users#"
    },
    yAxis:{
      start: 0,
      step: 2,
      end: 10
    },
    xAxis: {
        title: "Country",
        template: "#country#"
    }
}


export const users = {
    id: "usersView",
    rows:[
        dataSortInterface,
        usersList,
        ageChart
    ]      
}



