// Получение объектов
// Фильтрация объектов
// Кликакие с задержкой
// Получение новых объектов, когда список пройден

window.go = true;
window.debug = false;

let CONTACTS = $('.mn-pymk-list__card');
let EXCLUDE_LIST = [];
let EXCLUDE_LEN = 0;
let NEW_FRENDS = [];
let EXCEPT_POSITIONS = [
    'recruitment', 'recruiter', 'hr', 'recruiting', 'head', 'lead', 'cio', 'cto', 'founder'
];
let LOOP_INTERVAL = 3000;

function write_log(field) {
    if (window.debug){
        console.log(field)
    }
}

function scrole() {
    $(window).scrollTop(-$(document).height());
    $(window).scrollTop($(document).height());
}

function remove_static() {
    $('.lazy-image').remove();
}

function check_exclude(_id) {
    return list_content(_id, EXCLUDE_LIST);
}

function list_content(object, list) {
    let res = list.indexOf(object);
    if (res >= 0){
        return true
    }
    return false
}
function check_position(position) {
    var result = false;
    position.forEach(function(element) {
      if (list_content(element, EXCEPT_POSITIONS)){
          result = true;
      }
    });
    return result;
}

function update_list() {
    window.go=false;
    $('[href="/feed/"]')[0].click();
    $('[href="/mynetwork/"]')[0].click();
    window.go=true;

}

function move() {
    if (window.go){
        EXCLUDE_LEN = EXCLUDE_LIST.length;
        CONTACTS = $('.mn-pymk-list__card');
        for(var contact=0; contact<CONTACTS.length; contact++){
            write_log('FIELD');
            let field = CONTACTS[contact].children[0];
            write_log(field);

            write_log('ID');
            let _id = CONTACTS[contact].children[0].getAttribute('id');
            write_log(_id);

            write_log('NAME');
            let _name = $(field.children[2].children[0].children[1]).text();
            write_log(_name);

            write_log('BUTTON');
            let _button = field.children[3].children[0];
            write_log(_button);

            write_log('POSITION');
            let _position = $(field.children[2].children[0].children[3]).text().toLowerCase().split(' ');
            write_log(_position);

            write_log('INT_FIELD');
            let _int = 0;
            let _int_field;
            try {
                _int_field = $(field.children[2].children[1].children[0].children[1]).text();
                let reg = /\d+/g;
                _int = parseInt(_int_field.match(reg)[0]);
            } catch(err){}
            write_log(_int_field);

            if (check_position(_position) || _int && _int < 30){
                write_log('===============GOOD_FREND_INT===============');
                write_log(_int);
                if (!check_exclude(_id)){
                    EXCLUDE_LIST.push(_id);
                    NEW_FRENDS.push(_name);
                    console.log(_name);
                    console.log(_int);
                    _button.click()
                } else {
                    write_log('EXCLUDED');
                    write_log(_id)
                }

            } else {
                EXCLUDE_LIST.push(_id);

                write_log('===============BAD_FREND_INT=================')
            }
        }
        if (EXCLUDE_LIST.length == EXCLUDE_LEN){
            write_log('===============RELOAD=================');
            update_list();
        } else {
            scrole();
            remove_static();
        }
    }
}

window.setInterval(move, LOOP_INTERVAL);
window.setInterval(function () {
    console.log('NEW CONTACTS: ' + NEW_FRENDS.length);
}, LOOP_INTERVAL*10);

