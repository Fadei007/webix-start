import {sideBar_data } from "../data/testdata.js";
import {users} from "./multiview-items/users-view.js";
import {products} from "./multiview-items/products-view.js";
import {dataTable,form} from "./multiview-items/dashboard-view.js";

const sideBar = {
    rows: [
        {
            view: "sidebar",
            id: "sidebar",
            width: 200,
            css: "color-background list-color",
            data: sideBar_data,
            on: {
                onAfterSelect: function(id){

                    $$(id).show();
    
                }
            },
            ready: function(){

               this.select("dashboard");

            }

        },
        {
            
            view: "label",
            css: "color-background green-template",
            template: "<span  class=\"webix_icon wxi-check\">Connected<span>"
            
        }
    ]
};


export const section = {
    cols: [
       sideBar,
       { view: "resizer" },
       {
           view: "multiview",
           cells: [
               {
                   id: "dashboard",
                   cols: [
                       dataTable,
                       form
                   ]
                },
                {
                    id: "users",
                    cols:[users]
                    
                },
                {
                    id: "products",
                    cols:[products]
                },
                {
                    id: "admin",
                    template: "Admin"
                }
           ]
    
        } 
    ]
}
