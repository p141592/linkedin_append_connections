// Получение объектов
// Фильтрация объектов
// Кликакие с задержкой
// Получение новых объектов, когда список пройден

window.go = true;
let contacts = $('.mn-pymk-list__card');

function scrole() {
    $(window).scrollTop($(document).height())
}

function move() {
    if (window.go){
        for(var contact=0; contact<contacts.length; contact++){
            let field = contacts[contact].children[0];
            let _id = contacts[contact].children[0].getAttribute('id');
            let _name = $(field.children[2].children[0].children[1]).text();
            let _button = field.children[3].children[0];
            let _int_field = $(field.children[2].children[1].children[0].children[1]).text();

            let reg = /\d+/g;
            let _int = parseInt(_int_field.match(reg)[0]);

            if (_int && _int < 30){
                exclude_list.push(_id);

                console.log(_name);
                console.log(_int);
                _button.click()
            }
        }
        scrole();
        contacts = $('.mn-pymk-list__card');
    }

}
$(
    window.setInterval(move, 5000)
);

