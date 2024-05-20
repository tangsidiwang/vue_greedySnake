<script setup>
  import {reactive,onMounted,toRef} from "vue"//引入reactive响应式数据，provide全局传递
  import { userWebStore } from "./stores/wbe.js";//引入全局数据
  const snakes = reactive({//响应式
    snake: [],
    startput: false,
    snake_jie:[],
    stopput: false,
    score: 0,

    run_x: 0,
    run_y: 1,
    length:5,
    length_:5,
    vist:5,
  })
 
  const web =userWebStore()

  const generateGrid=(rows,cols)=>{
      const grid = [];
      for (let row = 0; row < rows; row++) {
        const rowData = [];
        for (let col = 0; col < cols; col++) {
          // 在这里可以根据需要设置初始值
          rowData.push({snakeHead: false, snakeBody: false, food: false});
        }
        grid.push(rowData);
      }
      return grid;
    }
  const run=(x,y)=>{
    if(snakes.startput==false){
      return;
    }
    const grid = toRef(snakes, 'snake');
    const snake_jie = toRef(snakes, 'snake_jie'); 
    let snakehead =snake_jie.value[0];
    if( snake_jie.value[0][0]+x<=grid.value.length-1 && snake_jie.value[0][0]+x>=0 && snake_jie.value[0][1]+y<=grid.value[0].length-1 && snake_jie.value[0][1]+y>=0){
      snakehead = [snake_jie.value[0][0]+x,snake_jie.value[0][1]+y];//如果蛇头在边界内，蛇头向下走
    }else{
      if(x==1)  {snakehead = [0,snake_jie.value[0][1]];}
      if(x==-1) {snakehead = [grid.value.length-1,snake_jie.value[0][1]];}
      if(y==1)  {snakehead = [snake_jie.value[0][0],0];}
      if(y==-1) {snakehead = [snake_jie.value[0][0],grid.value[0].length-1];}
    }//如果蛇头在边界外，蛇头变成对面计算值
    if(grid.value[snakehead[0]][snakehead[1]].snakeBody==true && snake_jie.value[snake_jie.value.length-1][0] != snakehead[0]&&snake_jie.value[snake_jie.value.length-1][1] != snakehead[1]){//如果蛇头走到蛇身上
      console.log(snake_jie.value[snake_jie.value.length-1]);
      console.log("分割");
      console.log(snakehead);
      stop();
      console.log("game over")
      return;
    }
    if(grid.value[snakehead[0]][snakehead[1]].food==true){//如果蛇头走到食物上
      sankeAdd();
      foodAdd();
      scoreAdd();
      grid.value[snakehead[0]][snakehead[1]].food=false;
    }
    grid.value[snake_jie.value[snake_jie.value.length-1][0]][snake_jie.value[snake_jie.value.length-1][1]].snakeBody = false;//蛇尾变成false
    grid.value[snake_jie.value[0][0]][snake_jie.value[0][1]].snakeHead = false;//老蛇头变成false
    for(let i=snake_jie.value.length-1;i>0;i--){
      snake_jie.value[i] = snake_jie.value[i-1];//蛇身体跟着蛇头走
    }

    snake_jie.value[0] = snakehead;
    for(let i=0;i<snake_jie.value.length;i++){
      grid.value[snake_jie.value[i][0]][snake_jie.value[i][1]].snakeBody = true;//蛇头走过的地方变成true
    }
    grid.value[snake_jie.value[0][0]][snake_jie.value[0][1]].snakeHead = true;//新蛇头变成true
  }
  const scoreAdd=()=>{
    snakes.score++;
    if(snakes.score>web.web.score_max)web.web.score_max=snakes.score
  }
  const sankeAdd=()=>{
    const grid = toRef(snakes, 'snake');
    const snake_jie = toRef(snakes, 'snake_jie'); 
    // const x = snake_jie.value[snake_jie.value.length-1][0]-snake_jie.value[snake_jie.value.length-2][0];
    // const y = snake_jie.value[snake_jie.value.length-1][1]-snake_jie.value[snake_jie.value.length-2][1];
    // snake_jie.value.push([snake_jie.value[snake_jie.value.length-1][0]+x,snake_jie.value[snake_jie.value.length-1][1]+y]);
    // grid.value[snake_jie.value[snake_jie.value.length-1][0]][snake_jie.value[snake_jie.value.length-1][1]].snakeBody = true;
    snake_jie.value.push([snake_jie.value[snake_jie.value.length-1][0],snake_jie.value[snake_jie.value.length-1][1]]);
    grid.value[snake_jie.value[snake_jie.value.length-1][0]][snake_jie.value[snake_jie.value.length-1][1]].snakeBody = true;
  }
  const foodAdd=()=>{
  const grid = toRef(snakes, 'snake');
  const ssss = 1;
  while(ssss){
    const x = getRandomInt(grid.value.length-1);
    const y = getRandomInt(grid.value[0].length-1);
    if(grid.value[x][y].snakeBody==false && grid.value[x][y].snakeHead==false && grid.value[x][y].food==false){
      grid.value[x][y].food = true;
      console.log(x,y)
      break;
    }
  }
  }
  function getRandomInt(x) {
  return Math.floor(Math.random() * (x + 1));
  }
  const start=()=>{
    window.removeEventListener('keydown', KeyAny);
    document.getElementById("myElement").classList.remove("blur");
    stopTimer();
    snakes.stopput = false;
    
    snakes.score=0;
    snakes.length=snakes.length_
    snakes.snake = generateGrid(snakes.length,snakes.length );
    runsaid(0,1);
    snakes.snake_jie = [];
    snakes.snake[Math.floor(snakes.length/2)][Math.floor(snakes.length/2)].snakeBody = true;
    snakes.snake[Math.floor(snakes.length/2)][Math.floor(snakes.length/2)].snakeHead = true;
    snakes.snake[Math.floor(snakes.length/2)][Math.floor(snakes.length/2)-1].snakeBody = true;
    snakes.snake_jie.push([Math.floor(snakes.length/2),Math.floor(snakes.length/2)]);
    snakes.snake_jie.push([Math.floor(snakes.length/2),Math.floor(snakes.length/2)-1]);
    console.log(snakes.snake_jie.length)
    foodAdd();
    window.addEventListener('keydown', KeyAny);
    
  }

  const stop=()=>{
    snakes.startput = false;
    document.getElementById("myElement").classList.add("blur");
    snakes.stopput = true;
    window.removeEventListener('keydown', KeyPress);
    stopTimer();
  }
  const KeyPress=(e)=>{
    if((e.key=="ArrowDown" || e.code=='KeyS')&&(snakes.snake_jie[0][0]-snakes.snake_jie[1][0])!=-1){
      runsaid(1,0);
    }
    if((e.key=="ArrowUp" || e.code=='KeyW')&&(snakes.snake_jie[0][0]-snakes.snake_jie[1][0])!=1){
      runsaid(-1,0);
    }
    if((e.key=="ArrowRight"|| e.code=='KeyD')&&(snakes.snake_jie[0][1]-snakes.snake_jie[1][1])!=-1){
      runsaid(0,1);
    }e.code=='KeyS'
    if((e.key=="ArrowLeft"||e.code=='KeyA')&&(snakes.snake_jie[0][1]-snakes.snake_jie[1][1])!=1){
      runsaid(0,-1);
    }
  }
  const KeyAny=(e)=>{
    if(e.code)
    {
      startTimer();
      window.addEventListener('keydown', KeyPress);
      window.removeEventListener('keydown', KeyAny);
      snakes.startput = true;
    }
  }
  const runsaid=(x,y)=>{
    const xx=toRef(snakes, 'run_x');
    const yx=toRef(snakes, 'run_y');
    xx.value=x;
    yx.value=y;
  }
  const sub_length=()=>{
    if(snakes.length_>2)snakes.length_--;
  }
  const plus_length=()=>{
    if(snakes.length_<15)snakes.length_++;
  }
  const sub_vist=()=>{
    if(snakes.vist>1)snakes.vist--;
  }
  const plus_vist=()=>{
    if(snakes.vist<10)snakes.vist++;
  }
  let timerId = null;
  function startTimer() {
    timerId = setInterval(function() {
 
      run(snakes.run_x,snakes.run_y);
    }, 210-snakes.vist*20); // 每秒执行一次
  }

  function stopTimer() {
    clearInterval(timerId);
    console.log("定时器已停止");
  }
  onMounted(() => {
    console.log("mounted")
    snakes.snake = generateGrid(snakes.length,snakes.length);
    
    window.addEventListener('keydown', KeyAny);
    console.log(snakes.snake.length)
    console.log(snakes.snake_jie.length)
    start();
  })
    
</script>
<template>
  
  <div class="container">
    <div>
      <div class="heng">score<div class="score">{{ snakes.score }}</div></div>
      <div class="heng">score_max<div class="score">{{ web.web.score_max }}</div></div>
      <div class="heng">
        size
        <td>
          <button @click="sub_length()">-</button>
          {{snakes.length_}}
          <button @click="plus_length()">+</button>
        </td>
      </div>
      <div class="heng">
        vist
        <td>
          <button @click="sub_vist()">-</button>
          {{snakes.vist}}
          <button @click="plus_vist()">+</button>
        </td>
      </div>
      <div class="heng">
        <button @click="start">确定</button>
      </div>
    </div>
    <div class="chang" id="myElement">  
      <tr v-for="(row, rowIndex) in snakes.snake" :key="rowIndex" >
        <td v-for="(cell, colIndex) in row" :key="colIndex" class="kuai_wai" :style="{ width: 400/snakes.length + 'px' ,height:400/snakes.length + 'px'}">
          <div :class="{'kuai_nei': (!cell.snakeBody&&!cell.food), 'kuai_she': (cell.snakeBody && !cell.snakeHead),'kuai_head': cell.snakeHead,'kuai_food':cell.food}" :style="{ width: 400/snakes.length + 'px' ,height:400/snakes.length + 'px',borderRadius:5-snakes.length/5+'px'}"></div>
        </td>
      </tr>
    </div> 
      
  </div>
  <div class="game-over" v-if="snakes.stopput">
    <h2>GAME OVER</h2>
    <p>本次得分：{{snakes.score}}</p> <!-- 使用相应的数据来显示分数 -->
    <button class="restart-button" @click="start"> 重新开始</button>
  </div>

  <div class="cong" v-if="!snakes.startput && !snakes.stopput">push KeyAny</div>
</template>


<style  scoped>
.heng
{
  display: flex;
  justify-content: right;
}
.cong
{
  display: flex;/* 设置为弹性布局 */
  justify-content: center; /* 水平居中 */
}
.container {
   
  display: flex;/* 设置为弹性布局 */

  align-items: center;/* 垂直居中 */
  justify-content: center; /* 水平居中 */
}
.score {
    /* margin-right:-200px; */
    width: 30px;
    height: 20px;
    text-align: center;
    background-color: lightblue; /* 设置背景颜色 */
    border:black solid 1px;/* 设置边框 */ 
    border-radius: 5px;
}

.chang{

/* margin: 10px; */
/* margin: 0 auto;
text-align: center; */

width: 400px;/* 宽度 */
height: 400px;/* 高度 */
border: 1px solid #e5ef63;/* 边框 */
background-color:rgb(245, 235, 149);/* 背景颜色 */
}
.kuai_wai{
  
  width: 50px;
  height: 50px;
  margin: 10px;/* 外边距 */
  border: 1px solid #474b02;
  background-color:#474b02;
  padding: 0px;
}
.kuai_nei{
  width: 50px;
  height: 50px;
 
  border: 0px solid #474b02;
  background-color:rgb(245, 235, 149);
  /* border-radius: 5px; */
}
.kuai_she{
  width: 50px;
  height: 50px;
  border: 0px solid #474b02;
  background-color:#474b02;
  /* border-radius: 5px; */
}
.kuai_head{
  width: 50px;
  height: 50px;
  border: 0px solid #474b02;
  background-color:#0bed1a;
  /* border-radius: 5px; */
}
.kuai_food{
  width: 50px;
  height: 50px;
  border: 0px solid #474b02;
  background-color:#ff0000;
  /* border-radius: 5px; */
}

.blur {
  filter: blur(10px); /* 调整模糊的值适应你的需求 */
}

.game-over {
  
  position: fixed;/* 固定定位 */
  top: 50%;/* 距离顶部50% */
  left: 50%;/* 距离左侧50% */
  transform: translate(-50%, -50%);/* 使元素居中 */
  z-index: 9999;/* 确保元素在最上层 */
  background-color: rgba(0, 0, 0, 0.8); /* 调整背景颜色和透明度适应你的需求 */
  color: white;/* 文本颜色 */
  padding: 20px;/* 内边距 */
  text-align: center;/* 文本居中 */
  font-size: 24px;/* 文本大小 */
}

.restart-button {
  display: inline-block;
  background-color: #4CAF50; /* 调整按钮的颜色适应你的需求 */
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 4px;
  cursor: pointer;
}

.restart-button:hover {
  background-color: #45a049; /* 调整按钮的颜色适应你的需求 */
}

</style>