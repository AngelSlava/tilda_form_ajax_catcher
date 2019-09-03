(function() {
    document.addEventListener('DOMContentLoaded', function() {

        window.tildaForm = tildaForm || {}
        window.globalFormData = {}

        const ajaxEvent = new Event('AjaxCatchEvent')

        Object.size = function(obj) {
            let size = 0,
                key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) size++
            }
            return size
        }

        let ajaxMethod = window.tildaForm && window.tildaForm.hasOwnProperty('send')

        if (ajaxMethod) {
            var s_ajaxListener = new Object();
            s_ajaxListener.tempOpen = XMLHttpRequest.prototype.open
            s_ajaxListener.tempSend = XMLHttpRequest.prototype.send
            s_ajaxListener.callback = function() {

                if (this.url === 'https://stat.tildacdn.com/event/' && Object.size(window.globalFormData)) {
                    // // Ajax data 
                    // const ajaxData = {}, searchParams = new URLSearchParams(this.data)
                    // for (let p of searchParams) {
                    //     ajaxData[p[0]] = p[1]
                    // }
                    document.dispatchEvent(ajaxEvent)
                }
            }

            XMLHttpRequest.prototype.open = function(a, b) {
                if (!a) var a = ''
                if (!b) var b = ''
                s_ajaxListener.tempOpen.apply(this, arguments);
                s_ajaxListener.method = a
                s_ajaxListener.url = b
                if (a.toLowerCase() == 'get') {
                    s_ajaxListener.data = b.split('?')
                    s_ajaxListener.data = s_ajaxListener.data[1]
                }
            }

            XMLHttpRequest.prototype.send = function(a, b) {
                if (!a) var a = ''
                if (!b) var b = ''
                s_ajaxListener.tempSend.apply(this, arguments)
                if (s_ajaxListener.method.toLowerCase() == 'post') s_ajaxListener.data = a
                s_ajaxListener.callback()
            }
        }

        // Отслеживаем изменеие формы
        Array.prototype.forEach.call(document.querySelectorAll('form'), function(form, index) {
            form.addEventListener('change', function() {
                const thisFormData = new FormData(this)
                const thisFormDataObj = {}
                for (let item of thisFormData.entries()) {
                    thisFormDataObj[item[0]] = item[1]
                }
                window.globalFormData = { ...thisFormDataObj }
            })
        })
    })

})()