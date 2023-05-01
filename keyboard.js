let lang = "en";
let mode = "normal";

const keyboardHTML = `
<div class="keyboard">
  <textarea class="keyboard__showcase">
  </textarea>
  <div class="keyboard__keys">

  </div>
</div>`;

const virtualKeyboard = document.querySelector(".virtual-keyboard");
virtualKeyboard.insertAdjacentHTML("afterbegin", keyboardHTML);

const currentLangObj = (lang) => {
  return lang === "en" ? en : ru;

};


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
const keyboard = document.querySelector('.keyboard__keys');
let modeKey = 'normal';
function renderKeyboard(lang) {
  let array1 = currentLangObj(lang);
  console.log(array1);
  const hrmlString = array1.keys.map(row => {
    const rowString = row.map(key => {
      let value = key;
      const classes = ['key'];
      if (typeof key === 'object') {
        value = key[modeKey] || key.normal;
        key.class && classes.push(key.class);
      }
      return `<div class="${classes.join(' ')}">${value}</div>`
    }).join('');
    //console.log('rowString', rowString)
    return `<div class="row">${rowString}</div>`
  }).join('')
  //console.log('hrmlString', hrmlString)
  keyboard.innerHTML = hrmlString;
}
document.addEventListener('keydown', (e) => {
  if (e.key.toLowerCase() === 'shift' && mode !== 'shift') {
    modeKey = 'shift';
    renderKeyboard();
    
  }
});
document.addEventListener('keyup', (e) => {
  if (e.key.toLowerCase() === 'shift') {
    modeKey = 'normal';
    renderKeyboard();
  }
});


function mouseClickDown(event) {
  const key = event.target.closest(".key");
  if (!key) return;
  key.classList.toggle("active");
}


function mouseClickUp(event) {
  const key = event.target.closest(".key");
  if (!key) return;
  key.classList.remove("active");
}





const keyboard1 = document.querySelector(".keyboard__keys");
keyboard1.addEventListener("mousedown", mouseClickDown);
keyboard1.addEventListener("mouseup", mouseClickUp);
renderKeyboard(lang);