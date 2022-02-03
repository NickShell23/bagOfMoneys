const TelegramBot = require('node-telegram-bot-api'); // подключаем node-telegram-bot-api
const CoinGecko = require('coingecko-api');
const token = '5031403115:AAG_U9kyBjyfw_M7Y0jgtrcaWC8TlURyuQU'; // тут токен кторый мы получили от botFather
const axios = require('axios');



const config = require("./db/config/db.config.js");

// const app = express();
// app.use(bodyParser.json());
// app.use(express.json());

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD, {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: false,

        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = require("./db/models");
const User = db.users;

// db.sequelize.sync({ force: true }).then(async () => {
//     console.log('Drop and Resync Db');
//      initial();
// });

// Initial DB informations
async function initial() {

    USERS
    User.create({
        "tg_id": "123456",
        "tg_userName": "@qweqwe",
        "first_name": "asdasd",
        "last_name": "zxczxc",
        "balance": "90",
    });
    User.create({
        "tg_id": "598357235",
        "tg_userName": "@Khada",
        "first_name": "qweqwe",
        "last_name": "asdasd",
        "balance": "322",
    });
    User.create({
      "tg_id": "234567",
      "tg_userName": "@fghfgh",
      "first_name": "xmnxmn'",
      "last_name": "fghgfh",
      "balance": "228",
  });


}





// включаем самого обота
const bot = new TelegramBot(token, {polling: true});
  var _coinList = {};
var usduah = null;
var summ1 = null;
    var card = null;
//crypto prices
const CoinGeckoClient = new CoinGecko();
  var getCrypto = async() =>{
       let data = await CoinGeckoClient.exchanges.fetchTickers('bitfinex', {
        coin_ids: ['litecoin','ripple','dogecoin','monero']
    });
    var _datacc = data.data.tickers.filter(t => t.target == 'USD');
    [
        'LTC',
        'XRP',
        'DOGE',
        'XMR',
    ].forEach((i) => {
        var _temp = _datacc.filter(t => t.base == i);
        var _res = _temp.length == 0 ? [] : _temp[0];
        _coinList[i] = _res.last;
    })
console.log(_coinList);
      console.log(_coinList.LTC);
  };
var getUAH = async() =>{
    axios.get(`https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11`)
.then(res=>{
        console.log(res.data);
    console.log(res.data[0].buy);
    console.log(res.data[0].sale);
        console.log(res.data[0].ccy)
        console.log(res.data[0].buy + res.data[0].sale);
        console.log(usduah);
        var i;
        if(res.data[1].ccy === 'USD')
            i=1;
        else if(res.data[0].ccy === 'USD')
            i=0;
         else if(res.data[2].ccy === 'USD')
            i=2;
        console.log(i);
usduah = (parseFloat(res.data[i].buy) + parseFloat(res.data[i].sale))/2;
        console.log(usduah);
        
  })  
  .catch(error=>{

  });
};
const keyboard1 = [
    [
      {
        text: 'Обмен', // текст на кнопке
        callback_data: 'obmen' // данные для обработчика событий
      },
      {
        text: 'Вывод', // текст на кнопке
        callback_data: 'vyvod' // данные для обработчика событий
      }
    ]
  ];
const backkey = [
    [
      {
        text: 'Назад', // текст на кнопке
        callback_data: 'back' // данные для обработчика событий
      }
    ]
  ];
const backkey1 = [
    [
      {
        text: 'Подтверждаю', // текст на кнопке
        callback_data: 'back' // данные для обработчика событий
      }
    ]
  ];
const card1 = [
    [
      {
        text: 'Далее', // текст на кнопке
        callback_data: 'card' // данные для обработчика событий
      }
    ]
  ];
const keyboard2 = [
    [
      {
        text: 'Пополнить LTC', // текст на кнопке
        callback_data: 'ltc' // данные для обработчика событий
      },
      {
        text: 'Пополнить XRP', // текст на кнопке
        callback_data: 'xrp' // данные для обработчика событий
      }
    ],
    [
      {
        text: 'Пополнить DOGE', // текст на кнопке
        callback_data: 'doge' // данные для обработчика событий
      },
      {
        text: 'Пополнить XMR', // текст на кнопке
        callback_data: 'xmr' // данные для обработчика событий
      }
    ],
    [
        {
            text: 'Назад', // текст на кнопке
        callback_data: 'back' // данные для обработчика событий
        }
    ]
  ];

var balance = 0;
var f_name;
var status = 0;

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
     const startTextSplited = msg.text.split(" ");
        startWord = startTextSplited[0];

        if(startWord == "/start"){
            return;}
    
    if(status === 0 ){
         bot.sendMessage(chatId, 'Неизвестная команда', { // прикрутим клаву
                                        reply_markup: {
                                            inline_keyboard: backkey
                                        }
                                    });
    }
    if(status === 1){
          let txt1;
            var summ = msg.text;
            if(/[^0-9]/.test(summ))
                {
                    txt1 ='Не верный формат';
                    bot.sendMessage(chatId, txt1, { // прикрутим клаву
                                        reply_markup: {
                                            inline_keyboard: backkey
                                        }
                                    });
                }
            else{
                summ1 = parseInt(summ);
                if(summ1 > balance){
                    txt1 = 'Не достаточно средств';
                    bot.sendMessage(chatId, txt1, { // прикрутим клаву
                                        reply_markup: {
                                            inline_keyboard: backkey
                                        }
                                    });
                }
                else if(1200 > balance){
                    txt1 = 'Минимальная сумма вывода 1200грн';
                    bot.sendMessage(chatId, txt1, { // прикрутим клаву
                                        reply_markup: {
                                            inline_keyboard: backkey
                                        }
                                    });
                }
                else{
                    
                    txt1 = 'Сумма к выводу: ' + summ1;
                    bot.sendMessage(chatId, txt1, {
                        reply_markup: {
                            inline_keyboard: card1
                        }
                    });
                
            }
            
}
        
    }
    if(status === 2){
                 card = msg.text;
                        
                        if(/[^0-9]/.test(card)){
                                txt1 ='Не верный формат';
                                  bot.sendMessage(chatId, txt1, { // прикрутим клаву
                                        reply_markup: {
                                            inline_keyboard: backkey
                                        }
                                    });
                            }
                        else {
                            if(card.length != 16) {
                                txt1 ='Не верный формат';
                                bot.sendMessage(chatId, txt1, { // прикрутим клаву
                                        reply_markup: {
                                            inline_keyboard: backkey
                                        }
                                    });
                                }
                            else{
                                txt1 ='Заявка #'+ chatId + ' создана\nCумма: ' + summ1 + '\n Получатель: ' + card ;
                                balance = balance - summ1;
                                bot.sendMessage(chatId, txt1, { // прикрутим клаву
                                        reply_markup: {
                                            inline_keyboard: backkey1
                                        }
                                    });
                                }
                            }
                    }
    
});
            

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
    const first_name = msg.chat.first_name; //получаем идентификатор диалога, чтобы отвечать именно тому пользователю, который нам что-то прислал
    const last_name = msg.chat.last_name; 
    const tg_userName = msg.chat.username; 
    f_name = first_name;
    balance = 0;

    const objTg_id = Object.assign({"tg_id": chatId});

    User.findOne({where: objTg_id}).then(id => {
        if(!id)
        {
            User.create({
                "tg_id": chatId,
                "tg_userName": `@${tg_userName}`,
                "first_name": first_name,
                "last_name": last_name,
                "balance": balance,
            });
        }
    });


let txt = '👋Здравствуй, ' + first_name + '\nВаш id: ' + chatId + '\nВаш баланс: ' + balance +' грн \n\nТех.поддержка: @firstobmen_support';
  // отправляем сообщение
    
bot.sendMessage(chatId, txt,{
    reply_markup:{
        inline_keyboard: keyboard1
    }
});
   }); 


     getCrypto();
     getUAH();



bot.on('callback_query', (query) =>  {
    status = 0;
    const chatId = query.message.chat.id;
    
    
    if (query.data === 'back') {
    
    let txt = '👋 Здравствуй, ' + f_name + '\n\nВаш id: ' + chatId + '\n\nВаш баланс: ' + balance +' грн \n\nТех.поддержка: @firstobmen_support';
  // отправляем сообщение
    
bot.sendMessage(chatId, txt,{
    reply_markup:{
        inline_keyboard: keyboard1
    }
});
}
    if (query.data === 'obmen') { // если кот
        let date_ob = new Date();
   getCrypto();
     getUAH();
// current date
// adjust 0 before single digit date
let date = ("0" + date_ob.getDate()).slice(-2);

// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
let year = date_ob.getFullYear();

// current hours
let hours = date_ob.getHours();

// current minutes
let minutes = date_ob.getMinutes();

// current seconds
let seconds = date_ob.getSeconds();
        
console.log(usduah);
console.log(_coinList.LTC*usduah);
    let txt = 'Дата: ' + date + '-' + month + '-' + year + '|' + hours + ':' + minutes + '\n\n Курс валют: \n Litecoin(LTC): ' + Math.round((_coinList.LTC*1.4)*100)/100 + ' $   ' + Math.round((_coinList.LTC*usduah*1.4)*100)/100 + ' ₴' + '\n Ripple(XRP): ' + Math.round((_coinList.XRP*1.4)*100)/100 + ' $   ' + Math.round((_coinList.XRP*usduah*1.4)*100)/100 + ' ₴' + '\n Dogecoin(DOGE): ' + Math.round((_coinList.DOGE*1.4)*100)/100 + ' $   ' + Math.round((_coinList.DOGE*usduah*1.4)*100)/100 + ' ₴'+ '\n Monero(XMR): ' + Math.round((_coinList.XMR*1.4)*100)/100 + ' $   ' + Math.round((_coinList.XMR*usduah*1.4)*100)/100 + ' ₴';
        bot.sendMessage(chatId, txt, { // прикрутим клаву
            reply_markup: {
                inline_keyboard: keyboard2
            }
        });
    }
    if (query.data === 'ltc'){ // если кот
    
    let txt = 'Ваш адресс LTC (Litecoin): LYY9byMYwSp7Acs9jkguwoB5FccWQKHeFY \n\nПлатеж будет обработан и зачислен автоматически\nТех.поддержка: @firstobmen_support';

        //bot.sendMessage(chatId, txt);
         bot.sendMessage(chatId, txt, { // прикрутим клаву
            reply_markup: {
                inline_keyboard: backkey
            }
        });
    }
    if (query.data === 'xrp'){ // если кот
    
    let txt = 'Ваш адресс XRP (Ripple): rBQzBBKE5EwJzGha6aoZtPwrG3EPRjCyJY\nТег адресса: 100131\n\nПлатеж будет обработан и зачислен автоматически\nТех.поддержка: @firstobmen_support';

        //bot.sendMessage(chatId, txt);
         bot.sendMessage(chatId, txt, { // прикрутим клаву
            reply_markup: {
                inline_keyboard: backkey
            }
        });
    }
    if (query.data === 'doge'){ // если кот
    
    let txt = 'Ваш адресс DOGE (Dogecoin): DDZ5DvVZkyxuUL1VqLyKbMKatisdoGA5hL\n\nПлатеж будет обработан и зачислен автоматически\nТех.поддержка: @firstobmen_support';

        //bot.sendMessage(chatId, txt);
         bot.sendMessage(chatId, txt, { // прикрутим клаву
            reply_markup: {
                inline_keyboard: backkey
            }
        });
    }
    if (query.data === 'xmr'){ // если кот
    
    let txt = 'Ваш адресс XMR (Monero): 8AYfAEkFwKdeHL6Fm5Dv5FHMVcFEomEeNAd5sdkzPfg81SZMrQ8MCRPfumXBbpue3A95swpWkqgGZQAQh5WRxiiA1jBBApm\n\nПлатеж будет обработан и зачислен автоматически\nТех.поддержка: @firstobmen_support';

        //\nCсылка на обменник: https://d-obmen.cc

        //bot.sendMessage(chatId, txt);
         bot.sendMessage(chatId, txt, { // прикрутим клаву
            reply_markup: {
                inline_keyboard: backkey
            }
        });
    }
    
    if (query.data === 'vyvod'){ // если кот
    
    let txt = 'Для оформления заявки на вывод необходимо указать сумму и номер карты. Вывод осуществляется в валюте - UAH на любую карту в автоматическом режиме\n Доступно средств: ' + balance + ' грн\n Для вывода отправьте сумму в ответ на это сообщение в указаной валюте:';
    //let txt1 = 'Я сейчас могу проанализировать самые выгодные компании именно для тебя ';

        //bot.sendMessage(chatId, txt);
        status = 1;
         bot.sendMessage(chatId, txt);
        
               }

    if (query.data === 'card'){
        let txt1;
        bot.sendMessage(chatId, 'Введите свою карту Visa/Mastercard: ');
        
        status = 2;
   
                         
                        
                    }
   
    
});
    