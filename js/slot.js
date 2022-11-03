slot_names = ["ゆかこ", "まゆり", "りりか"];
names_have_points = ["ゆかこ", "まゆり", "りりか", "ゆかり"];
points = {
  "ゆかこ":15, 
  "まゆり":5, 
  "りりか":5, 
  "ゆかり":-10,
};

messages = {
  "ゆかこ": "ゆかこー！！！！！！！！！！！",
  "ゆかり": '誰よ"ゆかり"って！！マイナス10にしちゃう！',
  "りりか": 'りりか',
  'まゆり': 'まゆり',
};

slot_comment = document.getElementById("comment");
have_points = document.getElementById("points");
rolled_num = document.getElementById("rolledNum");
slot_done = false;
len_slot = slot_names.length;
shuffle_available = true;

function judge_result(){};
class YukakoGameSlot {
  constructor(stop_id, slot_id) {
    this.done = false;
    this.stop_btn = document.querySelector(stop_id);
    this.slot = document.querySelector(slot_id);
    this.machine = new SlotMachine(this.slot, {
      active: 0,
      delay: 200,
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

const slot1 = new YukakoGameSlot("#STOP1", "#slot1");
const slot2 = new YukakoGameSlot("#STOP2", "#slot2");
const slot3 = new YukakoGameSlot("#STOP3", "#slot3");

function get_result(names){
  for(let i=0;i<names.length; i++) {
    if(names_have_points.includes(names[i][0])) 
      return [names[i][0], points[names[i][0]], messages[names[i][0]], names[i][1]];
  }
  return [names[0][0], 0, names[0][0], [-1,-1,-1]];
}

function judge_yoko(num1, num2, num3) {
  first_yoko = slot1_names[num1++].split(",")[0] + slot2_names[num2++].split(",")[0] + slot3_names[num3++].split(",")[0];
  second_yoko = slot1_names[num1++].split(",")[0] + slot2_names[num2++].split(",")[0] + slot3_names[num3++].split(",")[0];
  third_yoko = slot1_names[num1].split(",")[0] + slot2_names[num2].split(",")[0] + slot3_names[num3].split(",")[0];

  return [[second_yoko, [num1-1,num2-1,num3-1]], [first_yoko, [num1-2,num2-2,num3-2]] , [third_yoko,[num1,num2,num3]]];
}
function judge_cross(num1, num2, num3) {
  num2_cross = num2+1;
  num3_cross = num3+2;
  cross1 = slot1_names[num1].split(",")[0] + slot2_names[num2_cross].split(",")[0] + slot3_names[num3_cross].split(",")[0]
  
  num1_cross = num1+2;
  num2_cross = num2+1;
  cross2 = slot1_names[num1_cross].split(",")[0] + slot2_names[num2_cross].split(",")[0] + slot3_names[num3].split(",")[0]
  return [[cross1,[num1,num2_cross,num3_cross]], [cross2,[num1_cross,num2_cross,num3]]];
}

function judge_result() {
  if(slot_done && slot1.done && slot2.done && slot3.done) {
    // スロットの見える所の一番上の要素番号
    result1 = slot1.machine.visibleTile;
    result2 = slot2.machine.visibleTile;
    result3 = slot3.machine.visibleTile;

    yokos = judge_yoko(result1, result2, result3);
    cross = judge_cross(result1, result2, result3);
    result = get_result(yokos.concat(cross));
    
    change_back(++result[3][0], ++result[3][1], ++result[3][2]);
    
    console.log(result);

    have_points.textContent = Number(have_points.textContent) + result[1];
    slot_comment.textContent = result[2];

    slot_done = false;
  }
}

function change_back(s1, s2, s3) {
  if(s1!=0){
    let rolled_slot1 = document.getElementById("slot1");
    rolled_slot1.children[0].setAttribute("id", "slot1_ch");
    let slot1_children = document.getElementById("slot1_ch");
  
    let rolled_slot2 = document.getElementById("slot2");
    rolled_slot2.children[0].setAttribute("id", "slot2_ch");
    let slot2_children = document.getElementById("slot2_ch");
    
    let rolled_slot3 = document.getElementById("slot3");
    rolled_slot3.children[0].setAttribute("id", "slot3_ch");
    let slot3_children = document.getElementById("slot3_ch");

    function change_backs() {
      counter = 0
      const timerID = setInterval(function() {
        slot1_children.children[s1].classList.toggle("selected");
        slot2_children.children[s2].classList.toggle("selected");
        slot3_children.children[s3].classList.toggle("selected");
        if(++counter>7) {
          clearInterval(timerID);
          shuffle_available = true;
        }
      }, 150);
    }
    setTimeout(change_backs, 600);
  } else {
    shuffle_available = true;
  }
}

function shuffle_all() {
  if(shuffle_available) {
    shuffle_available = false;
    if(!slot_done) {
      rolled_num.textContent = Number(rolled_num.textContent) +1;
      have_points.textContent = Number(have_points.textContent)-1;
    }
    slot_done = true;
    
    slot1.done = false;
    slot2.done = false;
    slot3.done = false;
    slot1.machine.shuffle(9999999);
    slot2.machine.shuffle(9999999);
    slot3.machine.shuffle(9999999);
  }
}

const shuffle_btn = document.querySelector("#shuffle")
shuffle_btn.addEventListener("click", ()=>{
  shuffle_all();
});

document.addEventListener('keydown', (e) =>{
  if(e.code == "Space") {
    shuffle_all();
  } else if (e.code =="KeyJ"){
    slot1.machine.stop();
    slot1.done = true;
    judge_result();
  }else if (e.code =="KeyK"){
    slot2.machine.stop();
    slot2.done = true;
    judge_result();
  }else if (e.code =="KeyL"){
    slot3.machine.stop();
    slot3.done = true;
    judge_result();
  }
});
