import {popupMenu} from "./header-popup.js"

const profileButton = {
    view: "button", 
    label: "Profile", 
    autowidth: true,
    css: "webix_transparent",
    type: "icon",
    icon: "wxi-user",
    popup: popupMenu
    
};

const appName = {
    view: "label", 
    label: "My App"
};

export const header =   {   
    view: "toolbar",
    css: "webix_dark",
    paddingX: 10,
    cols:[
        appName,
        {},
        profileButton
    ]   
}