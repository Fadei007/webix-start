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


const usersList = {
    view: "list",
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
    url: "../../data/users.js",
    ready: function(){

        for(let i = 1; i < 6; i++){
            const randomBgColor = webix.html.createCss({
                "background-color": `rgb(${randomInteger(0,255)},${randomInteger(0,255)},${randomInteger(0,255)})`
            });
            this.addCss(i, randomBgColor);
        }

    },

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



