
let emojiCategories = [];
function setEmojiCategories(wishedCategories) {
  emojiCategories = wishedCategories;
}
let EmojisPerCategory;
function setEmojisPerCategory(num) {
  EmojisPerCategory = num;
}
let maxEmojisGraph;
function setMaxEmojisGraph(num) {
  maxEmojisGraph = num;
}
let generatedCanvasId = 0
setMaxEmojisGraph(20);
setEmojisPerCategory(10);
setEmojiCategories(['food-drink']);

function create_input_table(tableId, buttonId, dataCardsId) {
  let tableElement = document.getElementById(tableId);

  let tableButtons = document.getElementById(buttonId);
  tableButtons.className = "tableButtonDiv"
  let addButton = document.createElement('button');
  addButton.id = "add";
  addButton.className = "button-2";
  addButton.setAttribute('role', "button");
  addButton.innerHTML = "+";

  let createLinePictogramButton = graphButton('linePictogramButton', "Create line pictogram")
  let createLineTransButton = graphButton('lineTransitionButton', "Create line transition graph")
  let createLineGraphButton = graphButton('lineGraphButton', "Create line graph")

  let createBarPictogramButton = graphButton('barPictogramButton', "Create bar pictogram")
  let createBarTransButton = graphButton('barTransitionButton', "Create bar transition graph")
  let createBarGraphButton = graphButton('barGraphButton', "Create bar graph")

  let createPiePictogramButton = graphButton('piePictogramButton', "Create pie pictogram")
  let createPieTransButton = graphButton('pieTransitionButton', "Create pie transition graph")
  let createPieGraphButton = graphButton('pieGraphButton', "Create pie graph")

  let dataCard = document.createElement('div');
  dataCard.className = 'dataCards';
  dataCard.id = 'dataCards';
  let row = document.createElement('div');
  row.className = 'row';
  row.id = tableId + 1;
  dataCard.appendChild(row);
  tableElement.appendChild(dataCard);
  addCard(tableId, dataCardsId);
  dataCardsId++;
  addButton.addEventListener('click', (event) => {
    addCard(tableId, dataCardsId);
    dataCardsId++;
  });

  tableButtons.appendChild(addButton);

  tableButtons.appendChild(createLinePictogramButton);
  tableButtons.appendChild(createLineTransButton);
  tableButtons.appendChild(createLineGraphButton);

  tableButtons.appendChild(createBarPictogramButton);
  tableButtons.appendChild(createBarTransButton);
  tableButtons.appendChild(createBarGraphButton);

  tableButtons.appendChild(createPiePictogramButton);
  tableButtons.appendChild(createPieTransButton);
  tableButtons.appendChild(createPieGraphButton);

  addLinePictogramListener('linePictogramButton')
  addLineTransitionListener('lineTransitionButton')
  addLineChartListener('lineGraphButton')

  addBarPictogramListener('barPictogramButton')
  addBarTransitionListener('barTransitionButton')
  addBarChartListener('barGraphButton')

  addPiePictogramListener('piePictogramButton')
  addPieTransitionListener('pieTransitionButton')
  addPieChartListener('pieGraphButton')

  return true;

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
function graphButton(graphType, text) {
  let createButton = document.createElement('button');
  createButton.id = graphType;
  createButton.className = "button-2";
  createButton.setAttribute('role', "button");
  createButton.innerHTML = text;
  return createButton;
}

//ADDING CARDS TO TABLE
function addCard(tableId, dataCardsId) {
  let dataCard = document.getElementById(tableId);
  let row = document.getElementById(tableId + 1);
  let cell = document.createElement('div');
  cell.className = "cell";

  let card = document.createElement('div');
  card.className = "card";
  let header = document.createElement('div');
  header.className = "header";
  let inputCard1 = document.createElement('input');
  inputCard1.className = "inputCard1"
  let chatContainer = document.createElement('div');
  chatContainer.className = 'chat-container';
  let chatUtilities = document.createElement('div');
  chatUtilities.className = 'chat-utilities';
  let utilityContainer = document.createElement('div');
  utilityContainer.className = 'utility-container';
  let utilityGroup = document.createElement('ul');
  utilityGroup.className = 'utility-group';
  let emojiSelectorCreate = document.createElement('li');
  emojiSelectorCreate.className = 'emoji-selector';
  emojiSelectorCreate.id = 'emojiSelector';
  let inputContainer = document.createElement('div');
  inputContainer.className = 'input-container';
  let emojiSearchCreate = document.createElement('input');
  emojiSearchCreate.id = 'emojiSearch';
  emojiSearchCreate.setAttribute("type", "text");
  emojiSearchCreate.setAttribute("placeholder", "Search...");
  let emojiListCreate = document.createElement('ul');
  emojiListCreate.className = "emoji-list";
  emojiListCreate.id = 'emojiList';
  let emojiSelectorIconCreate = document.createElement('li');
  emojiSelectorIconCreate.id = "emojiSelectorIcon";
  emojiSelectorIconCreate.className = "emojiSelectorIcon";

  
  let img = document.createElement('img');
  img.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/commons/9/90/Twemoji_1f600.svg');
  emojiSelectorIconCreate.appendChild(img);
  inputContainer.appendChild(emojiSearchCreate);
  emojiSelectorCreate.appendChild(inputContainer);
  emojiSelectorCreate.appendChild(emojiListCreate);
  utilityGroup.appendChild(emojiSelectorCreate);
  utilityGroup.appendChild(emojiSelectorIconCreate);
  utilityContainer.appendChild(utilityGroup);
  chatUtilities.appendChild(utilityContainer);
  chatContainer.appendChild(chatUtilities);
  header.appendChild(chatContainer);
  //ADDING COLORPICKER
  let colorPicker = document.createElement('div');
  colorPicker.className = 'picker'
  colorPicker.id = dataCardsId;
  header.appendChild(colorPicker);
  //CHECKING IF POP UP IS IN VIEWPORT
  var isOutOfViewport = function (elem) {
    var bounding = elem.getBoundingClientRect();
    var out = {};
    out.top = bounding.top < 0;
    out.left = bounding.left < 0;
    out.bottom = bounding.bottom > (window.innerHeight || document.documentElement.clientHeight);
    out.right = bounding.right > (window.innerWidth || document.documentElement.clientWidth);
    out.any = out.top || out.left || out.bottom || out.right;
    out.all = out.top && out.left && out.bottom && out.right;
    return out;
  };
  emojiSelectorIconCreate.addEventListener('click', () => {
    /*let emojiPickers = document.getElementsByClassName("emojiSelectorIcon")
    for(let i = 0; i < emojiPickers.length;i++){}
   */
    emojiSelectorCreate.classList.toggle('active');
    var isOut = isOutOfViewport(emojiSelectorCreate);
    if (isOut.any) {
      emojiSelectorCreate.style.bottom = '-710%'
    }
  });


  //LOADING EMOJIS
  fetch('https://emoji-api.com/emojis?access_key=329dfe7d47ca9bf032e6959bd2692f5624520d19').then(res => res.json()).then(data => loadEmoji(data, emojiCategories, EmojisPerCategory));
  function loadEmoji(data, emojiCategories, EmojisPerCategory) {
    let counter = 0;
    let previousCategory;
    let currentCategory;
    let first = true;
    let emojiCodePoints = new Set()
    data.forEach(emoji => {
      if (!emojiCodePoints.has(emoji.codePoint)) {
        if (first) {
          previousCategory = emoji.group;
          first = false;
        }
        let li = document.createElement('li');
        li.setAttribute('emoji-name', emoji.slug)
        li.textContent = emoji.character;
        let currentCategory = emoji.group;
        if (previousCategory == currentCategory) {
          counter++;
        } else {
          counter = 1;
        }
        if (emojiCategories.includes(emoji.group) && counter <= EmojisPerCategory) {
          li.addEventListener('click', () => {
            emojiSelectorIconCreate.style.display = "none";
            let emojiInputExists = utilityGroup.getElementsByTagName('p').length;
            //DISABLE INPUTING MULTIPLE EMOJIS IN ONE CARD
            if (emojiInputExists) {
              utilityGroup.getElementsByTagName('p')[0].remove();
            }
            let emojiInput = document.createElement('p');
            emojiInput.textContent = emoji.character;
            emojiInput.className = "emoji-input";
            emojiSelectorCreate.classList.toggle('active');
            emojiInput.addEventListener('click', () => {
              emojiSelectorCreate.classList.toggle('active');
              var isOut = isOutOfViewport(emojiSelectorCreate);
              if (isOut.any) {
                emojiSelectorCreate.style.bottom = '-710%'
              }
            });
            utilityGroup.appendChild(emojiInput);
          });
          emojiListCreate.appendChild(li);
          previousCategory = currentCategory;
        }
        emojiCodePoints.add(emoji.codePoint)
      }
    });
  }
  //SEARCHING EMOJIS
  emojiSearchCreate.addEventListener('keyup', e => {
    let value = e.target.value;
    let emojis = document.querySelectorAll('#emojiList li');
    emojis.forEach(emoji => {
      if (emoji.getAttribute('emoji-name').toLowerCase().includes(value)) {
        emoji.style.display = 'flex';
      } else {
        emoji.style.display = 'none';
      }
    })
  })
  //MAKING CARDS FOR NUMBER AND TEXT INPUT
  let container = document.createElement('div');
  container.className = "container";

  let inputCard2 = document.createElement('input');
  inputCard2.className = "inputCard2"
  inputCard2.setAttribute("placeHolder", "Input name");
  container.appendChild(inputCard2);
  let container2 = document.createElement('div');
  container2.className = "container2";
  let inputCard3 = document.createElement('input');
  inputCard3.className = "inputCard3"
  inputCard3.setAttribute("placeHolder", "Input number");
  container2.appendChild(inputCard3);
  addEnterListener(inputCard3)

  let container3 = document.createElement('div');
  container3.className = "container2"
  let button = document.createElement('button');
  button.className = "addDataButton ";
  addDataListener(button);
  container2.appendChild(button);

  //ADDING DELETE CARD BUTOTN
  let deleteButton = document.createElement('button');
  deleteButton.className = "deleteButton";
  header.style.position = "relative";
  deleteButton.style.position = "absolute"
  deleteButton.style.top = "5px"
  deleteButton.style.left = "5px"

  header.appendChild(deleteButton);
  card.appendChild(header);
  card.appendChild(container);
  card.appendChild(container2);
  cell.appendChild(card);
  row.appendChild(cell);

  function addDataListener(element){
  element.addEventListener('click', e => {
    let buttonParrent = e.target.parentNode;
    let card = buttonParrent.parentNode
    
     //VALIDATION
     let emoji = card.getElementsByTagName('p');
     let names =  card.getElementsByClassName('inputCard2');
     let numbers =  card.getElementsByClassName('inputCard3');
   
 
     let goodData = validate(emoji, names, numbers)
     if(!goodData){ 
       return;
     } 

    let container = document.createElement('div');
    container.className = "container";
    let inputCard2 = document.createElement('input');
    inputCard2.className = "inputCard2"
    inputCard2.setAttribute("placeHolder", "Input name");
    container.appendChild(inputCard2);
    let container2 = document.createElement('div');
    container2.className = "container2";
    let inputCard3 = document.createElement('input');
    inputCard3.className = "inputCard3"
    inputCard3.setAttribute("placeHolder", "Input number");
    container2.appendChild(inputCard3);
    addEnterListener(inputCard3)

    let container3 = document.createElement('div');
    container3.className = "container2"
    let button = document.createElement('button');
    button.className = "addDataButton ";
    addDataListener(button);
    container2.appendChild(button);

    card.appendChild(container);
    card.appendChild(container2);
  })}

 function addEnterListener(element){
  element.addEventListener('keyup', e => {
    if (e.key === 'Enter') {
    let buttonParrent = e.target.parentNode;
    let card = buttonParrent.parentNode

    //VALIDATION
    let emoji = card.getElementsByTagName('p');
    let names =  card.getElementsByClassName('inputCard2');
    let numbers =  card.getElementsByClassName('inputCard3');
 

    let goodData = validate(emoji, names, numbers)
    if(!goodData){
      return;
    }

    let container = document.createElement('div');
    container.className = "container";
    let inputCard2 = document.createElement('input');
    inputCard2.className = "inputCard2"
    inputCard2.setAttribute("placeHolder", "Input name");
    container.appendChild(inputCard2);
    let container2 = document.createElement('div');
    container2.className = "container2";
    let inputCard3 = document.createElement('input');
    inputCard3.className = "inputCard3"
    inputCard3.setAttribute("placeHolder", "Input number");
    addEnterListener(inputCard3);
    container2.appendChild(inputCard3);

    let container3 = document.createElement('div');
    container3.className = "container2"
    let button = document.createElement('button');
    button.className = "addDataButton ";
    addDataListener(button)
    container2.appendChild(button);

    card.appendChild(container);
    card.appendChild(container2);
  }})
 }
  

  deleteButton.addEventListener('click', e => {
    card.remove();
    cell.remove();
  })

  $('#' + dataCardsId).colorPick({
    'initialColor': '#8e44ad',
    'palette': ["#1abc9c", "#16a085", "#2ecc71", "#27ae60", "#3498db", "#2980b9", "#9b59b6", "#8e44ad", "#34495e", "#2c3e50", "#f1c40f", "#f39c12", "#e67e22", "#d35400", "#e74c3c", "#c0392b", "#ecf0f1"],
    'onColorSelected': function () {
      this.element.css({ 'backgroundColor': this.color, 'color': this.color });
    }
  });
}

function validate(emoji, names, numbers){

    
  if(emoji.length==0){
    alert("Pick an emoji in this card!")
    return false;
  }
    
    for(let i = 0; i < names.length; i++){
      if(names[i].value.trim() == ""){
        alert("Input name fields can't be empty!")
        return false;
      }
    }
    for(let i =0; i < numbers.length; i++){

      if(numbers[i].value.trim() == "" || (!(/^\d+(\.\d+)?$/.test(numbers[i].value.trim())) && !(/^\d+(\,\d+)?$/.test(numbers[i].value.trim()))) ){
        alert("Input number fields can't be empty and they must be positive numbers!")
        return false;
      } 
    }
  

    return true;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///COLLECTING DATA
function getDataSingular() {
  let table = document.getElementById('dataCards');
  let row = table.getElementsByClassName('row')[0];
  let cell = row.getElementsByClassName('cell');

  let cardsArray = [];

  for (let j = 0; j < cell.length; j++) {
    let cardIsEmpty = false;
    
    let colorArray = [];
    let borderArray = [];
    let unicodeArray = [];
    let nameArray = [];
    let numberArray = [];

    let cards = cell[j].getElementsByClassName("card");

    let colors = cards[0].getElementsByClassName('picker');
    let unicode = cards[0].getElementsByClassName('emoji-input');
    let name = cards[0].getElementsByClassName('inputCard2');
    let number = cards[0].getElementsByClassName('inputCard3');
    
    for (let i = 0; i < colors.length; i++) {
      let color = window.getComputedStyle(colors[i]).backgroundColor;
      colorArray[i] = color.replace(')', ', 0.75)').replace('rgb', 'rgba');
      borderArray[i] = color.replace(')', ', 0.8)').replace('rgb', 'rgba');
    }

    for (let i = 0; i < unicode.length; i++) {
      if (unicode[i].textContent.trim != "") {
        unicodeArray[0] = unicode[i].textContent
      } else {
        cardIsEmpty=true;
      }

    }

    for (let i = 0; i < name.length; i++) {
      if (name[i].value.trim().length != 0) {
        nameArray[i] = name[i].value.trim()
      }else{
        cardIsEmpty=true;
      }
    }

    for (let i = 0; i < number.length; i++) {
      if (number[i].value.trim().length != 0) {
        if( number[i].value.trim().replace(/,/g, ".") > maxEmojisGraph){
          alert("Graps can't show values bigger than "+maxEmojisGraph+ ". Value bigger than 21 at card number " + (j+1) + ", input field number " + (i+1) + ".")
           return false;
        }
        numberArray[i] = number[i].value.trim().replace(/,/g, ".")
      }else{
        cardIsEmpty=true;
      }
    }
    

    if(cardIsEmpty){
      alert("Fill the empty places on cards!")
      return cardIsEmpty
    } else{
      cardIsEmpty = !validate(unicode, name, number)
      if(cardIsEmpty){
        return cardIsEmpty}
    }
    

    let oneCardData = {
      colors: colorArray,
      border: borderArray,
      labels: nameArray,
      values: numberArray,
      unicode: unicodeArray
    }
     
    cardsArray[j] = oneCardData;

  }

    return cardsArray;
}


function getDataJoined() {
  let table = document.getElementById('dataCards');
  let row = table.getElementsByClassName('row')[0];
  let cell = row.getElementsByClassName('cell');

  let cardsArray = [];

  for (let j = 0; j < cell.length; j++) {
    let cardIsEmpty = false;

    let colorArray = [];
    let borderArray = [];
    let unicodeArray = [];
    let nameArray = [];
    let numberArray = [];

    let cards = cell[j].getElementsByClassName("card");

    let colors = cards[0].getElementsByClassName('picker');

    for (let i = 0; i < colors.length; i++) {
      let color = window.getComputedStyle(colors[i]).backgroundColor;
      colorArray[i] = color.replace(')', ', 0.75)').replace('rgb', 'rgba');
      borderArray[i] = color.replace(')', ', 0.8)').replace('rgb', 'rgba');
    }

    let unicode = cards[0].getElementsByClassName('emoji-input');

    for (let i = 0; i < unicode.length; i++) {
      if (unicode[i].textContent.trim != "") {
        unicodeArray[0] = unicode[i].textContent
      } else{
        cardIsEmpty=true;
      }
    }

    let name = cards[0].getElementsByClassName('inputCard2');
    for (let i = 0; i < name.length; i++) {
      if (name[i].value.trim().length != 0) {
        nameArray[i] = name[i].value.trim()
      }else{
        cardIsEmpty=true;
      }
    }

    let number = cards[0].getElementsByClassName('inputCard3');
    for (let i = 0; i < number.length; i++) {
      if (number[i].value.trim().length != 0) {
        numberArray[i] = number[i].value.trim()

      }else{
        cardIsEmpty=true;
      }
    }
    
    if(cardIsEmpty){
      alert("Fill the empty places on cards!")
      return cardIsEmpty
    } else{
      cardIsEmpty = !validate(unicode, name, number)
      if(cardIsEmpty){
        return cardIsEmpty}
    }

    let newColorArray = [];
    let newBorderArray = [];
    let newUnicodeArray = [];
    let newNameArray = [];
    let newNumberArray = [];
    let counter = new Map();

    for (let i = 0; i < numberArray.length; i++) {

      if (counter.get(numberArray[i].toString()) == null) {
        counter.set(numberArray[i].toString(), 0);
      }
      counter.set(numberArray[i].toString(), counter.get(numberArray[i].toString()) + 1);
    }

    var keys = counter.keys();

    var keyArray = Array.from(keys);

    let k = 0;
    keyArray.forEach(function (key) {
      newNameArray[k] = key;
      k++;
    });


    var values = counter.values();

    var valueArray = Array.from(values);

    let l = 0;
    valueArray.forEach(function (value) {
      if( value > maxEmojisGraph){
        alert("Graps can't show values bigger than "+maxEmojisGraph+ ". Value bigger than 21 at card number " + (j+1) + ".")
         return false;
      }
      newNumberArray[l] = value;
      l++;
    });


    for (let i = 0; i < nameArray.length; i++) {
      newColorArray[i] = colorArray[0]
      newBorderArray[i] = borderArray[0]
      newUnicodeArray[i] = unicodeArray[0];
    }
    
    let oneCardData = {
      colors: newColorArray,
      border: newBorderArray,
      labels: newNameArray,
      values: newNumberArray,
      unicode: newUnicodeArray
    }

    cardsArray[j] = oneCardData;

  }

  return cardsArray;
}
/////////////////////////////////////////////////////////////////////////////////////////////
//CREATING GRAPH
function createGraphCard(type, canvasId, maxId, minId, avgId) {
  let body = document.getElementById('body');
  let chartCard = document.createElement('div');
  chartCard.className = "chartCard";
  let chartName = document.createElement('div');
  chartName.innerHTML = canvasId;
  let chartBox = document.createElement('div');
  chartBox.className = "chartBox";
  let canvas = document.createElement('canvas');
  canvas.id = canvasId;

  let maxButton = document.createElement('button');
  maxButton.id = maxId;
  maxButton.className = "button-2"
  maxButton.innerHTML = "MAX";
  maxButton.setAttribute("pressed", "false");


  let minButton = document.createElement('button');
  minButton.id = minId;
  minButton.className = "button-2"
  minButton.innerHTML = "MIN";
  minButton.setAttribute("pressed", "false");


  let avgButton = document.createElement('button');
  avgButton.id = avgId;
  avgButton.className = "button-2"
  avgButton.innerHTML = "AVG";
  avgButton.setAttribute("pressed", "false");

  let buttonDiv = document.createElement("div")
  buttonDiv.className = "buttonDiv"

  if (type == "pie") {

    let div = document.createElement("div")
    div.appendChild(chartName);
    div.appendChild(canvas);
    buttonDiv.appendChild(maxButton);
    buttonDiv.appendChild(minButton);
    buttonDiv.appendChild(avgButton);
    div.appendChild(buttonDiv);
    chartCard.appendChild(div);

  } else {
    chartBox.appendChild(chartName);
    chartBox.appendChild(canvas);
    buttonDiv.appendChild(maxButton);
    buttonDiv.appendChild(minButton);
    buttonDiv.appendChild(avgButton);
    chartBox.appendChild(buttonDiv)
    chartCard.appendChild(chartBox);
  }

  body.appendChild(chartCard);
}

function toBoolean(value) {
  if (value == "true") {
    return true
  } else return false;
}
function toString(value) {
  if (value) {
    return "true"
  } else return "false";
}
function graphButtons(type, graph, maxId, minId, avgId) {


  document.getElementById(maxId).addEventListener('click', () => {
    let maxButt = document.getElementById(maxId)
    let maxPressed = !toBoolean(maxButt.getAttribute("pressed"))
    maxButt.setAttribute("pressed", toString(maxPressed))

    let minButt = document.getElementById(minId)
    let minPressed = toBoolean(minButt.getAttribute("pressed"))

    let avgButt = document.getElementById(avgId)
    let avgPressed = toBoolean(avgButt.getAttribute("pressed"))


    let max = graph.data.datasets[0].data[0];
    for (let i = 0; i < graph.data.datasets[0].data.length; i++) {
      if (max < graph.data.datasets[0].data[i]) {
        max = graph.data.datasets[0].data[i];
      }
    }

    let min = graph.data.datasets[0].data[0];
    for (let i = 0; i < graph.data.datasets[0].data.length; i++) {
      if (min > graph.data.datasets[0].data[i]) {
        min = graph.data.datasets[0].data[i];
      }
    }

    
   let avg = parseFloat(0);
   for (let i = 0; i < graph.data.datasets[0].data.length; i++) {

     avg += parseFloat(graph.data.datasets[0].data[i]);

     if (i ==parseFloat( graph.data.datasets[0].data.length) - 1) {
       avg =  parseFloat(avg) /  parseFloat((i + 1));
     }

   }

   if (maxPressed) {
     maxButt.innerHTML =  "MAX= " + max;
   } else {
     maxButt.innerHTML = "MAX";
   }

   if (minPressed) {
     minButt.innerHTML =  "MIN= " + min;
   } else {
     minButt.innerHTML = "MIN";
   }

   if (avgPressed) {
     avgButt.innerHTML =  "AVG= " + avg.toFixed(2);
   } else {
     avgButt.innerHTML = "AVG";
   }

    graph.options.scales.y.grid.color = (ctx) => {



      if (ctx.tick.value == max && maxPressed) {
        return "green"
      } else if (ctx.tick.value == min && minPressed) {
        return 'red'
      } else if (ctx.tick.value == avg && avgPressed) {
        return 'purple'
      } else {
        return 'rgba(0, 0, 0, 0.1)'
      }
    };

    graph.update();
  })

  document.getElementById(minId).addEventListener('click', () => {
   

      let maxButt = document.getElementById(maxId)
      let maxPressed = toBoolean(maxButt.getAttribute("pressed"))


      let minButt = document.getElementById(minId)
      let minPressed = !toBoolean(minButt.getAttribute("pressed"))
      minButt.setAttribute("pressed", toString(minPressed))


      let avgButt = document.getElementById(avgId)
      let avgPressed = toBoolean(avgButt.getAttribute("pressed"))


      let max = graph.data.datasets[0].data[0];
      for (let i = 0; i < graph.data.datasets[0].data.length; i++) {
        if (max < graph.data.datasets[0].data[i]) {
          max = graph.data.datasets[0].data[i];
        }
      }

      let min = graph.data.datasets[0].data[0];
      for (let i = 0; i < graph.data.datasets[0].data.length; i++) {
        if (min > graph.data.datasets[0].data[i]) {
          min = graph.data.datasets[0].data[i];
        }
      }


      let avg = parseFloat(0);
      for (let i = 0; i < graph.data.datasets[0].data.length; i++) {

        avg += parseFloat(graph.data.datasets[0].data[i]);

        if (i ==parseFloat( graph.data.datasets[0].data.length) - 1) {
          avg =  parseFloat(avg) /  parseFloat((i + 1));
        }

      }

      if (maxPressed) {
        maxButt.innerHTML =  "MAX= " + max;
      } else {
        maxButt.innerHTML = "MAX";
      }

      if (minPressed) {
        minButt.innerHTML =  "MIN= " + min;
      } else {
        minButt.innerHTML = "MIN";
      }

      if (avgPressed) {
        avgButt.innerHTML =  "AVG= " + avg.toFixed(2);
      } else {
        avgButt.innerHTML = "AVG";
      }

      graph.options.scales.y.grid.color = (ctx) => { if (ctx.tick.value == max && maxPressed) {
        return "green"
      } else if (ctx.tick.value == min && minPressed) {
        return 'red'
      } else if (ctx.tick.value == avg && avgPressed) {
        return 'purple'
      } else {
        return 'rgba(0, 0, 0, 0.1)'
      }
    };
    graph.update();
  })

  document.getElementById(avgId).addEventListener('click', () => {
      let maxButt = document.getElementById(maxId)
      let maxPressed = toBoolean(maxButt.getAttribute("pressed"))


      let minButt = document.getElementById(minId)
      let minPressed = toBoolean(minButt.getAttribute("pressed"))


      let avgButt = document.getElementById(avgId)
      let avgPressed = !toBoolean(avgButt.getAttribute("pressed"))
      avgButt.setAttribute("pressed", toString(avgPressed))


      let max = graph.data.datasets[0].data[0];
      for (let i = 0; i < graph.data.datasets[0].data.length; i++) {
        if (max < graph.data.datasets[0].data[i]) {
          max = graph.data.datasets[0].data[i];
        }
      }

      let min = graph.data.datasets[0].data[0];
      for (let i = 0; i < graph.data.datasets[0].data.length; i++) {
        if (min > graph.data.datasets[0].data[i]) {
          min = graph.data.datasets[0].data[i];
        }
      }

     let avg = parseFloat(0);
      for (let i = 0; i < graph.data.datasets[0].data.length; i++) {

        avg += parseFloat(graph.data.datasets[0].data[i]);

        if (i ==parseFloat( graph.data.datasets[0].data.length) - 1) {
          avg =  parseFloat(avg) /  parseFloat((i + 1));
        }

      }

      if (maxPressed) {
        maxButt.innerHTML =  "MAX= " + max;
      } else {
        maxButt.innerHTML = "MAX";
      }

      if (minPressed) {
        minButt.innerHTML =  "MIN= " + min;
      } else {
        minButt.innerHTML = "MIN";
      }

      if (avgPressed) {
        avgButt.innerHTML =  "AVG= " + avg.toFixed(2);
      } else {
        avgButt.innerHTML = "AVG";
      }

      graph.options.scales.y.grid.color = (ctx) => {
        if (ctx.tick.value == max && maxPressed) {
        return "green"
      } else if (ctx.tick.value == min && minPressed) {
        return 'red'
      } else if (ctx.tick.value == avg && avgPressed) {
        return 'purple'
      } else {
        return 'rgba(0, 0, 0, 0.1)'
      }
    };
    graph.update();
  })

}

function addLinePictogramListener(buttonId) {
  const button = document.getElementById(buttonId);
  button.addEventListener('click', (event) => {
    let temp = getDataSingular();
    if(typeof temp === 'boolean'){
      return;
    }
    for (let i = 0; i < temp.length; i++) {
       

      let line = {
        type: "line",
        color: temp[i].colors,
        border: temp[i].border,
        labels: temp[i].labels,
        values: temp[i].values,
        unicode: temp[i].unicode,
      };

      let graph;

      createGraphCard("line", "linePictogram " + generatedCanvasId.toString(), "linePictogramMax" + generatedCanvasId.toString(), "linePictogramMin" + generatedCanvasId.toString(), "linePictogramAvg" + generatedCanvasId.toString())
      graph = KidChart('linePictogram', line, "linePictogram " + generatedCanvasId.toString());

      graphButtons("line", graph, "linePictogramMax" + generatedCanvasId.toString(), "linePictogramMin" + generatedCanvasId.toString(), "linePictogramAvg" + generatedCanvasId.toString())
      generatedCanvasId++;
    }



  });
}

function addLineTransitionListener(buttonId) {
  const button = document.getElementById(buttonId);
  button.addEventListener('click', (event) => {
    let temp = getDataSingular();
    if(typeof temp === 'boolean'){
      return;
    }
    for (let i = 0; i < temp.length; i++) {

      let line = {
        type: "line",
        color: temp[i].colors,
        border: temp[i].border,
        labels: temp[i].labels,
        values: temp[i].values,
        unicode: temp[i].unicode,
      };

      let graph;

      createGraphCard("line", "lineTransition " + generatedCanvasId.toString(), "lineTransitionMax" + generatedCanvasId.toString(), "lineTransitionMin" + generatedCanvasId.toString(), "lineTransitionAvg" + generatedCanvasId.toString())
      graph = KidChart("lineTransition", line, 'lineTransition ' + generatedCanvasId.toString());

      graphButtons("line", graph, "lineTransitionMax" + generatedCanvasId.toString(), "lineTransitionMin" + generatedCanvasId.toString(), "lineTransitionAvg" + generatedCanvasId.toString())
      generatedCanvasId++;
    }
  });
}

function addLineChartListener(buttonId) {
  const button = document.getElementById(buttonId);
  button.addEventListener('click', (event) => {
    let temp = getDataSingular();
    if(typeof temp === 'boolean'){
      return;
    }

    for (let i = 0; i < temp.length; i++) {


      let line = {
        type: "line",
        color: temp[i].colors,
        border: temp[i].border,
        labels: temp[i].labels,
        values: temp[i].values,
        unicode: temp[i].unicode,
      };

      let graph;

      createGraphCard("line", "lineChart " + generatedCanvasId.toString(), "lineChartMax" + generatedCanvasId.toString(), "lineChartMin" + generatedCanvasId.toString(), "lineChartAvg" + generatedCanvasId.toString())
      graph = KidChart("lineChart", line, 'lineChart ' + generatedCanvasId.toString());

      graphButtons("line", graph, "lineChartMax" + generatedCanvasId.toString(), "lineChartMin" + generatedCanvasId.toString(), "lineChartAvg" + generatedCanvasId.toString())
      generatedCanvasId++;

    }
  });
}

function addBarPictogramListener(buttonId) {
  const button = document.getElementById(buttonId);
  button.addEventListener('click', (event) => {
    let temp = getDataJoined();
    if(typeof temp === 'boolean'){
      return;
    }
    document.getElementsByClassName("barPictogram ");
    for (let i = 0; i < temp.length; i++) {


      let line = {
        type: "bar",
        color: temp[i].colors,
        border: temp[i].border,
        labels: temp[i].labels,
        values: temp[i].values,
        unicode: temp[i].unicode,
      };

      let graph;

      createGraphCard("bar", "barPictogram " + generatedCanvasId.toString(), "barPictogramMax" + generatedCanvasId.toString(), "barPictogramMin" + generatedCanvasId.toString(), "barPictogramAvg" + generatedCanvasId.toString())
      graph = KidChart('barPictogram', line, "barPictogram " + generatedCanvasId.toString());

      graphButtons("bar", graph, "barPictogramMax" + generatedCanvasId.toString(), "barPictogramMin" + generatedCanvasId.toString(), "barPictogramAvg" + generatedCanvasId.toString())
      generatedCanvasId++;
    }
  });
}

function addBarTransitionListener(buttonId) {
  const button = document.getElementById(buttonId);
  button.addEventListener('click', (event) => {
    let temp = getDataJoined();
    if(typeof temp === 'boolean'){
      return;
    }
    document.getElementsByClassName("barTransition ");
    for (let i = 0; i < temp.length; i++) {


      let line = {
        type: "bar",
        color: temp[i].colors,
        border: temp[i].border,
        labels: temp[i].labels,
        values: temp[i].values,
        unicode: temp[i].unicode,
      };

      let graph;

      createGraphCard("bar", "barTransition " + generatedCanvasId.toString(), "barTransitionMax" + generatedCanvasId.toString(), "barTransitionMin" + generatedCanvasId.toString(), "barTransitionAvg" + generatedCanvasId.toString())
      graph = KidChart('barTransition', line, "barTransition " + generatedCanvasId.toString());

      graphButtons("bar", graph, "barTransitionMax" + generatedCanvasId.toString(), "barTransitionMin" + generatedCanvasId.toString(), "barTransitionAvg" + generatedCanvasId.toString())
      generatedCanvasId++;
    }
  });
}

function addBarChartListener(buttonId) {
  const button = document.getElementById(buttonId);
  button.addEventListener('click', (event) => {
    let temp = getDataJoined();
    if(typeof temp === 'boolean'){
      return;
    }
    document.getElementsByClassName("barChart ");
    for (let i = 0; i < temp.length; i++) {


      let line = {
        type: "bar",
        color: temp[i].colors,
        border: temp[i].border,
        labels: temp[i].labels,
        values: temp[i].values,
        unicode: temp[i].unicode,
      };

      let graph;

      createGraphCard("bar", "barChart " + generatedCanvasId.toString(), "barChartMax" + generatedCanvasId.toString(), "barChartMin" + generatedCanvasId.toString(), "barChartAvg" + generatedCanvasId.toString())
      graph = KidChart('barChart', line, "barChart " + generatedCanvasId.toString());

      graphButtons("bar", graph, "barChartMax" + generatedCanvasId.toString(), "barChartMin" + generatedCanvasId.toString(), "barChartAvg" + generatedCanvasId.toString())

    }
  });
}
function addPiePictogramListener(buttonId) {
  const button = document.getElementById(buttonId);
  button.addEventListener('click', (event) => {
    let temp = getDataJoined();
    if(typeof temp === 'boolean'){
      return;
    }
    document.getElementsByClassName("piePictogram ");
    for (let i = 0; i < temp.length; i++) {


      let line = {
        type: "pie",
        color: temp[i].colors,
        border: temp[i].border,
        labels: temp[i].labels,
        values: temp[i].values,
        unicode: temp[i].unicode,
      };

      let graph;

      createGraphCard("pie", "piePictogram " + generatedCanvasId.toString(), "piePictogramMax" + generatedCanvasId.toString(), "piePictogramMin" + generatedCanvasId.toString(), "piePictogramAvg" + generatedCanvasId.toString())
      graph = KidChart('piePictogram', line, "piePictogram " + generatedCanvasId.toString());

      graphButtons("pie", graph, "piePictogramMax" + generatedCanvasId.toString(), "piePictogramMin" + generatedCanvasId.toString(), "piePictogramAvg" + generatedCanvasId.toString())
      generatedCanvasId++
    }
  });
}

function addPieTransitionListener(buttonId) {
  const button = document.getElementById(buttonId);
  button.addEventListener('click', (event) => {
    let temp = getDataJoined();
    if(typeof temp === 'boolean'){
      return;
    }
    document.getElementsByClassName("pieTransition ");
    for (let i = 0; i < temp.length; i++) {


      let line = {
        type: "pie",
        color: temp[i].colors,
        border: temp[i].border,
        labels: temp[i].labels,
        values: temp[i].values,
        unicode: temp[i].unicode,
      };

      let graph;

      createGraphCard("pie", "pieTransition " + generatedCanvasId.toString(), "pieTransitionMax" + generatedCanvasId.toString(), "pieTransitionMin" + generatedCanvasId.toString(), "pieTransitionAvg" + generatedCanvasId.toString())
      graph = KidChart('pieTransition', line, "pieTransition " + generatedCanvasId.toString());

      graphButtons("pie", graph, "pieTransitionMax" + generatedCanvasId.toString(), "pieTransitionMin" + generatedCanvasId.toString(), "pieTransitionAvg" + generatedCanvasId.toString())
      generatedCanvasId++
    }
  });
}

function addPieChartListener(buttonId) {
  const button = document.getElementById(buttonId);
  button.addEventListener('click', (event) => {
    let temp = getDataJoined();
    if(typeof temp === 'boolean'){
      return;
    }
    document.getElementsByClassName("pieChart ");
    for (let i = 0; i < temp.length; i++) {

      let line = {
        type: "pie",
        color: temp[i].colors,
        border: temp[i].border,
        labels: temp[i].labels,
        values: temp[i].values,
        unicode: temp[i].unicode,
      };

      let graph;

      createGraphCard("pie", "pieChart " + generatedCanvasId.toString(), "pieChartMax" + generatedCanvasId.toString(), "pieChartMin" + generatedCanvasId.toString(), "pieChartAvg" + generatedCanvasId.toString())
      graph = KidChart('pieChart', line, "pieChart " + generatedCanvasId.toString());

      graphButtons("pie", graph, "pieChartMax" + generatedCanvasId.toString(), "pieChartMin" + generatedCanvasId.toString(), "pieChartAvg" + generatedCanvasId.toString())
      generatedCanvasId++
    }
  });
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GRAPH RENDERING FUNCTION
function KidChart(typeOfChart, userData, canvasId) {
  //DEFAULT DATA VALUES
  var data = {
    labels: userData.labels,
    datasets: [
      {
        label: "Number of fruit",
        data: userData.values,
        backgroundColor: userData.color,
        borderColor: userData.border,
        borderWidth: 1,
      },
    ],
  };
  if (typeOfChart == "barPictogram" || typeOfChart == "piePictogram") {
    
    var data = {
      labels: userData.labels,
      datasets: [
        {
          label: "Type of fruit",
          data: userData.values,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderColor: userData.color,
          borderWidth: 5,
        },
      ],
    };
  }
  if (typeOfChart == "lineChart") {
    data = {
      labels: userData.labels,
      datasets: [
        {
          data: userData.values,
          fill: false,
          backgroundColor: userData.color,
          borderColor: userData.border,
        },
      ],
    };
  }
  if (typeOfChart == "linePictogram") {
    data = {
      labels: userData.labels,
      datasets: [
        {
          label: "bla",
          data: userData.values,
          fill: false,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderColor: "rgba(255, 255, 255, 0.1)",
        },
      ],
    };
  }
  //PLUGIN FOR EMOJI RENDERING
  const plugin = {
    id: "plugin",
    afterDatasetDraw(chart, args, options) {
      const {
        ctx,
        chartArea: { top, bottom, left, right, width, height },
        scales: { x, y },
      } = chart;
      ctx.save();
      if (
        typeOfChart == "piePictogram" ||
        typeOfChart == "pieTransition"
      ) {
        //CALCULATING WHICH PERCENTAGE OF PIE CHART EACH VALUE TAKES
        let angles = [];
        let sum = 0;
        for (let i = 0; i < userData.values.length; i++) {
          sum += userData.values[i];
        }
        for (let i = 0; i < userData.values.length; i++) {
          angles[i] = (userData.values[i] / sum) * 6.2831;
        }
        let current_angle = 4.71238898038 + angles[0] / 2;
        let max_width = 30;
        for (let i = 0; i < userData.values.length; i++) {
          let temp = Math.min(width / 3 / userData.values[i] - 5, 30);
          let size = temp;
          //DISABLING TOO SMALLL ICONS
          if (temp < 0) {
            size = Math.max(temp, 1);
            console.log("Icons don't fit on the chart.");
            userData.values[i] =
              ((width / 2 -
                Math.ceil(
                  Math.sqrt(0.5 * size * 0.5 * size + (max_width * max_width) / 4))) / 6) - 1;
          }
          let a = 0.5 * size * 0.5 * size;
          let b = max_width * max_width;
          let radius = (width / 2 - Math.ceil(Math.sqrt(a + b / 4)))-5;
          for (let j = 0; j < Math.floor(userData.values[i]); j++) {

            ctx.font = `${size}px Arial`;
            ctx.fillText(
              userData.unicode[i],
              radius * Math.cos(current_angle) + width / 2 - size / 2,
              radius * Math.sin(current_angle) + width / 2 + max_width / 2,
              max_width
            );
            radius -= size + 5;
          }
          current_angle += angles[i] / 2 + angles[i + 1] / 2;
        }
      }
      if (
        typeOfChart == "barTransition" ||
        typeOfChart == "barPictogram"
      ) {
        let size = (y.getPixelForValue(0) - y.getPixelForValue(1)) / 1.5;
        for (let i = 0; i < userData.values.length; i++) {
          for (let j = 0; j < Math.floor(userData.values[i]); j++) {
            ctx.font = `${size}px Arial`;
            ctx.fillText(
              userData.unicode[i],
              x.getPixelForValue(i) - size / 2,
              y.getPixelForValue(j + 1) + size / 0.87,
              size
            );
          }
        }
      }
      if (
        typeOfChart == "lineTransition" ||
        typeOfChart == "linePictogram"
      ) {


        let size = (y.getPixelForValue(0) - y.getPixelForValue(1)) / 1.7;
        for (let i = 0; i < userData.values.length; i++) {
          for (let j = 0; j < Math.floor(userData.values[i]); j++) {
            let between =
              y.getPixelForValue(0) -
              y.getPixelForValue(userData.values[i]);
            ctx.font = `${size}px Arial`;

            ctx.fillText(
              userData.unicode[0],
              x.getPixelForValue(i) - size / 2,
              y.getPixelForValue(j + 1) + size * 0.5,
              size
            );

          }
        }
      }
    },
  };


  let max = userData.values[0];
  for (let i = 0; i < userData.values.length; i++) {
    if (max < userData.values[i]) {
      max = userData.values[i];
    }
  }

  var display = false;
  var scales = {
    x: {
      ticks: {
        padding: 20,
        color: "#718096",
      },
    },
    y: {
      ticks: {
        stepSize: 1,
        padding: 20,
        color: "#718096",
      },
      beginAtZero: true,
      min: 0,
      max: parseFloat(max) + 1,
      drawBorder: true,
      grid: {
        color: (ctx) => {
          return 'rgba(0, 0, 0, 0.1)'
        },
      }
    }
  };

  if (typeOfChart == "pieChart" || typeOfChart == "pieTransition" || typeOfChart == "piePictogram") {
    display = true;
    scales =    {
      x: {
        display: false,
        grid: {
          display: false // Hide x-axis grid lines
        }
      },
      y: {
        display: false,
        grid: {
          display: false // Hide y-axis grid lines
        }
      }
    };
  }
  

  
  // config
  const config = {
    type: userData.type,
    data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: display,
        },
      },
      responsive: true,
      scales: scales
    },
    plugins: [plugin],
  };
  // render init block
  let canvas = document.getElementById(canvasId)
  const myKidChart = new Chart(
    canvas.getContext('2d'),
    config
  );

  return myKidChart;
}
export default {
  create_input_table
};
