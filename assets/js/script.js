document.addEventListener("DOMContentLoaded", function () {
  Inputmask("+7 (999) 999-99-99").mask("#phone");

  document.getElementById("telegramForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    document.getElementById("loadingSpinner").classList.remove("d-none");
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const chatId = "-1002033398587";
    const telegramBotToken = "6554888507:AAGZxD5Kg8wbGY8NC3ifiiYPZFLEa1SuWhk";
    const telegramApiUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;
    const success = document.getElementById("success");
  
    const data = {
      chat_id: chatId,
      text: `Заявка от: ${name}\nТелефон: ${phone}`
    };
  
    axios.post(telegramApiUrl, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(function (response) {
        success.innerHTML = "Заявка успешно отправлена!";
        success.style.display = "block";
      })
      .catch(function (error) {
        success.innerHTML = "Ошибка при отправке заявки!";
        success.style.display = "block";
      })
      .finally(function () {
        document.getElementById("loadingSpinner").classList.add("d-none");
        document.getElementById("telegramForm").reset();
      });
    });
  });