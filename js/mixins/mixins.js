export const editList = webix.protoUI({
    name:"editList"
}, webix.EditAbility, webix.ui.list);

export const names = webix.GroupMethods.names = function(prop, data){
    if (!data.length) return 0;
    let str = "";
    for (let i = data.length - 1; i >= 0; i--) {
        if(i == 0){
            str += prop(data[i])
        }else{
            str += prop(data[i]) + ", ";
        }
      };
    return str;
};

