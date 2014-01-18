var list = [];
module.exports = {
    push : function(tag){
        if (list.indexOf(tag) >= 0) {
            return;
        }
        list.push(tag);
    },
    getList : function() {
        return list;
    }
};
