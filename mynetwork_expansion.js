window.debug=false;
const START_DATE = Date();
let CONTACTS = $('.mn-pymk-list__card');
let APPEND_LIST = new Set();
const PASS_POSITIONS = [
    'recruitment', 'recruiter', 'hr', 'recruiting', 'head', 'lead',
    'cio', 'cto', 'founder', 'talents', 'talent', 'hunter', 'hiring',
    'chief'
];
const LOOP_INTERVAL = 1000;
let LOOP_LEN = 0;
let NEW_FRIENDS = 0;
let PARSED = 0;
let CHECK_CONTACT_ID = '';
let LAST_CONTACT_ID = '0';
let STUCK_COUNT = 0;
const max_STUCK_COUNT = 10;
const min_APPEND_LIST_SIZE = 50;
let WHILE_SAFE = 0;
const max_MUTUAL_FIENDS = 30;

let MOVE_LOOP;
let INVITE_LOOP;

function move() {
    if (APPEND_LIST.size <= min_APPEND_LIST_SIZE) {
        CONTACTS = $('.mn-pymk-list__card').children();
        LAST_CONTACT_ID = CONTACTS[CONTACTS.length-1].getAttribute('id');

        Array.from(CONTACTS).forEach(function(element) {
            let _id = element.getAttribute('id');
            APPEND_LIST.add(_id)
        });

        LOOP_LEN += 1;
        scrole();

        setTimeout(function () {
            if (LAST_CONTACT_ID === CHECK_CONTACT_ID && STUCK_COUNT === max_STUCK_COUNT) {
                stop();
                console.log('YOU STUCK')
            } else if (LAST_CONTACT_ID === CHECK_CONTACT_ID) {
                STUCK_COUNT += 1;
            } else {
                STUCK_COUNT = 0;
            }
            CHECK_CONTACT_ID = LAST_CONTACT_ID;
        }, LOOP_INTERVAL)
    }
}

function invite_move() {
    if (APPEND_LIST.size >= min_APPEND_LIST_SIZE){
        invite(pop_set_value());

        if (NEW_FRIENDS && NEW_FRIENDS % 1000 === 0){
            good_message();
        }
    }
}

function invite(_id) {
    if (window.debug) {
        console.log(_id);
    }
    let contact = parse_contact(_id);
    if (check_position(contact['position']) || contact['int'] && contact['int'] < max_MUTUAL_FIENDS) {
        if (!window.debug) {
            contact['button'].click();

        } else {
            console.log('INVITE');
            $('#'+_id).parent().remove();
        }

        NEW_FRIENDS += 1

    } else {
        if (!window.debug){
            //contact['close'].click();
            $('#'+_id).parent().remove();

        } else {
            console.log('REMOVE');
            $('#'+_id).parent().remove();
        }

    }


    setTimeout(function (_id) {
        if (check_element(_id)){
            stop();
            console.log('YOU ARE BLOCKING')
        }
    }, LOOP_INTERVAL);

    PARSED += 1;
}

function approve_incoming_invite() {
    $('[data-control-name="see_more_invites"]').click();

    setTimeout(function () {
        let invites_DOM = $('.mn-invitation-list.ember-view').children();

        Array.from(invites_DOM).forEach(function(element) {
            element.children[0].children[1].children[1].click();
        });
    }, LOOP_INTERVAL);

}

function parse_contact(_id) {
    let field = $('#'+_id);

    let contact = {
        'close': field.children()[0],
        'name': $(field.children()[2].children[0].children[1]).text(),
        'button': field.children()[3].children[0],
        'position': $(field.children()[2].children[0].children[3]).text().toLowerCase().split(' ')
    };

    let _int = 0;
    let _int_field;
    try {
        _int_field = $(field.children()[2].children[1].children[0].children[1]).text();
        let reg = /\d+/g;
        _int = parseInt(_int_field.match(reg)[0]);
    } catch(err){}
    contact['int'] = _int;

    return contact
}

function pop_set_value() {
    let result = '';
    while (!check_element(result)){
        if (WHILE_SAFE > 100){
            break;
            stop();
        }
        APPEND_LIST.delete(result);
        result = Array.from(APPEND_LIST).pop();
        WHILE_SAFE += 1
    }
    WHILE_SAFE = 0;

    APPEND_LIST.delete(result);
    return result;
}

function check_position(position) {
    let result = false;
    position.forEach(function(element) {
      if (list_content(element, PASS_POSITIONS)){
          result = true;
      }
    });
    return result;
}

function check_element(_id) {
    return !!document.getElementById(_id);
}

function list_content(object, list) {
    let res = list.indexOf(object);
    if (res >= 0){
        return true
    }
    return false
}

function scrole() {
    $(window).scrollTop(-$(document).height());
    setTimeout(function(){$(window).scrollTop($(document).height())}, 1000);
}

function sign() {
    console.log('==================================');
    console.log('https://linkedin.com/in/p141592/');
    console.log('==================================');
}

function good_message(){
    console.log('==================================');
    console.log('YOU HAVE ONE MORE THOUSAND INVITES');
    console.log('==================================');
    get_statistic();
    sign()
}

function get_statistic(stop_date='') {
    console.log('LOOP_LEN: ' + LOOP_LEN);
    console.log('NEW CONTACTS: ' + NEW_FRIENDS);
    console.log('PARSED: ' + PARSED);
    console.log('START DATE: ' + START_DATE);
    console.log('STOP DATE: ' + stop_date);
    sign()
}

function stop() {
    clearInterval(MOVE_LOOP);
    clearInterval(INVITE_LOOP);
    console.log('==================================');
    console.log('STOP');
    console.log('==================================');
    get_statistic(Date())

}

function start() {
    console.log('==================================');
    console.log('STARTING WORK');
    console.log('==================================');
    approve_incoming_invite();
    get_statistic();
    MOVE_LOOP = window.setInterval(move, LOOP_INTERVAL+500);
    INVITE_LOOP = window.setInterval(invite_move, LOOP_INTERVAL);
}

start();
