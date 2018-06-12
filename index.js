// Получение объектов
// Фильтрация объектов
// Кликакие с задержкой
// Получение новых объектов, когда список пройден

window.go = true;
window.debug = false;

let CONTACTS = $('.mn-pymk-list__card');
let EXCLUDE_LIST = [];
let LOOP_INTERVAL = 3000;

function write_log(field) {
    if (window.debug){
        console.log(field)
    }
}

function scrole() {
    $(window).scrollTop($(document).height())
}

function check_exclude(_id) {
    let res = EXCLUDE_LIST.indexOf(_id);
    if (res >= 0){
        return true
    }
    return false
}

function move() {
    if (window.go){
        for(var contact=0; contact<CONTACTS.length; contact++){
            write_log('FIELD');
            let field = CONTACTS[contact].children[0];
            write_log(field);

            write_log('_ID');
            let _id = CONTACTS[contact].children[0].getAttribute('id');
            write_log(_id);

            write_log('_NAME');
            let _name = $(field.children[2].children[0].children[1]).text();
            write_log(_name);

            write_log('_BUTTON');
            let _button = field.children[3].children[0];
            write_log(_button);

            write_log('_INT_FIELD');
            let _int = 0;
            let _int_field;
            try {
                _int_field = $(field.children[2].children[1].children[0].children[1]).text();
                let reg = /\d+/g;
                _int = parseInt(_int_field.match(reg)[0]);
            } catch(err){}
            write_log(_int_field);



            if (_int && _int < 30){
                write_log('===============GOOD_FREND_INT===============');
                write_log(_int);
                if (!check_exclude(_id)){
                    EXCLUDE_LIST.push(_id);

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
        scrole();
        CONTACTS = $('.mn-pymk-list__card');
    }

}
$(
    window.setInterval(move, LOOP_INTERVAL)
);

