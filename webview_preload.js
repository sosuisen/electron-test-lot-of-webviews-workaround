const electron = require("electron");

electron.ipcRenderer.on('ping', event => {
  document.body.insertAdjacentHTML('beforeend', '[A] Received ping from parent<br>');
  console.log('Received ping from parent');    
});

electron.ipcRenderer.on('pong', event => {
  document.body.insertAdjacentHTML('beforeend', '[C] Received pong from parent<br>');
  console.log('Received pong from parent');    
});

const onload = () => {
  console.log('loaded');
  document.body.insertAdjacentHTML('beforeend', 'loaded<br>');
  document.body.insertAdjacentHTML('beforeend', '[B] Sent ping to parent<br>');
  electron.ipcRenderer.sendToHost('ping');
  console.log('Sent ping to parent');  
}

window.addEventListener('load', onload);
