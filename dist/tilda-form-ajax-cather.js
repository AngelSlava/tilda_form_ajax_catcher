"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(function () {
  document.addEventListener('DOMContentLoaded', function () {
    window.tildaForm = tildaForm || {};
    window.globalFormData = {};
    var ajaxEvent = new Event('AjaxCatchEvent');

    Object.size = function (obj) {
      var size = 0,
          key;

      for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
      }

      return size;
    };

    var ajaxMethod = window.tildaForm && window.tildaForm.hasOwnProperty('send');

    if (ajaxMethod) {
      var s_ajaxListener = new Object();
      s_ajaxListener.tempOpen = XMLHttpRequest.prototype.open;
      s_ajaxListener.tempSend = XMLHttpRequest.prototype.send;

      s_ajaxListener.callback = function () {
        if (this.url === 'https://stat.tildacdn.com/event/' && Object.size(window.globalFormData)) {
          // // Ajax data 
          // const ajaxData = {}, searchParams = new URLSearchParams(this.data)
          // for (let p of searchParams) {
          //     ajaxData[p[0]] = p[1]
          // }
          document.dispatchEvent(ajaxEvent);
        }
      };

      XMLHttpRequest.prototype.open = function (a, b) {
        if (!a) var a = '';
        if (!b) var b = '';
        s_ajaxListener.tempOpen.apply(this, arguments);
        s_ajaxListener.method = a;
        s_ajaxListener.url = b;

        if (a.toLowerCase() == 'get') {
          s_ajaxListener.data = b.split('?');
          s_ajaxListener.data = s_ajaxListener.data[1];
        }
      };

      XMLHttpRequest.prototype.send = function (a, b) {
        if (!a) var a = '';
        if (!b) var b = '';
        s_ajaxListener.tempSend.apply(this, arguments);
        if (s_ajaxListener.method.toLowerCase() == 'post') s_ajaxListener.data = a;
        s_ajaxListener.callback();
      };
    } // Отслеживаем изменеие формы


    Array.prototype.forEach.call(document.querySelectorAll('form'), function (form, index) {
      form.addEventListener('change', function () {
        var thisFormData = new FormData(this);
        var thisFormDataObj = {};
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = thisFormData.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var item = _step.value;
            thisFormDataObj[item[0]] = item[1];
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        window.globalFormData = _objectSpread({}, thisFormDataObj);
      });
    });
  });
})();