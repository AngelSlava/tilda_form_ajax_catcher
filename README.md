# Tilda form ajax catcher

### Installation
Include this file to your
```html
<script src="parthto/tilda-form-ajax-catcher.js" async></script>
```
and in you **main.js** add event listener:
```js
document.addEventListener('ajaxCatchEvent', function(){
    console.log(window.globalFormData)
}, false)
```