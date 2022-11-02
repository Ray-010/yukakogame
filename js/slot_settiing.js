function setSlot(id, names) {
  slot_parent = document.getElementById(id);
  for(i=0; i<names.length; i++) {
    str = names[i].split(',')
    el = document.createElement("div");
    name_element = ""
    if(str[1]=="ゆ") name_element="yukako"; 
    if(str[1]=="ま") name_element="mayuri"; 
    if(str[1]=="り") name_element="ririka";

    el.setAttribute('class', `${name_element} slot-element`);
    el.textContent = str[0];
    slot_parent.appendChild(el);
  }
}

const shuffleArray = (array) => {
  const cloneArray = [...array];
  for(let i=cloneArray.length-1; i>=0;i--) {
    let rand = Math.floor(Math.random()*(i+1));
    let tmpStorage = cloneArray[i];
    cloneArray[i] = cloneArray[rand];
    cloneArray[rand] = tmpStorage;
  }
  return cloneArray;
}

slot1_names = shuffleArray(["ゆ,ゆ", "ま,ま", "り,り"]);
copied_sl1 = [...slot1_names];
slot1_names = slot1_names.concat(copied_sl1);

slot2_names = shuffleArray(["か,ゆ", "ゆ,ま", "り,り"]);
copied_sl2 = [...slot2_names];
slot2_names = slot2_names.concat(copied_sl2);

slot3_names = shuffleArray(["こ,ゆ", "り,ま",  "か,り"]);
copied_sl3 = [...slot3_names];
slot3_names = slot3_names.concat(copied_sl3);

setSlot("slot1", slot1_names);
setSlot("slot2", slot2_names);
setSlot("slot3", slot3_names);
