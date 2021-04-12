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
                    filterData("ageChart", inputValue);

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
    $$("ageChart").sort("age", sortingType);
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
                    $$("ageChart").remove(id);
                    $$("usersList").remove(id);
                    return false;
                }
            )

        }
    },
    editable: true,
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
    }
}


const ageChart = {
    view: "chart",
    id: "ageChart",
    type: "bar",
    barWidth: 30,
    value: "#age#",
    tooltip: {
        template: "#name#"
    },
    xAxis: {
        title: "Age",
        template: "#age#"
    },
    url: "../data/users.js",
}


export const users = {
        id: "usersView",
        rows:[
            dataSortInterface,
            usersList,
            ageChart
        ]      
}



