require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const imgur = require('imgur');


//jQuery
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $ = jQuery = require('jquery')(window);
///////////////////////////////


const telegramBot=require('node-telegram-bot-api');


const config = require("../db/config/db.config.js");

const app = express();
app.use(bodyParser.json());
app.use(express.json());

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

const db = require("../db/models");
const e = require('express');
const { profilePhotos } = require('../db/models');
const User = db.users;
const Location = db.locations;
const msgToDelete = db.msgtodelete;
const ProfilePhotos = db.profilePhotos;

db.sequelize.sync({ force: true }).then(async () => {
    console.log('Drop and Resync Db');
     initial();
});

// Initial DB informations
async function initial() {

    // USERS
    msgToDelete.create({
        "tg_id": "3456789",
    });
    ProfilePhotos.create({
        "tg_id": "3456789",
    });
    Location.create({
        "verif_code": "123456",
        "city": "Ivry-sur-Seine",
        "region": "Île-de-France",
        "country": "FR",
        "latitude": "48.8157",
        "longitude": "2.3849",
    });
    User.create({
        "tg_id": "598357235",
        "tg_userName": "@Khada",
        "first_name": "qweqwe",
        "last_name": "asdasd",
        "email": "toto@gmail.com",
        "photo": "path",
        "description": "cool, handsome, young",
        "gender": null,
        "interestedIn": null,
        "verif_code": "123456",
        "balance": "123456",
    });
    User.create({
        "tg_id": "2345678",
        "tg_userName": "@Khada2",
        "first_name": "asdasd",
        "last_name": "zxczxc",
        "email": "toto2@gmail.com",
        "photo": "path",
        "description": "cool, handsome, young",
        "gender": null,
        "interestedIn": null,
        "verif_code": "234567",
        "balance": "234567",
    });    
    User.create({
        "tg_id": "3456789",
        "tg_userName": "@Khada3",
        "first_name": "zxczxc",
        "last_name": "qweqwe",
        "email": "toto3@gmail.com",
        "photo": "path",
        "description": "cool, handsome, young",
        "gender": null,
        "interestedIn": null,
        "verif_code": "345678",
        "balance": "345678",
    });
    Location.create({
        "verif_code": "234567",
        "city": "Ivry-sur-Seine",
        "region": "Île-de-France",
        "country": "FR",
        "latitude": "48.8157",
        "longitude": "2.3849",
    });
    Location.create({
        "verif_code": "345678",
        "city": "Ivry-sur-Seine",
        "region": "Île-de-France",
        "country": "FR",
        "latitude": "48.8157",
        "longitude": "2.3849",
    });


}



const {TOKEN, SERVER_URL} = process.env;

const TELEGRAM_API=`https://api.telegram.org/bot${TOKEN}`;
const URI = `/webhook/${TOKEN}`;
const WEBHOOK_URL = SERVER_URL+URI;




const init = async() => {
axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`)
.then(res=>{
    console.log(res.data);
  })  
  .catch(error=>{

  });
};





const bot = new telegramBot(TOKEN, { polling: true });

var userMessage_id = null;
var botMessage_id = null;


const genderKeyboard = [
    [
        {
            text:'Male 🚹',
            callback_data: 'maleGender'
        },
        {
            text:'Female 🚺',
            callback_data: 'femaleGender'
        }
    ]
];
const interestedInKeyboard = [
    [
        {
            text:'Men 🙋‍♂️',
            callback_data: 'maleOrientated'
        },
        {
            text:'Women 🙋‍♀️',
            callback_data: 'femaleOrientated'
        },
        {
            text:'Both 👫',
            callback_data: 'bothOrientated'
        }
    ]
];
const interestedInChangeKeyboard = [
    [
        {
            text:'Men 🙋‍♂️',
            callback_data: 'changeToMaleOrientated'
        }
    ],
    [
        {
            text:'Women 🙋‍♀️',
            callback_data: 'changeToFemaleOrientated'
        }
    ],
    [
        {
            text:'Both 👫',
            callback_data: 'changeToBothOrientated'
        }
    ]
];

const mainKeyboard = [
    [
        {
            text:'Find a Mate 👫',
            callback_data:  'findingMate'
        }
    ],
    [
        {
            text:'Sympothy 👩‍❤️‍👨',
            callback_data:  'sympothy'
        }
    ],
    [
        {
                text:'My Profile 👤',
                callback_data: 'profile'
        },
        {
            text:'Tariff plans ✅',
            callback_data: 'tariffPlans'
        }
    ],
    [
        {
            text:'Settings ⚙️',
            callback_data: 'settings'
        },
        {
            text: 'Info ℹ️',
            callback_data: 'info'
        }
    ],
];
const mainKeyboardM = [
    [
        {
            text:'Find a Mate 👬',
            callback_data:  'findingMate'
        }
    ],
    [
        {
            text:'Sympothy 👨‍❤️‍👨',
            callback_data:  'sympothy'
        }
    ],
    [
        {
                text:'My Profile 👤',
                callback_data: 'profile'
        },
        {
            text:'Tariff plans ✅',
            callback_data: 'tariffPlans'
        }
    ],
    [
        {
            text:'Settings ⚙️',
            callback_data: 'settings'
        },
        {
            text: 'Info ℹ️',
            callback_data: 'info'
        }
    ],
];

const mainKeyboardF = [
    [
        {
            text:'Find a Mate 👭',
            callback_data:  'findingMate'
        }
    ],
    [
        {
            text:'Sympothy 👩‍❤️‍👩',
            callback_data:  'sympothy'
        }
    ],
    [
        {
                text:'My Profile 👤',
                callback_data: 'profile'
        },
        {
            text:'Tariff plans ✅',
            callback_data: 'tariffPlans'
        }
    ],
    [
        {
            text:'Settings ⚙️',
            callback_data: 'settings'
        },
        {
            text: 'Info ℹ️',
            callback_data: 'info'
        }
    ],
];

const mainKeyboardB = [
    [
        {
            text:'Find a Mate 👥',
            callback_data:  'findingMate'
        }
    ],
    [
        {
            text:'Sympothy 💑',
            callback_data:  'sympothy'
        }
    ],
    [
        {
                text:'My Profile 👤',
                callback_data: 'profile'
        },
        {
            text:'Tariff plans ✅',
            callback_data: 'tariffPlans'
        }
    ],
    [
        {
            text:'Settings ⚙️',
            callback_data: 'settings'
        },
        {
            text: 'Info ℹ️',
            callback_data: 'info'
        }
    ],
];

const sympothyKeyboard = [
    [
        {
            text:'Back ↩️',
            callback_data: 'back'
        }
    ],
];
const findingMateKeyboard = [
    [
        {
            text:'Back ↩️',
            callback_data: 'back'
        }
    ],
];
const tariffPlansKeyboard = [
    [
        {
            text:'Back ↩️',
            callback_data: 'back'
        }
    ],
];
const profileKeyboard = [
    [
        {
            text:'Edit Profile ✏️',
            callback_data: 'edit'
        },
    ],
    [
        {
            text:'Balance 💳',
            callback_data: 'balance'
        },
    ],
    [
        {
            text:'Back ↩️',
            callback_data: 'backFromProfile'
        }
    ],
];
const editKeyboard = [
    [
        {
            text:'Edit profile pictures ✏️',
            callback_data: 'profilePictures'
        },
    ],
    [
        {
            text:'Location ✏️',
            callback_data: 'location'
        },
        {
            text: 'Interest ✏️',
            callback_data: 'interestedInChange'
        },
    ],
    [
        {
            text:'Email ✏️',
            callback_data: 'shareEmail'
        },
        {
            text:'Phone ✏️',
            callback_data: 'sharePhone'
        },
    ],
    [
        {
            text:'Back ↩️',
            callback_data: 'backToProfile'
        }
    ],
];
const profilePicturesKeyboard = [
    [
        {
            text:'Change main picture ✏️',
            callback_data: 'changeMainPicture'
        },
    ],
    [
        {
            text:'Add picture ✏️',
            callback_data: 'profilePictures'
        },
    ],
    [
        {
            text:'Delete picture ✏️',
            callback_data: 'location'
        },
    ],
    [
        {
            text:'Back ↩️',
            callback_data: 'backToProfile'
        }
    ],
];
const changeMainPictureKeyboard = [
    [
        {
            text:'2',
            callback_data: 'secondPicture'
        },
    ],
    [
        {
            text:'3',
            callback_data: 'thirdPicture'
        },
    ],
    [
        {
            text:'4',
            callback_data: 'foursPicture'
        },
    ],
    [
        {
            text:'Back ↩️',
            callback_data: 'backToProfile'
        }
    ],
];
const balanceKeyboard = [
    [
        {
            text:'Recharge',
            callback_data: 'shareEmail'
        },
    ],
    [
        {
            text:'Back ↩️',
            callback_data: 'backToProfile'
        }
    ],
];
const settingsKeyboard = [
    [
        {
            text:'Language 🌐',
            callback_data: 'language'
        },
    ],
    [
        {
            text:'Back ↩️',
            callback_data: 'back'
        }
    ],
];
const languageKeyboard = [
    [
        {
            text:'EN 🇬🇧',
            callback_data: 'language'
        },
        {
            text:'RU 🇷🇺',
            callback_data: 'language'
        },
        {
            text:'UA 🇺🇦',
            callback_data: 'language'
        },
    ],
    [
        {
            text:'Back ↩️',
            callback_data: 'backToSettings'
        }
    ],
];
const infoKeyboard = [
    [
        {
            text:'Go to website 🌎',
            url: 'https://youtube.com'
        },
    ],
    [
        {
            text:'Back ↩️',
            callback_data: 'back'
        }
    ],
];



bot.on('message', async (message) => {
    const tg_id = message.chat.id;
    const tg_userName = message.chat.username;
    const first_name = message.chat.first_name;
    const last_name = message.chat.last_name;

    // try{
    //     msgToDelete.findOne({where: objTg_id}).then(async req =>{
    //         if(req.botMsg_id != null){
    //             console.log(req.botMsg_id);
    //             await bot.deleteMessage(tg_id, req.botMsg_id);
    //         }
    //     }).then(async afterDel =>{
        
    //     });
    // }catch(err)
    // {
    //     console.log("err");
    // }



    // else if (startWord == "/echo" && startTextSplited[1]){
    //     return;
    // }
    if (message.photo) {
        // Upload image to imgur
        console.log("1");
        const fileId = message.photo[message.photo.length - 1].file_id;
        console.log("2");
        const image = await imgur.uploadUrl(await bot.getFileLink(fileId));
        console.log("3");
        console.log(fileId);
        console.log(image);


        // if (message.caption) {
        //     console.log(`${message.caption} ${image.data.link}`);
        //     console.log("4");
        // } else {
        //     console.log(image.data.link);
        //     //send(image.data.link);
        // }
      }
    else{
        // let latitude1 = message.location.latitude;
        // let longitude1 = message.location.longitude;
        // console.log(latitude1);
        // console.log(longitude1);

    const objTg_id = Object.assign({"tg_id": tg_id});

        msgToDelete.findOne({where: objTg_id}).then(async req =>{
            if(!!req)
            {
                if(req.botMsg_id != null){
                    console.log(req.botMsg_id);
                    await bot.deleteMessage(tg_id, req.botMsg_id);
                }
            }
        }).then(async afterDel =>{

        });


        const startTextSplited = message.text.split(" ");
        startWord = startTextSplited[0];

        const startText = message.text;

        if(startWord == "/start"){
            return;
        }

        userMessage_id = message.message_id;
        console.log("user message_id: " + userMessage_id);
        bot.deleteMessage(tg_id, userMessage_id);
        userMessage_id = null;

        // deletes bots message if you send him new /start request
        // msgToDelete.findOne({where: objTg_id}).then(req =>{
        //     if(!!req)
        //     {
        //         if(req.botMsg_id != null){
        //             console.log(req.botMsg_id);
        //             bot.deleteMessage(tg_id, req.botMsg_id);
        
        //             // msgToDelete.update( {
        //             //     "botMsg_id": null,
        //             // }, {where: objTg_id});
        //         }
        //     }
        // });

        // let res;

        // sequelize.query(`SELECT \`botMsg_id\` FROM msgtodeletes WHERE tg_id = ${tg_id};`)
        // .then((err, result) => {
        //     res = result;
        // });
    
        // console.log(res);


        // sequelize.query(`SELECT \`botMsg_id\` FROM msgtodeletes WHERE tg_id = ${tg_id};`, function (err, result){
        //     if(err){
        //         throw err;
        //     }
        //     if(result.botMsg_id != null)
        //     {
        //         bot.deleteMessage(tg_id, result.botMsg_id);
    
        //         msgToDelete.update( {
        //             "botMsg_id": null,
        //         }, {where: objTg_id});
        //     }
    
        //     console.log("From database botMsg " + fields.botMsg_id);
        
        // })

        // console.log("bot message_id: " + userMessage_id);
        // for(var i = botMessage_id; i >= 0; i--)
        // {
        //     Promise.all([
        //         bot.deleteMessage(tg_id, i)
        //     ]).then(result => {
        //             i = 0;
        //     });
        // }
        User.findOne({where: objTg_id}).then(id => {
            if(!id)
            {
                // Promise.all([
                //     bot.sendMessage(tg_id, "Go wisit our website ;)", {
                //         reply_markup: {
                //             inline_keyboard: [
                //                 [
                //                     {
                //                     text: "Link",
                //                     url: "https://google.com"
                //                     }
                //                 ]
                //             ]
                //         }
                //     })
                // ]).then(result => {
        
                //     // botMessage_id = result[0].message_id;
                //     console.log(result[0].message_id);

                //     msgToDelete.findOne({where: objTg_id}).then(id => {
                        
                //         if(!id)
                //         {
                //             msgToDelete.create( {
                //                 "tg_id": tg_id,
                //                 "botMsg_id": result[0].message_id,
                //             });
                //         }
                //         else
                //         {
                //             msgToDelete.update( {
                //                 "botMsg_id": result[0].message_id,
                //             }, {where: objTg_id});
                //         }
                //     });
                    
                // });

                Promise.all([
                    bot.sendPhoto(tg_id, ("https://i.imgur.com/z4oM4NE.jpeg"), 
                        { 
                            caption: "Go visit our website ;)",
                            
                            reply_markup: {
                                inline_keyboard:[
                                    [
                                        {
                                        text: "Link",
                                        url: "https://google.com"
                                        }
                                    ]
                                ]
                            }
                        })
                    ]).then(result => {
                        // botMessage_id = result[0].message_id;
                        console.log(result[0].message_id);

                        msgToDelete.findOne({where: objTg_id}).then(id => {
                            
                            if(!id)
                            {
                                msgToDelete.create( {
                                    "tg_id": tg_id,
                                    "botMsg_id": result[0].message_id,
                                });
                            }
                            else
                            {
                                msgToDelete.update( {
                                    "botMsg_id": result[0].message_id,
                                }, {where: objTg_id});
                            }
                        });
                    })
            }
            else
            {
                if(id.gender == null)
                {
                    // Promise.all([
                    //     bot.sendMessage(tg_id,"Choose your gender: ", {
                    //         reply_markup: {
                    //             inline_keyboard: genderKeyboard
                    //         }
                    //     })
                    // ]).then(result => {
                    //     // botMessage_id = result[0].message_id;
                    //     console.log(result[0].message_id)
    
                    //     msgToDelete.update( {
                    //         "botMsg_id": result[0].message_id,
                    //     }, {where: objTg_id});
                    // });

                    Promise.all([
                        bot.sendPhoto(tg_id, ("https://i.imgur.com/z4oM4NE.jpeg"), 
                            { 
                                caption: "Choose your gender: ",
                                
                                reply_markup: {
                                    inline_keyboard: genderKeyboard
                                }
                            })
                        ]).then(result => {
                            // botMessage_id = result[0].message_id;
                            console.log(result[0].message_id)
        
                            msgToDelete.update( {
                                "botMsg_id": result[0].message_id,
                            }, {where: objTg_id});
                        })
                }
                else if(id.interestedIn == null)
                {
                    // Promise.all([
                    //     bot.sendMessage(tg_id,"Choose your interest: ", {
                    //         reply_markup: {
                    //             inline_keyboard: interestedInKeyboard
                    //         }
                    //     })
                    // ]).then(result => {
                    //     // botMessage_id = result[0].message_id;
                    //     console.log(result[0].message_id)
    
                    //     msgToDelete.update( {
                    //         "botMsg_id": result[0].message_id,
                    //     }, {where: objTg_id});
                    // });

                    Promise.all([
                        bot.sendPhoto(tg_id, ("https://i.imgur.com/z4oM4NE.jpeg"), 
                            { 
                                caption: "Choose your interest: ",
                                
                                reply_markup: {
                                    inline_keyboard: interestedInKeyboard
                                }
                            })
                        ]).then(result => {
                            // botMessage_id = result[0].message_id;
                            console.log(result[0].message_id)
        
                            msgToDelete.update( {
                                "botMsg_id": result[0].message_id,
                            }, {where: objTg_id});
                        })
                }
                else
                {
                    if((id.gender == "male" && id.interestedIn == "women") || (id.gender == "female" && id.interestedIn == "men"))
                    {
                        // Promise.all([
                        //     bot.sendMessage(tg_id,"Keyboard", {
                        //         reply_markup: {
                        //             inline_keyboard: mainKeyboard
                        //         }
                                
                        //     })
                        // ]).then(result => {
                        //     // botMessage_id = result[0].message_id;
                        //     console.log(result[0].message_id)
        
                        //     msgToDelete.update( {
                        //         "botMsg_id": result[0].message_id,
                        //     }, {where: objTg_id});
                        // });


                        Promise.all([
                            bot.sendPhoto(tg_id, ("https://i.imgur.com/z4oM4NE.jpeg"), 
                                { 
                                    caption: "Keyboard",
                                    
                                    reply_markup: {
                                        inline_keyboard: mainKeyboard
                                    }
                                })
                            ]).then(result => {
                                console.log(result[0].message_id)
            
                                msgToDelete.update( {
                                    "botMsg_id": result[0].message_id,
                                }, {where: objTg_id});
                            })

                    }
                    else if((id.gender == "male" && id.interestedIn == "men"))
                    {
                        // Promise.all([
                        //     bot.sendMessage(tg_id,"Keyboard", {
                        //         reply_markup: {
                        //             inline_keyboard: mainKeyboardM
                        //         }
                                
                        //     })
                        // ]).then(result => {
                        //     // botMessage_id = result[0].message_id;
                        //     console.log(result[0].message_id)
        
                        //     msgToDelete.update( {
                        //         "botMsg_id": result[0].message_id,
                        //     }, {where: objTg_id});
                        // });


                        Promise.all([
                            bot.sendPhoto(tg_id, ("https://i.imgur.com/z4oM4NE.jpeg"), 
                                { 
                                    caption: "Keyboard",
                                    
                                    reply_markup: {
                                        inline_keyboard: mainKeyboardM
                                    }
                                })
                            ]).then(result => {
                                console.log(result[0].message_id)
            
                                msgToDelete.update( {
                                    "botMsg_id": result[0].message_id,
                                }, {where: objTg_id});
                            })
                    }
                    else if((id.gender == "female" && id.interestedIn == "women"))
                    {
                        // Promise.all([
                        //     bot.sendMessage(tg_id,"Keyboard", {
                        //         reply_markup: {
                        //             inline_keyboard: mainKeyboardF
                        //         }
                                
                        //     })
                        // ]).then(result => {
                        //     // botMessage_id = result[0].message_id;
                        //     console.log(result[0].message_id)
        
                        //     msgToDelete.update( {
                        //         "botMsg_id": result[0].message_id,
                        //     }, {where: objTg_id});
                        // });


                        Promise.all([
                            bot.sendPhoto(tg_id, ("https://i.imgur.com/z4oM4NE.jpeg"), 
                                { 
                                    caption: "Keyboard",
                                    
                                    reply_markup: {
                                        inline_keyboard: mainKeyboardF
                                    }
                                })
                            ]).then(result => {
                                console.log(result[0].message_id)
            
                                msgToDelete.update( {
                                    "botMsg_id": result[0].message_id,
                                }, {where: objTg_id});
                            })
                    }
                    else if((id.gender == "male" && id.interestedIn == "both men and women") || (id.gender == "female" && id.interestedIn == "both men and women"))
                    {
                        // Promise.all([
                        //     bot.sendMessage(tg_id,"Keyboard", {
                        //         reply_markup: {
                        //             inline_keyboard: mainKeyboardB
                        //         }
                                
                        //     })
                        // ]).then(result => {
                        //     // botMessage_id = result[0].message_id;
                        //     console.log(result[0].message_id)
        
                        //     msgToDelete.update( {
                        //         "botMsg_id": result[0].message_id,
                        //     }, {where: objTg_id});
                        // });

                        Promise.all([
                            bot.sendPhoto(tg_id, ("https://i.imgur.com/z4oM4NE.jpeg"), 
                                { 
                                    caption: "Keyboard",
                                    
                                    reply_markup: {
                                        inline_keyboard: mainKeyboard
                                    }
                                })
                            ]).then(result => {
                                console.log(result[0].message_id)
            
                                msgToDelete.update( {
                                    "botMsg_id": result[0].message_id,
                                }, {where: objTg_id});
                            })
                    }
                }
            }
        });
    }
})

/* bot.on('message', (message) =>{ */       
bot.onText(/\/start/, (message) => {
    const tg_id = message.chat.id;
    const tg_userName = message.chat.username;
    const first_name = message.chat.first_name;
    const last_name = message.chat.last_name;

/*     const startTextSplited = message.text.split(" ");
    const startWord = startTextSplited[0]; */

    const startText = message.text;


    // userMessage_id = message.message_id;
    // console.log("user message_id: " + userMessage_id);
    // bot.deleteMessage(tg_id, userMessage_id);
    // userMessage_id = null;


    //Important
    const sentCode = message.text.replace('/start ', '');

    const objVerif_code = Object.assign({"verif_code": sentCode});
    const objTg_id = Object.assign({"tg_id": tg_id});


    console.log(tg_id);    
    console.log(sentCode);
    console.log(tg_userName);
    console.log(first_name);
    console.log(last_name);
    console.log(objVerif_code);
        

    User.findOne({where: objTg_id}).then(id => {
        if(!id)
        {
            // if(id.verif_code == sentCode)
            // {
                
            // }
            User.findOne({where: objVerif_code}).then(async code => {

                console.log(code);

                if(!!code)/* sentCode >= 100000 && sentCode <= 999999 */
                {
                    console.log(JSON.stringify(objVerif_code));

                    const domain = "localhost";

                    bot.getUserProfilePhotos(tg_id).then(async photos => {

                        // console.log(photos.photos[0][2]);
                        // console.log(photos.photos.length);
                        
                        ProfilePhotos.create({
                            "tg_id": tg_id,
                        });

                        console.log(photos.photos);
                        console.log(photos.photos.length);


                        let count = 0;

                        for(let j = 0; j <= photos.photos.length - 1; j++)
                        {




                            // $.ajax('https://api.moderatecontent.com/moderate/?face=true&', {
                            //     method: "GET",
                            //     dataType: 'json',
                            //     data: {
                            //         key: '19b91ce536a2d1b657c58ac94a7500b8',
                            //         url: `${image.link}`,

                            //     },
                            //     success: function (response) {
                            //         console.log(response);
                            //     }
                            // });
                            

                            // axios.get('https://api.sightengine.com/1.0/check.json', {
                            // params: {
                            //     'url': `${image.link}`,
                            //     'models': 'nudity,wad,properties,celebrities,offensive,faces,scam,text-content,face-attributes,gore,text',
                            //     'api_user': '371817893',
                            //     'api_secret': 'W4c8yBQdpnybhQa4JJUw',
                            // }
                            // })
                            // .then(function (response) {
                            // // on success: handle response
                            // console.log(response.data);

                            // console.log("Nudity safe: " + response.data.nudity.safe);
                            // console.log("Weapon: " + response.data.weapon);
                            // console.log("Alcohol: " + response.data.alcohol);
                            // console.log("Drugs: " + response.data.drugs);
                            // console.log("Sharpness: " + response.data.sharpness);
                            // console.log("Brightness: " + response.data.brightness);
                            // console.log("Faces: " + response.data.faces.length);
                            // for(let i = 1; i <= response.data.faces.length; i++)
                            // {
                            //     console.log("Celebrity: " + JSON.stringify(response.data.faces[i])+ "\n")
                            // }
                            // console.log("Ofensive: " + response.data.offensive.prob);
                            // console.log("Scam: " + response.data.scam.prob);
                            // console.log("Gore: " + response.data.gore.prob);
                            // // nudity: { raw: 0.01, safe: 0.98, partial: 0.01 },


                            // })
                            // .catch(function (error) {
                            // // handle error
                            // if (error.response) console.log(error.response.data);
                            // else console.log(error.message);
                            // });


                            if(j == 0)
                            {
                                try{
                                    const image = await imgur.uploadUrl(await bot.getFileLink(photos.photos[0][2].file_id));
                                    console.log(image.link);
                                    const savedImage = await image.link.split("/");
    
                                    ProfilePhotos.update({
                                        "photo1": savedImage[3],
                                    }, {where: objTg_id});
                                }catch(err){
                                    console.log("Couldn't load this image!");
                                    count++;
                                    try{
                                        const image = await imgur.uploadUrl(await bot.getFileLink(photos.photos[1][2].file_id));
                                        console.log(image.link);
                                        const savedImage = await image.link.split("/");
        
                                        ProfilePhotos.update({
                                            "photo1": savedImage[3],
                                        }, {where: objTg_id});
                                    }catch(err){
                                        console.log("Couldn't load this image!");
                                        count++;
                                        try{
                                            const image = await imgur.uploadUrl(await bot.getFileLink(photos.photos[2][2].file_id));
                                            console.log(image.link);
                                            const savedImage = await image.link.split("/");
            
                                            ProfilePhotos.update({
                                                "photo1": savedImage[3],
                                            }, {where: objTg_id});
                                        }catch(err){
                                            console.log("Couldn't load this image!");
                                            count++;
                                            try{
                                                const image = await imgur.uploadUrl(await bot.getFileLink(photos.photos[3][2].file_id));
                                                console.log(image.link);
                                                const savedImage = await image.link.split("/");
                
                                                ProfilePhotos.update({
                                                    "photo1": savedImage[3],
                                                }, {where: objTg_id});
                                                j = photos.photos.length;
                                            }catch(err){
                                                console.log("Couldn't load this image!");
                                                j = photos.photos.length;
                                            }
                                        }
                                    }
                                }
                            }   
                            else if(j == 1)
                            {
                                if(count == 0)
                                {
                                    try{
                                        const image = await imgur.uploadUrl(await bot.getFileLink(photos.photos[1][2].file_id));
                                        console.log(image.link);
                                        const savedImage = await image.link.split("/");

                                        ProfilePhotos.update({
                                            "photo2": savedImage[3],
                                        }, {where: objTg_id});
                                    }catch(err){
                                        console.log("Couldn't load this image!");
                                        count++;
                                        try{
                                            const image = await imgur.uploadUrl(await bot.getFileLink(photos.photos[2][2].file_id));
                                            console.log(image.link);
                                            const savedImage = await image.link.split("/");
    
                                            ProfilePhotos.update({
                                                "photo2": savedImage[3],
                                            }, {where: objTg_id});
                                        }catch(err){
                                            console.log("Couldn't load this image!");
                                            count++;
                                            try{
                                                const image = await imgur.uploadUrl(await bot.getFileLink(photos.photos[3][2].file_id));
                                                console.log(image.link);
                                                const savedImage = await image.link.split("/");
        
                                                ProfilePhotos.update({
                                                    "photo2": savedImage[3],
                                                }, {where: objTg_id});
                                                j = photos.photos.length;
                                            }catch(err){
                                                console.log("Couldn't load this image!");
                                                j = photos.photos.length;
                                            }
                                        }
                                    }
                                }
                                else if(count == 1)
                                {
                                    try{
                                        const image = await imgur.uploadUrl(await bot.getFileLink(photos.photos[2][2].file_id));
                                        console.log(image.link);
                                        const savedImage = await image.link.split("/");

                                        ProfilePhotos.update({
                                            "photo2": savedImage[3],
                                        }, {where: objTg_id});
                                    }catch(err){
                                        console.log("Couldn't load this image!");
                                        count++;
                                        try{
                                            const image = await imgur.uploadUrl(await bot.getFileLink(photos.photos[3][2].file_id));
                                            console.log(image.link);
                                            const savedImage = await image.link.split("/");
    
                                            ProfilePhotos.update({
                                                "photo2": savedImage[3],
                                            }, {where: objTg_id});
                                            j = photos.photos.length;
                                        }catch(err){
                                            console.log("Couldn't load this image!");
                                            j = photos.photos.length;
                                        }
                                    }
                                }
                                else if(count == 2)
                                {
                                    try{
                                        const image = await imgur.uploadUrl(await bot.getFileLink(photos.photos[3][2].file_id));
                                        console.log(image.link);
                                        const savedImage = await image.link.split("/");

                                        ProfilePhotos.update({
                                            "photo2": savedImage[3],
                                        }, {where: objTg_id});
                                        j = photos.photos.length;
                                    }catch(err){
                                        console.log("Couldn't load this image!");
                                        j = photos.photos.length;
                                    }
                                }
                            }
                            else if(j == 2)
                            {
                                if(count == 0)
                                {
                                    try{
                                        const image = await imgur.uploadUrl(await bot.getFileLink(photos.photos[2][2].file_id));
                                        console.log(image.link);
                                        const savedImage = await image.link.split("/");

                                        ProfilePhotos.update({
                                            "photo3": savedImage[3],
                                        }, {where: objTg_id});
                                    }catch(err){
                                        console.log("Couldn't load this image!");
                                        count++;
                                        try{
                                            const image = await imgur.uploadUrl(await bot.getFileLink(photos.photos[3][2].file_id));
                                            console.log(image.link);
                                            const savedImage = await image.link.split("/");
    
                                            ProfilePhotos.update({
                                                "photo3": savedImage[3],
                                            }, {where: objTg_id});
                                            j = photos.photos.length;
                                        }catch(err){
                                            console.log("Couldn't load this image!");
                                            j = photos.photos.length;
                                        }
                                    }
                                }
                                else if(count == 1)
                                {
                                    try{
                                        const image = await imgur.uploadUrl(await bot.getFileLink(photos.photos[3][2].file_id));
                                        console.log(image.link);
                                        const savedImage = await image.link.split("/");

                                        ProfilePhotos.update({
                                            "photo3": savedImage[3],
                                        }, {where: objTg_id});
                                        j = photos.photos.length;
                                    }catch(err){
                                        console.log("Couldn't load this image!");
                                        j = photos.photos.length;
                                    }
                                }
                               
                            }
                            else if(j == 3)
                            {
                                try{
                                    const image = await imgur.uploadUrl(await bot.getFileLink(photos.photos[3][2].file_id));
                                    console.log(image.link);
                                    const savedImage = await image.link.split("/");

                                    ProfilePhotos.update({
                                        "photo4": savedImage[3],
                                    }, {where: objTg_id});
                                }catch(err){
                                    console.log("Couldn't load this image!");
                                }
                                //to be sure that we are taking only 4 photos
                                j = photos.photos.length;
                            }

                        }

                    });

                    Location.findOne({where: objVerif_code}).then(async verCode => {
                        if(!!verCode)
                        {
                            Location.update( {
                                "tg_id": tg_id,
                                "verif_code": "",
                            }, {where: objVerif_code});
                        }
                    });

                    User.update( {
                        "tg_id": tg_id,
                        "tg_userName": `@${tg_userName}`,
                        "first_name": first_name,
                        "last_name": last_name,
                        "verif_code": "",
                        "balance": "0",
                    }, {where: objVerif_code});

                    
                    // await bot.sendMessage(tg_id,"Hi, I'm the Midnight bot! I'm here to let you spend the best \"Midnight\" in your world ☺️ ");
                    
                    if(code.gender == null)
                    {
                        // await Promise.all([
                        //     bot.sendMessage(tg_id,"Choose your gender: ", {
                        //         reply_markup: {
                        //             inline_keyboard: genderKeyboard
                        //         }
                        //     })
                        // ]).then(result => {
                        //     // botMessage_id = result[0].message_id;
                        //     console.log(result[0].message_id)

                        //     msgToDelete.findOne({where: objTg_id}).then(id => {
                        //         if(!id)
                        //         {
                        //             msgToDelete.create( {
                        //                 "tg_id": tg_id,
                        //                 "botMsg_id": result[0].message_id,
                        //             });
                        //         }
                        //         else
                        //         {
                        //             msgToDelete.update( {
                        //                 "botMsg_id": result[0].message_id,
                        //             }, {where: objTg_id});

                        //             userMessage_id = message.message_id;
                        //             console.log("user message_id: " + userMessage_id);
                        //             bot.deleteMessage(tg_id, userMessage_id);
                        //             userMessage_id = null;
                        //         }
                        //     });
                        // });
                        Promise.all([
                            bot.sendPhoto(tg_id, ("https://i.imgur.com/z4oM4NE.jpeg"), 
                                { 
                                    caption: "Choose your gender: ",
                                    
                                    reply_markup: {
                                        inline_keyboard: genderKeyboard
                                    }
                                })
                            ]).then(result => {
                                // botMessage_id = result[0].message_id;
                                console.log(result[0].message_id)

                                msgToDelete.findOne({where: objTg_id}).then(id => {
                                    if(!id)
                                    {
                                        msgToDelete.create( {
                                            "tg_id": tg_id,
                                            "botMsg_id": result[0].message_id,
                                        });
                                    }
                                    else
                                    {
                                        msgToDelete.update( {
                                            "botMsg_id": result[0].message_id,
                                        }, {where: objTg_id});

                                        userMessage_id = message.message_id;
                                        console.log("user message_id: " + userMessage_id);
                                        bot.deleteMessage(tg_id, userMessage_id);
                                        userMessage_id = null;
                                    }
                                });
                            })
                    }
                    if(code.gender != null && code.interestedIn == null)
                    {
                        
                        // msgToDelete.findOne({where: objTg_id}).then(async msg_id => {
                        //     await Promise.all([
                        //         bot.sendMessage(tg_id, msg_id.botMsg_id, "Choose your interest: ", {
                        //             reply_markup: {
                        //                 inline_keyboard: interestedInKeyboard
                        //             }
                        //         })
                        //     ]).then(result => {
                        //         // botMessage_id = result[0].message_id;
                        //         console.log(result[0].message_id)

                        //         msgToDelete.findOne({where: objTg_id}).then(id => {
                        //             if(!id)
                        //             {
                        //                 msgToDelete.create( {
                        //                     "tg_id": tg_id,
                        //                     "botMsg_id": result[0].message_id,
                        //                 });
                        //             }
                        //             else
                        //             {
                        //                 msgToDelete.update( {
                        //                     "botMsg_id": result[0].message_id,
                        //                 }, {where: objTg_id});

                        //                 userMessage_id = message.message_id;
                        //                 console.log("user message_id: " + userMessage_id);
                        //                 bot.deleteMessage(tg_id, userMessage_id);
                        //                 userMessage_id = null;
                        //             }
                        //         });
                        //     });

                            Promise.all([
                                bot.sendPhoto(tg_id, ("https://i.imgur.com/z4oM4NE.jpeg"), 
                                    { 
                                        caption: "Choose your interest: ",
                                        
                                        reply_markup: {
                                            inline_keyboard: interestedInKeyboard
                                        }
                                    })
                                ]).then(result => {
                                    // botMessage_id = result[0].message_id;
                                    console.log(result[0].message_id)

                                    msgToDelete.findOne({where: objTg_id}).then(id => {
                                        if(!id)
                                        {
                                            msgToDelete.create( {
                                                "tg_id": tg_id,
                                                "botMsg_id": result[0].message_id,
                                            });
                                        }
                                        else
                                        {
                                            msgToDelete.update( {
                                                "botMsg_id": result[0].message_id,
                                            }, {where: objTg_id});

                                            userMessage_id = message.message_id;
                                            console.log("user message_id: " + userMessage_id);
                                            bot.deleteMessage(tg_id, userMessage_id);
                                            userMessage_id = null;
                                        }
                                    });
                                })
                        // });
                    }
                    if((code.gender == "male" && code.interestedIn == "female") || (code.gender == "female" && code.interestedIn == "male"))
                    {
                        // Promise.all([
                        //     bot.sendMessage(tg_id,"Keyboard", {
                        //         reply_markup: {
                        //             inline_keyboard: mainKeyboard
                        //         }
                                
                        //     })
                        // ]).then(result => {
                        //     // botMessage_id = result[0].message_id;
                        //     console.log(result[0].message_id)
        
                        //     msgToDelete.update( {
                        //         "botMsg_id": result[0].message_id,
                        //     }, {where: objTg_id});
                        // });


                        Promise.all([
                            bot.sendPhoto(tg_id, ("https://i.imgur.com/z4oM4NE.jpeg"), 
                                { 
                                    caption: "Keyboard",
                                    
                                    reply_markup: {
                                        inline_keyboard: mainKeyboard
                                    }
                                })
                            ]).then(result => {
                                console.log(result[0].message_id)
            
                                msgToDelete.update( {
                                    "botMsg_id": result[0].message_id,
                                }, {where: objTg_id});
                            })

                    }
                    else if((code.gender == "male" && code.interestedIn == "male"))
                    {
                        // Promise.all([
                        //     bot.sendMessage(tg_id,"Keyboard", {
                        //         reply_markup: {
                        //             inline_keyboard: mainKeyboardM
                        //         }
                                
                        //     })
                        // ]).then(result => {
                        //     // botMessage_id = result[0].message_id;
                        //     console.log(result[0].message_id)
        
                        //     msgToDelete.update( {
                        //         "botMsg_id": result[0].message_id,
                        //     }, {where: objTg_id});
                        // });

                        Promise.all([
                            bot.sendPhoto(tg_id, ("https://i.imgur.com/z4oM4NE.jpeg"), 
                                { 
                                    caption: "Keyboard",
                                    
                                    reply_markup: {
                                        inline_keyboard: mainKeyboard
                                    }
                                })
                            ]).then(result => {
                                console.log(result[0].message_id)
            
                                msgToDelete.update( {
                                    "botMsg_id": result[0].message_id,
                                }, {where: objTg_id});
                            })
                    }
                    else if((code.gender == "female" && code.interestedIn == "female"))
                    {
                        // Promise.all([
                        //     bot.sendMessage(tg_id,"Keyboard", {
                        //         reply_markup: {
                        //             inline_keyboard: mainKeyboardF
                        //         }
                                
                        //     })
                        // ]).then(result => {
                        //     // botMessage_id = result[0].message_id;
                        //     console.log(result[0].message_id)
        
                        //     msgToDelete.update( {
                        //         "botMsg_id": result[0].message_id,
                        //     }, {where: objTg_id});
                        // });

                        Promise.all([
                            bot.sendPhoto(tg_id, ("https://i.imgur.com/z4oM4NE.jpeg"), 
                                { 
                                    caption: "Keyboard",
                                    
                                    reply_markup: {
                                        inline_keyboard: mainKeyboardF
                                    }
                                })
                            ]).then(result => {
                                console.log(result[0].message_id)
            
                                msgToDelete.update( {
                                    "botMsg_id": result[0].message_id,
                                }, {where: objTg_id});
                            })

                    }
                    else if((code.gender == "male" && code.interestedIn == "both men and women") || (code.gender == "female" && code.interestedIn == "both men and women"))
                    {
                        // Promise.all([
                        //     bot.sendMessage(tg_id,"Keyboard", {
                        //         reply_markup: {
                        //             inline_keyboard: mainKeyboardB
                        //         }
                                
                        //     })
                        // ]).then(result => {
                        //     // botMessage_id = result[0].message_id;
                        //     console.log(result[0].message_id)
        
                        //     msgToDelete.update( {
                        //         "botMsg_id": result[0].message_id,
                        //     }, {where: objTg_id});
                        // });

                        Promise.all([
                            bot.sendPhoto(tg_id, ("https://i.imgur.com/z4oM4NE.jpeg"), 
                                { 
                                    caption: "Keyboard",
                                    
                                    reply_markup: {
                                        inline_keyboard: mainKeyboardB
                                    }
                                })
                            ]).then(result => {
                                console.log(result[0].message_id)
            
                                msgToDelete.update( {
                                    "botMsg_id": result[0].message_id,
                                }, {where: objTg_id});
                            })

                    }
                    

                    // msgToDelete.findOne({where: objTg_id}).then(req =>{
                    //     if(!!req)
                    //     {
                    //         if(req.botMsg_id != null){
                    //             console.log(req.botMsg_id);
                    //             bot.deleteMessage(tg_id, req.botMsg_id);
            
                    //         }
                    //     }
                    // });


                }
                else
                {

                    // Promise.all([
                    //     bot.sendMessage(tg_id, "Go visit our website ;)", {
                    //         reply_markup: {
                    //             inline_keyboard: [
                    //                 [
                    //                     {
                    //                     text: "Link",
                    //                     url: "https://google.com"
                    //                     }
                    //                 ]
                    //             ]
                    //         }
                    //     })
                    // ]).then(result => {
            
                    //     // botMessage_id = result[0].message_id;
                    //     console.log(result[0].message_id)

                    //     msgToDelete.findOne({where: objTg_id}).then(id => {
                    //         if(!id)
                    //         {
                    //             msgToDelete.create( {
                    //                 "tg_id": tg_id,
                    //                 "botMsg_id": result[0].message_id,
                    //             });
                    //         }
                    //         else
                    //         {
                    //             msgToDelete.update( {
                    //                 "botMsg_id": result[0].message_id,
                    //             }, {where: objTg_id});

                    //             userMessage_id = message.message_id;
                    //             console.log("user message_id: " + userMessage_id);
                    //             bot.deleteMessage(tg_id, userMessage_id);
                    //             userMessage_id = null;
                    //         }
                    //     });

                    // });

                    Promise.all([
                        bot.sendPhoto(tg_id, ("https://i.imgur.com/z4oM4NE.jpeg"), 
                            { 
                                caption: "Go visit our website ;)",
                                
                                reply_markup: {
                                    inline_keyboard:[
                                        [
                                            {
                                            text: "Link",
                                            url: "https://google.com"
                                            }
                                        ]
                                    ]
                                }
                            })
                        ]).then(result => {
                            // botMessage_id = result[0].message_id;
                            console.log(result[0].message_id)

                            msgToDelete.findOne({where: objTg_id}).then(id => {
                                if(!id)
                                {
                                    msgToDelete.create( {
                                        "tg_id": tg_id,
                                        "botMsg_id": result[0].message_id,
                                    });
                                }
                                else
                                {
                                    msgToDelete.update( {
                                        "botMsg_id": result[0].message_id,
                                    }, {where: objTg_id});

                                    userMessage_id = message.message_id;
                                    console.log("user message_id: " + userMessage_id);
                                    bot.deleteMessage(tg_id, userMessage_id);
                                    userMessage_id = null;
                                }
                            });
                        })
                }
            });
        }
        else
        {

            userMessage_id = message.message_id;
            console.log("user message_id: " + userMessage_id);
            bot.deleteMessage(tg_id, userMessage_id);
            userMessage_id = null;

            // msgToDelete.findOne({where: objTg_id}).then(req =>{
            //     if(!!req)
            //     {
            //         if(req.botMsg_id != null){
            //             console.log(req.botMsg_id);
            //             bot.deleteMessage(tg_id, req.botMsg_id);
    
            //             // msgToDelete.update( {
            //             //     "botMsg_id": null,
            //             // }, {where: objTg_id});
            //         }
            //     }
            // });
            if(id.gender == null)
            {
                // Promise.all([
                //     bot.sendMessage(tg_id,"Choose your gender: ", {
                //         reply_markup: {
                //             inline_keyboard: genderKeyboard
                //         }
                //     })
                // ]).then(result => {
                //     // botMessage_id = result[0].message_id;
                //     console.log(result[0].message_id)

                //     msgToDelete.findOne({where: objTg_id}).then(id => {
                //         if(!id)
                //         {
                //             msgToDelete.create( {
                //                 "tg_id": tg_id,
                //                 "botMsg_id": result[0].message_id,
                //             });
                //         }
                //         else
                //         {
                //             msgToDelete.update( {
                //                 "botMsg_id": result[0].message_id,
                //             }, {where: objTg_id});

                //         }
                //     });
                // });

                Promise.all([
                    bot.sendPhoto(tg_id, ("https://i.imgur.com/z4oM4NE.jpeg"), 
                        { 
                            caption: "Choose your gender: ",
                            
                            reply_markup: {
                                inline_keyboard: genderKeyboard
                            }
                        })
                    ]).then(result => {
                        // botMessage_id = result[0].message_id;
                        console.log(result[0].message_id)

                        msgToDelete.findOne({where: objTg_id}).then(id => {
                            if(!id)
                            {
                                msgToDelete.create( {
                                    "tg_id": tg_id,
                                    "botMsg_id": result[0].message_id,
                                });
                            }
                            else
                            {
                                msgToDelete.update( {
                                    "botMsg_id": result[0].message_id,
                                }, {where: objTg_id});

                            }
                        });
                    })
            }
            else if(id.interestedIn == null)
            {
                // Promise.all([
                //     bot.sendMessage(tg_id,"Choose your interest: ", {
                //         reply_markup: {
                //             inline_keyboard: interestedInKeyboard
                //         }
                //     })
                // ]).then(result => {
                //     // botMessage_id = result[0].message_id;
                //     console.log(result[0].message_id)

                //     msgToDelete.findOne({where: objTg_id}).then(id => {
                //         if(!id)
                //         {
                //             msgToDelete.create( {
                //                 "tg_id": tg_id,
                //                 "botMsg_id": result[0].message_id,
                //             });
                //         }
                //         else
                //         {
                //             msgToDelete.update( {
                //                 "botMsg_id": result[0].message_id,
                //             }, {where: objTg_id});
                //         }
                //     });
                // });

                Promise.all([
                    bot.sendPhoto(tg_id, ("https://i.imgur.com/z4oM4NE.jpeg"), 
                        { 
                            caption: "Choose your interest: ",
                            
                            reply_markup: {
                                inline_keyboard: interestedInKeyboard
                            }
                        })
                    ]).then(result => {
                        // botMessage_id = result[0].message_id;
                        console.log(result[0].message_id)

                        msgToDelete.findOne({where: objTg_id}).then(id => {
                            if(!id)
                            {
                                msgToDelete.create( {
                                    "tg_id": tg_id,
                                    "botMsg_id": result[0].message_id,
                                });
                            }
                            else
                            {
                                msgToDelete.update( {
                                    "botMsg_id": result[0].message_id,
                                }, {where: objTg_id});

                            }
                        });
                    })
            }
            else if((id.gender == "male" && id.interestedIn == "women") || (id.gender == "female" && id.interestedIn == "men"))
            {
                // Promise.all([
                //     bot.sendMessage(tg_id,"Keyboard", {
                //         reply_markup: {
                //             inline_keyboard: mainKeyboard
                //         }
                        
                //     })
                // ]).then(result => {
                //     // botMessage_id = result[0].message_id;
                //     console.log(result[0].message_id)

                //     msgToDelete.update( {
                //         "botMsg_id": result[0].message_id,
                //     }, {where: objTg_id});
                // });

                Promise.all([
                bot.sendPhoto(tg_id, ("https://i.imgur.com/z4oM4NE.jpeg"), 
                    { 
                        caption: "Keyboard",
                        
                        reply_markup: {
                            inline_keyboard: mainKeyboard
                        }
                    })
                ]).then(result => {
                    console.log(result[0].message_id)

                    msgToDelete.update( {
                        "botMsg_id": result[0].message_id,
                    }, {where: objTg_id});
                })
            }
            else if((id.gender == "male" && id.interestedIn == "men"))
            {
                // Promise.all([
                //     bot.sendMessage(tg_id,"Keyboard", {
                //         reply_markup: {
                //             inline_keyboard: mainKeyboardM
                //         }
                        
                //     })
                // ]).then(result => {
                //     // botMessage_id = result[0].message_id;
                //     console.log(result[0].message_id)

                //     msgToDelete.update( {
                //         "botMsg_id": result[0].message_id,
                //     }, {where: objTg_id});
                // });

                Promise.all([
                    bot.sendPhoto(tg_id, ("https://i.imgur.com/z4oM4NE.jpeg"), 
                        { 
                            caption: "Keyboard",
                            
                            reply_markup: {
                                inline_keyboard: mainKeyboardM
                            }
                        })
                    ]).then(result => {
                        console.log(result[0].message_id)
    
                        msgToDelete.update( {
                            "botMsg_id": result[0].message_id,
                        }, {where: objTg_id});
                    })
            }
            else if((id.gender == "female" && id.interestedIn == "women"))
            {
                // Promise.all([
                //     bot.sendMessage(tg_id,"Keyboard", {
                //         reply_markup: {
                //             inline_keyboard: mainKeyboardF
                //         }
                        
                //     })
                // ]).then(result => {
                //     // botMessage_id = result[0].message_id;
                //     console.log(result[0].message_id)

                //     msgToDelete.update( {
                //         "botMsg_id": result[0].message_id,
                //     }, {where: objTg_id});
                // });

                Promise.all([
                    bot.sendPhoto(tg_id, ("https://i.imgur.com/z4oM4NE.jpeg"), 
                        { 
                            caption: "Keyboard",
                            
                            reply_markup: {
                                inline_keyboard: mainKeyboardF
                            }
                        })
                    ]).then(result => {
                        console.log(result[0].message_id)
    
                        msgToDelete.update( {
                            "botMsg_id": result[0].message_id,
                        }, {where: objTg_id});
                    })
            }
            else if((id.gender == "male" && id.interestedIn == "both men and women") || (id.gender == "female" && id.interestedIn == "both men and women"))
            {
                // Promise.all([
                //     bot.sendMessage(tg_id,"Keyboard", {
                //         reply_markup: {
                //             inline_keyboard: mainKeyboardB
                //         }
                        
                //     })
                // ]).then(result => {
                //     // botMessage_id = result[0].message_id;
                //     console.log(result[0].message_id)

                //     msgToDelete.update( {
                //         "botMsg_id": result[0].message_id,
                //     }, {where: objTg_id});
                // });

                Promise.all([
                    bot.sendPhoto(tg_id, ("https://i.imgur.com/z4oM4NE.jpeg"), 
                        { 
                            caption: "Keyboard",
                            
                            reply_markup: {
                                inline_keyboard: mainKeyboardB
                            }
                        })
                    ]).then(result => {
                        console.log(result[0].message_id)
    
                        msgToDelete.update( {
                            "botMsg_id": result[0].message_id,
                        }, {where: objTg_id});
                    })
            }
        }
    });
});

bot.on('callback_query', async query => {

    const tg_id = query.message.chat.id;

    const objTg_id = Object.assign({"tg_id": tg_id});
    
    if(query.data == 'profile')
    {
        msgToDelete.findOne({where: objTg_id}).then(async req =>{
            if(!!req)
            {
                if(req.botMsg_id != null){
                    console.log("0");
                    console.log(req.botMsg_id);
                    await bot.deleteMessage(tg_id, req.botMsg_id);
                }
            }
        });
    }
    else if(query.data == 'backFromProfile')
    {
        msgToDelete.findOne({where: objTg_id}).then(async req =>{
            if(!!req)
            {
                if(req.botMsg_id != null){
                    console.log(req.botMsg_id);
                    await bot.deleteMessage(tg_id, req.botMsg_id);
                }
                if(req.botMsg2_id != null){
                    console.log(req.botMsg2_id);
                    await bot.deleteMessage(tg_id, req.botMsg2_id);

                    msgToDelete.update( {
                        "botMsg2_id": null,
                    }, {where: objTg_id});
                }
                if(req.botMsg3_id != null){
                    console.log(req.botMsg3_id);
                    await bot.deleteMessage(tg_id, req.botMsg3_id);

                    msgToDelete.update( {
                        "botMsg3_id": null,
                    }, {where: objTg_id});
                }
                if(req.botMsg4_id != null){
                    console.log(req.botMsg4_id);
                    await bot.deleteMessage(tg_id, req.botMsg4_id);

                    msgToDelete.update( {
                        "botMsg4_id": null,
                    }, {where: objTg_id});   
                }
                if(req.botMsg5_id != null){
                    console.log(req.botMsg5_id);
                    await bot.deleteMessage(tg_id, req.botMsg5_id);

                    msgToDelete.update( {
                        "botMsg5_id": null,
                    }, {where: objTg_id});   
                }
            }
        });
    }

        switch(query.data)
        {
            case 'maleGender':

                await User.update( {
                    "gender": "male",
                }, {where: objTg_id});

                // msgToDelete.findOne({where: objTg_id}).then(async msg_id => {
                //     await Promise.all([
                //         bot.editMessageText("Choose your interest: ", {
                //             chat_id: tg_id,
                //             message_id: msg_id.botMsg_id,
                //             reply_markup: {
                //                 inline_keyboard: interestedInKeyboard
                //             }
                //         })
                //     ]).then(result => {
                //         // botMessage_id = result[0].message_id;
                //         console.log(result[0].message_id)

                //         msgToDelete.update( {
                //             "botMsg_id": result[0].message_id,
                //         }, {where: objTg_id});

                //     });
                // });

                // msgToDelete.findOne({where: objTg_id}).then(async msg_id => {
                //     await Promise.all([
                //         bot.editMessageMedia("Choose your interest: ", {
                //             chat_id: tg_id,
                //             message_id: msg_id.botMsg_id,
                //             media: "https://i.imgur.com/z4oM4NE.jpeg",
                //             reply_markup: {
                //                 inline_keyboard: interestedInKeyboard
                //             }
                //         })
                //     ]).then(result => {
                //         // botMessage_id = result[0].message_id;
                //         console.log(result[0].message_id)

                //         msgToDelete.update( {
                //             "botMsg_id": result[0].message_id,
                //         }, {where: objTg_id});

                //     });
                // });
                msgToDelete.findOne({where: objTg_id}).then(async msg_id => {
                    await Promise.all([
                        bot.editMessageMedia({
                            type: 'photo', 
                            media: "https://i.imgur.com/z4oM4NE.jpeg",
                            caption: "Choose your interest: ",
                        },
                        {
                            chat_id: tg_id,
                            message_id: msg_id.botMsg_id,
                            reply_markup: {
                                inline_keyboard: interestedInKeyboard
                            }
                        })

                    ]).then(result => {
                        // botMessage_id = result[0].message_id;
                        console.log(result[0].message_id)

                        msgToDelete.update( {
                            "botMsg_id": result[0].message_id,
                        }, {where: objTg_id});

                    });
                });

            break
            case 'femaleGender':

                await User.update( {
                    "gender": "female",
                }, {where: objTg_id});

                // msgToDelete.findOne({where: objTg_id}).then(async msg_id => {
                //     await Promise.all([
                //         bot.editMessageText("Choose your interest: ", {
                //             chat_id: tg_id,
                //             message_id: msg_id.botMsg_id,
                //             reply_markup: {
                //                 inline_keyboard: interestedInKeyboard
                //             }
                //         })
                //     ]).then(result => {
                //         // botMessage_id = result[0].message_id;
                //         console.log(result[0].message_id)

                //         msgToDelete.update( {
                //             "botMsg_id": result[0].message_id,
                //         }, {where: objTg_id});

                //     });
                // });

                msgToDelete.findOne({where: objTg_id}).then(async msg_id => {
                    await Promise.all([
                        bot.editMessageMedia({
                            type: 'photo', 
                            media: "https://i.imgur.com/z4oM4NE.jpeg",
                            caption: "Choose your interest: ",
                        },
                        {
                            chat_id: tg_id,
                            message_id: msg_id.botMsg_id,
                            reply_markup: {
                                inline_keyboard: interestedInKeyboard
                            }
                        })
                    ]).then(result => {
                        // botMessage_id = result[0].message_id;
                        console.log(result[0].message_id)

                        msgToDelete.update( {
                            "botMsg_id": result[0].message_id,
                        }, {where: objTg_id});

                    });
                });
                
            break
            case 'maleOrientated':
                
                await User.update( {
                    "interestedIn": "men",
                }, {where: objTg_id});

                User.findOne({where: objTg_id}).then(id => {
                    if(id.gender == "male")
                    {
                        // msgToDelete.findOne({where: objTg_id}).then(async msg_id => {
                        //     await Promise.all([
                        //         bot.editMessageText("Keyboard: ", {
                        //             chat_id: tg_id,
                        //             message_id: msg_id.botMsg_id,
                        //             reply_markup: {
                        //                 inline_keyboard: mainKeyboardM
                        //             }
                        //         })
                        //     ]).then(result => {
                        //         // botMessage_id = result[0].message_id;
                        //         console.log(result[0].message_id)
            
                        //         msgToDelete.update( {
                        //             "botMsg_id": result[0].message_id,
                        //         }, {where: objTg_id});
            
                        //     });
                        // });

                        msgToDelete.findOne({where: objTg_id}).then(async msg_id => {
                            await Promise.all([
                                bot.editMessageMedia({
                                    type: 'photo', 
                                    media: "https://i.imgur.com/z4oM4NE.jpeg",
                                    caption: "Choose your interest: ",
                                },
                                {
                                    chat_id: tg_id,
                                    message_id: msg_id.botMsg_id,
                                    reply_markup: {
                                        inline_keyboard: mainKeyboardM
                                    }
                                })
                            ]).then(result => {
                                // botMessage_id = result[0].message_id;
                                console.log(result[0].message_id)
        
                                msgToDelete.update( {
                                    "botMsg_id": result[0].message_id,
                                }, {where: objTg_id});
        
                            });
                        });

                    }
                    else if(id.gender == "female")
                    {

                        // msgToDelete.findOne({where: objTg_id}).then(async msg_id => {
                        //     await Promise.all([
                        //         bot.editMessageText("Keyboard: ", {
                        //             chat_id: tg_id,
                        //             message_id: msg_id.botMsg_id,
                        //             reply_markup: {
                        //                 inline_keyboard: mainKeyboard
                        //             }
                        //         })
                        //     ]).then(result => {
                        //         // botMessage_id = result[0].message_id;
                        //         console.log(result[0].message_id)
            
                        //         msgToDelete.update( {
                        //             "botMsg_id": result[0].message_id,
                        //         }, {where: objTg_id});
            
                        //     });
                        // });

                        msgToDelete.findOne({where: objTg_id}).then(async msg_id => {
                            await Promise.all([
                                bot.editMessageMedia({
                                    type: 'photo', 
                                    media: "https://i.imgur.com/z4oM4NE.jpeg",
                                    caption: "Choose your interest: ",
                                },
                                {
                                    chat_id: tg_id,
                                    message_id: msg_id.botMsg_id,
                                    reply_markup: {
                                        inline_keyboard: mainKeyboard
                                    }
                                })
                            ]).then(result => {
                                // botMessage_id = result[0].message_id;
                                console.log(result[0].message_id)
        
                                msgToDelete.update( {
                                    "botMsg_id": result[0].message_id,
                                }, {where: objTg_id});
        
                            });
                        });
                    }
                });
                
                break;
            case 'femaleOrientated':

                await User.update( {
                    "interestedIn": "women",
                }, {where: objTg_id});

                User.findOne({where: objTg_id}).then(id => {
                    if(id.gender == "male")
                    {
                        // msgToDelete.findOne({where: objTg_id}).then(async msg_id => {
                        //     await Promise.all([
                        //         bot.editMessageText("Keyboard: ", {
                        //             chat_id: tg_id,
                        //             message_id: msg_id.botMsg_id,
                        //             reply_markup: {
                        //                 inline_keyboard: mainKeyboard
                        //             }
                        //         })
                        //     ]).then(result => {
                        //         // botMessage_id = result[0].message_id;
                        //         console.log(result[0].message_id)
            
                        //         msgToDelete.update( {
                        //             "botMsg_id": result[0].message_id,
                        //         }, {where: objTg_id});
            
                        //     });
                        // });

                        msgToDelete.findOne({where: objTg_id}).then(async msg_id => {
                            await Promise.all([
                                bot.editMessageMedia({
                                    type: 'photo', 
                                    media: "https://i.imgur.com/z4oM4NE.jpeg",
                                    caption: "Choose your interest: ",
                                },
                                {
                                    chat_id: tg_id,
                                    message_id: msg_id.botMsg_id,
                                    reply_markup: {
                                        inline_keyboard: mainKeyboard
                                    }
                                })
                            ]).then(result => {
                                // botMessage_id = result[0].message_id;
                                console.log(result[0].message_id)
        
                                msgToDelete.update( {
                                    "botMsg_id": result[0].message_id,
                                }, {where: objTg_id});
        
                            });
                        });
                    }
                    else if(id.gender == "female")
                    {
                        // msgToDelete.findOne({where: objTg_id}).then(async msg_id => {
                        //     await Promise.all([
                        //         bot.editMessageText("Keyboard: ", {
                        //             chat_id: tg_id,
                        //             message_id: msg_id.botMsg_id,
                        //             reply_markup: {
                        //                 inline_keyboard: mainKeyboardF
                        //             }
                        //         })
                        //     ]).then(result => {
                        //         // botMessage_id = result[0].message_id;
                        //         console.log(result[0].message_id)
            
                        //         msgToDelete.update( {
                        //             "botMsg_id": result[0].message_id,
                        //         }, {where: objTg_id});
            
                        //     });
                        // });

                        msgToDelete.findOne({where: objTg_id}).then(async msg_id => {
                            await Promise.all([
                                bot.editMessageMedia({
                                    type: 'photo', 
                                    media: "https://i.imgur.com/z4oM4NE.jpeg",
                                    caption: "Choose your interest: ",
                                },
                                {
                                    chat_id: tg_id,
                                    message_id: msg_id.botMsg_id,
                                    reply_markup: {
                                        inline_keyboard: mainKeyboardF
                                    }
                                })
                            ]).then(result => {
                                // botMessage_id = result[0].message_id;
                                console.log(result[0].message_id)
        
                                msgToDelete.update( {
                                    "botMsg_id": result[0].message_id,
                                }, {where: objTg_id});
        
                            });
                        });
                    }
                });

                break;
            case 'bothOrientated':

                await User.update( {
                    "interestedIn": "both men and women",
                }, {where: objTg_id});

                // msgToDelete.findOne({where: objTg_id}).then(async msg_id => {
                //     await Promise.all([
                //         bot.editMessageText("Keyboard: ", {
                //             chat_id: tg_id,
                //             message_id: msg_id.botMsg_id,
                //             reply_markup: {
                //                 inline_keyboard: mainKeyboardB
                //             }
                //         })
                //     ]).then(result => {
                //         // botMessage_id = result[0].message_id;
                //         console.log(result[0].message_id)

                //         msgToDelete.update( {
                //             "botMsg_id": result[0].message_id,
                //         }, {where: objTg_id});

                //     });
                // });

                msgToDelete.findOne({where: objTg_id}).then(async msg_id => {
                    await Promise.all([
                        bot.editMessageMedia({
                            type: 'photo', 
                            media: "https://i.imgur.com/z4oM4NE.jpeg",
                            caption: "Choose your interest: ",
                        },
                        {
                            chat_id: tg_id,
                            message_id: msg_id.botMsg_id,
                            reply_markup: {
                                inline_keyboard: mainKeyboardB
                            }
                        })
                    ]).then(result => {
                        // botMessage_id = result[0].message_id;
                        console.log(result[0].message_id)

                        msgToDelete.update( {
                            "botMsg_id": result[0].message_id,
                        }, {where: objTg_id});

                    });
                });

                break;
            case 'findingMate':



                // User.findOne({where: objTg_id}).then(id => {
                
                // bot.sendPhoto(tg_id, ("https://i.imgur.com/" + id.photo1), caption  = "", {
                //         reply_markup: {
                //             inline_keyboard: findingMateKeyboard
                //         }
                //     })

                // });
                // const displayedObjTg_id = Object.assign({"id": 1, "tg_id": 2});
                // User.findOne({where: displayedObjTg_id }).then(id => {
                //     const displayedObjTg_id = Object.assign({"tg_id": element.tg_id});
                //     await ProfilePhotos.findOne({where: displayedObjTg_id, objTg_id}).then(async req =>{
                //         let photos = []
                //         let resultMap = null;
                //         if(!!req.photo1){
                //             //photo #1
                //             photos.push("https://i.imgur.com/" + req.photo1);
                //         }
                //         if(!!req.photo2){
                //                 //photo #2
                //                 photos.push("https://i.imgur.com/" + req.photo2);
                //         }
                //         if(!!req.photo3){
                //                 //photo #3
                //                 photos.push("https://i.imgur.com/" + req.photo3);
                //         }
                //         if(!!req.photo4){
                //                 //photo #4
                //                 photos.push("https://i.imgur.com/" + req.photo4);
                //         }
                //         if(photos != [])
                //         {
                //             resultMap = photos.map(photo => {
                //                 return{
                //                     type: 'photo',
                //                     media: photo,
                //                 }
                //             });
                //             console.log(resultMap);
                //         }
        
        
        
                //         if(resultMap != null)
                //         {
                //             await bot.sendMediaGroup(tg_id, resultMap).then(result => {
                //                 // botMessage_id = result[0].message_id;
                //                 if(!result)
                //                 {
                //                     return false;
                //                 }
                //                 if(!!req.photo4){
                //                 //photo 4
                //                 msgToDelete.update( {
                //                     "botMsg2_id": result[0].message_id,
                //                     "botMsg3_id": result[1].message_id,
                //                     "botMsg4_id": result[2].message_id,
                //                     "botMsg5_id": result[3].message_id,
                //                 }, {where: objTg_id});
                //                 }
                //                 else if(!!req.photo3){
                //                         //photo 3
                //                         msgToDelete.update( {
                //                             "botMsg2_id": result[0].message_id,
                //                             "botMsg3_id": result[1].message_id,
                //                             "botMsg4_id": result[2].message_id,
                //                         }, {where: objTg_id});
                //                 }
                //                 else if(!!req.photo2){
                //                         //photo 2
                //                         msgToDelete.update( {
                //                             "botMsg2_id": result[0].message_id,
                //                             "botMsg3_id": result[1].message_id,
                //                         }, {where: objTg_id});
                //                 }
                //                 else if(!!req.photo1){
                //                         //photo 1
                //                         msgToDelete.update( {
                //                             "botMsg2_id": result[0].message_id,
                //                         }, {where: objTg_id});
                //                 }
                //                 else{
                //                     console.log("none");
                //                 }
                //             });
                //         }
                        // User.findOne({where: objTg_id}).then(id => {
        
                            // msgToDelete.findOne({where: objTg_id}).then(async msg_id => {
                            //     await Promise.all([
                            //         bot.editMessageText("Keyboard: ", {
                            //             chat_id: tg_id,
                            //             message_id: msg_id.botMsg_id,
                            //             reply_markup: {
                            //                 inline_keyboard: findingMateKeyboard
                            //             }
                            //         })
                            //     ]).then(result => {
                            //         // botMessage_id = result[0].message_id;
                            //         console.log(result[0].message_id)
                
                            //         msgToDelete.update( {
                            //             "botMsg_id": result[0].message_id,
                            //         }, {where: objTg_id});
                
                            //     });
                            // });

                        msgToDelete.findOne({where: objTg_id}).then(async msg_id => {
                            await Promise.all([
                                bot.editMessageMedia({
                                    type: 'photo', 
                                    media: "https://i.imgur.com/z4oM4NE.jpeg",
                                    caption: "Choose your interest: ",
                                },
                                {
                                    chat_id: tg_id,
                                    message_id: msg_id.botMsg_id,
                                    reply_markup: {
                                        inline_keyboard: findingMateKeyboard
                                    }
                                })
                            ]).then(result => {
                                // botMessage_id = result[0].message_id;
                                console.log(result[0].message_id)
        
                                msgToDelete.update( {
                                    "botMsg_id": result[0].message_id,
                                }, {where: objTg_id});
        
                            });
                        });
                        // });
                //     });
                // });

            break
            case 'sympothy':
                // msgToDelete.findOne({where: objTg_id}).then(async msg_id => {
                //     await Promise.all([
                //         bot.editMessageText("Keyboard: ", {
                //             chat_id: tg_id,
                //             message_id: msg_id.botMsg_id,
                //             reply_markup: {
                //                 inline_keyboard: sympothyKeyboard
                //             }
                //         })
                //     ]).then(result => {
                //         // botMessage_id = result[0].message_id;
                //         console.log(result[0].message_id)

                //         msgToDelete.update( {
                //             "botMsg_id": result[0].message_id,
                //         }, {where: objTg_id});

                //     });
                // });

                msgToDelete.findOne({where: objTg_id}).then(async msg_id => {
                    await Promise.all([
                        bot.editMessageMedia({
                            type: 'photo', 
                            media: "https://i.imgur.com/z4oM4NE.jpeg",
                            caption: "Choose your interest: ",
                        },
                        {
                            chat_id: tg_id,
                            message_id: msg_id.botMsg_id,
                            reply_markup: {
                                inline_keyboard: sympothyKeyboard
                            }
                        })
                    ]).then(result => {
                        // botMessage_id = result[0].message_id;
                        console.log(result[0].message_id)

                        msgToDelete.update( {
                            "botMsg_id": result[0].message_id,
                        }, {where: objTg_id});

                    });
                });
            break
            case 'tariffPlans':
                // msgToDelete.findOne({where: objTg_id}).then(async msg_id => {
                //     await Promise.all([
                //         bot.editMessageText("Keyboard: ", {
                //             chat_id: tg_id,
                //             message_id: msg_id.botMsg_id,
                //             reply_markup: {
                //                 inline_keyboard: tariffPlansKeyboard
                //             }
                //         })
                //     ]).then(result => {
                //         // botMessage_id = result[0].message_id;
                //         console.log(result[0].message_id)

                //         msgToDelete.update( {
                //             "botMsg_id": result[0].message_id,
                //         }, {where: objTg_id});

                //     });
                // });

                msgToDelete.findOne({where: objTg_id}).then(async msg_id => {
                    await Promise.all([
                        bot.editMessageMedia({
                            type: 'photo', 
                            media: "https://i.imgur.com/z4oM4NE.jpeg",
                            caption: "Choose your interest: ",
                        },
                        {
                            chat_id: tg_id,
                            message_id: msg_id.botMsg_id,
                            reply_markup: {
                                inline_keyboard: tariffPlansKeyboard
                            }
                        })
                    ]).then(result => {
                        // botMessage_id = result[0].message_id;
                        console.log(result[0].message_id)

                        msgToDelete.update( {
                            "botMsg_id": result[0].message_id,
                        }, {where: objTg_id});

                    });
                });
            break
            case 'profile':
                User.findOne({where: objTg_id}).then(async id => {
                    await ProfilePhotos.findOne({where: objTg_id}).then(async req =>{
                        
                        // try{
                            if(!(req.photo1) && !(req.photo2) && !(req.photo3) && !(req.photo4)){
                                        
                                bot.sendPhoto(tg_id, ("https://i.imgur.com/z4oM4NE.jpeg"), 
                                { 
                                    caption: `${id.first_name} \nYou are interested in ${id.interestedIn}`,
                                    
                                    reply_markup: {
                                        inline_keyboard: profileKeyboard
                                    }
                                }).then(result => {
                                    console.log(result[0].message_id)

                                    msgToDelete.update( {
                                        "botMsg_id": result[0].message_id,
                                    }, {where: objTg_id});
                                })
                            }
                            else if(!!(req.photo1) && !(req.photo2) && !(req.photo3) && !(req.photo4)){
                                console.log("1");  
                                bot.sendPhoto(tg_id, ("https://i.imgur.com/" + req.photo1), 
                                { 
                                    caption: `${id.first_name} \nYou are interested in ${id.interestedIn}`,
                                    
                                    reply_markup: {
                                        inline_keyboard: profileKeyboard
                                    }
                                }).then(result => {
                                    console.log(result.message_id)

                                    msgToDelete.update( {
                                        "botMsg_id": result.message_id,
                                    }, {where: objTg_id});
                                })
                            }
                            else
                            {
                                let photos = []
                                let resultMap = null;
                                if(!!(req.photo1)){
                                    //photo #1
                                    photos.push("https://i.imgur.com/" + req.photo1);
                                }
                                if(!!(req.photo2)){
                                        //photo #2
                                        photos.push("https://i.imgur.com/" + req.photo2);
                                }
                                if(!!req.photo3){
                                        //photo #3
                                        photos.push("https://i.imgur.com/" + req.photo3);
                                }
                                if(!!(req.photo4)){
                                        //photo #4
                                        photos.push("https://i.imgur.com/" + req.photo4);
                                }
                                if(photos != [])
                                {
                                    resultMap = photos.map(photo => {
                                        return{
                                            type: 'photo',
                                            media: photo,
                                            caption: "blala",
                                            reply_markup: {
                                                inline_keyboard: profileKeyboard
                                            }
                                        }
                                    });
                                    console.log(resultMap);
                                }


                                if(resultMap != null)
                                {
                                    try{
                                            await bot.sendMediaGroup(tg_id, resultMap, {
                                                reply_markup: {
                                                    inline_keyboard: profileKeyboard
                                                }
                                            }).then(result => {
                                                // botMessage_id = result[0].message_id;
                                                // console.log(result[0].message_id);
                        
                                                if(!!req.photo4){
                                                        //photo 4
                                                        msgToDelete.update( {
                                                            "botMsg2_id": result[0].message_id,
                                                            "botMsg3_id": result[1].message_id,
                                                            "botMsg4_id": result[2].message_id,
                                                            "botMsg5_id": result[3].message_id,
                                                        }, {where: objTg_id});
                                                }
                                                else if(!!req.photo3){
                                                        //photo 3
                                                        msgToDelete.update( {
                                                            "botMsg2_id": result[0].message_id,
                                                            "botMsg3_id": result[1].message_id,
                                                            "botMsg4_id": result[2].message_id,
                                                        }, {where: objTg_id});
                                                }
                                                else if(!!req.photo2){
                                                        //photo 2
                                                        msgToDelete.update( {
                                                            "botMsg2_id": result[0].message_id,
                                                            "botMsg3_id": result[1].message_id,
                                                        }, {where: objTg_id});
                                                }
                                                else if(!!req.photo1){
                                                        //photo 1
                                                        msgToDelete.update( {
                                                            "botMsg2_id": result[0].message_id,
                                                        }, {where: objTg_id});
                                                }
                                                else{
                                                    console.log("none");
                                                }

                                                // Promise.all([
                                                //     bot.sendMessage(tg_id,`${id.first_name} \nYou are interested in ${id.interestedIn}`, {
                                                //         reply_markup: {
                                                //             inline_keyboard: profileKeyboard
                                                //         }
                                                        
                                                //     })
                                                // ]).then(result => {
                                                //     // botMessage_id = result[0].message_id;
                                                //     console.log(result[0].message_id)
                                
                                                //     msgToDelete.update( {
                                                //         "botMsg_id": result[0].message_id,
                                                //     }, {where: objTg_id});
                                                // });

                                                Promise.all([
                                                    bot.sendPhoto(tg_id, ("https://i.imgur.com/z4oM4NE.jpeg"), 
                                                        { 
                                                            caption: `${id.first_name} \nYou are interested in ${id.interestedIn}`,
                                                            
                                                            reply_markup: {
                                                                inline_keyboard: profileKeyboard
                                                            }
                                                        })
                                                    ]).then(result => {
                                                        console.log(result[0].message_id);
                                    
                                                        msgToDelete.update( {
                                                            "botMsg_id": result[0].message_id,
                                                        }, {where: objTg_id});
                                                    })
                                                
                                            });
                                    }catch(err)
                                    {
                                        console.log("Error!!")
                                        bot.sendPhoto(tg_id, ("https://i.imgur.com/z4oM4NE.jpeg"), 
                                        { 
                                            caption: `${id.first_name} \nYou are interested in ${id.interestedIn}`,
                                            
                                            reply_markup: {
                                                inline_keyboard: profileKeyboard
                                            }
                                        }).then(result => {
                                            console.log(result[0].message_id)

                                            msgToDelete.update( {
                                                "botMsg_id": result[0].message_id,
                                            }, {where: objTg_id});
                                        })
                                    }
                                }
                            }
                        // }
                        // catch(err)
                        // {
                        //     console.log("Something went wrong!!!!")
                        // }
                    });  
                    
                });

            break
            case 'edit':

                User.findOne({where: objTg_id}).then(async id => {
                    await ProfilePhotos.findOne({where: objTg_id}).then(async req =>{
                            
                        if(!(req.photo1) && !(req.photo2) && !(req.photo3) && !(req.photo4)){
                                    
                            msgToDelete.findOne({where: objTg_id}).then(async req =>{
                                if(!!req)
                                {
                                    if(req.botMsg_id != null){
                                        console.log(req.botMsg_id);
                                        await bot.deleteMessage(tg_id, req.botMsg_id);
                                    }
                                }
                            });

                            bot.sendPhoto(tg_id, ("https://i.imgur.com/z4oM4NE.jpeg"), 
                            { 
                                caption: `${id.first_name} \nYou are interested in ${id.interestedIn}`,
                                
                                reply_markup: {
                                    inline_keyboard: editKeyboard
                                }
                            }).then(result => {
                                console.log(result[0].message_id)

                                msgToDelete.update( {
                                    "botMsg_id": result[0].message_id,
                                }, {where: objTg_id});
                            })
                        }
                        else if(!!(req.photo1) && !(req.photo2) && !(req.photo3) && !(req.photo4)){
                                    
                            msgToDelete.findOne({where: objTg_id}).then(async req =>{
                                if(!!req)
                                {
                                    if(req.botMsg_id != null){
                                        console.log(req.botMsg_id);
                                        await bot.deleteMessage(tg_id, req.botMsg_id);
                                    }
                                }
                            });

                            bot.sendPhoto(tg_id, ("https://i.imgur.com/" + req.photo1), 
                            { 
                                caption: `${id.first_name} \nYou are interested in ${id.interestedIn}`,
                                
                                reply_markup: {
                                    inline_keyboard: editKeyboard
                                }
                            }).then(result => {
                                console.log(result[0].message_id)

                                msgToDelete.update( {
                                    "botMsg_id": result[0].message_id,
                                }, {where: objTg_id});
                            })
                        }
                        else
                        {
                            msgToDelete.findOne({where: objTg_id}).then(async msg_id => {
                                // await Promise.all([
                                //     bot.editMessageText(`${id.first_name} \nYou are interested in ${id.interestedIn}`, {
                                //         chat_id: tg_id,
                                //         message_id: msg_id.botMsg_id,
                                //         reply_markup: {
                                //             inline_keyboard: editKeyboard
                                //         }
                                //     })
                                // ]).then(result => {
                                //     // botMessage_id = result[0].message_id;
                                //     console.log(result[0].message_id)
            
                                //     msgToDelete.update( {
                                //         "botMsg_id": result[0].message_id,
                                //     }, {where: objTg_id});

                                // });
                                if(!msg_id.botMsg2_id || !msg_id.botMsg3_id  || !msg_id.botMsg4_id || !msg_id.botMsg5_id)
                                {
                                    msgToDelete.findOne({where: objTg_id}).then(async req =>{
                                        if(!!req)
                                        {
                                            if(req.botMsg_id != null){
                                                console.log(req.botMsg_id);
                                                await bot.deleteMessage(tg_id, req.botMsg_id);
                                            }
                                            if(req.botMsg2_id != null){
                                                console.log(req.botMsg2_id);
                                                await bot.deleteMessage(tg_id, req.botMsg2_id);
                            
                                                msgToDelete.update( {
                                                    "botMsg2_id": null,
                                                }, {where: objTg_id});
                                            }
                                            if(req.botMsg3_id != null){
                                                console.log(req.botMsg3_id);
                                                await bot.deleteMessage(tg_id, req.botMsg3_id);
                            
                                                msgToDelete.update( {
                                                    "botMsg3_id": null,
                                                }, {where: objTg_id});
                                            }
                                            if(req.botMsg4_id != null){
                                                console.log(req.botMsg4_id);
                                                await bot.deleteMessage(tg_id, req.botMsg4_id);
                            
                                                msgToDelete.update( {
                                                    "botMsg4_id": null,
                                                }, {where: objTg_id});   
                                            }
                                            if(req.botMsg5_id != null){
                                                console.log(req.botMsg5_id);
                                                await bot.deleteMessage(tg_id, req.botMsg5_id);
                            
                                                msgToDelete.update( {
                                                    "botMsg5_id": null,
                                                }, {where: objTg_id});   
                                            }
                                        }
                                    });
    
                                    let photos = []
                                    let resultMap = null;
                                    if(!!(req.photo1)){
                                        //photo #1
                                        photos.push("https://i.imgur.com/" + req.photo1);
                                    }
                                    if(!!(req.photo2)){
                                            //photo #2
                                            photos.push("https://i.imgur.com/" + req.photo2);
                                    }
                                    if(!!req.photo3){
                                            //photo #3
                                            photos.push("https://i.imgur.com/" + req.photo3);
                                    }
                                    if(!!(req.photo4)){
                                            //photo #4
                                            photos.push("https://i.imgur.com/" + req.photo4);
                                    }
                                    if(photos != [])
                                    {
                                        resultMap = photos.map(photo => {
                                            return{
                                                type: 'photo',
                                                media: photo,
                                            }
                                        });
                                        console.log(resultMap);
                                    }
    
    
    
                                    if(resultMap != null)
                                    {
                                        try{
                                            console.log("3");
                                            await bot.sendMediaGroup(tg_id, resultMap).then(result => {
                                                // botMessage_id = result[0].message_id;
                                                // console.log(result[0].message_id);
                        
                                                if(!!req.photo4){
                                                        //photo 4
                                                        msgToDelete.update( {
                                                            "botMsg2_id": result[0].message_id,
                                                            "botMsg3_id": result[1].message_id,
                                                            "botMsg4_id": result[2].message_id,
                                                            "botMsg5_id": result[3].message_id,
                                                        }, {where: objTg_id});
                                                }
                                                else if(!!req.photo3){
                                                        //photo 3
                                                        msgToDelete.update( {
                                                            "botMsg2_id": result[0].message_id,
                                                            "botMsg3_id": result[1].message_id,
                                                            "botMsg4_id": result[2].message_id,
                                                        }, {where: objTg_id});
                                                }
                                                else if(!!req.photo2){
                                                        //photo 2
                                                        msgToDelete.update( {
                                                            "botMsg2_id": result[0].message_id,
                                                            "botMsg3_id": result[1].message_id,
                                                        }, {where: objTg_id});
                                                }
                                                else if(!!req.photo1){
                                                        //photo 1
                                                        msgToDelete.update( {
                                                            "botMsg2_id": result[0].message_id,
                                                        }, {where: objTg_id});
                                                }
                                                else{
                                                    console.log("none");
                                                }
            
                                                // Promise.all([
                                                //     bot.sendMessage(tg_id,`${id.first_name} \nYou are interested in ${id.interestedIn}`, {
                                                //         reply_markup: {
                                                //             inline_keyboard: editKeyboard
                                                //         }
                                                        
                                                //     })
                                                // ]).then(result => {
                                                //     // botMessage_id = result[0].message_id;
                                                //     console.log(result[0].message_id)
                                
                                                //     msgToDelete.update( {
                                                //         "botMsg_id": result[0].message_id,
                                                //     }, {where: objTg_id});
                                                // });

                                                Promise.all([
                                                    bot.sendPhoto(tg_id, ("https://i.imgur.com/z4oM4NE.jpeg"), 
                                                        { 
                                                            caption: `${id.first_name} \nYou are interested in ${id.interestedIn}`,
                                                            
                                                            reply_markup: {
                                                                inline_keyboard: editKeyboard
                                                            }
                                                        })
                                                    ]).then(result => {
                                                        console.log(result[0].message_id)
                                    
                                                        console.log("4");
                                                        msgToDelete.update( {
                                                            "botMsg_id": result[0].message_id,
                                                        }, {where: objTg_id});
                                                    })


                                            });
                                        }catch(err)
                                        {
                                            console.log("Error!!")
                                            bot.sendPhoto(tg_id, ("https://i.imgur.com/z4oM4NE.jpeg"), 
                                            { 
                                                caption: `${id.first_name} \nYou are interested in ${id.interestedIn}`,
                                                
                                                reply_markup: {
                                                    inline_keyboard: editKeyboard
                                                }
                                            }).then(result => {
                                                console.log(result[0].message_id)

                                                msgToDelete.update( {
                                                    "botMsg_id": result[0].message_id,
                                                }, {where: objTg_id});
                                            })
                                        }
                                    }
                                }
                                else
                                {
                                    console.log("1");
                                    await Promise.all([
                                        bot.editMessageMedia({
                                            type: 'photo', 
                                            media: "https://i.imgur.com/z4oM4NE.jpeg",
                                            caption: "Keyboard: ",
                                        },
                                        {
                                            chat_id: tg_id,
                                            message_id: msg_id.botMsg_id,
                                            reply_markup: {
                                                inline_keyboard: editKeyboard
                                            }
                                        })
                                    ]).then(result => {
                                        // botMessage_id = result[0].message_id;
                                        console.log(result[0].message_id)
                
                                        msgToDelete.update( {
                                            "botMsg_id": result[0].message_id,
                                        }, {where: objTg_id});
                
                                    });
                                }
                            });
                        }
                    });
                });

            break

            case 'profilePictures':

                User.findOne({where: objTg_id}).then(async id => {
                    await ProfilePhotos.findOne({where: objTg_id}).then(async req =>{
                            
                        if(!(req.photo1) && !(req.photo2) && !(req.photo3) && !(req.photo4)){
                                    
                            msgToDelete.findOne({where: objTg_id}).then(async req =>{
                                if(!!req)
                                {
                                    if(req.botMsg_id != null){
                                        console.log(req.botMsg_id);
                                        await bot.deleteMessage(tg_id, req.botMsg_id);
                                    }
                                }
                            });

                            bot.sendPhoto(tg_id, ("https://i.imgur.com/z4oM4NE.jpeg"), 
                            { 
                                caption: `${id.first_name} \nYou are interested in ${id.interestedIn}`,
                                
                                reply_markup: {
                                    inline_keyboard: profilePicturesKeyboard
                                }
                            }).then(result => {
                                console.log(result[0].message_id)

                                msgToDelete.update( {
                                    "botMsg_id": result[0].message_id,
                                }, {where: objTg_id});
                            })
                        }
                        else if(!!(req.photo1) && !(req.photo2) && !(req.photo3) && !(req.photo4)){
                                    
                            msgToDelete.findOne({where: objTg_id}).then(async req =>{
                                if(!!req)
                                {
                                    if(req.botMsg_id != null){
                                        console.log(req.botMsg_id);
                                        await bot.deleteMessage(tg_id, req.botMsg_id);
                                    }
                                }
                            });

                            bot.sendPhoto(tg_id, ("https://i.imgur.com/" + req.photo1), 
                            { 
                                caption: `${id.first_name} \nYou are interested in ${id.interestedIn}`,
                                
                                reply_markup: {
                                    inline_keyboard: profilePicturesKeyboard
                                }
                            }).then(result => {
                                console.log(result[0].message_id)

                                msgToDelete.update( {
                                    "botMsg_id": result[0].message_id,
                                }, {where: objTg_id});
                            })
                        }
                        else
                        {
                            msgToDelete.findOne({where: objTg_id}).then(async msg_id => {

                                if(!msg_id.botMsg2_id || !msg_id.botMsg3_id  || !msg_id.botMsg4_id || !msg_id.botMsg5_id)
                                {
                                    msgToDelete.findOne({where: objTg_id}).then(async req =>{
                                        if(!!req)
                                        {
                                            if(req.botMsg_id != null){
                                                console.log(req.botMsg_id);
                                                await bot.deleteMessage(tg_id, req.botMsg_id);
                                            }
                                            if(req.botMsg2_id != null){
                                                console.log(req.botMsg2_id);
                                                await bot.deleteMessage(tg_id, req.botMsg2_id);
                            
                                                msgToDelete.update( {
                                                    "botMsg2_id": null,
                                                }, {where: objTg_id});
                                            }
                                            if(req.botMsg3_id != null){
                                                console.log(req.botMsg3_id);
                                                await bot.deleteMessage(tg_id, req.botMsg3_id);
                            
                                                msgToDelete.update( {
                                                    "botMsg3_id": null,
                                                }, {where: objTg_id});
                                            }
                                            if(req.botMsg4_id != null){
                                                console.log(req.botMsg4_id);
                                                await bot.deleteMessage(tg_id, req.botMsg4_id);
                            
                                                msgToDelete.update( {
                                                    "botMsg4_id": null,
                                                }, {where: objTg_id});   
                                            }
                                            if(req.botMsg5_id != null){
                                                console.log(req.botMsg5_id);
                                                await bot.deleteMessage(tg_id, req.botMsg5_id);
                            
                                                msgToDelete.update( {
                                                    "botMsg5_id": null,
                                                }, {where: objTg_id});   
                                            }
                                        }
                                    });
    
                                    let photos = []
                                    let resultMap = null;
                                    if(!!(req.photo1)){
                                        //photo #1
                                        photos.push("https://i.imgur.com/" + req.photo1);
                                    }
                                    if(!!(req.photo2)){
                                            //photo #2
                                            photos.push("https://i.imgur.com/" + req.photo2);
                                    }
                                    if(!!req.photo3){
                                            //photo #3
                                            photos.push("https://i.imgur.com/" + req.photo3);
                                    }
                                    if(!!(req.photo4)){
                                            //photo #4
                                            photos.push("https://i.imgur.com/" + req.photo4);
                                    }
                                    if(photos != [])
                                    {
                                        resultMap = photos.map(photo => {
                                            return{
                                                type: 'photo',
                                                media: photo,
                                            }
                                        });
                                        console.log(resultMap);
                                    }
    
    
    
                                    if(resultMap != null)
                                    {
                                        try{
                                            console.log("3");
                                            await bot.sendMediaGroup(tg_id, resultMap).then(result => {
                                                // botMessage_id = result[0].message_id;
                                                // console.log(result[0].message_id);
                        
                                                if(!!req.photo4){
                                                        //photo 4
                                                        msgToDelete.update( {
                                                            "botMsg2_id": result[0].message_id,
                                                            "botMsg3_id": result[1].message_id,
                                                            "botMsg4_id": result[2].message_id,
                                                            "botMsg5_id": result[3].message_id,
                                                        }, {where: objTg_id});
                                                }
                                                else if(!!req.photo3){
                                                        //photo 3
                                                        msgToDelete.update( {
                                                            "botMsg2_id": result[0].message_id,
                                                            "botMsg3_id": result[1].message_id,
                                                            "botMsg4_id": result[2].message_id,
                                                        }, {where: objTg_id});
                                                }
                                                else if(!!req.photo2){
                                                        //photo 2
                                                        msgToDelete.update( {
                                                            "botMsg2_id": result[0].message_id,
                                                            "botMsg3_id": result[1].message_id,
                                                        }, {where: objTg_id});
                                                }
                                                else if(!!req.photo1){
                                                        //photo 1
                                                        msgToDelete.update( {
                                                            "botMsg2_id": result[0].message_id,
                                                        }, {where: objTg_id});
                                                }
                                                else{
                                                    console.log("none");
                                                }

                                                Promise.all([
                                                    bot.sendPhoto(tg_id, ("https://i.imgur.com/z4oM4NE.jpeg"), 
                                                        { 
                                                            caption: `${id.first_name} \nYou are interested in ${id.interestedIn}`,
                                                            
                                                            reply_markup: {
                                                                inline_keyboard: profilePicturesKeyboard
                                                            }
                                                        })
                                                    ]).then(result => {
                                                        console.log(result[0].message_id)
                                    
                                                        console.log("4");
                                                        msgToDelete.update( {
                                                            "botMsg_id": result[0].message_id,
                                                        }, {where: objTg_id});
                                                    })


                                            });
                                        }catch(err)
                                        {
                                            console.log("Error!!")
                                            bot.sendPhoto(tg_id, ("https://i.imgur.com/z4oM4NE.jpeg"), 
                                            { 
                                                caption: `${id.first_name} \nYou are interested in ${id.interestedIn}`,
                                                
                                                reply_markup: {
                                                    inline_keyboard: profilePicturesKeyboard
                                                }
                                            }).then(result => {
                                                console.log(result[0].message_id)

                                                msgToDelete.update( {
                                                    "botMsg_id": result[0].message_id,
                                                }, {where: objTg_id});
                                            })
                                        }
                                    }
                                }
                                else
                                {
                                    console.log("1");
                                    await Promise.all([
                                        bot.editMessageMedia({
                                            type: 'photo', 
                                            media: "https://i.imgur.com/z4oM4NE.jpeg",
                                            caption: "Keyboard: ",
                                        },
                                        {
                                            chat_id: tg_id,
                                            message_id: msg_id.botMsg_id,
                                            reply_markup: {
                                                inline_keyboard: profilePicturesKeyboard
                                            }
                                        })
                                    ]).then(result => {
                                        // botMessage_id = result[0].message_id;
                                        console.log(result[0].message_id)
                
                                        msgToDelete.update( {
                                            "botMsg_id": result[0].message_id,
                                        }, {where: objTg_id});
                
                                    });
                                }
                            });
                        }
                    });
                });

            break

            case 'changeMainPicture':

                User.findOne({where: objTg_id}).then(async id => {
                    await ProfilePhotos.findOne({where: objTg_id}).then(async req =>{
                            
                        if(!(req.photo1) && !(req.photo2) && !(req.photo3) && !(req.photo4)){
                                    
                            msgToDelete.findOne({where: objTg_id}).then(async req =>{
                                if(!!req)
                                {
                                    if(req.botMsg_id != null){
                                        console.log(req.botMsg_id);
                                        await bot.deleteMessage(tg_id, req.botMsg_id);
                                    }
                                }
                            });

                            bot.sendPhoto(tg_id, ("https://i.imgur.com/z4oM4NE.jpeg"), 
                            { 
                                caption: `${id.first_name} \nYou are interested in ${id.interestedIn}`,
                                
                                reply_markup: {
                                    inline_keyboard: changeMainPictureKeyboard
                                }
                            }).then(result => {
                                console.log(result[0].message_id)

                                msgToDelete.update( {
                                    "botMsg_id": result[0].message_id,
                                }, {where: objTg_id});
                            })
                        }
                        else if(!!(req.photo1) && !(req.photo2) && !(req.photo3) && !(req.photo4)){
                                    
                            msgToDelete.findOne({where: objTg_id}).then(async req =>{
                                if(!!req)
                                {
                                    if(req.botMsg_id != null){
                                        console.log(req.botMsg_id);
                                        await bot.deleteMessage(tg_id, req.botMsg_id);
                                    }
                                }
                            });

                            bot.sendPhoto(tg_id, ("https://i.imgur.com/" + req.photo1), 
                            { 
                                caption: `${id.first_name} \nYou are interested in ${id.interestedIn}`,
                                
                                reply_markup: {
                                    inline_keyboard: changeMainPictureKeyboard
                                }
                            }).then(result => {
                                console.log(result[0].message_id)

                                msgToDelete.update( {
                                    "botMsg_id": result[0].message_id,
                                }, {where: objTg_id});
                            })
                        }
                        else
                        {
                            msgToDelete.findOne({where: objTg_id}).then(async msg_id => {

                                if(!msg_id.botMsg2_id || !msg_id.botMsg3_id  || !msg_id.botMsg4_id || !msg_id.botMsg5_id)
                                {
                                    msgToDelete.findOne({where: objTg_id}).then(async req =>{
                                        if(!!req)
                                        {
                                            if(req.botMsg_id != null){
                                                console.log(req.botMsg_id);
                                                await bot.deleteMessage(tg_id, req.botMsg_id);
                                            }
                                            if(req.botMsg2_id != null){
                                                console.log(req.botMsg2_id);
                                                await bot.deleteMessage(tg_id, req.botMsg2_id);
                            
                                                msgToDelete.update( {
                                                    "botMsg2_id": null,
                                                }, {where: objTg_id});
                                            }
                                            if(req.botMsg3_id != null){
                                                console.log(req.botMsg3_id);
                                                await bot.deleteMessage(tg_id, req.botMsg3_id);
                            
                                                msgToDelete.update( {
                                                    "botMsg3_id": null,
                                                }, {where: objTg_id});
                                            }
                                            if(req.botMsg4_id != null){
                                                console.log(req.botMsg4_id);
                                                await bot.deleteMessage(tg_id, req.botMsg4_id);
                            
                                                msgToDelete.update( {
                                                    "botMsg4_id": null,
                                                }, {where: objTg_id});   
                                            }
                                            if(req.botMsg5_id != null){
                                                console.log(req.botMsg5_id);
                                                await bot.deleteMessage(tg_id, req.botMsg5_id);
                            
                                                msgToDelete.update( {
                                                    "botMsg5_id": null,
                                                }, {where: objTg_id});   
                                            }
                                        }
                                    });
    
                                    let photos = []
                                    let resultMap = null;
                                    if(!!(req.photo1)){
                                        //photo #1
                                        photos.push("https://i.imgur.com/" + req.photo1);
                                    }
                                    if(!!(req.photo2)){
                                            //photo #2
                                            photos.push("https://i.imgur.com/" + req.photo2);
                                    }
                                    if(!!req.photo3){
                                            //photo #3
                                            photos.push("https://i.imgur.com/" + req.photo3);
                                    }
                                    if(!!(req.photo4)){
                                            //photo #4
                                            photos.push("https://i.imgur.com/" + req.photo4);
                                    }
                                    if(photos != [])
                                    {
                                        resultMap = photos.map(photo => {
                                            return{
                                                type: 'photo',
                                                media: photo,
                                            }
                                        });
                                        console.log(resultMap);
                                    }
    
    
    
                                    if(resultMap != null)
                                    {
                                        try{
                                            console.log("3");
                                            await bot.sendMediaGroup(tg_id, resultMap).then(result => {
                                                // botMessage_id = result[0].message_id;
                                                // console.log(result[0].message_id);
                        
                                                if(!!req.photo4){
                                                        //photo 4
                                                        msgToDelete.update( {
                                                            "botMsg2_id": result[0].message_id,
                                                            "botMsg3_id": result[1].message_id,
                                                            "botMsg4_id": result[2].message_id,
                                                            "botMsg5_id": result[3].message_id,
                                                        }, {where: objTg_id});
                                                }
                                                else if(!!req.photo3){
                                                        //photo 3
                                                        msgToDelete.update( {
                                                            "botMsg2_id": result[0].message_id,
                                                            "botMsg3_id": result[1].message_id,
                                                            "botMsg4_id": result[2].message_id,
                                                        }, {where: objTg_id});
                                                }
                                                else if(!!req.photo2){
                                                        //photo 2
                                                        msgToDelete.update( {
                                                            "botMsg2_id": result[0].message_id,
                                                            "botMsg3_id": result[1].message_id,
                                                        }, {where: objTg_id});
                                                }
                                                else if(!!req.photo1){
                                                        //photo 1
                                                        msgToDelete.update( {
                                                            "botMsg2_id": result[0].message_id,
                                                        }, {where: objTg_id});
                                                }
                                                else{
                                                    console.log("none");
                                                }

                                                Promise.all([
                                                    bot.sendPhoto(tg_id, ("https://i.imgur.com/z4oM4NE.jpeg"), 
                                                        { 
                                                            caption: `${id.first_name} \nYou are interested in ${id.interestedIn}`,
                                                            
                                                            reply_markup: {
                                                                inline_keyboard: changeMainPictureKeyboard
                                                            }
                                                        })
                                                    ]).then(result => {
                                                        console.log(result[0].message_id)
                                    
                                                        console.log("4");
                                                        msgToDelete.update( {
                                                            "botMsg_id": result[0].message_id,
                                                        }, {where: objTg_id});
                                                    })


                                            });
                                        }catch(err)
                                        {
                                            console.log("Error!!")
                                            bot.sendPhoto(tg_id, ("https://i.imgur.com/z4oM4NE.jpeg"), 
                                            { 
                                                caption: `${id.first_name} \nYou are interested in ${id.interestedIn}`,
                                                
                                                reply_markup: {
                                                    inline_keyboard: changeMainPictureKeyboard
                                                }
                                            }).then(result => {
                                                console.log(result[0].message_id)

                                                msgToDelete.update( {
                                                    "botMsg_id": result[0].message_id,
                                                }, {where: objTg_id});
                                            })
                                        }
                                    }
                                }
                                else
                                {
                                    console.log("1");
                                    await Promise.all([
                                        bot.editMessageMedia({
                                            type: 'photo', 
                                            media: "https://i.imgur.com/z4oM4NE.jpeg",
                                            caption: "Keyboard: ",
                                        },
                                        {
                                            chat_id: tg_id,
                                            message_id: msg_id.botMsg_id,
                                            reply_markup: {
                                                inline_keyboard: changeMainPictureKeyboard
                                            }
                                        })
                                    ]).then(result => {
                                        // botMessage_id = result[0].message_id;
                                        console.log(result[0].message_id)
                
                                        msgToDelete.update( {
                                            "botMsg_id": result[0].message_id,
                                        }, {where: objTg_id});
                
                                    });
                                }
                            });
                        }
                    });
                });

            break

            case 'secondPicture':

                User.findOne({where: objTg_id}).then(async id => {


                            
                        // if(!(req.photo1) && !(req.photo2) && !(req.photo3) && !(req.photo4)){
                                    
                        //     msgToDelete.findOne({where: objTg_id}).then(async req =>{
                        //         if(!!req)
                        //         {
                        //             if(req.botMsg_id != null){
                        //                 console.log(req.botMsg_id);
                        //                 await bot.deleteMessage(tg_id, req.botMsg_id);
                        //             }
                        //         }
                        //     });

                        //     bot.sendPhoto(tg_id, ("https://i.imgur.com/z4oM4NE.jpeg"), 
                        //     { 
                        //         caption: `${id.first_name} \nYou are interested in ${id.interestedIn}`,
                                
                        //         reply_markup: {
                        //             inline_keyboard: profilePicturesKeyboard
                        //         }
                        //     }).then(result => {
                        //         console.log(result[0].message_id)

                        //         msgToDelete.update( {
                        //             "botMsg_id": result[0].message_id,
                        //         }, {where: objTg_id});
                        //     })
                        // }
                        // else if(!!(req.photo1) && !(req.photo2) && !(req.photo3) && !(req.photo4)){
                                    
                        //     msgToDelete.findOne({where: objTg_id}).then(async req =>{
                        //         if(!!req)
                        //         {
                        //             if(req.botMsg_id != null){
                        //                 console.log(req.botMsg_id);
                        //                 await bot.deleteMessage(tg_id, req.botMsg_id);
                        //             }
                        //         }
                        //     });

                        //     bot.sendPhoto(tg_id, ("https://i.imgur.com/" + req.photo1), 
                        //     { 
                        //         caption: `${id.first_name} \nYou are interested in ${id.interestedIn}`,
                                
                        //         reply_markup: {
                        //             inline_keyboard: profilePicturesKeyboard
                        //         }
                        //     }).then(result => {
                        //         console.log(result[0].message_id)

                        //         msgToDelete.update( {
                        //             "botMsg_id": result[0].message_id,
                        //         }, {where: objTg_id});
                        //     })
                        // }
                        // else
                        // {

                            await ProfilePhotos.findOne({where: objTg_id}).then(async first =>{
                                await ProfilePhotos.update({
                                    "temp": first.photo1,
                                }, {where: objTg_id}).then(async z =>{

                                    console.log(first.photo1);
                                    console.log(first.photo2);
                                    console.log(first.temp);

                                    });
                            });

                            await ProfilePhotos.findOne({where: objTg_id}).then(async second =>{
                                await ProfilePhotos.update({
                                    "photo1": second.photo2,
                                }, {where: objTg_id}).then(async x =>{

                                    console.log(second.photo1);
                                    console.log(second.photo2);
                                    console.log(second.temp);
                                });
                            });

                            await ProfilePhotos.findOne({where: objTg_id}).then(async third =>{
                                await ProfilePhotos.update({
                                    "photo2": third.temp,
                                }, {where: objTg_id}).then(async y =>{

                                    console.log(third.photo1);
                                    console.log(third.photo2);
                                    console.log(third.temp);
                                });
                            });

                            await ProfilePhotos.findOne({where: objTg_id}).then(async fours =>{
                                    await ProfilePhotos.update({
                                        "temp": null,
                                    }, {where: objTg_id});

                                    console.log(fours.photo1);
                                    console.log(fours.photo2);
                                    console.log(fours.temp);

                            });



                            await msgToDelete.findOne({where: objTg_id}).then(async req =>{
                                if(!!req)
                                {
                                    if(req.botMsg_id != null){
                                        console.log(req.botMsg_id);
                                        await bot.deleteMessage(tg_id, req.botMsg_id);
                                    }
                                    if(req.botMsg2_id != null){
                                        console.log(req.botMsg2_id);
                                        await bot.deleteMessage(tg_id, req.botMsg2_id);
                    
                                        msgToDelete.update( {
                                            "botMsg2_id": null,
                                        }, {where: objTg_id});
                                    }
                                    if(req.botMsg3_id != null){
                                        console.log(req.botMsg3_id);
                                        await bot.deleteMessage(tg_id, req.botMsg3_id);
                    
                                        msgToDelete.update( {
                                            "botMsg3_id": null,
                                        }, {where: objTg_id});
                                    }
                                    if(req.botMsg4_id != null){
                                        console.log(req.botMsg4_id);
                                        await bot.deleteMessage(tg_id, req.botMsg4_id);
                    
                                        msgToDelete.update( {
                                            "botMsg4_id": null,
                                        }, {where: objTg_id});   
                                    }
                                    if(req.botMsg5_id != null){
                                        console.log(req.botMsg5_id);
                                        await bot.deleteMessage(tg_id, req.botMsg5_id);
                    
                                        msgToDelete.update( {
                                            "botMsg5_id": null,
                                        }, {where: objTg_id});   
                                    }
                                }
                            });

                            let photos = []
                            let resultMap = null;
                            await ProfilePhotos.findOne({where: objTg_id}).then(async req =>{
                            if(!!(req.photo1)){
                                //photo #1
                                photos.push("https://i.imgur.com/" + req.photo1);
                            }
                            if(!!(req.photo2)){
                                    //photo #2
                                    photos.push("https://i.imgur.com/" + req.photo2);
                            }
                            if(!!req.photo3){
                                    //photo #3
                                    photos.push("https://i.imgur.com/" + req.photo3);
                            }
                            if(!!(req.photo4)){
                                    //photo #4
                                    photos.push("https://i.imgur.com/" + req.photo4);
                            }
                            if(photos != [])
                            {
                                resultMap = photos.map(photo => {
                                    return{
                                        type: 'photo',
                                        media: photo,
                                    }
                                });
                                console.log(resultMap);
                            }



                            if(resultMap != null)
                            {
                                try{
                                    console.log("3");
                                    await bot.sendMediaGroup(tg_id, resultMap).then(result => {
                                        // botMessage_id = result[0].message_id;
                                        // console.log(result[0].message_id);
                
                                        if(!!req.photo4){
                                                //photo 4
                                                msgToDelete.update( {
                                                    "botMsg2_id": result[0].message_id,
                                                    "botMsg3_id": result[1].message_id,
                                                    "botMsg4_id": result[2].message_id,
                                                    "botMsg5_id": result[3].message_id,
                                                }, {where: objTg_id});
                                        }
                                        else if(!!req.photo3){
                                                //photo 3
                                                msgToDelete.update( {
                                                    "botMsg2_id": result[0].message_id,
                                                    "botMsg3_id": result[1].message_id,
                                                    "botMsg4_id": result[2].message_id,
                                                }, {where: objTg_id});
                                        }
                                        else if(!!req.photo2){
                                                //photo 2
                                                msgToDelete.update( {
                                                    "botMsg2_id": result[0].message_id,
                                                    "botMsg3_id": result[1].message_id,
                                                }, {where: objTg_id});
                                        }
                                        else if(!!req.photo1){
                                                //photo 1
                                                msgToDelete.update( {
                                                    "botMsg2_id": result[0].message_id,
                                                }, {where: objTg_id});
                                        }
                                        else{
                                            console.log("none");
                                        }

                                        Promise.all([
                                            bot.sendPhoto(tg_id, ("https://i.imgur.com/z4oM4NE.jpeg"), 
                                                { 
                                                    caption: `${id.first_name} \nYou are interested in ${id.interestedIn}`,
                                                    
                                                    reply_markup: {
                                                        inline_keyboard: changeMainPictureKeyboard
                                                    }
                                                })
                                            ]).then(result => {
                                                console.log(result[0].message_id)
                            
                                                console.log("4");
                                                msgToDelete.update( {
                                                    "botMsg_id": result[0].message_id,
                                                }, {where: objTg_id});
                                            })


                                    });
                                }catch(err)
                                {
                                    console.log("Error!!")
                                    bot.sendPhoto(tg_id, ("https://i.imgur.com/z4oM4NE.jpeg"), 
                                    { 
                                        caption: `${id.first_name} \nYou are interested in ${id.interestedIn}`,
                                        
                                        reply_markup: {
                                            inline_keyboard: changeMainPictureKeyboard
                                        }
                                    }).then(result => {
                                        console.log(result[0].message_id)

                                        msgToDelete.update( {
                                            "botMsg_id": result[0].message_id,
                                        }, {where: objTg_id});
                                    })
                                }
                            }
                        // }
                    });
                });

            break

            case 'thirdPicture':

                User.findOne({where: objTg_id}).then(async id => {
                            

                        await ProfilePhotos.findOne({where: objTg_id}).then(async first =>{
                            await ProfilePhotos.update({
                                "temp": first.photo1,
                            }, {where: objTg_id}).then(async z =>{

                                console.log(first.photo1);
                                console.log(first.photo2);
                                console.log(first.temp);

                                });
                        });

                        await ProfilePhotos.findOne({where: objTg_id}).then(async second =>{
                            await ProfilePhotos.update({
                                "photo1": second.photo3,
                            }, {where: objTg_id}).then(async x =>{

                                console.log(second.photo1);
                                console.log(second.photo2);
                                console.log(second.temp);
                            });
                        });

                        await ProfilePhotos.findOne({where: objTg_id}).then(async third =>{
                            await ProfilePhotos.update({
                                "photo3": third.temp,
                            }, {where: objTg_id}).then(async y =>{

                                console.log(third.photo1);
                                console.log(third.photo2);
                                console.log(third.temp);
                            });
                        });

                        await ProfilePhotos.findOne({where: objTg_id}).then(async fours =>{
                                await ProfilePhotos.update({
                                    "temp": null,
                                }, {where: objTg_id});

                                console.log(fours.photo1);
                                console.log(fours.photo2);
                                console.log(fours.temp);

                        });


                        await msgToDelete.findOne({where: objTg_id}).then(async req =>{
                            if(!!req)
                            {
                                if(req.botMsg_id != null){
                                    console.log(req.botMsg_id);
                                    await bot.deleteMessage(tg_id, req.botMsg_id);
                                }
                                if(req.botMsg2_id != null){
                                    console.log(req.botMsg2_id);
                                    await bot.deleteMessage(tg_id, req.botMsg2_id);
                
                                    msgToDelete.update( {
                                        "botMsg2_id": null,
                                    }, {where: objTg_id});
                                }
                                if(req.botMsg3_id != null){
                                    console.log(req.botMsg3_id);
                                    await bot.deleteMessage(tg_id, req.botMsg3_id);
                
                                    msgToDelete.update( {
                                        "botMsg3_id": null,
                                    }, {where: objTg_id});
                                }
                                if(req.botMsg4_id != null){
                                    console.log(req.botMsg4_id);
                                    await bot.deleteMessage(tg_id, req.botMsg4_id);
                
                                    msgToDelete.update( {
                                        "botMsg4_id": null,
                                    }, {where: objTg_id});   
                                }
                                if(req.botMsg5_id != null){
                                    console.log(req.botMsg5_id);
                                    await bot.deleteMessage(tg_id, req.botMsg5_id);
                
                                    msgToDelete.update( {
                                        "botMsg5_id": null,
                                    }, {where: objTg_id});   
                                }
                            }
                        });

                        let photos = []
                        let resultMap = null;
                        await ProfilePhotos.findOne({where: objTg_id}).then(async req =>{
                        if(!!(req.photo1)){
                            //photo #1
                            photos.push("https://i.imgur.com/" + req.photo1);
                        }
                        if(!!(req.photo2)){
                                //photo #2
                                photos.push("https://i.imgur.com/" + req.photo2);
                        }
                        if(!!req.photo3){
                                //photo #3
                                photos.push("https://i.imgur.com/" + req.photo3);
                        }
                        if(!!(req.photo4)){
                                //photo #4
                                photos.push("https://i.imgur.com/" + req.photo4);
                        }
                        if(photos != [])
                        {
                            resultMap = photos.map(photo => {
                                return{
                                    type: 'photo',
                                    media: photo,
                                }
                            });
                            console.log(resultMap);
                        }



                        if(resultMap != null)
                        {
                            try{
                                console.log("3");
                                await bot.sendMediaGroup(tg_id, resultMap).then(result => {
                                    // botMessage_id = result[0].message_id;
                                    // console.log(result[0].message_id);
            
                                    if(!!req.photo4){
                                            //photo 4
                                            msgToDelete.update( {
                                                "botMsg2_id": result[0].message_id,
                                                "botMsg3_id": result[1].message_id,
                                                "botMsg4_id": result[2].message_id,
                                                "botMsg5_id": result[3].message_id,
                                            }, {where: objTg_id});
                                    }
                                    else if(!!req.photo3){
                                            //photo 3
                                            msgToDelete.update( {
                                                "botMsg2_id": result[0].message_id,
                                                "botMsg3_id": result[1].message_id,
                                                "botMsg4_id": result[2].message_id,
                                            }, {where: objTg_id});
                                    }
                                    else if(!!req.photo2){
                                            //photo 2
                                            msgToDelete.update( {
                                                "botMsg2_id": result[0].message_id,
                                                "botMsg3_id": result[1].message_id,
                                            }, {where: objTg_id});
                                    }
                                    else if(!!req.photo1){
                                            //photo 1
                                            msgToDelete.update( {
                                                "botMsg2_id": result[0].message_id,
                                            }, {where: objTg_id});
                                    }
                                    else{
                                        console.log("none");
                                    }

                                    Promise.all([
                                        bot.sendPhoto(tg_id, ("https://i.imgur.com/z4oM4NE.jpeg"), 
                                            { 
                                                caption: `${id.first_name} \nYou are interested in ${id.interestedIn}`,
                                                
                                                reply_markup: {
                                                    inline_keyboard: changeMainPictureKeyboard
                                                }
                                            })
                                        ]).then(result => {
                                            console.log(result[0].message_id)
                        
                                            console.log("4");
                                            msgToDelete.update( {
                                                "botMsg_id": result[0].message_id,
                                            }, {where: objTg_id});
                                        })


                                });
                            }catch(err)
                            {
                                console.log("Error!!")
                                bot.sendPhoto(tg_id, ("https://i.imgur.com/z4oM4NE.jpeg"), 
                                { 
                                    caption: `${id.first_name} \nYou are interested in ${id.interestedIn}`,
                                    
                                    reply_markup: {
                                        inline_keyboard: changeMainPictureKeyboard
                                    }
                                }).then(result => {
                                    console.log(result[0].message_id)

                                    msgToDelete.update( {
                                        "botMsg_id": result[0].message_id,
                                    }, {where: objTg_id});
                                })
                            }
                        }
                    });
                });

            break

            case 'foursPicture':

                User.findOne({where: objTg_id}).then(async id => {

                        await ProfilePhotos.findOne({where: objTg_id}).then(async first =>{
                            await ProfilePhotos.update({
                                "temp": first.photo1,
                            }, {where: objTg_id}).then(async z =>{

                                console.log(first.photo1);
                                console.log(first.photo2);
                                console.log(first.temp);

                                });
                        });

                        await ProfilePhotos.findOne({where: objTg_id}).then(async second =>{
                            await ProfilePhotos.update({
                                "photo1": second.photo4,
                            }, {where: objTg_id}).then(async x =>{
                                console.log(second.photo1);
                                console.log(second.photo2);
                                console.log(second.temp);
                            });
                        });

                        await ProfilePhotos.findOne({where: objTg_id}).then(async third =>{
                            await ProfilePhotos.update({
                                "photo4": third.temp,
                            }, {where: objTg_id}).then(async y =>{

                                console.log(third.photo1);
                                console.log(third.photo2);
                                console.log(third.temp);
                            });
                        });

                        await ProfilePhotos.findOne({where: objTg_id}).then(async fours =>{
                                await ProfilePhotos.update({
                                    "temp": null,
                                }, {where: objTg_id});

                                console.log(fours.photo1);
                                console.log(fours.photo2);
                                console.log(fours.temp);

                        });


                        await msgToDelete.findOne({where: objTg_id}).then(async req =>{
                            if(!!req)
                            {
                                if(req.botMsg_id != null){
                                    console.log(req.botMsg_id);
                                    await bot.deleteMessage(tg_id, req.botMsg_id);
                                }
                                if(req.botMsg2_id != null){
                                    console.log(req.botMsg2_id);
                                    await bot.deleteMessage(tg_id, req.botMsg2_id);
                
                                    msgToDelete.update( {
                                        "botMsg2_id": null,
                                    }, {where: objTg_id});
                                }
                                if(req.botMsg3_id != null){
                                    console.log(req.botMsg3_id);
                                    await bot.deleteMessage(tg_id, req.botMsg3_id);
                
                                    msgToDelete.update( {
                                        "botMsg3_id": null,
                                    }, {where: objTg_id});
                                }
                                if(req.botMsg4_id != null){
                                    console.log(req.botMsg4_id);
                                    await bot.deleteMessage(tg_id, req.botMsg4_id);
                
                                    msgToDelete.update( {
                                        "botMsg4_id": null,
                                    }, {where: objTg_id});   
                                }
                                if(req.botMsg5_id != null){
                                    console.log(req.botMsg5_id);
                                    await bot.deleteMessage(tg_id, req.botMsg5_id);
                
                                    msgToDelete.update( {
                                        "botMsg5_id": null,
                                    }, {where: objTg_id});   
                                }
                            }
                        });

                        let photos = []
                        let resultMap = null;
                        await ProfilePhotos.findOne({where: objTg_id}).then(async req =>{
                        if(!!(req.photo1)){
                            //photo #1
                            photos.push("https://i.imgur.com/" + req.photo1);
                        }
                        if(!!(req.photo2)){
                                //photo #2
                                photos.push("https://i.imgur.com/" + req.photo2);
                        }
                        if(!!req.photo3){
                                //photo #3
                                photos.push("https://i.imgur.com/" + req.photo3);
                        }
                        if(!!(req.photo4)){
                                //photo #4
                                photos.push("https://i.imgur.com/" + req.photo4);
                        }
                        if(photos != [])
                        {
                            resultMap = photos.map(photo => {
                                return{
                                    type: 'photo',
                                    media: photo,
                                }
                            });
                            console.log(resultMap);
                        }



                        if(resultMap != null)
                        {
                            try{
                                console.log("3");
                                await bot.sendMediaGroup(tg_id, resultMap).then(result => {
                                    // botMessage_id = result[0].message_id;
                                    // console.log(result[0].message_id);
            
                                    if(!!req.photo4){
                                            //photo 4
                                            msgToDelete.update( {
                                                "botMsg2_id": result[0].message_id,
                                                "botMsg3_id": result[1].message_id,
                                                "botMsg4_id": result[2].message_id,
                                                "botMsg5_id": result[3].message_id,
                                            }, {where: objTg_id});
                                    }
                                    else if(!!req.photo3){
                                            //photo 3
                                            msgToDelete.update( {
                                                "botMsg2_id": result[0].message_id,
                                                "botMsg3_id": result[1].message_id,
                                                "botMsg4_id": result[2].message_id,
                                            }, {where: objTg_id});
                                    }
                                    else if(!!req.photo2){
                                            //photo 2
                                            msgToDelete.update( {
                                                "botMsg2_id": result[0].message_id,
                                                "botMsg3_id": result[1].message_id,
                                            }, {where: objTg_id});
                                    }
                                    else if(!!req.photo1){
                                            //photo 1
                                            msgToDelete.update( {
                                                "botMsg2_id": result[0].message_id,
                                            }, {where: objTg_id});
                                    }
                                    else{
                                        console.log("none");
                                    }

                                    Promise.all([
                                        bot.sendPhoto(tg_id, ("https://i.imgur.com/z4oM4NE.jpeg"), 
                                            { 
                                                caption: `${id.first_name} \nYou are interested in ${id.interestedIn}`,
                                                
                                                reply_markup: {
                                                    inline_keyboard: changeMainPictureKeyboard
                                                }
                                            })
                                        ]).then(result => {
                                            console.log(result[0].message_id)
                        
                                            console.log("4");
                                            msgToDelete.update( {
                                                "botMsg_id": result[0].message_id,
                                            }, {where: objTg_id});
                                        })


                                });
                            }catch(err)
                            {
                                console.log("Error!!")
                                bot.sendPhoto(tg_id, ("https://i.imgur.com/z4oM4NE.jpeg"), 
                                { 
                                    caption: `${id.first_name} \nYou are interested in ${id.interestedIn}`,
                                    
                                    reply_markup: {
                                        inline_keyboard: changeMainPictureKeyboard
                                    }
                                }).then(result => {
                                    console.log(result[0].message_id)

                                    msgToDelete.update( {
                                        "botMsg_id": result[0].message_id,
                                    }, {where: objTg_id});
                                })
                            }
                        }
                    });
                });

            break

            case 'interestedInChange':
                User.findOne({where: objTg_id}).then(async id => {
                    await ProfilePhotos.findOne({where: objTg_id}).then(async req =>{
                            
                        if(!(req.photo1) && !(req.photo2) && !(req.photo3) && !(req.photo4)){
                                    
                            msgToDelete.findOne({where: objTg_id}).then(async req =>{
                                if(!!req)
                                {
                                    if(req.botMsg_id != null){
                                        console.log(req.botMsg_id);
                                        await bot.deleteMessage(tg_id, req.botMsg_id);
                                    }
                                }
                            });

                            bot.sendPhoto(tg_id, ("https://i.imgur.com/z4oM4NE.jpeg"), 
                            { 
                                caption: `${id.first_name} \nYou are interested in ${id.interestedIn}`,
                                
                                reply_markup: {
                                    inline_keyboard: interestedInChangeKeyboard
                                }
                            }).then(result => {
                                console.log(result[0].message_id)

                                msgToDelete.update( {
                                    "botMsg_id": result[0].message_id,
                                }, {where: objTg_id});
                            })
                        }
                        else if(!!(req.photo1) && !(req.photo2) && !(req.photo3) && !(req.photo4)){
                                    
                            msgToDelete.findOne({where: objTg_id}).then(async req =>{
                                if(!!req)
                                {
                                    if(req.botMsg_id != null){
                                        console.log(req.botMsg_id);
                                        await bot.deleteMessage(tg_id, req.botMsg_id);
                                    }
                                }
                            });

                            bot.sendPhoto(tg_id, ("https://i.imgur.com/" + req.photo1), 
                            { 
                                caption: `${id.first_name} \nYou are interested in ${id.interestedIn}`,
                                
                                reply_markup: {
                                    inline_keyboard: interestedInChangeKeyboard
                                }
                            }).then(result => {
                                console.log(result[0].message_id)

                                msgToDelete.update( {
                                    "botMsg_id": result[0].message_id,
                                }, {where: objTg_id});
                            })
                        }
                        else
                        {
                            msgToDelete.findOne({where: objTg_id}).then(async msg_id => {
                                try{
                                    // await Promise.all([
                                    //     bot.editMessageText(`${id.first_name} \nYou are interested in ${id.interestedIn}`, {
                                    //         chat_id: tg_id,
                                    //         message_id: msg_id.botMsg_id,
                                    //         reply_markup: {
                                    //             inline_keyboard: interestedInChangeKeyboard
                                    //         }
                                    //     })
                                    // ]).then(result => {
                                    //     // botMessage_id = result[0].message_id;
                                    //     console.log(result[0].message_id)
                
                                    //     msgToDelete.update( {
                                    //         "botMsg_id": result[0].message_id,
                                    //     }, {where: objTg_id});
                
                                    // });

                                    await Promise.all([
                                        bot.editMessageMedia({
                                            type: 'photo', 
                                            media: "https://i.imgur.com/z4oM4NE.jpeg",
                                            caption: "Choose your interest: ",
                                        },
                                        {
                                            chat_id: tg_id,
                                            message_id: msg_id.botMsg_id,
                                            reply_markup: {
                                                inline_keyboard: interestedInChangeKeyboard
                                            }
                                        })
                                    ]).then(result => {
                                        // botMessage_id = result[0].message_id;
                                        console.log(result[0].message_id)
                
                                        msgToDelete.update( {
                                            "botMsg_id": result[0].message_id,
                                        }, {where: objTg_id});
                
                                    });

                                }catch(err)
                                {
                                    msgToDelete.findOne({where: objTg_id}).then(async req =>{
                                        if(!!req)
                                        {
                                            if(req.botMsg_id != null){
                                                console.log(req.botMsg_id);
                                                await bot.deleteMessage(tg_id, req.botMsg_id);
                                            }
                                        }
                                    });
    
                                    let photos = []
                                    let resultMap = null;
                                    if(!!(req.photo1)){
                                        //photo #1
                                        photos.push("https://i.imgur.com/" + req.photo1);
                                    }
                                    if(!!(req.photo2)){
                                            //photo #2
                                            photos.push("https://i.imgur.com/" + req.photo2);
                                    }
                                    if(!!req.photo3){
                                            //photo #3
                                            photos.push("https://i.imgur.com/" + req.photo3);
                                    }
                                    if(!!(req.photo4)){
                                            //photo #4
                                            photos.push("https://i.imgur.com/" + req.photo4);
                                    }
                                    if(photos != [])
                                    {
                                        resultMap = photos.map(photo => {
                                            return{
                                                type: 'photo',
                                                media: photo,
                                            }
                                        });
                                        console.log(resultMap);
                                    }
    
    
    
                                    if(resultMap != null)
                                    {
                                        try{
                                            await bot.sendMediaGroup(tg_id, resultMap).then(result => {
                                                // botMessage_id = result[0].message_id;
                                                // console.log(result[0].message_id);
                        
                                                if(!!req.photo4){
                                                        //photo 4
                                                        msgToDelete.update( {
                                                            "botMsg2_id": result[0].message_id,
                                                            "botMsg3_id": result[1].message_id,
                                                            "botMsg4_id": result[2].message_id,
                                                            "botMsg5_id": result[3].message_id,
                                                        }, {where: objTg_id});
                                                }
                                                else if(!!req.photo3){
                                                        //photo 3
                                                        msgToDelete.update( {
                                                            "botMsg2_id": result[0].message_id,
                                                            "botMsg3_id": result[1].message_id,
                                                            "botMsg4_id": result[2].message_id,
                                                        }, {where: objTg_id});
                                                }
                                                else if(!!req.photo2){
                                                        //photo 2
                                                        msgToDelete.update( {
                                                            "botMsg2_id": result[0].message_id,
                                                            "botMsg3_id": result[1].message_id,
                                                        }, {where: objTg_id});
                                                }
                                                else if(!!req.photo1){
                                                        //photo 1
                                                        msgToDelete.update( {
                                                            "botMsg2_id": result[0].message_id,
                                                        }, {where: objTg_id});
                                                }
                                                else{
                                                    console.log("none");
                                                }
            
                                                // Promise.all([
                                                //     bot.sendMessage(tg_id,`${id.first_name} \nYou are interested in ${id.interestedIn}`, {
                                                //         reply_markup: {
                                                //             inline_keyboard: interestedInChangeKeyboard
                                                //         }
                                                        
                                                //     })
                                                // ]).then(result => {
                                                //     // botMessage_id = result[0].message_id;
                                                //     console.log(result[0].message_id)
                                
                                                //     msgToDelete.update( {
                                                //         "botMsg_id": result[0].message_id,
                                                //     }, {where: objTg_id});
                                                // });

                                                Promise.all([
                                                    bot.sendPhoto(tg_id, ("https://i.imgur.com/z4oM4NE.jpeg"), 
                                                        { 
                                                            caption: `${id.first_name} \nYou are interested in ${id.interestedIn}`,
                                                            
                                                            reply_markup: {
                                                                inline_keyboard: interestedInChangeKeyboard
                                                            }
                                                        })
                                                    ]).then(result => {
                                                        console.log(result[0].message_id)
                                    
                                                        msgToDelete.update( {
                                                            "botMsg_id": result[0].message_id,
                                                        }, {where: objTg_id});
                                                    })

                                            });
                                        }catch(err)
                                        {
                                            console.log("Error!!")
                                            bot.sendPhoto(tg_id, ("https://i.imgur.com/z4oM4NE.jpeg"), 
                                            { 
                                                caption: `${id.first_name} \nYou are interested in ${id.interestedIn}`,
                                                
                                                reply_markup: {
                                                    inline_keyboard: interestedInChangeKeyboard
                                                }
                                            }).then(result => {
                                                console.log(result[0].message_id)

                                                msgToDelete.update( {
                                                    "botMsg_id": result[0].message_id,
                                                }, {where: objTg_id});
                                            })
                                        }
    
                                    }
                                }
                            });
                        }
                    });
                });

            break
            case 'changeToMaleOrientated':

                await User.update( {
                    "interestedIn": "men",
                }, {where: objTg_id}).then(updated => {

                    User.findOne({where: objTg_id}).then(async id => {
                        await ProfilePhotos.findOne({where: objTg_id}).then(async req =>{
                                
                            if(!(req.photo1) && !(req.photo2) && !(req.photo3) && !(req.photo4)){
                                        
                                msgToDelete.findOne({where: objTg_id}).then(async req =>{
                                    if(!!req)
                                    {
                                        if(req.botMsg_id != null){
                                            console.log(req.botMsg_id);
                                            await bot.deleteMessage(tg_id, req.botMsg_id);
                                        }
                                    }
                                });
    
                                bot.sendPhoto(tg_id, ("https://i.imgur.com/z4oM4NE.jpeg"), 
                                { 
                                    caption: `${id.first_name} \nYou are interested in ${id.interestedIn}`,
                                    
                                    reply_markup: {
                                        inline_keyboard: profileKeyboard
                                    }
                                }).then(result => {
                                    console.log(result[0].message_id)
    
                                    msgToDelete.update( {
                                        "botMsg_id": result[0].message_id,
                                    }, {where: objTg_id});
                                })
                            }
                            else if(!!(req.photo1) && !(req.photo2) && !(req.photo3) && !(req.photo4)){
                                        
                                msgToDelete.findOne({where: objTg_id}).then(async req =>{
                                    if(!!req)
                                    {
                                        if(req.botMsg_id != null){
                                            console.log(req.botMsg_id);
                                            await bot.deleteMessage(tg_id, req.botMsg_id);
                                        }
                                    }
                                });
    
                                bot.sendPhoto(tg_id, ("https://i.imgur.com/" + req.photo1), 
                                { 
                                    caption: `${id.first_name} \nYou are interested in ${id.interestedIn}`,
                                    
                                    reply_markup: {
                                        inline_keyboard: profileKeyboard
                                    }
                                }).then(result => {
                                    console.log(result[0].message_id)
    
                                    msgToDelete.update( {
                                        "botMsg_id": result[0].message_id,
                                    }, {where: objTg_id});
                                })
                            }
                            else
                            {
                                msgToDelete.findOne({where: objTg_id}).then(async msg_id => {
                                    try{
                                        // await Promise.all([
                                        //     bot.editMessageText(`${id.first_name} \nYou are interested in ${id.interestedIn}`, {
                                        //         chat_id: tg_id,
                                        //         message_id: msg_id.botMsg_id,
                                        //         reply_markup: {
                                        //             inline_keyboard: profileKeyboard
                                        //         }
                                        //     })
                                        // ]).then(result => {
                                        //     // botMessage_id = result[0].message_id;
                                        //     console.log(result[0].message_id)
                    
                                        //     msgToDelete.update( {
                                        //         "botMsg_id": result[0].message_id,
                                        //     }, {where: objTg_id});
                    
                                        // });

                                        await Promise.all([
                                            bot.editMessageMedia({
                                                type: 'photo', 
                                                media: "https://i.imgur.com/z4oM4NE.jpeg",
                                                caption: "Choose your interest: ",
                                            },
                                            {
                                                chat_id: tg_id,
                                                message_id: msg_id.botMsg_id,
                                                reply_markup: {
                                                    inline_keyboard: profileKeyboard
                                                }
                                            })
                                        ]).then(result => {
                                            // botMessage_id = result[0].message_id;
                                            console.log(result[0].message_id)
                    
                                            msgToDelete.update( {
                                                "botMsg_id": result[0].message_id,
                                            }, {where: objTg_id});
                    
                                        });
                                    }catch(err)
                                    {
                                        msgToDelete.findOne({where: objTg_id}).then(async req =>{
                                            if(!!req)
                                            {
                                                if(req.botMsg_id != null){
                                                    console.log(req.botMsg_id);
                                                    await bot.deleteMessage(tg_id, req.botMsg_id);
                                                }
                                            }
                                        });
        
                                        let photos = []
                                        let resultMap = null;
                                        if(!!(req.photo1)){
                                            //photo #1
                                            photos.push("https://i.imgur.com/" + req.photo1);
                                        }
                                        if(!!(req.photo2)){
                                                //photo #2
                                                photos.push("https://i.imgur.com/" + req.photo2);
                                        }
                                        if(!!req.photo3){
                                                //photo #3
                                                photos.push("https://i.imgur.com/" + req.photo3);
                                        }
                                        if(!!(req.photo4)){
                                                //photo #4
                                                photos.push("https://i.imgur.com/" + req.photo4);
                                        }
                                        if(photos != [])
                                        {
                                            resultMap = photos.map(photo => {
                                                return{
                                                    type: 'photo',
                                                    media: photo,
                                                }
                                            });
                                            console.log(resultMap);
                                        }
        
        
        
                                        if(resultMap != null)
                                        {
                                            try{
                                                await bot.sendMediaGroup(tg_id, resultMap).then(result => {
                                                    // botMessage_id = result[0].message_id;
                                                    // console.log(result[0].message_id);
                            
                                                    if(!!req.photo4){
                                                            //photo 4
                                                            msgToDelete.update( {
                                                                "botMsg2_id": result[0].message_id,
                                                                "botMsg3_id": result[1].message_id,
                                                                "botMsg4_id": result[2].message_id,
                                                                "botMsg5_id": result[3].message_id,
                                                            }, {where: objTg_id});
                                                    }
                                                    else if(!!req.photo3){
                                                            //photo 3
                                                            msgToDelete.update( {
                                                                "botMsg2_id": result[0].message_id,
                                                                "botMsg3_id": result[1].message_id,
                                                                "botMsg4_id": result[2].message_id,
                                                            }, {where: objTg_id});
                                                    }
                                                    else if(!!req.photo2){
                                                            //photo 2
                                                            msgToDelete.update( {
                                                                "botMsg2_id": result[0].message_id,
                                                                "botMsg3_id": result[1].message_id,
                                                            }, {where: objTg_id});
                                                    }
                                                    else if(!!req.photo1){
                                                            //photo 1
                                                            msgToDelete.update( {
                                                                "botMsg2_id": result[0].message_id,
                                                            }, {where: objTg_id});
                                                    }
                                                    else{
                                                        console.log("none");
                                                    }
                
                                                    // Promise.all([
                                                    //     bot.sendMessage(tg_id,`${id.first_name} \nYou are interested in ${id.interestedIn}`, {
                                                    //         reply_markup: {
                                                    //             inline_keyboard: profileKeyboard
                                                    //         }
                                                            
                                                    //     })
                                                    // ]).then(result => {
                                                    //     // botMessage_id = result[0].message_id;
                                                    //     console.log(result[0].message_id)
                                    
                                                    //     msgToDelete.update( {
                                                    //         "botMsg_id": result[0].message_id,
                                                    //     }, {where: objTg_id});
                                                    // });

                                                    Promise.all([
                                                        bot.sendPhoto(tg_id, ("https://i.imgur.com/z4oM4NE.jpeg"), 
                                                            { 
                                                                caption: `${id.first_name} \nYou are interested in ${id.interestedIn}`,
                                                                
                                                                reply_markup: {
                                                                    inline_keyboard: profileKeyboard
                                                                }
                                                            })
                                                        ]).then(result => {
                                                            console.log(result[0].message_id)
                                        
                                                            msgToDelete.update( {
                                                                "botMsg_id": result[0].message_id,
                                                            }, {where: objTg_id});
                                                        })

                                                });
                                            }catch(err)
                                            {
                                                console.log("Error!!")
                                                bot.sendPhoto(tg_id, ("https://i.imgur.com/z4oM4NE.jpeg"), 
                                                { 
                                                    caption: `${id.first_name} \nYou are interested in ${id.interestedIn}`,
                                                    
                                                    reply_markup: {
                                                        inline_keyboard: profileKeyboard
                                                    }
                                                }).then(result => {
                                                    console.log(result[0].message_id)
    
                                                    msgToDelete.update( {
                                                        "botMsg_id": result[0].message_id,
                                                    }, {where: objTg_id});
                                                })
                                            }
        
                                        }
                                    }
                                });
                            }
                        });
                    });

                });
            break
            case 'changeToFemaleOrientated':

                await User.update( {
                    "interestedIn": "women",
                }, {where: objTg_id}).then(updated => {

                    User.findOne({where: objTg_id}).then(async id => {
                        await ProfilePhotos.findOne({where: objTg_id}).then(async req =>{
                                
                            if(!(req.photo1) && !(req.photo2) && !(req.photo3) && !(req.photo4)){
                                        
                                msgToDelete.findOne({where: objTg_id}).then(async req =>{
                                    if(!!req)
                                    {
                                        if(req.botMsg_id != null){
                                            console.log(req.botMsg_id);
                                            await bot.deleteMessage(tg_id, req.botMsg_id);
                                        }
                                    }
                                });
    
                                bot.sendPhoto(tg_id, ("https://i.imgur.com/z4oM4NE.jpeg"), 
                                { 
                                    caption: `${id.first_name} \nYou are interested in ${id.interestedIn}`,
                                    
                                    reply_markup: {
                                        inline_keyboard: profileKeyboard
                                    }
                                }).then(result => {
                                    console.log(result[0].message_id)
    
                                    msgToDelete.update( {
                                        "botMsg_id": result[0].message_id,
                                    }, {where: objTg_id});
                                })
                            }
                            else if(!!(req.photo1) && !(req.photo2) && !(req.photo3) && !(req.photo4)){
                                        
                                msgToDelete.findOne({where: objTg_id}).then(async req =>{
                                    if(!!req)
                                    {
                                        if(req.botMsg_id != null){
                                            console.log(req.botMsg_id);
                                            await bot.deleteMessage(tg_id, req.botMsg_id);
                                        }
                                    }
                                });
    
                                bot.sendPhoto(tg_id, ("https://i.imgur.com/" + req.photo1), 
                                { 
                                    caption: `${id.first_name} \nYou are interested in ${id.interestedIn}`,
                                    
                                    reply_markup: {
                                        inline_keyboard: profileKeyboard
                                    }
                                }).then(result => {
                                    console.log(result[0].message_id)
    
                                    msgToDelete.update( {
                                        "botMsg_id": result[0].message_id,
                                    }, {where: objTg_id});
                                })
                            }
                            else
                            {

                                msgToDelete.findOne({where: objTg_id}).then(async msg_id => {
                                    try{
                                        // await Promise.all([
                                        //     bot.editMessageText(`${id.first_name} \nYou are interested in ${id.interestedIn}`, {
                                        //         chat_id: tg_id,
                                        //         message_id: msg_id.botMsg_id,
                                        //         reply_markup: {
                                        //             inline_keyboard: profileKeyboard
                                        //         }
                                        //     })
                                        // ]).then(result => {
                                        //     // botMessage_id = result[0].message_id;
                                        //     console.log(result[0].message_id)
                    
                                        //     msgToDelete.update( {
                                        //         "botMsg_id": result[0].message_id,
                                        //     }, {where: objTg_id});
                    
                                        // });

                                        await Promise.all([
                                            bot.editMessageMedia({
                                                type: 'photo', 
                                                media: "https://i.imgur.com/z4oM4NE.jpeg",
                                                caption: "Choose your interest: ",
                                            },
                                            {
                                                chat_id: tg_id,
                                                message_id: msg_id.botMsg_id,
                                                reply_markup: {
                                                    inline_keyboard: profileKeyboard
                                                }
                                            })
                                        ]).then(result => {
                                            // botMessage_id = result[0].message_id;
                                            console.log(result[0].message_id)
                    
                                            msgToDelete.update( {
                                                "botMsg_id": result[0].message_id,
                                            }, {where: objTg_id});
                    
                                        });
                                    }catch(err)
                                    {
                                        msgToDelete.findOne({where: objTg_id}).then(async req =>{
                                            if(!!req)
                                            {
                                                if(req.botMsg_id != null){
                                                    console.log(req.botMsg_id);
                                                    await bot.deleteMessage(tg_id, req.botMsg_id);
                                                }
                                            }
                                        });
        
                                        let photos = []
                                        let resultMap = null;
                                        if(!!(req.photo1)){
                                            //photo #1
                                            photos.push("https://i.imgur.com/" + req.photo1);
                                        }
                                        if(!!(req.photo2)){
                                                //photo #2
                                                photos.push("https://i.imgur.com/" + req.photo2);
                                        }
                                        if(!!req.photo3){
                                                //photo #3
                                                photos.push("https://i.imgur.com/" + req.photo3);
                                        }
                                        if(!!(req.photo4)){
                                                //photo #4
                                                photos.push("https://i.imgur.com/" + req.photo4);
                                        }
                                        if(photos != [])
                                        {
                                            resultMap = photos.map(photo => {
                                                return{
                                                    type: 'photo',
                                                    media: photo,
                                                }
                                            });
                                            console.log(resultMap);
                                        }
        
        
        
                                        if(resultMap != null)
                                        {
                                            try{
                                                await bot.sendMediaGroup(tg_id, resultMap).then(result => {
                                                    // botMessage_id = result[0].message_id;
                                                    // console.log(result[0].message_id);
                            
                                                    if(!!req.photo4){
                                                            //photo 4
                                                            msgToDelete.update( {
                                                                "botMsg2_id": result[0].message_id,
                                                                "botMsg3_id": result[1].message_id,
                                                                "botMsg4_id": result[2].message_id,
                                                                "botMsg5_id": result[3].message_id,
                                                            }, {where: objTg_id});
                                                    }
                                                    else if(!!req.photo3){
                                                            //photo 3
                                                            msgToDelete.update( {
                                                                "botMsg2_id": result[0].message_id,
                                                                "botMsg3_id": result[1].message_id,
                                                                "botMsg4_id": result[2].message_id,
                                                            }, {where: objTg_id});
                                                    }
                                                    else if(!!req.photo2){
                                                            //photo 2
                                                            msgToDelete.update( {
                                                                "botMsg2_id": result[0].message_id,
                                                                "botMsg3_id": result[1].message_id,
                                                            }, {where: objTg_id});
                                                    }
                                                    else if(!!req.photo1){
                                                            //photo 1
                                                            msgToDelete.update( {
                                                                "botMsg2_id": result[0].message_id,
                                                            }, {where: objTg_id});
                                                    }
                                                    else{
                                                        console.log("none");
                                                    }
                
                                                    // Promise.all([
                                                    //     bot.sendMessage(tg_id,`${id.first_name} \nYou are interested in ${id.interestedIn}`, {
                                                    //         reply_markup: {
                                                    //             inline_keyboard: profileKeyboard
                                                    //         }
                                                            
                                                    //     })
                                                    // ]).then(result => {
                                                    //     // botMessage_id = result[0].message_id;
                                                    //     console.log(result[0].message_id)
                                    
                                                    //     msgToDelete.update( {
                                                    //         "botMsg_id": result[0].message_id,
                                                    //     }, {where: objTg_id});
                                                    // });

                                                    Promise.all([
                                                        bot.sendPhoto(tg_id, ("https://i.imgur.com/z4oM4NE.jpeg"), 
                                                            { 
                                                                caption: `${id.first_name} \nYou are interested in ${id.interestedIn}`,
                                                                
                                                                reply_markup: {
                                                                    inline_keyboard: profileKeyboard
                                                                }
                                                            })
                                                        ]).then(result => {
                                                            console.log(result[0].message_id)
                                        
                                                            msgToDelete.update( {
                                                                "botMsg_id": result[0].message_id,
                                                            }, {where: objTg_id});
                                                        })

                                                });
                                            }catch(err)
                                            {
                                                console.log("Error!!")
                                                bot.sendPhoto(tg_id, ("https://i.imgur.com/z4oM4NE.jpeg"), 
                                                { 
                                                    caption: `${id.first_name} \nYou are interested in ${id.interestedIn}`,
                                                    
                                                    reply_markup: {
                                                        inline_keyboard: profileKeyboard
                                                    }
                                                }).then(result => {
                                                    console.log(result[0].message_id)
    
                                                    msgToDelete.update( {
                                                        "botMsg_id": result[0].message_id,
                                                    }, {where: objTg_id});
                                                })
                                            }
        
                                        }
                                    }
                                });
                            }
                        });
                    });

                });
            break
            case 'changeToBothOrientated':

                await User.update( {
                    "interestedIn": "both men and women",
                }, {where: objTg_id}).then(updated => {

                    User.findOne({where: objTg_id}).then(async id => {
                        await ProfilePhotos.findOne({where: objTg_id}).then(async req =>{
                                
                            if(!(req.photo1) && !(req.photo2) && !(req.photo3) && !(req.photo4)){
                                        
                                msgToDelete.findOne({where: objTg_id}).then(async req =>{
                                    if(!!req)
                                    {
                                        if(req.botMsg_id != null){
                                            console.log(req.botMsg_id);
                                            await bot.deleteMessage(tg_id, req.botMsg_id);
                                        }
                                    }
                                });
    
                                bot.sendPhoto(tg_id, ("https://i.imgur.com/z4oM4NE.jpeg"), 
                                { 
                                    caption: `${id.first_name} \nYou are interested in ${id.interestedIn}`,
                                    
                                    reply_markup: {
                                        inline_keyboard: profileKeyboard
                                    }
                                }).then(result => {
                                    console.log(result[0].message_id)
    
                                    msgToDelete.update( {
                                        "botMsg_id": result[0].message_id,
                                    }, {where: objTg_id});
                                })
                            }
                            else if(!!(req.photo1) && !(req.photo2) && !(req.photo3) && !(req.photo4)){
                                        
                                msgToDelete.findOne({where: objTg_id}).then(async req =>{
                                    if(!!req)
                                    {
                                        if(req.botMsg_id != null){
                                            console.log(req.botMsg_id);
                                            await bot.deleteMessage(tg_id, req.botMsg_id);
                                        }
                                    }
                                });
    
                                bot.sendPhoto(tg_id, ("https://i.imgur.com/" + req.photo1), 
                                { 
                                    caption: `${id.first_name} \nYou are interested in ${id.interestedIn}`,
                                    
                                    reply_markup: {
                                        inline_keyboard: profileKeyboard
                                    }
                                }).then(result => {
                                    console.log(result[0].message_id)
    
                                    msgToDelete.update( {
                                        "botMsg_id": result[0].message_id,
                                    }, {where: objTg_id});
                                })
                            }
                            else
                            {

                                msgToDelete.findOne({where: objTg_id}).then(async msg_id => {
                                    try{
                                        // await Promise.all([
                                        //     bot.editMessageText(`${id.first_name} \nYou are interested in ${id.interestedIn}`, {
                                        //         chat_id: tg_id,
                                        //         message_id: msg_id.botMsg_id,
                                        //         reply_markup: {
                                        //             inline_keyboard: profileKeyboard
                                        //         }
                                        //     })
                                        // ]).then(result => {
                                        //     // botMessage_id = result[0].message_id;
                                        //     console.log(result[0].message_id)
                    
                                        //     msgToDelete.update( {
                                        //         "botMsg_id": result[0].message_id,
                                        //     }, {where: objTg_id});
                    
                                        // });
                                        await Promise.all([
                                            bot.editMessageMedia({
                                                type: 'photo', 
                                                media: "https://i.imgur.com/z4oM4NE.jpeg",
                                                caption: "Choose your interest: ",
                                            },
                                            {
                                                chat_id: tg_id,
                                                message_id: msg_id.botMsg_id,
                                                reply_markup: {
                                                    inline_keyboard: profileKeyboard
                                                }
                                            })
                                        ]).then(result => {
                                            // botMessage_id = result[0].message_id;
                                            console.log(result[0].message_id)
                    
                                            msgToDelete.update( {
                                                "botMsg_id": result[0].message_id,
                                            }, {where: objTg_id});
                    
                                        });
                                    }catch(err)
                                    {
                                        msgToDelete.findOne({where: objTg_id}).then(async req =>{
                                            if(!!req)
                                            {
                                                if(req.botMsg_id != null){
                                                    console.log(req.botMsg_id);
                                                    await bot.deleteMessage(tg_id, req.botMsg_id);
                                                }
                                            }
                                        });
        
                                        let photos = []
                                        let resultMap = null;
                                        if(!!(req.photo1)){
                                            //photo #1
                                            photos.push("https://i.imgur.com/" + req.photo1);
                                        }
                                        if(!!(req.photo2)){
                                                //photo #2
                                                photos.push("https://i.imgur.com/" + req.photo2);
                                        }
                                        if(!!req.photo3){
                                                //photo #3
                                                photos.push("https://i.imgur.com/" + req.photo3);
                                        }
                                        if(!!(req.photo4)){
                                                //photo #4
                                                photos.push("https://i.imgur.com/" + req.photo4);
                                        }
                                        if(photos != [])
                                        {
                                            resultMap = photos.map(photo => {
                                                return{
                                                    type: 'photo',
                                                    media: photo,
                                                }
                                            });
                                            console.log(resultMap);
                                        }
        
        
        
                                        if(resultMap != null)
                                        {
                                            try{
                                                await bot.sendMediaGroup(tg_id, resultMap).then(result => {
                                                    // botMessage_id = result[0].message_id;
                                                    // console.log(result[0].message_id);
                            
                                                    if(!!req.photo4){
                                                            //photo 4
                                                            msgToDelete.update( {
                                                                "botMsg2_id": result[0].message_id,
                                                                "botMsg3_id": result[1].message_id,
                                                                "botMsg4_id": result[2].message_id,
                                                                "botMsg5_id": result[3].message_id,
                                                            }, {where: objTg_id});
                                                    }
                                                    else if(!!req.photo3){
                                                            //photo 3
                                                            msgToDelete.update( {
                                                                "botMsg2_id": result[0].message_id,
                                                                "botMsg3_id": result[1].message_id,
                                                                "botMsg4_id": result[2].message_id,
                                                            }, {where: objTg_id});
                                                    }
                                                    else if(!!req.photo2){
                                                            //photo 2
                                                            msgToDelete.update( {
                                                                "botMsg2_id": result[0].message_id,
                                                                "botMsg3_id": result[1].message_id,
                                                            }, {where: objTg_id});
                                                    }
                                                    else if(!!req.photo1){
                                                            //photo 1
                                                            msgToDelete.update( {
                                                                "botMsg2_id": result[0].message_id,
                                                            }, {where: objTg_id});
                                                    }
                                                    else{
                                                        console.log("none");
                                                    }
                
                                                    // Promise.all([
                                                    //     bot.sendMessage(tg_id,`${id.first_name} \nYou are interested in ${id.interestedIn}`, {
                                                    //         reply_markup: {
                                                    //             inline_keyboard: profileKeyboard
                                                    //         }
                                                            
                                                    //     })
                                                    // ]).then(result => {
                                                    //     // botMessage_id = result[0].message_id;
                                                    //     console.log(result[0].message_id)
                                    
                                                    //     msgToDelete.update( {
                                                    //         "botMsg_id": result[0].message_id,
                                                    //     }, {where: objTg_id});
                                                    // });

                                                    Promise.all([
                                                        bot.sendPhoto(tg_id, ("https://i.imgur.com/z4oM4NE.jpeg"), 
                                                            { 
                                                                caption: `${id.first_name} \nYou are interested in ${id.interestedIn}`,
                                                                
                                                                reply_markup: {
                                                                    inline_keyboard: profileKeyboard
                                                                }
                                                            })
                                                        ]).then(result => {
                                                            console.log(result[0].message_id)
                                        
                                                            msgToDelete.update( {
                                                                "botMsg_id": result[0].message_id,
                                                            }, {where: objTg_id});
                                                        })

                                                });
                                            }catch(err)
                                            {
                                                console.log("Error!!")
                                                bot.sendPhoto(tg_id, ("https://i.imgur.com/z4oM4NE.jpeg"), 
                                                { 
                                                    caption: `${id.first_name} \nYou are interested in ${id.interestedIn}`,
                                                    
                                                    reply_markup: {
                                                        inline_keyboard: profileKeyboard
                                                    }
                                                }).then(result => {
                                                    console.log(result[0].message_id)
    
                                                    msgToDelete.update( {
                                                        "botMsg_id": result[0].message_id,
                                                    }, {where: objTg_id});
                                                })
                                            }
        
                                        }
                                    }
                                });
                            }
                        });
                    });

                });

                
            break
            case 'balance':

                User.findOne({where: objTg_id}).then(async id => {
                    await ProfilePhotos.findOne({where: objTg_id}).then(async req =>{
                            
                        if(!(req.photo1) && !(req.photo2) && !(req.photo3) && !(req.photo4)){
                                    
                            msgToDelete.findOne({where: objTg_id}).then(async req =>{
                                if(!!req)
                                {
                                    if(req.botMsg_id != null){
                                        console.log(req.botMsg_id);
                                        await bot.deleteMessage(tg_id, req.botMsg_id);
                                    }
                                }
                            });

                            bot.sendPhoto(tg_id, ("https://i.imgur.com/z4oM4NE.jpeg"), 
                            { 
                                caption: `${id.first_name} \nYou are interested in ${id.interestedIn}`,
                                
                                reply_markup: {
                                    inline_keyboard: balanceKeyboard
                                }
                            }).then(result => {
                                console.log(result[0].message_id)

                                msgToDelete.update( {
                                    "botMsg_id": result[0].message_id,
                                }, {where: objTg_id});
                            })
                        }
                        else if(!!(req.photo1) && !(req.photo2) && !(req.photo3) && !(req.photo4)){
                                    
                            msgToDelete.findOne({where: objTg_id}).then(async req =>{
                                if(!!req)
                                {
                                    if(req.botMsg_id != null){
                                        console.log(req.botMsg_id);
                                        await bot.deleteMessage(tg_id, req.botMsg_id);
                                    }
                                }
                            });

                            bot.sendPhoto(tg_id, ("https://i.imgur.com/" + req.photo1), 
                            { 
                                caption: `${id.first_name} \nYou are interested in ${id.interestedIn}`,
                                
                                reply_markup: {
                                    inline_keyboard: balanceKeyboard
                                }
                            }).then(result => {
                                console.log(result[0].message_id)

                                msgToDelete.update( {
                                    "botMsg_id": result[0].message_id,
                                }, {where: objTg_id});
                            })
                        }
                        else
                        {
                            msgToDelete.findOne({where: objTg_id}).then(async msg_id => {
                                // await Promise.all([
                                //     bot.editMessageText(`${id.first_name} \nYou are interested in ${id.interestedIn}`, {
                                //         chat_id: tg_id,
                                //         message_id: msg_id.botMsg_id,
                                //         reply_markup: {
                                //             inline_keyboard: balanceKeyboard
                                //         }
                                //     })
                                // ]).then(result => {
                                //     // botMessage_id = result[0].message_id;
                                //     console.log(result[0].message_id)
            
                                //     msgToDelete.update( {
                                //         "botMsg_id": result[0].message_id,
                                //     }, {where: objTg_id});
            
                                // });
                                if(msg_id.botMsg2_id == null || msg_id.botMsg3_id == null || msg_id.botMsg4_id == null || msg_id.botMsg5_id == null)
                                {
                                    msgToDelete.findOne({where: objTg_id}).then(async req =>{
                                        if(!!req)
                                        {
                                            if(req.botMsg_id != null){
                                                console.log(req.botMsg_id);
                                                await bot.deleteMessage(tg_id, req.botMsg_id);
                                            }
                                            if(req.botMsg2_id != null){
                                                console.log(req.botMsg2_id);
                                                await bot.deleteMessage(tg_id, req.botMsg2_id);
                            
                                                msgToDelete.update( {
                                                    "botMsg2_id": null,
                                                }, {where: objTg_id});
                                            }
                                            if(req.botMsg3_id != null){
                                                console.log(req.botMsg3_id);
                                                await bot.deleteMessage(tg_id, req.botMsg3_id);
                            
                                                msgToDelete.update( {
                                                    "botMsg3_id": null,
                                                }, {where: objTg_id});
                                            }
                                            if(req.botMsg4_id != null){
                                                console.log(req.botMsg4_id);
                                                await bot.deleteMessage(tg_id, req.botMsg4_id);
                            
                                                msgToDelete.update( {
                                                    "botMsg4_id": null,
                                                }, {where: objTg_id});   
                                            }
                                            if(req.botMsg5_id != null){
                                                console.log(req.botMsg5_id);
                                                await bot.deleteMessage(tg_id, req.botMsg5_id);
                            
                                                msgToDelete.update( {
                                                    "botMsg5_id": null,
                                                }, {where: objTg_id});   
                                            }
                                        }
                                    });
    
                                    let photos = []
                                    let resultMap = null;
                                    if(!!(req.photo1)){
                                        //photo #1
                                        photos.push("https://i.imgur.com/" + req.photo1);
                                    }
                                    if(!!(req.photo2)){
                                            //photo #2
                                            photos.push("https://i.imgur.com/" + req.photo2);
                                    }
                                    if(!!req.photo3){
                                            //photo #3
                                            photos.push("https://i.imgur.com/" + req.photo3);
                                    }
                                    if(!!(req.photo4)){
                                            //photo #4
                                            photos.push("https://i.imgur.com/" + req.photo4);
                                    }
                                    if(photos != [])
                                    {
                                        resultMap = photos.map(photo => {
                                            return{
                                                type: 'photo',
                                                media: photo,
                                            }
                                        });
                                        console.log(resultMap);
                                    }
    
    
    
                                    if(resultMap != null)
                                    {
                                        try{
                                            console.log("3");
                                            await bot.sendMediaGroup(tg_id, resultMap).then(result => {
                                                // botMessage_id = result[0].message_id;
                                                // console.log(result[0].message_id);
                        
                                                if(!!req.photo4){
                                                        //photo 4
                                                        msgToDelete.update( {
                                                            "botMsg2_id": result[0].message_id,
                                                            "botMsg3_id": result[1].message_id,
                                                            "botMsg4_id": result[2].message_id,
                                                            "botMsg5_id": result[3].message_id,
                                                        }, {where: objTg_id});
                                                }
                                                else if(!!req.photo3){
                                                        //photo 3
                                                        msgToDelete.update( {
                                                            "botMsg2_id": result[0].message_id,
                                                            "botMsg3_id": result[1].message_id,
                                                            "botMsg4_id": result[2].message_id,
                                                        }, {where: objTg_id});
                                                }
                                                else if(!!req.photo2){
                                                        //photo 2
                                                        msgToDelete.update( {
                                                            "botMsg2_id": result[0].message_id,
                                                            "botMsg3_id": result[1].message_id,
                                                        }, {where: objTg_id});
                                                }
                                                else if(!!req.photo1){
                                                        //photo 1
                                                        msgToDelete.update( {
                                                            "botMsg2_id": result[0].message_id,
                                                        }, {where: objTg_id});
                                                }
                                                else{
                                                    console.log("none");
                                                }
            
                                                // Promise.all([
                                                //     bot.sendMessage(tg_id,`${id.first_name} \nYou are interested in ${id.interestedIn}`, {
                                                //         reply_markup: {
                                                //             inline_keyboard: balanceKeyboard
                                                //         }
                                                        
                                                //     })
                                                // ]).then(result => {
                                                //     // botMessage_id = result[0].message_id;
                                                //     console.log(result[0].message_id)
                                
                                                //     msgToDelete.update( {
                                                //         "botMsg_id": result[0].message_id,
                                                //     }, {where: objTg_id});
                                                // });

                                                Promise.all([
                                                    bot.sendPhoto(tg_id, ("https://i.imgur.com/z4oM4NE.jpeg"), 
                                                        { 
                                                            caption: `${id.first_name} \nYou are interested in ${id.interestedIn}`,
                                                            
                                                            reply_markup: {
                                                                inline_keyboard: balanceKeyboard
                                                            }
                                                        })
                                                    ]).then(result => {
                                                        console.log(result[0].message_id)
                                    
                                                        console.log("4");
                                                        msgToDelete.update( {
                                                            "botMsg_id": result[0].message_id,
                                                        }, {where: objTg_id});
                                                    })


                                            });
                                        }catch(err)
                                        {
                                            console.log("Error!!")
                                            bot.sendPhoto(tg_id, ("https://i.imgur.com/z4oM4NE.jpeg"), 
                                            { 
                                                caption: `${id.first_name} \nYou are interested in ${id.interestedIn}`,
                                                
                                                reply_markup: {
                                                    inline_keyboard: balanceKeyboard
                                                }
                                            }).then(result => {
                                                console.log(result[0].message_id)

                                                msgToDelete.update( {
                                                    "botMsg_id": result[0].message_id,
                                                }, {where: objTg_id});
                                            })
                                        }
                                    }
                                }
                                else
                                {
                                    console.log("1");
                                    await Promise.all([
                                        bot.editMessageMedia({
                                            type: 'photo', 
                                            media: "https://i.imgur.com/z4oM4NE.jpeg",
                                            caption: "Keyboard: ",
                                        },
                                        {
                                            chat_id: tg_id,
                                            message_id: msg_id.botMsg_id,
                                            reply_markup: {
                                                inline_keyboard: balanceKeyboard
                                            }
                                        })
                                    ]).then(result => {
                                        // botMessage_id = result[0].message_id;
                                        console.log(result[0].message_id)
                
                                        msgToDelete.update( {
                                            "botMsg_id": result[0].message_id,
                                        }, {where: objTg_id});
                
                                    });
                                }
                            });
                        }
                    });
                });
            
            break
            case 'settings':

                // msgToDelete.findOne({where: objTg_id}).then(async msg_id => {
                //     await Promise.all([
                //         bot.editMessageText("Keyboard: ", {
                //             chat_id: tg_id,
                //             message_id: msg_id.botMsg_id,
                //             reply_markup: {
                //                 inline_keyboard: settingsKeyboard
                //             }
                //         })
                //     ]).then(result => {
                //         // botMessage_id = result[0].message_id;
                //         console.log(result[0].message_id)

                //         msgToDelete.update( {
                //             "botMsg_id": result[0].message_id,
                //         }, {where: objTg_id});

                //     });
                // });

                msgToDelete.findOne({where: objTg_id}).then(async msg_id => {
                    await Promise.all([
                        bot.editMessageMedia({
                            type: 'photo', 
                            media: "https://i.imgur.com/z4oM4NE.jpeg",
                            caption: "Choose your interest: ",
                        },
                        {
                            chat_id: tg_id,
                            message_id: msg_id.botMsg_id,
                            reply_markup: {
                                inline_keyboard: settingsKeyboard
                            }
                        })
                    ]).then(result => {
                        // botMessage_id = result[0].message_id;
                        console.log(result[0].message_id)

                        msgToDelete.update( {
                            "botMsg_id": result[0].message_id,
                        }, {where: objTg_id});

                    });
                });
            break
            case 'language':

                // msgToDelete.findOne({where: objTg_id}).then(async msg_id => {
                //     await Promise.all([
                //         bot.editMessageText("Keyboard: ", {
                //             chat_id: tg_id,
                //             message_id: msg_id.botMsg_id,
                //             reply_markup: {
                //                 inline_keyboard: languageKeyboard
                //             }
                //         })
                //     ]).then(result => {
                //         // botMessage_id = result[0].message_id;
                //         console.log(result[0].message_id)

                //         msgToDelete.update( {
                //             "botMsg_id": result[0].message_id,
                //         }, {where: objTg_id});

                //     });
                // });

                msgToDelete.findOne({where: objTg_id}).then(async msg_id => {
                    await Promise.all([
                        bot.editMessageMedia({
                            type: 'photo', 
                            media: "https://i.imgur.com/z4oM4NE.jpeg",
                            caption: "Choose your interest: ",
                        },
                        {
                            chat_id: tg_id,
                            message_id: msg_id.botMsg_id,
                            reply_markup: {
                                inline_keyboard: languageKeyboard
                            }
                        })
                    ]).then(result => {
                        // botMessage_id = result[0].message_id;
                        console.log(result[0].message_id)

                        msgToDelete.update( {
                            "botMsg_id": result[0].message_id,
                        }, {where: objTg_id});

                    });
                });
            break

            case 'info':

                // msgToDelete.findOne({where: objTg_id}).then(async msg_id => {
                //     await Promise.all([
                //         bot.editMessageText("Keyboard: ", {
                //             chat_id: tg_id,
                //             message_id: msg_id.botMsg_id,
                //             reply_markup: {
                //                 inline_keyboard: infoKeyboard
                //             }
                //         })
                //     ]).then(result => {
                //         // botMessage_id = result[0].message_id;
                //         console.log(result[0].message_id)

                //         msgToDelete.update( {
                //             "botMsg_id": result[0].message_id,
                //         }, {where: objTg_id});

                //     });
                // });

                msgToDelete.findOne({where: objTg_id}).then(async msg_id => {
                    await Promise.all([
                        bot.editMessageMedia({
                            type: 'photo', 
                            media: "https://i.imgur.com/z4oM4NE.jpeg",
                            caption: "Choose your interest: ",
                        },
                        {
                            chat_id: tg_id,
                            message_id: msg_id.botMsg_id,
                            reply_markup: {
                                inline_keyboard: infoKeyboard
                            }
                        })
                    ]).then(result => {
                        // botMessage_id = result[0].message_id;
                        console.log(result[0].message_id)

                        msgToDelete.update( {
                            "botMsg_id": result[0].message_id,
                        }, {where: objTg_id});

                    });
                });

                break
            case 'back':
                User.findOne({where: objTg_id}).then(id => {
                    if((id.gender == "male" && id.interestedIn == "women") || (id.gender == "female" && id.interestedIn == "men"))
                        {
                            // msgToDelete.findOne({where: objTg_id}).then(async msg_id => {
                            //     await Promise.all([
                            //         bot.editMessageText("Keyboard: ", {
                            //             chat_id: tg_id,
                            //             message_id: msg_id.botMsg_id,
                            //             reply_markup: {
                            //                 inline_keyboard: mainKeyboard
                            //             }
                            //         })
                            //     ]).then(result => {
                            //         // botMessage_id = result[0].message_id;
                            //         console.log(result[0].message_id)
            
                            //         msgToDelete.update( {
                            //             "botMsg_id": result[0].message_id,
                            //         }, {where: objTg_id});
            
                            //     });
                            // });
                            msgToDelete.findOne({where: objTg_id}).then(async msg_id => {
                                await Promise.all([
                                    bot.editMessageMedia({
                                        type: 'photo', 
                                        media: "https://i.imgur.com/z4oM4NE.jpeg",
                                        caption: "Choose your interest: ",
                                    },
                                    {
                                        chat_id: tg_id,
                                        message_id: msg_id.botMsg_id,
                                        reply_markup: {
                                            inline_keyboard: mainKeyboard
                                        }
                                    })
                                ]).then(result => {
                                    // botMessage_id = result[0].message_id;
                                    console.log(result[0].message_id)
            
                                    msgToDelete.update( {
                                        "botMsg_id": result[0].message_id,
                                    }, {where: objTg_id});
            
                                });
                            });
                        }
                        else if((id.gender == "male" && id.interestedIn == "men"))
                        {

                            // msgToDelete.findOne({where: objTg_id}).then(async msg_id => {
                            //     await Promise.all([
                            //         bot.editMessageText("Keyboard: ", {
                            //             chat_id: tg_id,
                            //             message_id: msg_id.botMsg_id,
                            //             reply_markup: {
                            //                 inline_keyboard: mainKeyboardM
                            //             }
                            //         })
                            //     ]).then(result => {
                            //         // botMessage_id = result[0].message_id;
                            //         console.log(result[0].message_id)
            
                            //         msgToDelete.update( {
                            //             "botMsg_id": result[0].message_id,
                            //         }, {where: objTg_id});
            
                            //     });
                            // });

                            msgToDelete.findOne({where: objTg_id}).then(async msg_id => {
                                await Promise.all([
                                    bot.editMessageMedia({
                                        type: 'photo', 
                                        media: "https://i.imgur.com/z4oM4NE.jpeg",
                                        caption: "Choose your interest: ",
                                    },
                                    {
                                        chat_id: tg_id,
                                        message_id: msg_id.botMsg_id,
                                        reply_markup: {
                                            inline_keyboard: mainKeyboardM
                                        }
                                    })
                                ]).then(result => {
                                    // botMessage_id = result[0].message_id;
                                    console.log(result[0].message_id)
            
                                    msgToDelete.update( {
                                        "botMsg_id": result[0].message_id,
                                    }, {where: objTg_id});
            
                                });
                            });
                        }
                        else if((id.gender == "female" && id.interestedIn == "women"))
                        {

                            // msgToDelete.findOne({where: objTg_id}).then(async msg_id => {
                            //     await Promise.all([
                            //         bot.editMessageText("Keyboard: ", {
                            //             chat_id: tg_id,
                            //             message_id: msg_id.botMsg_id,
                            //             reply_markup: {
                            //                 inline_keyboard: mainKeyboardF
                            //             }
                            //         })
                            //     ]).then(result => {
                            //         // botMessage_id = result[0].message_id;
                            //         console.log(result[0].message_id)
            
                            //         msgToDelete.update( {
                            //             "botMsg_id": result[0].message_id,
                            //         }, {where: objTg_id});
            
                            //     });
                            // });

                            msgToDelete.findOne({where: objTg_id}).then(async msg_id => {
                                await Promise.all([
                                    bot.editMessageMedia({
                                        type: 'photo', 
                                        media: "https://i.imgur.com/z4oM4NE.jpeg",
                                        caption: "Choose your interest: ",
                                    },
                                    {
                                        chat_id: tg_id,
                                        message_id: msg_id.botMsg_id,
                                        reply_markup: {
                                            inline_keyboard: mainKeyboardF
                                        }
                                    })
                                ]).then(result => {
                                    // botMessage_id = result[0].message_id;
                                    console.log(result[0].message_id)
            
                                    msgToDelete.update( {
                                        "botMsg_id": result[0].message_id,
                                    }, {where: objTg_id});
            
                                });
                            });
                        }
                        else if((id.gender == "male" && id.interestedIn == "both men and women") || (id.gender == "female" && id.interestedIn == "both men and women"))
                        {

                            // msgToDelete.findOne({where: objTg_id}).then(async msg_id => {
                            //     await Promise.all([
                            //         bot.editMessageText("Keyboard: ", {
                            //             chat_id: tg_id,
                            //             message_id: msg_id.botMsg_id,
                            //             reply_markup: {
                            //                 inline_keyboard: mainKeyboardB
                            //             }
                            //         })
                            //     ]).then(result => {
                            //         // botMessage_id = result[0].message_id;
                            //         console.log(result[0].message_id)
            
                            //         msgToDelete.update( {
                            //             "botMsg_id": result[0].message_id,
                            //         }, {where: objTg_id});
            
                            //     });
                            // });

                            msgToDelete.findOne({where: objTg_id}).then(async msg_id => {
                                await Promise.all([
                                    bot.editMessageMedia({
                                        type: 'photo', 
                                        media: "https://i.imgur.com/z4oM4NE.jpeg",
                                        caption: "Choose your interest: ",
                                    },
                                    {
                                        chat_id: tg_id,
                                        message_id: msg_id.botMsg_id,
                                        reply_markup: {
                                            inline_keyboard: mainKeyboardB
                                        }
                                    })
                                ]).then(result => {
                                    // botMessage_id = result[0].message_id;
                                    console.log(result[0].message_id)
            
                                    msgToDelete.update( {
                                        "botMsg_id": result[0].message_id,
                                    }, {where: objTg_id});
            
                                });
                            });
                        }
                });
            break
            case 'backFromProfile':
                User.findOne({where: objTg_id}).then(id => {
                    if((id.gender == "male" && id.interestedIn == "women") || (id.gender == "female" && id.interestedIn == "men"))
                        {

                                // Promise.all([
                                //     bot.sendMessage(tg_id, "Keyboard: ", {
                                //         reply_markup: {
                                //             inline_keyboard: mainKeyboard
                                //         }
                                //     })
                                // ]).then(result => {
                                //     // botMessage_id = result[0].message_id;
                                //     console.log(result[0].message_id)
                
                                //     msgToDelete.update( {
                                //         "botMsg_id": result[0].message_id,
                                //     }, {where: objTg_id});
                                // });

                                Promise.all([
                                    bot.sendPhoto(tg_id, ("https://i.imgur.com/z4oM4NE.jpeg"), 
                                        { 
                                            caption: "Keyboard: ",
                                            
                                            reply_markup: {
                                                inline_keyboard: mainKeyboard
                                            }
                                        })
                                    ]).then(result => {
                                        console.log(result[0].message_id)
                    
                                        msgToDelete.update( {
                                            "botMsg_id": result[0].message_id,
                                        }, {where: objTg_id});
                                    })

                        }
                        else if((id.gender == "male" && id.interestedIn == "men"))
                        {

                            // Promise.all([
                            //     bot.sendMessage(tg_id, "Keyboard: ", {
                            //         reply_markup: {
                            //             inline_keyboard: mainKeyboardM
                            //         }
                            //     })
                            // ]).then(result => {
                            //     // botMessage_id = result[0].message_id;
                            //     console.log(result[0].message_id)
            
                            //     msgToDelete.update( {
                            //         "botMsg_id": result[0].message_id,
                            //     }, {where: objTg_id});
                            // });

                            Promise.all([
                                bot.sendPhoto(tg_id, ("https://i.imgur.com/z4oM4NE.jpeg"), 
                                    { 
                                        caption: "Keyboard: ",
                                        
                                        reply_markup: {
                                            inline_keyboard: mainKeyboardM
                                        }
                                    })
                                ]).then(result => {
                                    console.log(result[0].message_id)
                
                                    msgToDelete.update( {
                                        "botMsg_id": result[0].message_id,
                                    }, {where: objTg_id});
                                })

                        }
                        else if((id.gender == "female" && id.interestedIn == "women"))
                        {

                            // Promise.all([
                            //     bot.sendMessage(tg_id, "Keyboard: ", {
                            //         reply_markup: {
                            //             inline_keyboard: mainKeyboardF
                            //         }
                            //     })
                            // ]).then(result => {
                            //     // botMessage_id = result[0].message_id;
                            //     console.log(result[0].message_id)
            
                            //     msgToDelete.update( {
                            //         "botMsg_id": result[0].message_id,
                            //     }, {where: objTg_id});
                            // });

                            Promise.all([
                                bot.sendPhoto(tg_id, ("https://i.imgur.com/z4oM4NE.jpeg"), 
                                    { 
                                        caption: "Keyboard: ",
                                        
                                        reply_markup: {
                                            inline_keyboard: mainKeyboardF
                                        }
                                    })
                                ]).then(result => {
                                    console.log(result[0].message_id)
                
                                    msgToDelete.update( {
                                        "botMsg_id": result[0].message_id,
                                    }, {where: objTg_id});
                                })

                        }
                        else if((id.gender == "male" && id.interestedIn == "both men and women") || (id.gender == "female" && id.interestedIn == "both men and women"))
                        {

                            // Promise.all([
                            //     bot.sendMessage(tg_id, "Keyboard: ", {
                            //         reply_markup: {
                            //             inline_keyboard: mainKeyboardB
                            //         }
                            //     })
                            // ]).then(result => {
                            //     // botMessage_id = result[0].message_id;
                            //     console.log(result[0].message_id)
            
                            //     msgToDelete.update( {
                            //         "botMsg_id": result[0].message_id,
                            //     }, {where: objTg_id});
                            // });
                            Promise.all([
                                bot.sendPhoto(tg_id, ("https://i.imgur.com/z4oM4NE.jpeg"), 
                                    { 
                                        caption: "Keyboard: ",
                                        
                                        reply_markup: {
                                            inline_keyboard: mainKeyboardB
                                        }
                                    })
                                ]).then(result => {
                                    console.log(result[0].message_id)
                
                                    msgToDelete.update( {
                                        "botMsg_id": result[0].message_id,
                                    }, {where: objTg_id});
                                })
                        }
                });
            break
            case 'backToSettings':

                // msgToDelete.findOne({where: objTg_id}).then(async msg_id => {
                //     await Promise.all([
                //         bot.editMessageText("Keyboard: ", {
                //             chat_id: tg_id,
                //             message_id: msg_id.botMsg_id,
                //             reply_markup: {
                //                 inline_keyboard: settingsKeyboard
                //             }
                //         })
                //     ]).then(result => {
                //         // botMessage_id = result[0].message_id;
                //         console.log(result[0].message_id)

                //         msgToDelete.update( {
                //             "botMsg_id": result[0].message_id,
                //         }, {where: objTg_id});

                //     });
                // });

                msgToDelete.findOne({where: objTg_id}).then(async msg_id => {
                    await Promise.all([
                        bot.editMessageMedia({
                            type: 'photo', 
                            media: "https://i.imgur.com/z4oM4NE.jpeg",
                            caption: "Choose your interest: ",
                        },
                        {
                            chat_id: tg_id,
                            message_id: msg_id.botMsg_id,
                            reply_markup: {
                                inline_keyboard: settingsKeyboard
                            }
                        })
                    ]).then(result => {
                        // botMessage_id = result[0].message_id;
                        console.log(result[0].message_id)

                        msgToDelete.update( {
                            "botMsg_id": result[0].message_id,
                        }, {where: objTg_id});

                    });
                });
                
            break
            case 'backToProfile':
                User.findOne({where: objTg_id}).then(async id => {
                    await ProfilePhotos.findOne({where: objTg_id}).then(async req =>{
                            
                        if(!(req.photo1) && !(req.photo2) && !(req.photo3) && !(req.photo4)){
                                    
                            msgToDelete.findOne({where: objTg_id}).then(async req =>{
                                if(!!req)
                                {
                                    if(req.botMsg_id != null){
                                        console.log(req.botMsg_id);
                                        await bot.deleteMessage(tg_id, req.botMsg_id);
                                    }
                                }
                            });

                            bot.sendPhoto(tg_id, ("https://i.imgur.com/z4oM4NE.jpeg"), 
                            { 
                                caption: `${id.first_name} \nYou are interested in ${id.interestedIn}`,
                                
                                reply_markup: {
                                    inline_keyboard: profileKeyboard
                                }
                            }).then(result => {
                                console.log(result[0].message_id)

                                msgToDelete.update( {
                                    "botMsg_id": result[0].message_id,
                                }, {where: objTg_id});
                            })
                        }
                        else if(!!(req.photo1) && !(req.photo2) && !(req.photo3) && !(req.photo4)){
                                    
                            msgToDelete.findOne({where: objTg_id}).then(async req =>{
                                if(!!req)
                                {
                                    if(req.botMsg_id != null){
                                        console.log(req.botMsg_id);
                                        await bot.deleteMessage(tg_id, req.botMsg_id);
                                    }
                                }
                            });

                            bot.sendPhoto(tg_id, ("https://i.imgur.com/" + req.photo1), 
                            { 
                                caption: `${id.first_name} \nYou are interested in ${id.interestedIn}`,
                                
                                reply_markup: {
                                    inline_keyboard: profileKeyboard
                                }
                            }).then(result => {
                                console.log(result[0].message_id)

                                msgToDelete.update( {
                                    "botMsg_id": result[0].message_id,
                                }, {where: objTg_id});
                            })
                        }
                        else
                        {

                            try{
                                // msgToDelete.findOne({where: objTg_id}).then(async msg_id => {
                                //     await Promise.all([
                                //         bot.editMessageText(`${id.first_name} \nYou are interested in ${id.interestedIn}`, {
                                //             chat_id: tg_id,
                                //             message_id: msg_id.botMsg_id,
                                //             reply_markup: {
                                //                 inline_keyboard: profileKeyboard
                                //             }
                                //         })
                                //     ]).then(result => {
                                //         // botMessage_id = result[0].message_id;
                                //         console.log(result[0].message_id)
                
                                //         msgToDelete.update( {
                                //             "botMsg_id": result[0].message_id,
                                //         }, {where: objTg_id});
                
                                //     });
                                // });
                                msgToDelete.findOne({where: objTg_id}).then(async msg_id => {
                                    await Promise.all([
                                        bot.editMessageMedia({
                                            type: 'photo', 
                                            media: "https://i.imgur.com/z4oM4NE.jpeg",
                                            caption: "Choose your interest: ",
                                        },
                                        {
                                            chat_id: tg_id,
                                            message_id: msg_id.botMsg_id,
                                            reply_markup: {
                                                inline_keyboard: profileKeyboard
                                            }
                                        })
                                    ]).then(result => {
                                        // botMessage_id = result[0].message_id;
                                        console.log(result[0].message_id)
                
                                        msgToDelete.update( {
                                            "botMsg_id": result[0].message_id,
                                        }, {where: objTg_id});
                
                                    });
                                });
                            }catch(err)
                            {
                                msgToDelete.findOne({where: objTg_id}).then(async req =>{
                                    if(!!req)
                                    {
                                        if(req.botMsg_id != null){
                                            console.log(req.botMsg_id);
                                            await bot.deleteMessage(tg_id, req.botMsg_id);
                                        }
                                    }
                                });

                                await bot.sendMediaGroup(tg_id, resultMap).then(result => {
                                    // botMessage_id = result[0].message_id;
                                    // console.log(result[0].message_id);
            
                                    if(!!req.photo4){
                                            //photo 4
                                            msgToDelete.update( {
                                                "botMsg2_id": result[0].message_id,
                                                "botMsg3_id": result[1].message_id,
                                                "botMsg4_id": result[2].message_id,
                                                "botMsg5_id": result[3].message_id,
                                            }, {where: objTg_id});
                                    }
                                    else if(!!req.photo3){
                                            //photo 3
                                            msgToDelete.update( {
                                                "botMsg2_id": result[0].message_id,
                                                "botMsg3_id": result[1].message_id,
                                                "botMsg4_id": result[2].message_id,
                                            }, {where: objTg_id});
                                    }
                                    else if(!!req.photo2){
                                            //photo 2
                                            msgToDelete.update( {
                                                "botMsg2_id": result[0].message_id,
                                                "botMsg3_id": result[1].message_id,
                                            }, {where: objTg_id});
                                    }
                                    else if(!!req.photo1){
                                            //photo 1
                                            msgToDelete.update( {
                                                "botMsg2_id": result[0].message_id,
                                            }, {where: objTg_id});
                                    }
                                    else{
                                        console.log("none");
                                    }

                                    // Promise.all([
                                    //     bot.sendMessage(tg_id,`${id.first_name} \nYou are interested in ${id.interestedIn}`, {
                                    //         reply_markup: {
                                    //             inline_keyboard: profileKeyboard
                                    //         }
                                            
                                    //     })
                                    // ]).then(result => {
                                    //     // botMessage_id = result[0].message_id;
                                    //     console.log(result[0].message_id)
                    
                                    //     msgToDelete.update( {
                                    //         "botMsg_id": result[0].message_id,
                                    //     }, {where: objTg_id});
                                    // });

                                    Promise.all([
                                        bot.sendPhoto(tg_id, ("https://i.imgur.com/z4oM4NE.jpeg"), 
                                            { 
                                                caption: `${id.first_name} \nYou are interested in ${id.interestedIn}`,
                                                
                                                reply_markup: {
                                                    inline_keyboard: profileKeyboard
                                                }
                                            })
                                        ]).then(result => {
                                            console.log(result[0].message_id)
                        
                                            msgToDelete.update( {
                                                "botMsg_id": result[0].message_id,
                                            }, {where: objTg_id});
                                        })
                                });

                            }
                        }
                    });
                });

            break
        }

    // bot.answerCallbackQuery({
    //     callback_query_id: query.id
    // })




/*     bot.answerCallbackQuery(query.id, `${query.data}`) */
});



app.listen(process.env.PORT || 4000, async () => {
    console.log('App running on port', process.env.PORT || 4000)
    await init()
});