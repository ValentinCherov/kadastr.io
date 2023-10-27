document.addEventListener("DOMContentLoaded", function() {
    Inputmask("+7 (999)-999-99-99").mask("#phone");

    document.getElementById('telegramForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const chatId = '-1002033398587'; // Замените на ваш Chat ID
        const telegramBotToken = '6554888507:AAGZxD5Kg8wbGY8NC3ifiiYPZFLEa1SuWhk'; // Замените на ваш токен бота
        const telegramApiUrl = `https://api.telegram.org/bot${telegramBotToken}/sendDocument`;

        const formData = new FormData();
        formData.append('chat_id', chatId);
        formData.append('caption', `Заявка от: ${name}, Телефон: ${phone}`);

        const passportInput = document.getElementById('passport').files[0];
        const egrnInput = document.getElementById('egrn').files[0];
        const otherPhotosInput = document.getElementById('otherPhotos').files[0];

        // Отправка фотографий как документов
        if (passportInput) {
            formData.append('document', passportInput);
        }
        if (egrnInput) {
            formData.append('document', egrnInput);
        }
        if (otherPhotosInput) {
            formData.append('document', otherPhotosInput);
        }

        axios.post(telegramApiUrl, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(function (response) {
            console.log('Заявка успешно отправлена в Telegram');
        })
        .catch(function (error) {
            console.error('Ошибка при отправке заявки в Telegram', error);
        });
    });
});
