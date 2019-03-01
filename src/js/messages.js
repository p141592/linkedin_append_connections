// page: https://www.linkedin.com/mynetwork/

const START_DATE = Date();
let CONTACTS = $('.mn-pymk-list__card');
let APPEND_LIST = new Set();
const ACCEPT_POSITIONS = [
    'recruitment', 'recruiter', 'hr', 'recruiting', 'pr', 'talents', 'talent', 'hunter', 'hiring', 'vacancy',
    'human', 'job'
];
const LOOP_INTERVAL = 1000;
let LOOP_LEN = 0;
let NEW_FRIENDS = 0;
let PARSED = 0;
let CHECK_CONTACT_ID;
let LAST_CONTACT_ID;
let STUCK_COUNT;
const max_STUCK_COUNT = 10;
const min_APPEND_LIST_SIZE = 50;
let WHILE_SAFE;
const max_MUTUAL_FIENDS = 100;
const PROFILE_NAME = $('.nav-item__profile-member-photo').attr('alt');

let STUCKED = false;
let MOVE_LOOP;
let INVITE_LOOP;
const SCHEDULE_PAUSE = 1800;
let SCHEDULE = 0;
const passed_PICTURE = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
let EXCLUDED_NAMES = ['shijoy', 'santhya', 'sourav', 'sharath', 'sathya', 'subhas', 'vinod', 'benil', 'аджит', 'dzhiotsana', 'виджая', 'мохан', 'gurdeep', 'эсмэйл', 'gori', 'празад', 'navin', 'рашми', 'вазант', 'прейнт', 'abhi', 'volli', 'сереш', 'shyamal', 'mandzhunata', 'nishi', 'дхавал', 'анкер', 'amit', 'суман', 'soham', 'сатиш', 'шивали', 'нишант', 'арджуна', 'аниш', 'aadhya', 'atharv', 'анираддха', 'hemant', 'padmini', 'aashit', 'vikram', 'harshad', 'kor', 'канти', 'кришна', 'харшад', 'савитар', 'сима', 'нэйтик', 'archana', 'kamala', 'sandzhiv', 'papuii', 'шьяма', 'аравинда', 'asha', 'indira', 'адитья', 'шива', 'lakshmana', 'arun', 'ананд', 'serendra', 'saumya', 'сушила', 'amaira', 'narinder', 'dzheyuont', 'vidhya', 'sarah', 'suhani', 'пунита', 'radha', 'дипти', 'kanta', 'kalidas', 'капил', 'хариндер', 'madhavi', 'arti', 'vansha', 'сунита, сунити', 'чандраканта', 'ishani', 'кумар', 'деврадж', 'indrani', 'rab', 'shivangi', 'sachin', 'harish', 'anisha', 'mahima', 'shail', 'diksha', 'dhriti', 'ishika', 'радшив', 'rudra', 'нитя', 'лила', 'нитин', 'jatin', 'анкита', 'devdas', 'aarav', 'кала', 'laksmi', 'advika', 'shankar', 'джиотсна', 'deepak', 'shreya', 'санкар', 'шантану', 'даярама', 'орангзеб', 'nila', 'рани', 'асим', 'саши', 'ашока', 'пракаш', 'ratnam', 'shashi', 'ratna', 'shanta', 'bazu', 'viney', 'уша', 'vikas', 'чандана', 'sandzhana', 'arunima', 'деви', 'harinder', 'serinder', 'dzhayanti', 'чирандживи', 'vipul', 'zara', 'рави', 'rav', 'сударшана', 'mohandas', 'mohan', 'джаггернаут', 'damodar', 'sikandr', 'лаксман', 'predmama', 'pari', 'vishnu', 'andrea', 'toril', 'решми', 'sakshi', 'ahil', 'сонал', 'radhika', 'avni', 'radzhanikant', 'abigail', 'масуд', 'dzhiotsna', 'abhishek', 'anushka', 'dzhasvinder', 'ishita', 'kapila', 'ayaan', 'риа', 'archita', 'джиотиш', 'индраджит', 'гобинд', 'bahman', 'brama', 'shrest', 'suresh', 'madhukar', 'ом', 'randzhit', 'arandhati', 'shivansh', 'siddhart', 'padmavati', 'раджиндер', 'санджана', 'neytik', 'chetan', 'arusha', 'рати', 'mahesh', 'аканкша', 'маниша', 'svarna', 'сунил', 'джагджит', 'merugan', 'indra', 'маэндра', 'сарала', 'rashmi', 'карна', 'sonal', 'naveen', 'виней', 'anima', 'мукеш', 'rakmini', 'kunal', 'darsh', 'nanda', 'джитендра', 'лакшми', 'кишан', 'крсна', 'мадхукар', 'adzhit', 'anker', 'калпана', 'prazad', 'kushal', 'гопинат', 'индрани', 'sima', 'tushar', 'chandana', 'sita', 'майя', 'свапан', 'nilam', 'vazu', 'джэйдев', 'raghav', 'sai', 'rishabh', 'яш', 'радхика', 'vimal', 'ибрахим', 'sib', 'vijay', 'амита', 'шанкар', 'готам', 'пратибха', 'нейрндра', 'кэйлаш', 'кистна', 'мадху', 'джасвиндер', 'eyshvoya', 'chirandzhivi', 'avani', 'deepro', 'pratibha', 'шанти', 'bipin', 'shrinidhi', 'раджаникант', 'сушил', 'меруган', 'ramya', 'akshay', 'boldev', 'chandrakanta', 'эйшвоья', 'parvati', 'juvina', 'manish', 'нихил', 'чандра', 'кшитидж', 'рейджндра', 'sneha', 'савитр', 'mayank', 'авани', 'сиддхарт', 'vidya', 'sharmila', 'баларама', 'suniti', 'аджитт', 'prabodhan', 'aravinda', 'санджитт', 'rutuja', 'dulip', 'pavithra', 'ajeet', 'abha', 'sharma', 'гопал', 'прем', 'varsha', 'прадип', 'megha', 'ayushi', 'sitara', 'marva', 'maninder', 'сиб', 'rashi', 'ума', 'кама', 'aryan', 'сандар', 'arjun', 'bidzhoy', 'aishwarya', 'рэйтан', 'пурнима', 'vaibhav', 'прэйтап', 'ashok', 'arush', 'амит', 'reshmi', 'садхир', 'малати', 'chandrakant', 'dzhohar', 'gotam', 'anaisha', 'sunil', 'trishna', 'arya', 'ananta', 'anurag', 'мадхави', 'кишор', 'kishen', 'mukesh', 'раджни', 'бабер', 'джиотсана', 'reyansh', 'shyam', 'keylash', 'raahithya', 'anvi', 'lakshman', 'абха', 'эша', 'мадхер', 'radzhender', 'kalyani', 'kavya', 'rizika', 'vihaan', 'lala', 'sandzhitt', 'даярам', 'shakantala', 'випул', 'shivali', 'ramakhandra', 'yash', 'divya', 'аванти', 'preynt', 'ананда', 'сарасвати', 'предмама', 'karthik', 'baleydva', 'рахул', 'akanksha', 'амала', 'махиндер', 'svapan', 'pramod', 'дамодара', 'adya', 'ishaan', 'myra', 'нараьян', 'swati', 'серья', 'пушпа', 'uma', 'eklavya', 'ritika', 'ганеша', 'akshara', 'dzhitendera', 'сумати', 'vishal', 'ракмини', 'babar', 'анила', 'vinay', 'sandhya', 'бабар', 'pushpa', 'вивек', 'бхарат', 'ridhi', 'ramakrishna', 'pistambar', 'muhammad', 'sarthak', 'тара', 'dzhita', 'базу', 'suman', 'hiral', 'джитендер', 'индерпал', 'наджендра', 'джаьянти', 'sumantra', 'tamaraa', 'rishita', 'radzhan', 'dilip', 'дулип', 'ardzhuna', 'praney', 'crowny', 'indradzhit', 'арандхати', 'tanya', 'nitara', 'нилам', 'sander', 'raju', 'seradzh', 'krish', 'olivia', 'mitali', 'кази', 'ila', 'dzhiotish', 'пранав', 'pollab', 'kazi', 'rishi', 'индра', 'anjana', 'bala', 'ашок', 'devi', 'karishma', 'merali', 'anaya', 'hrithik', 'dipti', 'ганеш', 'сикандр', 'jasmine', 'sarala', 'дамаьянти', 'прабхакар', 'pradip', 'анджали', 'esha', 'харша', 'vanya', 'dhaval', 'abhinav', 'madhav', 'aniraddha', 'nihila', 'вазу', 'готама', 'санджив', 'abhilasha', 'sumit', 'amar', 'kalyan', 'jagan', 'ayush', 'raveena', 'lalit', 'кишори', 'rohan', 'mahika', 'амрита', 'aswini', 'manya', 'siddharth', 'alok', 'suhana', 'девика', 'baber', 'sadaf', 'kashvi', 'пратима', 'праней', 'ситта', 'abhay', 'пистамбар', 'равана', 'deep', 'advik', 'amrit', 'prem', 'shravya', 'раджан', 'сиддхарта', 'jay', 'adzhiit', 'mahinder', 'gobind', 'siita', 'simran ', 'nitin', 'махавир', 'вишал', 'mishka', 'ратна', 'ahana', 'ram', 'сушилла', 'sashi', 'секар', 'шандар', 'lavanya', 'манджуната', 'savitri', 'harshal', 'рупиндер', 'джагдиш', 'gopinat', 'kishori', 'parth', 'aahana', 'навин', 'ramesh', 'inderdzhit', 'dilmini', 'хариш', 'прабху', 'лаванья', 'shobha', 'kama', 'debbie', 'gopal', 'дхананджей', 'сандхья', 'devansh', 'нихила', 'говинд', 'канта', 'sushilla', 'sanchit', 'лакшман', 'dzhey', 'маниш', 'вимала', 'ритсика', 'dawn', 'сумантра', 'prashant', 'karan', 'rhea', 'санджей', 'mahavir', 'pawan', 'mayur', 'мирра', 'dzhitinder', 'aditya', 'вазанта', 'шрипати', 'сунита', 'colney', 'amruta', 'tanu', 'sasashy', 'vedant', 'saira', 'varadat', 'shila', 'лал', 'priya', 'сварна', 'пернима', 'лакшмана', 'abhimanyu', 'чандан', 'prince', 'anant', 'krishna', 'aarna', 'лалит', 'сумана', 'сарал', 'ashoka', 'ganesha', 'shaan', 'randzh', 'vanada', 'косалья', 'mandzhula', 'vaishnavi', 'damodara', 'иша', 'мерукан', 'sumati', 'dzhitender', 'ansh', 'ракна', 'мандип', 'sabhya', 'varun', 'гори', 'синг', 'neyrndra', 'devdan', 'tisha', 'мохана', 'niti', 'ритика', 'анант', 'капила', 'sandar', 'saral', 'джаьянт', 'ризика', 'прия', 'ritsika', 'dzheydev', 'meghana', 'чанда', 'neeraj', 'инду', 'malati', 'dzhaya', 'prabhat', 'rahul', 'махатма', 'кири', 'савитри', 'isha', 'aashna', 'orangzeb', 'арчана', 'rajesh', 'сериндер', 'харшал', 'jhanvi', 'анил', 'dzhagdish', 'lata', 'шобха', 'dia', 'мазуд', 'mala', 'shakti', 'dzhitendra', 'shanti', 'daksha', 'adnan', 'неха', 'сандара', 'karna', 'madhu', 'gautam', 'pollav', 'vinaya', 'bazant', 'рамакхандра', 'samar', 'preytap', 'sarika', 'dev', 'aalia', 'киран', 'камбоджа', 'сохэйл', 'dinesh', 'adzhitt', 'mohinder', 'soheyl', 'daamodara', 'asim', 'бахман', 'ананта', 'биджей', 'mohana', 'lilla', 'sabhash', 'om', 'vidzhey', 'shripati', 'chanda', 'лалита', 'anubhav', 'mani', 'амрит', 'sunita', 'mehul', 'ратнам', 'mohini', 'narayan', 'арун', 'harsh', 'волли', 'ananda', 'aarohi', 'шьямал', 'дерга', 'balarama', 'dzheyendra', 'anu', 'видья', 'ила', 'neil', 'шьям', 'sandara', 'debdan', 'kabir', 'кор', 'mukul', 'парвати', 'падмини', 'kistna', 'дилип', 'vivek', 'chandra', 'балейдва', 'paaus', 'kishor', 'radzhni', 'govinda', 'лочан', 'вимал', 'shyamala', 'лилла', 'ravana', 'мира', 'джей', 'vipin', 'manisha', 'ragu', 'massud', 'makta', 'лилавати', 'анима', 'бала', 'сунитта', 'shashank', 'джая', 'kumar', 'девдас', 'nakul', 'nishita', 'свапнил', 'agastya', 'нариндер', 'нирав', 'navya', 'ракеш', 'perva', 'masud', 'kumari', 'atul', 'kiara', 'zayn', 'rati', 'mary', 'варадат', 'джита', 'шехар', 'сандип', 'джириш', 'лала', 'ануджа', 'kiri', 'tara', 'lila', 'punita', 'торил', 'svapnil', 'рама', 'нила', 'сваран', 'чандр', 'ibrahim', 'радж', 'vazanta', 'сабхаш', 'rupinder', 'ishanvi', 'vidzhaya', 'dalip', 'sara', 'радха', 'lal', 'прабхат', 'шарма', 'shanaya', 'чандракант', 'nadzhendra', 'anya', 'сулабха', 'серадж', 'amala', 'mirra', 'сунити', 'mandip', 'seresh', 'govind', 'бипин', 'anupam', 'динеш', 'кальян', 'дамодар', 'kamal', 'болдев', 'ramanan', 'chandr', 'harsha', 'бриджеш', 'svaran', 'anil', 'поллав', 'рандж', 'тамараа', 'рамакхандр', 'мохандас', 'rachana', 'samarth', 'rajiv', 'ankit', 'каран', 'niharika', 'mandzhusha', 'dipali', 'kapil', 'devradzh', 'дипали', 'серендра', 'nirav', 'dayaram', 'lalita', 'ashish', 'kamalika', 'maendra', 'джохар', 'adit', 'лата', 'shaurya', 'riya', 'bodhi', 'индира', 'шакантала', 'массуд', 'sitta', 'аша', 'neha', 'manoj', 'рия', 'dzhioti', 'prabodh', 'chhangte', 'anudzh', 'sam', 'kali', 'вишну', 'shivani', 'манджуша', 'lilavati', 'сиита', 'шьямала', 'риши', 'sri', 'bhavna', 'mandzhu', 'chetana', 'prisha', 'kyra', 'rajeev', 'seema', 'базант', 'girish', 'девдан', 'beybr', 'merukan', 'naira', 'rohit', 'nitya', 'рамакришна', 'sandzhey', 'leah', 'gokul', 'мохиндер', 'мехмуд', 'ниша', 'sushil', 'aditi', 'siddharta', 'sunitta', 'pratima', 'hari', 'katherine', 'mazud', 'daksh', 'jai', 'четана', 'radzh', 'kala', 'mahatma', 'khushi', 'satish', 'arnav', 'tejas', 'savitr', 'sudarshana', 'кунал', 'шаши', 'krithika', 'chandralekha', 'джитиндер', 'padma', 'мукул', 'sadhir', 'gotama', 'аашит', 'поллаб', 'кальяни', 'макта', 'мерали', 'priyanka', 'dzhayant', 'shandar', 'марва', 'раджендер', 'ria', 'сандер', 'anika', 'nihil', 'neelam', 'kambodzha', 'shehar', 'ранджит', 'indu', 'anila', 'ganesh', 'amandeep', 'индерджит', 'shankara', 'sandzhit', 'kalpana', 'биджой', 'kiran', 'раджив', 'сударшан', 'анудж', 'indhumathi', 'nikhil ', 'маниндер', 'сачин', 'rani', 'дипак', 'нитья', 'nikita', 'каришма', 'прабодхан', 'bharat', 'lily', 'рохан', 'кишен', 'сита', 'кали', 'bidzhey', 'vivaan', 'laksman', 'хари', 'gayatri', 'sahana', 'ришима', 'dayarama', 'nayantara', 'gaurav', 'kshitidzh', 'anudzha', 'amrita', 'мира, мирра', 'avanti', 'sankar', 'раджеш', 'джиоти', 'radzhiv', 'падма', 'prateek', 'siya', 'amita', 'lochan', 'анупам', 'мохини', 'samaira', 'aria', 'nisha', 'avinash', 'sushila', 'kanti', 'pranav', 'прабодх', 'прамод', 'shekhar', 'сри', 'джэйендра', 'anirudh', 'lakshmi', 'krsna', 'абхилаша', 'ananya', 'джэйуонт', 'sanjay', 'sulabha', 'дивья', 'reydzhndra', 'esmeyl', 'bridzhesh', 'saanvi', 'derga', 'raj', 'ajith', 'pratyusha', 'anish', 'pratik', 'ахил', 'калидас', 'shivam', 'madhavaditya', 'aaditya', 'kartik', 'ardzhun', 'vinod', 'sekar', 'nil', 'nishant', 'rama', 'ситара', 'prabhakar', 'aaradhya', 'нанда', 'dipak', 'мани', 'akash', 'avi', 'anand', 'ravi', 'vazant', 'kosalya', 'shantanu', 'perushottam', 'падмавати', 'абхей', 'shyama', 'radzhinder', 'мала', 'chandan', 'pihu', 'шакти', 'aanya', 'ankita', 'abdul', 'gauri', 'шармила', 'krisha', 'radshiv', 'dzhaggernaut', 'рачана', 'шила', 'devika', 'anjali', 'savitar', 'викрам', 'deepa', 'нил', 'rakesh', 'випин', 'anushri', 'sarasvati', 'damayanti', 'pernima', 'inderpal', 'meera', 'арунаа', 'sudarshan', 'anik', 'anamika', 'ману', 'arunaa', 'meher', 'amaya', 'prachi', 'лаксми', 'radzhesh', 'мадхав', 'manu', 'джитендера', 'перушоттам', 'purnima', 'aakash', 'рагу', 'виджей', 'vedhika', 'перва', 'бейбр', 'rishima', 'sumana', 'sandip', 'амар', 'mehmud', 'sing', 'sanjana', 'serya', 'ramakhandr', 'sunny', 'даамодара', 'reytan', 'akansha', 'aadesh', 'adweta', 'раб', 'shiva', 'prakash', 'aniket', 'санджит', 'дебдан', 'празанна', 'vani', 'pratyush', 'манджула', 'rakna', 'сарика', 'dzhagdzhit', 'maryam', 'тришна', 'шанкара', 'рав', 'tanvi', 'advaith', 'mira', 'madher', 'angel', 'kishan', 'шрест', 'ajay', 'anusha', 'ванада', 'prazanna', 'moii', 'кумари', 'aastha', 'usha', 'diya', 'аджиит', 'камал', 'vimala', 'брама', 'andzhali', 'mohit', 'dhanandzhey', 'abhey', 'манджу', 'ankur', 'шанта', 'prabhu', 'арджун', 'dzhirish', 'камала', 'mayya', 'dhruv'];
let EXCLUDED_SYMBOLS = [];

let NETWORK = false;
let reload_LOOP_LEN = 1000;

function move() {
    if (APPEND_LIST.size <= min_APPEND_LIST_SIZE) {
        CONTACTS = $('.mn-connection-card');
        LAST_CONTACT_ID = CONTACTS[CONTACTS.length-1].getAttribute('id');

        Array.from(CONTACTS).forEach(function(element) {
            let _id = element.getAttribute('id');
            APPEND_LIST.add(_id)
        });

        LOOP_LEN += 1;
        scrole();

        setTimeout(function () {
            if (LAST_CONTACT_ID === CHECK_CONTACT_ID && STUCK_COUNT === max_STUCK_COUNT) {
                stuck();
            } else if (LAST_CONTACT_ID === CHECK_CONTACT_ID) {
                STUCK_COUNT += 1;
            } else {
                STUCK_COUNT = 0;
            }
            CHECK_CONTACT_ID = LAST_CONTACT_ID;
        }, LOOP_INTERVAL*2);
    }
}

function invite_move() {
    if ((APPEND_LIST.size >= min_APPEND_LIST_SIZE) || (APPEND_LIST.size > 0 && STUCKED)){
        invite(pop_set_value());

    } else if (APPEND_LIST.size === 0 && STUCKED){
        stuck();
    }
    //console.log(APPEND_LIST.size);
    //console.log(STUCKED);
}


function invite(_id) {
    let contact = parse_contact(_id);

    PARSED += 1;
}

function parse_contact(_id) {
    let id = '#'+_id;
    let start_message = $(id).children[2].children[0].children[0];

    return contact
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

function schedule_message(){
console.log('==================================');
	console.log('SCHEDULE PAUSE:'+SCHEDULE);
	console.log('==================================');
}

function get_statistic(stop_date='') {
    console.log('LOOP_LEN: ' + LOOP_LEN);
    console.log('NEW CONTACTS: ' + NEW_FRIENDS);
    console.log('PARSED: ' + PARSED);
    console.log('START DATE: ' + START_DATE);
    console.log('STOP DATE: ' + stop_date);
    //sign()
}

function init_params() {
    window.debug=false;
    CHECK_CONTACT_ID = '';
    LAST_CONTACT_ID = '0';
    STUCK_COUNT = 0;
    WHILE_SAFE = 0;
}

function stop() {
    clearInterval(MOVE_LOOP);
    clearInterval(INVITE_LOOP);
    console.log('==================================');
    console.log('STOP');
    console.log('==================================');
    get_statistic(Date())
}

function stuck() {
    clearInterval(MOVE_LOOP);
    STUCKED = true;
    console.log('==================================');
    console.log('YOU STUCK');
    console.log('==================================');
    get_statistic();
    location.reload();
}

function clean_workshop() {
    $('[role="presentation"]').remove();
    $('[aria-live="polite"]').remove();
}

function schedule(func) {
    if (SCHEDULE > 0){
        if (check_stop_service_window()){
            $('[data-control-name=fuse_limit_got_it]').click()
        }
        SCHEDULE -= 1;
    } else {
        func()
    }
}

function check_stop_service_window() {
    return $('.ip-fuse-limit-alert').is(":visible");
}

function start() {
    //clean_workshop();
    console.log('==================================');
    console.log('STARTING WORK');
    console.log('==================================');
    init_params();
    //approve_incoming_invite();
    get_statistic();
    MOVE_LOOP = window.setInterval(function (){schedule(move)}, LOOP_INTERVAL+500);
    INVITE_LOOP = window.setInterval(function (){schedule(invite_move)}, LOOP_INTERVAL);
}

$(function () {
    start();
});

