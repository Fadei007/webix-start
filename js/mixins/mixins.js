export const editList = webix.protoUI({
    name:"editList"
}, webix.EditAbility, webix.ui.list);

export const names = webix.GroupMethods.names = function(prop, data){
    if (!data.length) return 0;

    return  data.map(user =>{
                return user = user.name;
            });
};

