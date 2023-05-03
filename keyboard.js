let modeKey = 'normal';
let capsStatus = false;
let altState = false;
let ctrlState = false;
let activeKeys = [];
let lang = localStorage.getItem('kbLanguage') || 'ru';
// console.log(lang);

const ru = {
  lang: 'ru',
  keys: [
    [{
      normal: 'ё', shift: 'Ё', class: 'esc', dataset: 'Backquote',
    },
    { normal: '1', shift: '!', dataset: 'Digit1' },
    { normal: '2', shift: '"', dataset: 'Digit2' },
    { normal: '3', shift: '№', dataset: 'Digit3' },
    { normal: '4', shift: ';', dataset: 'Digit4' },
    { normal: '5', shift: '%', dataset: 'Digit5' },
    { normal: '6', shift: ':', dataset: 'Digit6' },
    { normal: '7', shift: '?', dataset: 'Digit7' },
    { normal: '8', shift: '*', dataset: 'Digit8' },
    { normal: '9', shift: '(', dataset: 'Digit9' },
    { normal: '0', shift: ')', dataset: 'Digit0' },
    { normal: '-', shift: '_', dataset: 'Minus' },
    { normal: '=', shift: '+', dataset: 'Equal' },
    {
      normal: 'bs', shift: 'bs', class: 'backspace', dataset: 'Backspace',
    }],
    [{ normal: 'tab', class: 'tab', dataset: 'Tab' },
      { normal: 'й', shift: 'Й', dataset: 'KeyQ' },
      { normal: 'ц', shift: 'Ц', dataset: 'KeyW' },
      { normal: 'у', shift: 'У', dataset: 'KeyE' },
      { normal: 'к', shift: 'К', dataset: 'KeyR' },
      { normal: 'е', shift: 'Е', dataset: 'KeyT' },
      { normal: 'н', shift: 'Н', dataset: 'KeyY' },
      { normal: 'г', shift: 'Г', dataset: 'KeyU' },
      { normal: 'ш', shift: 'Ш', dataset: 'KeyI' },
      { normal: 'щ', shift: 'Щ', dataset: 'KeyO' },
      { normal: 'з', shift: 'З', dataset: 'KeyP' },
      { normal: 'х', shift: 'Х', dataset: 'BracketLeft' },
      { normal: 'ъ', shift: 'Ъ', dataset: 'BracketRight' },
      {
        normal: '\\', shift: '/', class: 'backslash', dataset: 'Backslash',
      }],
    [{ normal: 'caps', class: 'capslock', dataset: 'CapsLock' },
      { normal: 'ф', shift: 'Ф', dataset: 'KeyA' },
      { normal: 'ы', shift: 'Ы', dataset: 'KeyS' },
      { normal: 'в', shift: 'В', dataset: 'KeyD' },
      { normal: 'а', shift: 'А', dataset: 'KeyF' },
      { normal: 'п', shift: 'П', dataset: 'KeyG' },
      { normal: 'р', shift: 'Р', dataset: 'KeyH' },
      { normal: 'о', shift: 'О', dataset: 'KeyJ' },
      { normal: 'л', shift: 'Л', dataset: 'KeyK' },
      { normal: 'д', shift: 'Д', dataset: 'KeyL' },
      { normal: 'ж', shift: 'Ж', dataset: 'Semicolon' },
      { normal: 'э', shift: 'Э', dataset: 'Quote' },
      { normal: 'enter', class: 'enter', dataset: 'Enter' }],
    [{ normal: 'shift', class: 'shift', dataset: 'ShiftLeft' },
      { normal: 'я', shift: 'Я', dataset: 'KeyZ' },
      { normal: 'ч', shift: 'Ч', dataset: 'KeyX' },
      { normal: 'с', shift: 'С', dataset: 'KeyC' },
      { normal: 'м', shift: 'М', dataset: 'KeyV' },
      { normal: 'и', shift: 'И', dataset: 'KeyB' },
      { normal: 'т', shift: 'Т', dataset: 'KeyN' },
      { normal: 'ь', shift: 'Ь', dataset: 'KeyM' },
      { normal: 'б', shift: 'Б', dataset: 'Comma' },
      { normal: 'ю', shift: 'Ю', dataset: 'Period' },
      { normal: '.', shift: ',', dataset: 'Slash' },
      { normal: '↑', class: 'up', dataset: 'ArrowUp' },
      { normal: 'shift', class: 'shift', dataset: 'ShiftRight' }],
    [{ normal: 'ctrl', class: 'control', dataset: 'ControlLeft' },
      { normal: 'ё', shift: 'Ё', dataset: 'Backquote' },
      { normal: 'alt', class: 'alt', dataset: 'AltLeft' },
      { normal: 'space', class: 'space', dataset: 'Space' },
      { normal: 'alt', class: 'alt', dataset: 'AltRight' },
      { normal: 'ctrl', class: 'control', dataset: 'ControlRight' },
      { normal: '←', class: 'left', dataset: 'ArrowLeft' },
      { normal: '↓', class: 'down', dataset: 'ArrowDown' },
      { normal: '→', class: 'right', dataset: 'ArrowRight' },
      { normal: 'del', class: 'delete', dataset: 'Delete' }],
  ],
};

const en = {
  lang: 'en',
  keys: [
    [{
      normal: '`', shift: '~', class: 'esc', dataset: 'Backquote',
    },
    { normal: '1', shift: '!', dataset: 'Digit1' },
    { normal: '2', shift: '@', dataset: 'Digit2' },
    { normal: '3', shift: '#', dataset: 'Digit3' },
    { normal: '4', shift: '$', dataset: 'Digit4' },
    { normal: '5', shift: '%', dataset: 'Digit5' },
    { normal: '6', shift: '^', dataset: 'Digit6' },
    { normal: '7', shift: '&', dataset: 'Digit7' },
    { normal: '8', shift: '*', dataset: 'Digit8' },
    { normal: '9', shift: '(', dataset: 'Digit9' },
    { normal: '0', shift: ')', dataset: 'Digit0' },
    { normal: '-', shift: '_', dataset: 'Minus' },
    { normal: '=', shift: '+', dataset: 'Equal' },
    {
      normal: 'bs', shift: 'bs', class: 'backspace', dataset: 'Backspace',
    }],
    [{ normal: 'tab', class: 'tab', dataset: 'Tab' },
      { normal: 'q', shift: 'Q', dataset: 'KeyQ' },
      { normal: 'w', shift: 'W', dataset: 'KeyW' },
      { normal: 'e', shift: 'E', dataset: 'KeyE' },
      { normal: 'r', shift: 'R', dataset: 'KeyR' },
      { normal: 't', shift: 'T', dataset: 'KeyT' },
      { normal: 'y', shift: 'Y', dataset: 'KeyY' },
      { normal: 'u', shift: 'U', dataset: 'KeyU' },
      { normal: 'i', shift: 'I', dataset: 'KeyI' },
      { normal: 'o', shift: 'O', dataset: 'KeyO' },
      { normal: 'p', shift: 'P', dataset: 'KeyP' },
      { normal: '[', shift: '{', dataset: 'BracketLeft' },
      { normal: '[', shift: '}', dataset: 'BracketRight' },
      {
        normal: '\\', shift: '|', class: 'backslash', dataset: 'Backslash',
      }],
    [{ normal: 'caps', class: 'capslock', dataset: 'CapsLock' },
      { normal: 'a', shift: 'A', dataset: 'KeyA' },
      { normal: 's', shift: 'S', dataset: 'KeyS' },
      { normal: 'd', shift: 'D', dataset: 'KeyD' },
      { normal: 'f', shift: 'F', dataset: 'KeyF' },
      { normal: 'g', shift: 'G', dataset: 'KeyG' },
      { normal: 'h', shift: 'H', dataset: 'KeyH' },
      { normal: 'j', shift: 'J', dataset: 'KeyJ' },
      { normal: 'k', shift: 'K', dataset: 'KeyK' },
      { normal: 'l', shift: 'L', dataset: 'KeyL' },
      { normal: ';', shift: ':', dataset: 'Semicolon' },
      { normal: "'", shift: '&#34', dataset: 'Quote' },
      { normal: 'enter', class: 'enter', dataset: 'Enter' }],
    [{ normal: 'shift', class: 'shift', dataset: 'ShiftLeft' },
      { normal: 'z', shift: 'Z', dataset: 'KeyZ' },
      { normal: 'x', shift: 'X', dataset: 'KeyX' },
      { normal: 'c', shift: 'C', dataset: 'KeyC' },
      { normal: 'v', shift: 'V', dataset: 'KeyV' },
      { normal: 'b', shift: 'B', dataset: 'KeyB' },
      { normal: 'n', shift: 'N', dataset: 'KeyN' },
      { normal: 'm', shift: 'M', dataset: 'KeyM' },
      { normal: ',', shift: '<', dataset: 'Comma' },
      { normal: '.', shift: '>', dataset: 'Period' },
      { normal: '/', shift: '?', dataset: 'Slash' },
      { normal: '↑', class: 'up', dataset: 'ArrowUp' },
      { normal: 'shift', class: 'shift', dataset: 'ShiftRight' },
    ],
    [{ normal: 'ctrl', class: 'control', dataset: 'ControlLeft' },
      { normal: 'ё', shift: 'Ё', dataset: 'Backquote' },
      { normal: 'alt', class: 'alt', dataset: 'AltLeft' },
      { normal: 'space', class: 'space', dataset: 'Space' },
      { normal: 'alt', class: 'alt', dataset: 'AltRight' },
      { normal: 'ctrl', class: 'control', dataset: 'ControlRight' },
      { normal: '←', class: 'left', dataset: 'ArrowLeft' },
      { normal: '↓', class: 'down', dataset: 'ArrowDown' },
      { normal: '→', class: 'right', dataset: 'ArrowRight' },
      { normal: 'del', class: 'delete', dataset: 'Delete' }],
  ],
};

function isSpecial(addElem) {
  return addElem.length !== 1;
}

function renderKeyboard() {
  const keyboard = document.querySelector('.keyboard__keys');
  const objKB = lang === 'ru' ? ru : en;
  // console.log(objKB);
  const hrmlString = objKB.keys.map((row) => {
    const rowString = row.map((key) => {
      let value = key;
      const classes = ['key'];
      const data = [];
      if (typeof key === 'object') {
        const isUpperCase = (!capsStatus && modeKey === 'shift') || (capsStatus && modeKey !== 'shift');
        value = key[modeKey] || key.normal;
        if (!isSpecial(value)) {
          value = isUpperCase ? value.toUpperCase() : value.toLowerCase();
        }
        // console.log(value);
        classes.push(key.class);
        data.push(key.dataset);
      }
      return `<div class="${classes.join(' ')}" data-key="${value}" data-ultrakey="${data.join(' ')}">
      <span>${value}</span>
      </div>`;
    }).join('');
    // console.log('rowString', rowString)
    return `<div class="row">${rowString}</div>`;
  }).join('');
  // console.log('hrmlString', hrmlString)
  keyboard.innerHTML = hrmlString;
}

function checkLang() {
  if (ctrlState && altState) {
    lang = lang === 'ru' ? 'en' : 'ru';
  }
  // Local Store
  localStorage.setItem('kbLanguage', `${lang}`);
  renderKeyboard();
}

const specialKeys = {
  shift: (event) => {
    // console.log(event);
    activeKeys.forEach(() => {
      const element = document.querySelector(`[data-key~="${event.key}"]`);
      element.classList.add('active');
    });
    activeKeys = [];
    if (modeKey !== 'shift') {
      modeKey = 'shift';
      renderKeyboard();
    }
  },
  capslock: () => {
    capsStatus = !capsStatus;
    renderKeyboard();
    const element = document.querySelector('[data-key~="caps"]');
    if (capsStatus) {
      element.classList.add('active');
    } else {
      element.classList.remove('active');
    }
    // console.log(element);
  },
  space: (event) => {
    event.preventDefault();
    const textarea = document.querySelector('.keyboard__showcase');
    const indexTextArea = textarea.selectionStart;
    textarea.value = `${textarea.value.slice(0, indexTextArea)} ${textarea.value.slice(indexTextArea)}`;
    textarea.selectionStart = indexTextArea + 4;
    textarea.selectionEnd = indexTextArea + 4;
    textarea.focus();
  },
  tab: (event) => {
    event.preventDefault();
    const textarea = document.querySelector('.keyboard__showcase');
    const indexTextArea = textarea.selectionStart;
    textarea.value = `${textarea.value.slice(0, indexTextArea)}    ${textarea.value.slice(indexTextArea)}`;
    textarea.selectionStart = indexTextArea + 4;
    textarea.selectionEnd = indexTextArea + 4;
    textarea.focus();
  },
  enter: (event) => {
    event.preventDefault();
    const textarea = document.querySelector('.keyboard__showcase');
    const indexTextArea = textarea.selectionStart;
    textarea.value = `${textarea.value.slice(0, indexTextArea)}\n${textarea.value.slice(indexTextArea)}`;
    textarea.selectionStart = indexTextArea + 1;
    textarea.selectionEnd = indexTextArea + 1;
    textarea.focus();
  },
  backspace: (event) => {
    event.preventDefault();
    const textarea = document.querySelector('.keyboard__showcase');
    const indexTextArea = textarea.selectionStart;
    const minValue = Math.max(0, indexTextArea - 1);
    textarea.value = textarea.value.slice(0, minValue) + textarea.value.slice(indexTextArea);
    textarea.selectionStart = minValue;
    textarea.selectionEnd = minValue;
    textarea.focus();
  },
  delete: (event) => {
    event.preventDefault();
    const textarea = document.querySelector('.keyboard__showcase');
    const indexTextArea = textarea.selectionStart;
    textarea.value = textarea.value.slice(0, indexTextArea)
    + textarea.value.slice(indexTextArea + 1);
    textarea.selectionStart = indexTextArea;
    textarea.selectionEnd = indexTextArea;
    textarea.focus();
  },
  control: () => {
    ctrlState = true;
    checkLang();
    renderKeyboard();
  },
  alt: (event) => {
    event.preventDefault();
    altState = true;
    checkLang();
    renderKeyboard();
  },
};

function handleKeyDown(event) {
  const key = event.key.toLowerCase();
  // console.log("key", key);
  // console.log(event.code);
  if (specialKeys[key]) {
    specialKeys[key](event);
  }
  if (event.key.toLowerCase() === 'capslock') {
    return;
  }

  const textarea = document.querySelector('.keyboard__showcase');
  textarea.focus();
  const altElement = document.querySelector(`[data-ultrakey~="${event.code}"]`);
  // console.log("altelement", altElement);
  altElement.classList.add('active');
  const addElem = altElement.querySelector('span').innerHTML;
  // const isUpperCase = (!capsStatus && modeKey === 'shift')
  // || (capsStatus && modeKey !== 'shift');
  const fillBtn = addElem;
  // activeKeys.push(fillBtn);
  // console.log(activeKeys);
  if (!isSpecial(fillBtn)) {
    event.preventDefault();
    // fillBtn = isUpperCase ? event.key.toUpperCase() : event.key.toLowerCase();
    // activeKeys.push(SuperTestKey8);
    const indexTextArea = textarea.selectionStart;
    textarea.value = textarea.value.slice(0, indexTextArea)
    + addElem + textarea.value.slice(indexTextArea);
    textarea.selectionStart = indexTextArea + 1;
    textarea.selectionEnd = indexTextArea + 1;
  }
  // console.log("altelement", altElement);
  altElement.classList.add('active');
}

function handleKeyUp(event) {
  if (event.key.toLowerCase() === 'shift') {
    modeKey = 'normal';
    renderKeyboard();
  }
  if (event.key.toLowerCase() === 'control') {
    ctrlState = false;
  }
  if (event.key.toLowerCase() === 'alt') {
    altState = false;
  }
  if (event.key.toLowerCase() === 'capslock') {
    return;
  }
  const textarea = document.querySelector('.keyboard__showcase');
  textarea.focus();
  if (event.key.toLowerCase() !== 'capslock') {
    const elemKey = isSpecial(event.key) ? event.key.toLowerCase() : event.key;
    activeKeys = activeKeys.filter((key) => key !== elemKey);
    const element = document.querySelector(`[data-ultrakey~="${event.code}"]`);
    element.classList.remove('active');
  }
  // //console.log("event=`|", elemKey, "|`")
}

function mouseClickDown(event) {
  const key = event.target.closest('.key');
  // console.log('key', key);
  const addElem = key.dataset.ultrakey;
  // console.log('ultradata', addElem);
  if (!key) return;
  key.classList.add('active');
  const textarea = document.querySelector('.keyboard__showcase');
  let valueKey = key.dataset.key;
  // console.log(valueKey);
  if (specialKeys[valueKey]) {
    specialKeys[valueKey](event);
    const element = document.querySelector(`[data-ultrakey~="${addElem}"]`);
    element.classList.add('active');
  }
  if (valueKey === 'caps') {
    valueKey = 'capslock';
    specialKeys[valueKey](event);
  }
  if (valueKey === 'bs') {
    valueKey = 'backspace';
    specialKeys[valueKey](event);
  }
  if (valueKey === 'del') {
    valueKey = 'delete';
    specialKeys[valueKey](event);
  }
  if (!isSpecial(valueKey)) {
    const indexTextArea = textarea.selectionStart;
    textarea.value = textarea.value.slice(0, indexTextArea)
    + valueKey + textarea.value.slice(indexTextArea);
    textarea.selectionStart = indexTextArea + 1;
    textarea.selectionEnd = indexTextArea + 1;
    textarea.focus();
  }
}

function mouseClickUp(event) {
  const key = event.target.closest('.key');
  if (!key) return;
  const valueKey = key.dataset.key;
  // console.log(key);
  if (valueKey === 'shift') {
    modeKey = 'normal';
    renderKeyboard();
  }
  if (!key) return;
  key.classList.remove('active');
  // console.log(key);
  const textarea = document.querySelector('.keyboard__showcase');
  textarea.focus();
}

// function focusText() {
//   const textarea = document.querySelector('.keyboard__showcase');
//   textarea.focus();
// }

document.addEventListener('DOMContentLoaded', () => {
  const keyboardHTML = `
  <div class="keyboard">
    <textarea class="keyboard__showcase"></textarea>
    <div class="keyboard__keys">
    </div>
    <p> Клавиатура созданна в операционной системе Windows</p>
    <p> Для переключения языка используйте ctrl+ alt </p>
  </div>`;
  const virtualKeyboard = document.querySelector('.virtual-keyboard');
  virtualKeyboard.insertAdjacentHTML('afterbegin', keyboardHTML);
  virtualKeyboard.addEventListener('keydown', handleKeyDown);
  virtualKeyboard.addEventListener('keyup', handleKeyUp);
  const keyboard = document.querySelector('.keyboard__keys');
  keyboard.addEventListener('mousedown', mouseClickDown);
  keyboard.addEventListener('mouseup', mouseClickUp);
  renderKeyboard();
  checkLang();
});
