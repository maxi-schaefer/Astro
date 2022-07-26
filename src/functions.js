var { ipcRenderer } = require('electron')
const { titlebar } = require('./settings.json')

if(titlebar.Enable) {
  document.body.innerHTML = `
  <!-- Header -->
  <div id="header">
    <div class="topBar">
      <div class="titleBar">
        <img src="./assets/icon.ico" id="icon" alt="icon">
        <div class="title" id="titlename"></div>
      </div>

      <div class="titleBarBtns">
        <button id="minimizeBtn" class="topBtn minimizeBtn"><svg aria-hidden="false" width="12" height="12" viewBox="0 0 12 12"><rect fill="currentColor" width="10" height="1" x="1" y="6"></rect></svg></button>
        <button id="maximizeBtn" class="topBtn maximizeBtn"><svg aria-hidden="false" width="12" height="12" viewBox="0 0 12 12"><rect width="9" height="9" x="1.5" y="1.5" fill="none" stroke="currentColor"></rect></svg></button>
        <button id="closeBtn" class="topBtn closeBtn"><svg aria-hidden="false" width="12" height="12" viewBox="0 0 12 12"><polygon fill="currentColor" fill-rule="evenodd" points="11 1.576 6.583 6 11 10.424 10.424 11 6 6.583 1.576 11 1 10.424 5.417 6 1 1.576 1.576 1 6 5.417 10.424 1"></polygon></svg></button>
      </div>
    </div>
  </div>
  ` + document.body.innerHTML

  /* Minimize Application */
  minimizeBtn.addEventListener('click', () => {
      ipcRenderer.send("minimizeApp")
  })

  /* Close Application*/
  closeBtn.addEventListener('click', () => {
      ipcRenderer.send('closeApp')
  })

  /* Maximize/Restore Application */
  maximizeBtn.addEventListener('click', () => {
      ipcRenderer.send('maximizeRestoreApp')
  })
}

window.addEventListener("DOMContentLoaded", () => {

    var root = document.documentElement
    var title = document.getElementById("titlename")
    var icon = document.getElementById("icon")
    const { font, primary, background, buttons, titlebar } = require('./settings.json')

    /* Colors */
    root.style.setProperty("--primary", primary)
    root.style.setProperty("--background", background)
    root.style.setProperty("--font", font)

    /* Buttons */
    if(titlebar.Enable) {
      root.style.setProperty("--buttons-background", buttons.background)
      root.style.setProperty("--close-button", buttons.closeButton)
      root.style.setProperty("--maximize-button", buttons.maximizeButton)
      root.style.setProperty("--minimize-button", buttons.minimizeButton)
      if(!buttons.icons) {
          var closeBtn = document.getElementById("closeBtn")
          var maximizeBtn = document.getElementById("maximizeBtn")
          var minimizeBtn = document.getElementById("minimizeBtn")
  
          closeBtn.innerHTML = ''
          maximizeBtn.innerHTML = ''
          minimizeBtn.innerHTML = ''
      }
  
      /* Titlebar */
      title.innerHTML = titlebar.title
      root.style.setProperty("--titlebar-height", titlebar.height + "px")
      if(titlebar.EnableIcon) {
          icon.src = titlebar.icon
      } else {
          icon.remove()
      }
    }

})
