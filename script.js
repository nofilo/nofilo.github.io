var currentMusic = null;//可以重新声明
let accumulate = null; 
let answeredQuestions = []; // 全局数组用于记录已经回答过的题目

function startGame() {
  document.getElementById("start-button-container").style.display = "none";
  document.getElementById("container").style.display = "flex";
}

function funMusic(musicFile) {
  const audioContext = new AudioContext();
  const source = audioContext.createBufferSource();
  const gainNode = audioContext.createGain(); // 用于调整音量
  const filterNode = audioContext.createBiquadFilter(); // 创建滤波器节点

  // 加载音频文件
  fetch(musicFile)
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
    .then(audioBuffer => {
      source.buffer = audioBuffer;
      source.connect(gainNode);
      gainNode.connect(filterNode); // 连接到滤波器节点
      filterNode.connect(audioContext.destination); // 连接到音频输出
      source.start(0); // 开始播放
      // 设置音频播放速率为2倍
      source.playbackRate.value = 2;
    })
    .catch(error => console.error('Error loading audio file:', error));

  // 设置滤波器节点为高通滤波器，增强高频部分
  filterNode.type = 'highpass'; // 设置为高通滤波器
  filterNode.frequency.value = 2000; // 设置截止频率，调整这个值可以影响声音的尖锐度

  // 5秒后停止音乐
  setTimeout(function() {
    source.stop();
  }, 7000); // 5000毫秒 = 5秒
}

function playMusic(musicFile) {
currentMusic =new Audio(musicFile);
currentMusic.play(); 
}

function showImage(element) {
  var imageUrl = element.src;
  var imageAlt = element.alt;
  document.getElementById("expanded-image").src = imageUrl;
  document.getElementById("expanded-image").alt= imageAlt;
  document.getElementById("overlay").style.display = "block";
  document.querySelectorAll('.gallery-item').forEach(function(item) {
    if (item != element.parentNode) {
      item.style.display = 'none';
    }
  });
}

function checkAnswer() {
  const doorMusicPaths={
    '夜海的秘密': './music/夜海的秘密（阉割版）.MP3',
    '舞厅': './music/ダンスホール.mp3',
    '还愿': './music/还愿（阉割版）.MP3',
    '清醒记': './music/清醒记（阉割版）.MP3'
  }
  var answer = document.getElementById("answer-input").value.trim();
  var currentName = document.getElementById("expanded-image").alt;
  var musicPath = doorMusicPaths[currentName];
  // console.log(currentName)

  if(accumulate===0){
    alert('您已失去答题机会。')
  }else{
    if (answeredQuestions.includes(currentName)) {
      alert("该题目已经回答过，请尝试回答其他题目。");
      return;
    }
    answeredQuestions.push(currentName);
    console.log(answeredQuestions);

    if (answer === currentName) {
      // 根据回答次数更新积分
      if (answeredQuestions.length === 1) {
        score=1000;
      } else if (answeredQuestions.length === 2) {
        score=2000;
      } else if (answeredQuestions.length === 3) {
        score=3000;
      } else if (answeredQuestions.length === 4) {
        score=10000;
      }
      accumulate += score;
    }
    if(answer!==currentName){
      accumulate=0;
    }

    if (answer === currentName) {
      document.getElementById("result-message").innerText = `祝贺你！回答正确，赢得了${score}块钱！`;
      document.getElementById("result-message").style.display = "block";
      document.querySelector("button:nth-of-type(1)").style.display = "none";
      document.querySelector("button:nth-of-type(2)").style.display = "block";
      document.querySelector("button:nth-of-type(3)").style.display = "block";
    } else {
      document.getElementById("result-message").innerText = `不好意思，您的答案错误。正确答案是"${correctAnswer}"。您的奖金清零。`;
      document.getElementById("result-message").style.display = "block";
      document.querySelector("button:nth-of-type(1)").style.display = "none";
      document.querySelector("button:nth-of-type(2)").style.display = "block";
      document.querySelector("button:nth-of-type(3)").style.display = "block";
    }

    playMusic(musicPath)
    }
}


function leave() {
  // console.log(accumulate);
  // console.log(currentMusic);
  if (currentMusic !== null) {
    currentMusic.pause();
    currentMusic = null;
  }
  document.getElementById("overlay").style.display = "none";
  document.getElementById("result-message").style.display = "none";
  document.querySelectorAll('.gallery-item').forEach(function(item) {
    item.style.display = 'block';
  });
}

function claimPrize() {
  alert(`您现在累计获奖金额是${accumulate}元`)
}

function showCongratulations() {
  document.getElementById("container").style.display = "none";
  document.getElementById("Congratulations-page").style.display = "flex";
  const prizeAmountElement = document.getElementById('prize-amount');
  if(accumulate===null){
    accumulate=0
  }
  prizeAmountElement.textContent = accumulate;
}

function reset(){
  document.getElementById("Congratulations-page").style.display = "none";
  document.getElementById("start-button-container").style.display = "flex";
}
