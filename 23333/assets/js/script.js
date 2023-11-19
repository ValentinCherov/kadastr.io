document.addEventListener("DOMContentLoaded", function () {
  Inputmask("+7 (999) 999-99-99").mask("#phone");

  document
    .getElementById("telegramForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      // Отобразите спиннер перед началом отправки
      document.getElementById("loadingSpinner").classList.remove("d-none");

      const name = document.getElementById("name").value;
      const phone = document.getElementById("phone").value;
      const vidRabotCheckboxes = document.querySelectorAll(
        'input[name="vid_rabot[]"]:checked'
      );
      const vidRabotValues = [];

      vidRabotCheckboxes.forEach(function (checkbox) {
        vidRabotValues.push(checkbox.nextElementSibling.textContent.trim());
      });

      const vidRabot = vidRabotValues.join(", "); // Получаем значения выбранных чекбоксов
      const chatId = "-1002033398587"; // Замените на ваш Chat ID
      const telegramBotToken = "6554888507:AAGZxD5Kg8wbGY8NC3ifiiYPZFLEa1SuWhk"; // Замените на ваш токен бота
      const telegramApiUrl = `https://api.telegram.org/bot${telegramBotToken}/sendDocument`;
      const success = document.getElementById("success");

      const formData = new FormData();
      formData.append("chat_id", chatId);
      formData.append(
        "caption",
        `Заявка от: ${name}\n Телефон: ${phone}\n Вид работ: ${vidRabot}`
      );

      const passportInput = document.getElementById("passport").files;
      // /*         const egrnInput = document.getElementById('egrn').files;
      //         const otherPhotosInput = document.getElementById('otherPhotos').files; */

      // Создаем ZIP-архив и добавляем фотографии
      const zip = new JSZip();
      if (passportInput) {
        for (let i = 0; i < passportInput.length; i++) {
          const passportInput1 = passportInput[i];
          zip.file(`passport_${i}.jpg`, passportInput1);
        }
      }
      // if (egrnInput) {
      //     for (let i = 0; i < egrnInput.length; i++) {
      //         const egrnInput1 = egrnInput[i];
      //         zip.file(`egrn_${i}.jpg`, egrnInput1);
      //     }
      // }
      // if (otherPhotosInput) {
      //     for (let i = 0; i < otherPhotosInput.length; i++) {
      //         const otherPhotosInput1 = otherPhotosInput[i];
      //         zip.file(`other-photos_${i}.jpg`, otherPhotosInput1);
      //     }
      // }

      // Генерируем ZIP-архив
      zip.generateAsync({ type: "blob" }).then(function (content) {
        const zipBlob = new Blob([content], { type: "application/zip" });

        // Отправляем ZIP-архив как документ
        formData.append("document", zipBlob, "photos.zip");

        axios
          .post(telegramApiUrl, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then(function (response) {
            success.innerHTML = "Заявка успешно отправлена!";
            success.style.display = "block";
          })
          .catch(function (error) {
            (success.innerHTML = "Ошибка при отправке заявки!"), error;
            success.style.display = "block";
          })
          .finally(function () {
            // Скройте спиннер после отправки
            document.getElementById("loadingSpinner").classList.add("d-none");
          });
        document.getElementById("telegramForm").reset();
      });
    });
});
