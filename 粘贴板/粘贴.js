el.onclick = function () {
  var copy = function (e) {
    e.preventDefault();
    console.log('copy');
    var text = "blabla"
    if (e.clipboardData) {
      e.clipboardData.setData('text/plain', text);
    } else if (window.clipboardData) {                    // ie
      window.clipboardData.setData('Text', text);
    }
  }
  // chrome v66 以后 navigator.clipboard
  window.addEventListener('copy', copy);
  document.execCommand('copy');
  window.removeEventListener('copy', copy);
}
