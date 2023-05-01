let lang = "en";
let mode = "normal";
let capsStatus = false;
let altState = false;
let ctrlState = false;
let activeKeys =[];

document.addEventListener("DOMContentLoaded", () => {
  const keyboardHTML = `
  <div class="keyboard">
    <textarea class="keyboard__showcase">
    </textarea>
    <div class="keyboard__keys">
    </div>
    <p> Клавиатура созданна в операционной системе Windows</p>
    <p> Для переключения языка используйте ctrl+ alt </p>
  </div>`;
  const virtualKeyboard = document.querySelector(".virtual-keyboard");
  virtualKeyboard.insertAdjacentHTML("afterbegin", keyboardHTML);
  virtualKeyboard.addEventListener("keydown", handleKeyDown);
  virtualKeyboard.addEventListener("keyup", handleKeyUp);
  const keyboard = document.querySelector('.keyboard__keys');
  keyboard.addEventListener("mousedown", mouseClickDown);
  keyboard.addEventListener("mouseup", mouseClickUp);
  renderKeyboard();
  checkLang();
});


const ru = {
  lang: "ru",
  keys: [
    [{ normal: "`", shift: "~", class: "esc" },
    { normal: "1", shift: "!" },
    { normal: "2", shift: '"' },
    { normal: "3", shift: "№" },
    { normal: "4", shift: ";" },
    { normal: "5", shift: "%" },
    { normal: "6", shift: ":" },
    { normal: "7", shift: "?" },
    { normal: "8", shift: "*" },
    { normal: "9", shift: "(" },
    { normal: "0", shift: ")" },
    { normal: "-", shift: "_" },
    { normal: "=", shift: "+" },
     { normal: "⌫", shift: "⌫", class: "backspace" }],
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
    [{ normal: "caps", class: "capslock" },
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
    [{ normal: "control", class: "control" },
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
    [{ normal: "`", shift: "~", class: "esc" },
    { normal: "1", shift: "!" },
    { normal: "2", shift: "@" },
    { normal: "3", shift: "#" },
    { normal: "4", shift: "$" },
    { normal: "5", shift: "%" },
    { normal: "6", shift: "^" },
    { normal: "7", shift: "&" },
    { normal: "8", shift: "*" },
    { normal: "9", shift: "(" },
    { normal: "0", shift: ")" },
    { normal: "-", shift: "_" },
    { normal: "=", shift: "+" },
    { normal: "⌫", shift: "⌫", class: "backspace" }],
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
    [{ normal: "caps", class: "capslock" },
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
    [{ normal: "control", class: "control" },
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
    //console.log(event);
    activeKeys.forEach(item => {
      const element  = document.querySelector(`[data-key~="${item.key}"]`);
      element && element.classList.remove("active");
    });
    activeKeys = [];
    if ( modeKey !== 'shift') {
      modeKey = 'shift';
      renderKeyboard();
    }
  },
  capslock: (event) => {
    capsStatus = !capsStatus;
    renderKeyboard();
    const element  = document.querySelector(`[data-key~="caps"]`);
    if (capsStatus){
      element.classList.add("active");
    }
    else{
      element.classList.remove("active");
    }
    //console.log(element);
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
  control:(event) =>{
   ctrlState = true;
   checkLang();
   renderKeyboard();
  },
  alt:(event) =>{
    altState = true;
    checkLang();
    renderKeyboard();
  }
};

function checkLang() {
  if (ctrlState && altState){
    lang = lang ==="ru" ? "en" : "ru";
  }
}

let modeKey = 'normal';
function renderKeyboard() {
  const keyboard = document.querySelector('.keyboard__keys');
  let objKB = lang === "ru" ? ru : en;
  //console.log(objKB);
  const hrmlString = objKB.keys.map(row => {
    const rowString = row.map(key => {
      let value = key;
      const classes = ['key'];
      if (typeof key === 'object') {
        const isUpperCase = (!capsStatus && modeKey === "shift") || ( capsStatus && modeKey !== "shift")
        value = key[modeKey] || key.normal;
        if (! isSpecial(value)){
          value = isUpperCase ? value.toUpperCase() : value.toLowerCase();
        }
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
    specialKeys[key](event);
  }
  if (event.key.toLowerCase()=== "capslock"){
    return;
  }
  const isUpperCase = (!capsStatus && modeKey === "shift") || ( capsStatus && modeKey !== "shift");
  let SuperTestKey8 = key;
  if (!isSpecial(SuperTestKey8)){
    SuperTestKey8 = isUpperCase ? event.key.toUpperCase() : event.key.toLowerCase();
  }
  activeKeys.push(SuperTestKey8);
  const keys = document.querySelectorAll(".key");
  //console.log('activeKeys', activeKeys)
  activeKeys.forEach(activeKey =>{
      console.log('activeKey', activeKey)
      const element  = document.querySelector(`[data-key~="${activeKey}"]`);
      console.log('element', element)
      element && element.classList.add("active");
    }
  )
  //console.log('   ')
  //console.log(activeKeys);
}

function isSpecial (key){
  return key.length !== 1;
}

function handleKeyUp (event) {
  if (event.key.toLowerCase() === 'shift') {
    modeKey = 'normal';
    renderKeyboard();
  }
  if (event.key.toLowerCase() === "control"){
    ctrlState = false;
  }
  if (event.key.toLowerCase() === "alt"){
    altState = false;
  }
  if (event.key.toLowerCase()=== "capslock"){
    return;
  }
  const textarea = document.querySelector(".keyboard__showcase");
  textarea.focus();
  if (event.key.toLowerCase() !== "capslock"){
    let elemKey = isSpecial(event.key) ? event.key.toLowerCase(): event.key;
    activeKeys = activeKeys.filter(key => key !== elemKey )
    //console.log("event_key", eveKey);
    const element  = document.querySelector(`[data-key~="${elemKey}"]`);
    element && element.classList.remove("active");
  }

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
