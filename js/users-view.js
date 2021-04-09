import {randomInteger} from "./secondary-functions.js";

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

function highlitingItems(){
    
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
            $$("ageChart").remove(id)
            this.remove(id);
              return false;
        }
    },
    ready: function(){
        const items = $$("usersList").$view.firstElementChild.children;
        
        for(let i = 0; i < 5; i++){
            items[i].style.backgroundColor = `rgb(${randomInteger(0,255)},${randomInteger(0,255)},${randomInteger(0,255)})`
        }

    },
    url: "../data/users.js"
}

const ageChart = {
    view: "chart",
    id: "ageChart",
    type: "bar",
    barWidth: 30,
    value: "#age#",
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



