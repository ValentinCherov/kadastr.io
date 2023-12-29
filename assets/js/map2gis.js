// Объявление анонимной функции
!(function () {
  // Функция для скрытия элемента по его id
  function o(o) {
    var t = document.getElementById(o);
    t && (t.style.display = "none");
  }

  // Функция для скрытия элементов по их классу
  function t(o) {
    for (var t = document.querySelectorAll("." + o), i = 0; i < t.length; i++) {
      t[i].style.display = "none";
    }
  }

  // Функция для формирования URL для загрузки виджета
  function i(o, t) {
    var protocol = "https:" === window.location.protocol ? "https:" : "http:";
    return (
      protocol +
      "//widgets.2gis.com/widget?type=" +
      o +
      "&options=" +
      encodeURIComponent(JSON.stringify(t))
    );
  }

  // Функция для создания HTML-кода iframe
  function r(o) {
    if (!o.src) return "";

    // Определение стиля границы в зависимости от borderColor
    var borderStyle = o.borderColor ? "1px solid " + o.borderColor : "none";

    // Создание строки с HTML-кодом iframe
    var iframeCode =
      '<iframe frameborder="no" style="border: ' +
      borderStyle +
      '; box-sizing: border-box;" width="' +
      o.width +
      '" height="' +
      o.height +
      '" src="' +
      o.src +
      '"></iframe>';

    // Добавление медиа-запросов для адаптивности
    var responsiveIframeCode =
      "<style>" +
      "@media screen and (max-width: 1000px) {" +
      "   " +
      "iframe {" +
      "       width: 100%;" + // Ширина 100% на устройствах с шириной экрана до 1000px
      "   }" +
      "}" +
      "@media screen and (min-width: 1000px) {" +
      "   " +
      "iframe {" +
      "       width: " +
      o.width +
      "px;" + // Вернуть оригинальную ширину на устройствах с шириной экрана 1000px и более
      " margin-top: 20px;" +
      "   }" +
      "}" +
      "</style>" +
      iframeCode;

    return responsiveIframeCode;
  }

  // Создание пространств имен
  window.DG = window.DG || {};
  DG.Widget = DG.Widget || {};
  DG.Widget.Components = DG.Widget.Components || {};

  // Главная функция для загрузки виджета
  window.DGWidgetLoader = function (n) {
    // Скрытие элементов по их классам и id
    t("dg-widget-link");
    o("firmsonmap_biglink");
    o("firmsonmap_biglink_photo");
    o("firmsonmap_biglink_route");

    // Инициализация параметров, если они не определены
    n = n || {};
    n.org = n.org || [];
    n.pos = n.pos || {};
    n.opt = n.opt || {};

    // Определение ширины виджета с использованием значений по умолчанию
    var e = n.width || 500;
    e = e.toString();
    if ("%" !== e.slice(-1)) {
      e = parseInt(e, 10);
      e = Math.min(100, e);
      e = Math.max(500, e);
    }

    // Определение высоты виджета с использованием значений по умолчанию
    var d = n.height || 450;
    d = d.toString();
    if ("%" !== d.slice(-1)) {
      d = parseInt(d, 10);
      d = Math.min(100, d);
      d = Math.max(450, d);
    }

    // Сбор id организаций в строку
    var a = "";
    for (var g = 0; g < n.org.length; g++) {
      n.org[g].id && (a += n.org[g].id + ",");
    }
    a = a.slice(0, -1);

    // Формирование объекта параметров
    var p = { pos: n.pos, opt: n.opt, org: a };

    // Вывод виджета на страницу
    document.write(
      r({
        width: e,
        height: d,
        borderColor: n.borderColor || "#a3a3a3",
        src: i("firmsonmap", p),
      })
    );
  };

  // Компонент для загрузки мини-виджета
  DG.Widget.Components.Loader = function (t) {
    // Скрытие элемента по его id
    o("2gis_mini_biglink");

    // Определение ширины и высоты мини-виджета
    var n,
      e,
      d = 500,
      s = 500,
      a = t.resize;
    if (a) {
      n = a.w ? parseInt(a.w, 10) : d;
      e = a.h ? parseInt(a.h, 10) : s;
    } else {
      n = d;
      e = s;
    }

    // Вывод мини-виджета на страницу
    document.write(r({ width: n, height: e, src: i("mini", t) }));
  };
})();
