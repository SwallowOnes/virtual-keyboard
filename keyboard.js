let lang = "en";
let mode = "normal";
let capsStatus = false;
let activeKeys =[];

document.addEventListener("DOMContentLoaded", () => {
  const keyboardHTML = `
  <div class="keyboard">
    <textarea class="keyboard__showcase">
    </textarea>
    <div class="keyboard__keys">
    </div>
  </div>`;
  const virtualKeyboard = document.querySelector(".virtual-keyboard");
  virtualKeyboard.insertAdjacentHTML("afterbegin", keyboardHTML);
  virtualKeyboard.addEventListener("keydown", handleKeyDown);
  virtualKeyboard.addEventListener("keyup", handleKeyUp);
  const keyboard = document.querySelector('.keyboard__keys');
  keyboard.addEventListener("mousedown", mouseClickDown);
  keyboard.addEventListener("mouseup", mouseClickUp);
  renderKeyboard();
});




const ru = {
  lang: "ru",
  keys: [
    [{ normal: "`", shift: "~", class: "esc" }, "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", { normal: "⌫", shift: "⌫", class: "backspace" }],
    [{ normal: "tab", class: "tab" },
    { normal: "й", shift: "Й", class: "key" },
    { normal: "ц", shift: "Ц" },
    { normal: "у", shift: "У" },
    { normal: "к", shift: "К" },
    { normal: "е", shift: "Е" },
    { normal: "н", shift: "Н" },
    { normal: "г", shift: "Г" },
    { normal: "ш", shift: "Ш" },
    { normal: "щ", shift: "Щ" },
    { normal: "з", shift: "З" },
    { normal: "х", shift: "Х" },
    { normal: "ъ", shift: "Ъ" },
    { normal: "\\", shift: "/", class: "backslash" }],
    [{ normal: "caps", class: "caps" },
    { normal: "ф", shift: "Ф" },
    { normal: "ы", shift: "Ы" },
    { normal: "в", shift: "В" },
    { normal: "а", shift: "А" },
    { normal: "п", shift: "П" },
    { normal: "р", shift: "Р" },
    { normal: "о", shift: "О" },
    { normal: "л", shift: "Л" },
    { normal: "д", shift: "Д" },
    { normal: "ж", shift: "Ж" },
    { normal: "э", shift: "Э" },
    { normal: "enter", class: "enter" }],
    [{ normal: "shift", class: "shift" },
    { normal: "я", shift: "Ф" },
    { normal: "ч", shift: "Ы" },
    { normal: "с", shift: "В" },
    { normal: "м", shift: "А" },
    { normal: "и", shift: "П" },
    { normal: "т", shift: "Р" },
    { normal: "ь", shift: "О" },
    { normal: "б", shift: "Л" },
    { normal: "ю", shift: "Д" },
    { normal: ".", shift: "Ж" },
    { normal: "↑", class: "up" },
    { normal: "shift", class: "shift" }
    ],
    [{ normal: "ctrl", class: "ctrl" },
    { normal: "ё", shift: "Ё" },
    { normal: "alt", class: "alt" },
    { normal: "space", class: "space" },
    { normal: "alt", class: "alt" },
    { normal: "lang", class: "lang" },
    { normal: "←", class: "left" },
    { normal: "↓", class: "down" },
    { normal: "→", class: "right" },
    { normal: "del", class: "delete" }],
  ]
}

const en = {
  lang: "en",
  keys: [
    [{ normal: "`", shift: "~", class: "esc" }, "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", { normal: "⌫", shift: "⌫", class: "backspace" }],
    [{ normal: "tab", class: "tab" },
    { normal: "q", shift: "Q" },
    { normal: "w", shift: "W" },
    { normal: "e", shift: "E" },
    { normal: "r", shift: "R" },
    { normal: "t", shift: "T" },
    { normal: "y", shift: "Y" },
    { normal: "u", shift: "U" },
    { normal: "i", shift: "I" },
    { normal: "o", shift: "O" },
    { normal: "p", shift: "P" },
    { normal: "[", shift: "{" },
    { normal: "[", shift: "}" },
    { normal: "\\", shift: "|", class: "backslash" }],
    [{ normal: "caps", class: "caps" },
    { normal: "a", shift: "A" },
    { normal: "s", shift: "S" },
    { normal: "d", shift: "D" },
    { normal: "f", shift: "F" },
    { normal: "g", shift: "G" },
    { normal: "h", shift: "H" },
    { normal: "j", shift: "J" },
    { normal: "k", shift: "K" },
    { normal: "l", shift: "L" },
    { normal: ";", shift: ":" },
    { normal: "'", shift: " " },
    { normal: "enter", class: "enter" }],
    [{ normal: "shift", class: "shift" },
    { normal: "z", shift: "Z" },
    { normal: "x", shift: "X" },
    { normal: "c", shift: "C" },
    { normal: "v", shift: "V" },
    { normal: "b", shift: "B" },
    { normal: "n", shift: "N" },
    { normal: "m", shift: "M" },
    { normal: ",", shift: "<" },
    { normal: ".", shift: ">" },
    { normal: "/", shift: "?" },
    { normal: "↑", class: "up" },
    { normal: "shift", class: "shift" }
    ],
    [{ normal: "ctrl", class: "ctrl" },
    { normal: "ё", shift: "Ё" },
    { normal: "alt", class: "alt" },
    { normal: "space", class: "space" },
    { normal: "alt", class: "alt" },
    { normal: "lang", class: "lang" },
    { normal: "←", class: "left" },
    { normal: "↓", class: "down" },
    { normal: "→", class: "right" },
    { normal: "del", class: "delete" }],
  ]
}

const specialKeys = {
  shift: (event) => {
    activeKeys = [];
    //console.log(event);
    if ( modeKey !== 'shift') {
      modeKey = 'shift';
      renderKeyboard();
    }
  },
  capslock: (event) => {
    capsStatus = !capsStatus;
    renderKeyboard();
  },
  tab: (event) => {
    event.preventDefault();
    const textarea = document.querySelector(".keyboard__showcase");
    let indexTextArea = textarea.selectionStart;
    textarea.value = textarea.value.slice(0, indexTextArea) + "    " + textarea.value.slice(indexTextArea, )
    textarea.selectionStart = indexTextArea+4;
    textarea.selectionEnd = indexTextArea+4;
    textarea.focus();
  },
  enter: (event) => {
    event.preventDefault();
    const textarea = document.querySelector(".keyboard__showcase");
    let indexTextArea = textarea.selectionStart;
    textarea.value = textarea.value.slice(0, indexTextArea) + "\n" + textarea.value.slice(indexTextArea, )
    textarea.selectionStart = indexTextArea+1;
    textarea.selectionEnd = indexTextArea+1;
    textarea.focus();
  },
  backspace: (event) => {
    event.preventDefault();
    const textarea = document.querySelector(".keyboard__showcase");
    let indexTextArea = textarea.selectionStart;
    let minValue = Math.max(0, indexTextArea - 1);
    textarea.value = textarea.value.slice(0, minValue ) + textarea.value.slice(indexTextArea, )
    textarea.selectionStart = minValue;
    textarea.selectionEnd = minValue;
    textarea.focus();
  },
  delete: (event) => {
    event.preventDefault();
    const textarea = document.querySelector(".keyboard__showcase");
    let indexTextArea = textarea.selectionStart;
    textarea.value = textarea.value.slice(0, indexTextArea) + textarea.value.slice(indexTextArea+1, )
    textarea.selectionStart = indexTextArea;
    textarea.selectionEnd = indexTextArea;
    textarea.focus();
  },
};

let modeKey = 'normal';
function renderKeyboard() {
  const keyboard = document.querySelector('.keyboard__keys');
  let objKB = lang === "ru" ? ru : en;
  console.log(objKB);
  const hrmlString = objKB.keys.map(row => {
    const rowString = row.map(key => {
      let value = key;
      const classes = ['key'];
      if (typeof key === 'object') {
        const isUpperCase = (!capsStatus && modeKey === "shift") || ( capsStatus && modeKey !== "shift")
        value = key[modeKey] || key.normal;
        value = isUpperCase ? value.toUpperCase() : value;
        //console.log(value);
        key.class && classes.push(key.class);
      }
      return `<div class="${classes.join(' ')}" data-key="${value}">
      <span>${value}</span>
      </div>`
    }).join('');
    //console.log('rowString', rowString)
    return `<div class="row">${rowString}</div>`
  }).join('')
  //console.log('hrmlString', hrmlString)
  keyboard.innerHTML = hrmlString;
}

function handleKeyDown (event) {
  const key = event.key.toLowerCase();
  if (specialKeys[key]){
    return specialKeys[key](event);
  }
  activeKeys.push(event.key);
  const keys = document.querySelectorAll(".key");
  activeKeys.forEach(activeKey =>{
      const element  = document.querySelector(`[data-key~="${activeKey}"]`);
      element && element.classList.add("active");
    }
  )
  //console.log(activeKeys);
}

function handleKeyUp (event) {
  if (event.key.toLowerCase() === 'shift') {
    modeKey = 'normal';
    renderKeyboard();
  }
  const textarea = document.querySelector(".keyboard__showcase");
  textarea.focus();
  activeKeys = activeKeys.filter(key => key !== event.key )
  const element  = document.querySelector(`[data-key~="${event.key}"]`);
  element && element.classList.remove("active");
}


function mouseClickDown(event) {
  const key = event.target.closest(".key");
  if (!key) return;
  key.classList.add("active");
  const textarea = document.querySelector(".keyboard__showcase");
  let valueKey = key.dataset.key;
  let indexTextArea = textarea.selectionStart;
  textarea.value = textarea.value.slice(0, indexTextArea) + valueKey + textarea.value.slice(indexTextArea, )
  textarea.selectionStart = indexTextArea+1;
  textarea.selectionEnd = indexTextArea+1;
  textarea.focus();
}

function mouseClickUp(event) {
  const key = event.target.closest(".key");
  if (!key) return;
  key.classList.remove("active");
  const textarea = document.querySelector(".keyboard__showcase");
  textarea.focus();
}

function focusText() {
  const textarea = document.querySelector(".keyboard__showcase");
  textarea.focus();
}
