// All of the Node.js APIs are available in the preload process (sandboxed).

window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector: string, text: string) => {
    const element = document.getElementById(selector);
    if(element) element.innerText = text;
  };

  replaceText('chrome-version', process.versions['chrome']);
  replaceText('electron-version', process.versions['electron']);
  replaceText('node-version', process.versions['node']);
});
