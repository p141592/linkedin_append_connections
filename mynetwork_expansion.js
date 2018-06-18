
window.go = true;
window.debug = false;

let START_DATE = Date();
let PARSED = 0;
let CONTACTS = $('.mn-pymk-list__card');
let EXCLUDE_LIST = new Set();
let STUCK_COUNTER = 0;
let max_STUCK_COUNTER = 40;
let LAST_EXCLUDE_LEN = 0;
let MAX_EXCLUDE_LIST_SIZE = 80;
let NEW_FRENDS = [];
let EXCEPT_POSITIONS = [
    'recruitment', 'recruiter', 'hr', 'recruiting', 'head', 'lead', 'cio', 'cto', 'founder'
];
let LOOP_INTERVAL = 3000;
let LOOP_LEN = 0;
let CHECK_USER;

function check_exclude(_id) {
    return EXCLUDE_LIST.has(_id);
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

function remove_contact(_id) {
    $('#'+_id).parent().remove();
    EXCLUDE_LIST.delete(_id);
}

function check_blocking() {
    let result = false;
    if(CHECK_USER && $('#'+CHECK_USER).length > 0) {
        result = true;
    }
    CHECK_USER = false;
    return result
}

function check_stuck() {
    let result = false;
    if(LAST_EXCLUDE_LEN === EXCLUDE_LIST.size) {
        result = true;
    }
    return result
}

function move() {
    if (window.go){
        LAST_EXCLUDE_LEN = EXCLUDE_LIST.size;
        CONTACTS = $('.mn-pymk-list__card');
        for(var contact=0; contact<CONTACTS.length; contact++){
            let field = CONTACTS[contact].children[0];
            let _id = CONTACTS[contact].children[0].getAttribute('id');
            let _name = $(field.children[2].children[0].children[1]).text();
            let _button = field.children[3].children[0];
            let _position = $(field.children[2].children[0].children[3]).text().toLowerCase().split(' ');

            let _int = 0;
            let _int_field;
            try {
                _int_field = $(field.children[2].children[1].children[0].children[1]).text();
                let reg = /\d+/g;
                _int = parseInt(_int_field.match(reg)[0]);
            } catch(err){}

            if (check_position(_position) || _int && _int < 30){
                if (!check_exclude(_id)){
                    NEW_FRENDS.push(_name);
                    CHECK_USER = _id;
                    console.log(_name);
                    console.log(_int);
                    _button.click();

                }

            }
            EXCLUDE_LIST.add(_id);
            PARSED += 1;
        }
        finish_loop();
    }
}

function finish_loop() {
    setTimeout(function () {
        if (check_blocking()) {
            stop()
        }

        if (check_stuck()) {
            STUCK_COUNTER += 1;
            scrole();
        }
        else if (check_stuck() && STUCK_COUNTER > max_STUCK_COUNTER){
            stop();
        }
        else {
            scrole();
            setTimeout(function () {
                list_erase();
            }, 500);
            LOOP_LEN += 1;
        }
    }, 1000);

    if (NEW_FRENDS.length && NEW_FRENDS.length % 1000 === 0){
        good_message();
    }
}

function stop() {
    window.go=false;
    get_statistic()

}

function list_erase() {
    let iterator = EXCLUDE_LIST.values();
    let iteration_max = 11;
    while (EXCLUDE_LIST.size > MAX_EXCLUDE_LIST_SIZE && iteration_max > 0 ){
        remove_contact(iterator.next().value);
        iteration_max -= 1;
        STUCK_COUNTER = 0;
    }
}

function write_log(field) {
    if (window.debug){
        console.log(field)
    }
}

function scrole() {
    $(window).scrollTop(-$(document).height());
    setTimeout(function(){$(window).scrollTop($(document).height());}, 1000);
}

function good_message(){
    console.log('==================================');
    console.log('YOU HAVE ONE MORE THOUSAND INVITES');
    console.log('==================================');
    get_statistic();
    console.log('==================================');
}

function get_statistic() {
    let stop_date = Date();
    console.log('LOOP_LEN: ' + LOOP_LEN);
    console.log('NEW CONTACTS: ' + NEW_FRENDS.length);
    console.log('PARSED: ' + PARSED);
    console.log('START DATE: ' + START_DATE);
    console.log('STOP DATE: ' + stop_date);
    console.log('check_blocking: ' + check_blocking());
    console.log('check_stuck: ' + check_stuck());
    console.log('STUCK_COUNTER: ' + STUCK_COUNTER);
}

window.setInterval(move, LOOP_INTERVAL);
