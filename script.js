// Main elements
body = document.querySelector("body");
main = document.createElement("div");
result = document.createElement("p");
result.id = "result";
result.className = "hidden";
body.appendChild(result);
main.id = "main";
gamestart = false;

// Menu panel includes timer and score.
menu = document.createElement("div");
menu.id = "menu";
menuButt = document.createElement("p");
menuButt.id = "menuButton";
menuButt.textContent = "Menu";
menu.appendChild(menuButt);
timer = document.createElement("p");
timerspan = document.createElement("span");
timerspan.id = "timerspan";
timer.appendChild(timerspan);
timer.id = "timer";
menu.appendChild(timer);

// Add menu items
main.appendChild(menu);

// Variables 
let bombs = 10;
let flagsCount = 0;
let tilelist = [];
let gamestatus = false;

// Sidepanel
sidepanel = document.createElement("div");
sidepanel.id = "sidepanel";
sideheader = document.createElement("p");
sideheader.textContent = "MENU";
sidepanel.appendChild(sideheader);
main.appendChild(sidepanel);

// Grid Sizing Handler
sizer = document.createElement("div");
sizer.id = "sizer";
sizerinput = document.createElement("select");
sizerinput.type = "number";
sizerinput.name = "Difficulty";
sizerinput.value = 10;
easy = document.createElement("option");
easy.value = 10;
easy.textContent = "Easy";
intermediate = document.createElement("option");
intermediate.value = 16;
intermediate.textContent = "Intermediate";
expert = document.createElement("option");
expert.value = 30;
expert.textContent = "Expert";
sizerinput.appendChild(easy);
sizerinput.appendChild(intermediate);
sizerinput.appendChild(expert);

sizerinput.id = "sizerinput";
sizertext = document.createElement("p");
sizertext.textContent = "Grid Size";
sizer.appendChild(sizertext);
sizer.appendChild(sizerinput);
sidepanel.appendChild(sizer);

// Add reset button
reset = document.createElement("p");
reset.textContent = "RESET";
reset.id = "reset";
reset.style.borderStyle = "solid";
sidepanel.appendChild(reset);

// flagsCount left
flagsLeft = document.createElement("p");
flagsLeft.textContent = "0";

// Start button
start = document.createElement("p");
start.textContent = "START";
start.id = "start";
start.style.borderStyle = "solid";
sidepanel.appendChild(start);


function hidepanel() {
  var panel = document.getElementById('sidepanel');
  if (panel.classList.contains('hidden')) {
    panel.classList.remove('hidden');
  } else {
    panel.classList.add('hidden');
  }
};

function hideresult() {
  if (result.classList.contains('hidden')) {
    result.classList.remove('hidden');
  } else {
    result.classList.add('hidden');
  }
};

const ClassShuffled = [];
document.addEventListener("change", function(e) {
    if (e.target.id == sizerinput.id) {
        hidepanel();
        container.innerHTML = "";
        if (sizerinput.value == 10) {
            bombs = 10;
        }
        else if (sizerinput.value == 16) {
            bombs = 40;
        }
        else if (sizerinput.value == 30) {
            let styleText = document.getElementById('javacss').sheet;
            let st = `.horizontal {
              font-size: 10px;
            }`;
            let st1 = `#container {
              height: 700px !important;
              width: 700px !important;
            }`;
            styleText.insertRule(st, 0);
            styleText.insertRule(st1, 0);
            bombs = 99;

        }
        flagsLeft.innerHTML = bombs;
        StartGame();
    }
    
});

document.addEventListener("click", function(e) {
    if (e.target.className.includes("horizontal")) {
        console.log("click");
        click(e.target);
    }
    else if (e.target.id == "menuButton") {
      hidepanel();
    }
    else if (e.target.id == "reset") {
      container.innerHTML = "";
      StartGame(); 
      hidepanel();
    }
    else if (e.target.id == "start") {
      container.innerHTML = "";
      StartGame(); 
      hidepanel();
    }
    else if (e.target.id == "result") {
      hideresult();
      gamestatus = false;
      container.innerHTML = "";
      StartGame(); 
    }
    else {

    }
})

// Grid function.
container = document.createElement("div");
container.id = "container";

var width = 0;
function StartGame() {
    tilelist = [];
    gamestart = true;
    const bombList = Array(bombs).fill('bomb');
    const validList = Array(sizerinput.value*sizerinput.value - bombs).fill('valid');
    const gametiles = validList.concat(bombList);
    const ClassShuffled = gametiles.sort(() => Math.random() -0.5);
    width = parseInt(sizerinput.value);
    if (sizerinput.value <= 30) {
        var b = 0;
        for (let i = 1; i <= sizerinput.value; i++) {
            var vertical = document.createElement("div");
            vertical.className = "vertical";
            for (let j = 1; j <= sizerinput.value; j++) {
                var tile = document.createElement("div");
                tile.setAttribute('id', b);
                tile.classList.add("horizontal");
                tile.classList.add(ClassShuffled[b]);
                tile.style.backgroundColor = "#C0C0C0";
                tilelist.push(tile);
                vertical.appendChild(tile);
                b++;
            }
            container.appendChild(vertical);
        }
        for (let i = 0; i < tilelist.length; i++) {
            let total = 0;
            const LEdge = (i % width === 0);
            const REdge = (i % width === width - 1);
            if (tilelist[i].classList.contains('valid')) {
                // Check adjacent tilelist for bombs
                if (i > 0 && !LEdge && tilelist[i - 1].classList.contains('bomb')) total++;
                if (i > width - 1 && !REdge && tilelist[i + 1 - width].classList.contains('bomb')) total++;
                if (i > width && tilelist[i - width].classList.contains('bomb')) total++;
                if (i > width + 1 && !LEdge && tilelist[i - 1 - width].classList.contains('bomb')) total++;
                if (i < width * (width - 1) && !REdge && tilelist[i + 1].classList.contains('bomb')) total++;
                if (i < width * (width - 2) && !LEdge && tilelist[i - 1 + width].classList.contains('bomb')) total++;
                if (i < width * (width - 2) && !REdge && tilelist[i + 1 + width].classList.contains('bomb')) total++;
                if (i < width * (width - 1) && tilelist[i + width].classList.contains('bomb')) total++;
          
                tilelist[i].setAttribute('data', total);
              }
          }
        main.appendChild(container);
        body.appendChild(main);
    }
    else {
        alert("Invalid Value");
    }
}

StartGame();

function addFlag(tile) {
    if (gamestatus) return;
    if (!tile.classList.contains('checked') && (flagsCount < bombs)) {
      if (!tile.classList.contains('flag')) {
        tile.classList.add('flag');
        tile.innerHTML = ' 🚩';
        flagsCount ++;
        flagsLeft.innerHTML = bombs- flagsCount;
        checkWin();
      } else {
        tile.classList.remove('flag');
        tile.innerHTML = '';
        flagsCount --;
        flagsLeft.innerHTML = bombs- flagsCount;
      }
    }
};
function checkWin() {
  let checksum = 0;
    for (let i = 0; i < tilelist.length; i++) {
      if (tilelist[i].classList.contains('flag') && tilelist[i].classList.contains('bomb')) {
        checksum ++;
      };
      if (checksum === bombs) {
        result.innerHTML = 'YOU WIN!';
        gamestatus = true;
      };
    };
};

function gameOver(tile) {
  result.innerHTML = 'You suck!'
  hideresult();
  gamestatus = true
  // Reveal bombs.
  tilelist.forEach(tile => {
    if (tile.classList.contains('bomb')) {
      tile.innerHTML = '💣'
      tile.style.backgroundColor = "red";
      tile.classList.remove('bomb')
      tile.classList.add('checked')
      tile.classList.add("b");
    }
  })
}

// Click
function click(tile) {
    if (gamestatus) return;
    if (tile.classList.contains("checked")) return;
    if (tile.classList.contains("flag")) return;
    if (tile.classList.contains("bomb")) {
        gameOver(tile);
    };
    let currentId = tile.id;
    let tiledata = tile.getAttribute("data");
    if (tile.classList.contains("valid")) {
        if (tiledata != 0) {
            tile.style.backgroundColor = "white";
            tile.innerHTML = tiledata;
        }
        else {
            tile.style.backgroundColor = "white";
            checktile(tile,currentId);
        }
    };
    tile.classList.add("checked");
};
// Modified checktile function
function checktile(tile, currentId) {
    const LEdge = (currentId % width === 0);
    const REdge = (currentId % width === width - 1);
    
    setTimeout(() => {

      if (currentId > 0 && !LEdge) {
        const newId = parseInt(currentId) - 1;
        const newtile = document.getElementById(newId);
        click(newtile);
      };
      if (currentId > width - 1 && !REdge) {
        const newId = parseInt(currentId) + 1 - width;
        const newtile = document.getElementById(newId);
        click(newtile);
      };
      if (currentId > width) {
        const newId = parseInt(currentId - width);
        const newtile = document.getElementById(newId);
        click(newtile);
      }
      if (currentId > width + 1 && !LEdge) {
        const newId = parseInt(currentId) - 1 - width;
        const newtile = document.getElementById(newId);
        click(newtile);
      }
      if (currentId < (width * width) - 1 && !REdge) {
        const newId = parseInt(currentId) + 1;
        const newtile = document.getElementById(newId);
        if (!newtile.classList.contains("bomb")) {
            click(newtile);
        }
      }
      if (currentId < width * (width - 2) && !LEdge) {
        const newId = parseInt(currentId) - 1 + width;
        const newtile = document.getElementById(newId);
        click(newtile);
      }
      if (currentId < width * (width - 2) && !REdge) {
        const newId = parseInt(currentId) + 1 + width;
        const newtile = document.getElementById(newId);
        click(newtile);
      }
      if (currentId < width * (width - 1)) {
        const newId = parseInt(currentId) + width;
        const newtile = document.getElementById(newId);
        click(newtile);
      }
    }, 10);
  }

footer = document.createElement("footer");
footer.textContent = "Copyright @ MrMasterB4 2024";
body.appendChild(footer);