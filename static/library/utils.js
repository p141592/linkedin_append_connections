String.prototype.hashCode = function(){
	var hash = 0;
	if (this.length === 0) return hash;
    let char;
    for (var i = 0; i < this.length; i++) {
        char = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
	return hash;
};

function list_content(object, list) {
    let res = list.indexOf(object);
    if (res >= 0){
        return true
    }
    return false
}

function check_element(_id) {
    return !!document.getElementById(_id);
}

function pop_set_value() {
    let result = '';
    while (!check_element(result)){
        if (WHILE_SAFE > 100){
            stop();
            break;
        }
        APPEND_LIST.delete(result);
        let list = Array.from(APPEND_LIST);
        if (list.length > 0){
            result = list[0];
        }
        WHILE_SAFE += 1
    }
    WHILE_SAFE = 0;

    APPEND_LIST.delete(result);
    return result;
}

function get_int(str) {
    try{
        let reg = /\d+/g;
        return parseInt(str.match(reg)[0]);
    } catch(err){return 0}
}

function name_md5(name) {
    name.hashCode()
}
