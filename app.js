const { Telegraf } = require('telegraf');

const Prediction = require('./api');
const api = new Prediction();

const bot = new Telegraf(token);

bot.command('start', async ctx => {
    console.log(ctx.from)
    await bot.telegram.sendPhoto(ctx.chat.id, "https://i.pinimg.com/550x/6c/93/a5/6c93a5baf59208f3485b4610e0170582.jpg")
    await bot.telegram.sendMessage(ctx.chat.id, 'Здравствуй путник. Рад тебя видеть в таверне у старого ублюдка Шарлатана. Чем могу помочь?', {
        reply_markup: {
            resize_keyboard: true,
            keyboard: [
                [{  
                        text: "Магический Шар",
                    }
                ],

            ]
        }
    })

});


bot.hears('Магический Шар', async ctx => {
    await bot.telegram.sendPhoto(ctx.chat.id, "https://img.freepik.com/premium-vector/mystic-ball-with-pixel-art-style_475147-241.jpg")
    await bot.telegram.sendMessage(ctx.chat.id, 'Загадай на что ты хочешь получить ответ и потряси шар', {
        reply_markup: {
            resize_keyboard: true,
            keyboard: [
                [{  
                        text: "Трясти шар",
                    }
                ],

            ]
        }
    })
})

bot.hears('Трясти шар', async ctx => {
    predict = await api.getRandomPrediction()
    await bot.telegram.sendPhoto(ctx.chat.id, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrnASZKf8G60GlDfKTHkqQleWnbTKzBokhja4U48ex_ZLgHNQ_Y8MJvQTGYsWFrKELiGs&usqp=CAU")
    await bot.telegram.sendMessage(ctx.chat.id, JSON.stringify(predict.data[0].prediction))

    await bot.telegram.sendMessage(ctx.chat.id, 'Загадай на что ты хочешь получить ответ и потряси шар', {
        reply_markup: {
            resize_keyboard: true,
            keyboard: [
                [{  
                        text: "Трясти шар",
                    },
                    {
                        text: "Вернуться к ебучему Шарлатану",
                    }
                ],

            ]
        }
    })
});

bot.hears('Вернуться к ебучему Шарлатану', async ctx => {
    await bot.telegram.sendPhoto(ctx.chat.id, "https://i.pinimg.com/550x/6c/93/a5/6c93a5baf59208f3485b4610e0170582.jpg")
    await bot.telegram.sendMessage(ctx.chat.id, 'Здравствуйте снова путник. Это снова я, ваш ебучий Шарлатан. Чем могу помочь?', {
        reply_markup: {
            resize_keyboard: true,
            keyboard: [
                [{  
                        text: "Магический Шар",
                    }
                ],

            ]
        }
    })

});


bot.launch();
console.log("Bot started")
