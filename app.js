
const { Telegraf } = require('telegraf');

const Prediction = require('./api');
const api = new Prediction();

const bot = new Telegraf('5992286728:AAGSoTTi85R5ehIS_BXgcEl77Zypm_hfX6E');

bot.command('start', async ctx => {
    console.log(ctx.from)
    await bot.telegram.sendPhoto(ctx.chat.id, "https://i.pinimg.com/550x/6c/93/a5/6c93a5baf59208f3485b4610e0170582.jpg")
    await bot.telegram.sendMessage(ctx.chat.id, 'Здравствуй путник. Рад тебя видеть в таверне у старого ублюдка Шарлатана. Чем могу помочь?', {
        reply_markup: {
            inline_keyboard: [
                [{  
                        text: "Магический Шар",
                        callback_data: 'magicball'
                    }
                ],

            ]
        }
    })

});


bot.action('magicball', async ctx => {
    await bot.telegram.sendPhoto(ctx.chat.id, "https://img.freepik.com/premium-vector/mystic-ball-with-pixel-art-style_475147-241.jpg")
    await bot.telegram.sendMessage(ctx.chat.id, 'Загадай на что ты хочешь узнать ответ и потряси шар', {
        reply_markup: {
            inline_keyboard: [
                [{  
                        text: "Трясти шар",
                        callback_data: 'shakedball'
                    }
                ],

            ]
        }
    })
})

bot.action('shakedball', async ctx => {
    predict = await api.getRandomPrediction()
    await bot.telegram.sendPhoto(ctx.chat.id, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrnASZKf8G60GlDfKTHkqQleWnbTKzBokhja4U48ex_ZLgHNQ_Y8MJvQTGYsWFrKELiGs&usqp=CAU")
    await bot.telegram.sendMessage(ctx.chat.id, JSON.stringify(predict.data[0].prediction))
})



bot.launch();
console.log("Bot started")