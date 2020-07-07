const { ipcRenderer } = require("electron");

const onready = () => {
  const q = window.location.search;
  const arr = q.slice(1).split('&');
  const params = {};
  for (var i = 0; i < arr.length; i++) {
    const pair = arr[i].split('=');
    params[pair[0]] = pair[1];
  }
  ipcRenderer.send('ready-' + params.id);
};

const onload = () => {
  console.log('loaded');
  
  const webview = document.getElementById('webview');

  webview.addEventListener('did-finish-load', e => {
    console.log('webview: did-finish-load');
    // webview.openDevTools();
    document.body.insertAdjacentHTML('beforeend', 'webview: did-finish-load<br>');
    document.body.insertAdjacentHTML('beforeend', '[A] Sent ping to webview<br>');
    webview.send('ping');
    console.log('Sent ping to webview');
  });

  webview.addEventListener('console-message', e => {
    console.log('[from webview]: ' + e.message);
  });

  webview.addEventListener('ipc-message', e => {
    console.log('Received ping from webview');
    document.body.insertAdjacentHTML('beforeend', '[B] Received ping from webview<br>');
    document.body.insertAdjacentHTML('beforeend', '[C] Sent pong to webview<br>');
    webview.send('pong');
    console.log('Sent pong to webview');
  });
};

window.addEventListener('DOMContentLoaded', onready);
window.addEventListener('load', onload);