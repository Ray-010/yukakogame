function setSlot(id, names) {
  slot_parent = document.getElementById(id);

  for(i=0; i<names.length; i++) {
    str = names[i].split(',')
    el = document.createElement("div");
    el.setAttribute('class', 'slot-element');
    name_element = ""
    if(str[1]=="ゆ") name_element="yukako"; 
    if(str[1]=="ま") name_element="mayuri"; 
    if(str[1]=="り") name_element="ririka";

    el.setAttribute('class', name_element);
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
  return cloneArray
}

names = ["ゆかこ", "まゆり", "りりか"]
slot1_names = shuffleArray(["ゆ,ゆ", "ま,ま", "り,り"]);
slot2_names = shuffleArray(["か,ゆ", "ゆ,ま", "り,り"]);
slot3_names = shuffleArray(["こ,ゆ", "り,ま",  "か,り"]);

slot_comment = document.getElementById("comment");

setSlot("slot1", slot1_names);
setSlot("slot1", slot1_names);
setSlot("slot2", slot2_names);
setSlot("slot2", slot2_names);
setSlot("slot3", slot3_names);
setSlot("slot3", slot3_names);

function judge_result(){};
class YukakoGameSlot {
  constructor(stop_id, slot_id) {
    this.done = false;
    this.stop_btn = document.querySelector(stop_id);
    this.slot = document.querySelector(slot_id);
    this.machine = new SlotMachine(this.slot, {
      active: 3,
      delay: 150,
      randomize() {
        return Math.floor(Math.random()*3);
      }
    });
    this.stop_btn.addEventListener("click", ()=>{
      this.machine.stop();
      this.done = true;
      judge_result();
    })
  }
}

const slot1 = new YukakoGameSlot("#STOP1", "#slot1", "");
const slot2 = new YukakoGameSlot("#STOP2", "#slot2");
const slot3 = new YukakoGameSlot("#STOP3", "#slot3");

slot_done = false;
have_points = document.getElementById("points");

function judge_result() {
  if(slot_done && slot1.done && slot2.done && slot3.done) {
    result1 = slot1.machine.visibleTile
    result2 = slot2.machine.visibleTile
    result3 = slot3.machine.visibleTile
    result1++;
    result2++;
    result3++;
    if(result1>slot1_names.length-1) result1 = 0;
    if(result2>slot2_names.length-1) result2 = 0;
    if(result3>slot3_names.length-1) result3 = 0;

    s1_result = slot1_names[result1].split(',')[0]
    s2_result = slot2_names[result2].split(',')[0]
    s3_result = slot3_names[result3].split(',')[0]

    result = s1_result+s2_result+s3_result;

    console.log(result);
    
    result_comment = ""
    if(result == "ゆかこ") {
      have_points.textContent = Number(have_points.textContent)+15;
      result_comment = "ゆかこー！！！！！！！！！！！"
    } else if(result == "りりか") {
      have_points.textContent = Number(have_points.textContent)+5;
      result_comment = "りりか";
    } else if(result == "まゆり") {
      have_points.textContent = Number(have_points.textContent)+5;
      result_comment = "まゆり";
    } else if(result == "ゆかり") {
      have_points.textContent = Number(have_points.textContent)-10;
      result_comment = "誰よゆかりって！！マイナス10にしちゃう！";

    } else {
      result_comment = result;
    }
    slot_comment.textContent = result_comment;
    slot_done = false;
  }
}

const shuffle_btn = document.querySelector("#shuffle")
shuffle_btn.addEventListener("click", ()=>{
  if(!slot_done) {
    have_points.textContent = Number(have_points.textContent)-1;
  }
  slot_done = true;
  
  slot1.done = false;
  slot2.done = false;
  slot3.done = false;
  slot1.machine.shuffle(9999999);
  slot2.machine.shuffle(9999999);
  slot3.machine.shuffle(9999999);
})
