import {randomInteger} from "../secondary-functions.js";
import {editList, names} from "../mixins/mixins.js";
import {users_data} from "../data-collections/collections.js";

const dataSortInterface= {
    cols:[
        {
            view: "text",
            id: "usersInput",
            on: {
                onTimedKeyPress: function(){
                    const inputValue = this.getValue().toLowerCase();
                    filterData(inputValue);
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
                
                users_data.add({
                    "name": names[randomInteger(0, 4)], 
                    "age": randomInteger(20, 60), 
                    "country": countries[randomInteger(0, 7)]
                })
            }
        }
    ]
}

function filterData(inputValue){
    users_data.filter(function(obj){
            return obj.name.toLowerCase().indexOf(inputValue) !== -1     ||
                   obj.country.toLowerCase().indexOf(inputValue) !== -1  ;
        })

};

function sortData(sortingType){
    users_data.sort("age", sortingType);
};

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
                    users_data.remove(id);
                    return false;
                }
            )

        }
    },
    editable: true,
    editaction:"dblclick",
    editor: "text",
    editValue: "name",
    on: {
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
                           
                        }
    }
}


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



