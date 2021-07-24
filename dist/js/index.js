import listControl from "./listControl.js";
import instanceProgress from "./progress.js";
import drag from "./drag.js";
(function (player) {
  class MusicPlyer {
    constructor(dom) {
      this.wrap = dom;
      this.dataList = [];
      this.rotateTimer = null;
      this.index = null;
      this.list = null;
      this.curIndex = null;
      this.deg = 0;
      this.progress = instanceProgress();
      this.drag = drag(document.querySelector(".circle"));
    }

    getDom() {
      this.record = document.querySelector("songImg, img");
      this.controlBtns = document.querySelectorAll(".control li");
    }
    async getData(url) {
      const data = await (await fetch(url)).json();
      this.dataList = data;
      this.index = new player.controlIndex(data.length);

      //listControl(this.dataList, this.wrap);
      this.listPlay(this.index.index);
      this.loadMusic(this.index.index);
      this.musicControl();
      this.dragProgress();
    }

    loadMusic(index) {
      player.render(this.dataList[index]);
      player.music.load(this.dataList[index].audioSrc);
      if (player.music.status == "play") {
        player.music.play();
        this.progress.move(0); //切歌时重新加载进度条
      }
      this.list.changeSelect(index);
      this.progress.renderAllTime(this.dataList[index].duration);
      player.music.ended(() => {
        this.loadMusic(this.index.next());
      });
    }
    musicControl() {
      //上一曲
      this.controlBtns[1].addEventListener("touchend", () => {
        player.music.status = "play";
        this.controlImg(this.deg);
        this.loadMusic(this.index.prev());
      });
      //开始，暂停
      this.controlBtns[2].addEventListener("touchend", () => {
        if (player.music.status == "play") {
          player.music.pause();
          this.controlBtns[2].className = "";
          this.stopRatote();
          this.progress.stop();
        } else {
          player.music.play();
          const deg = this.record.dataset.r || 0;
          this.controlImg(deg);
          this.progress.move();
        }
      });
      //下一曲
      this.controlBtns[3].addEventListener("touchend", () => {
        player.music.status = "play";
        this.controlImg(this.deg);
        this.loadMusic(this.index.next());
      });
    }
    //图片旋转
    imgRotate(deg) {
      this.stopRatote();
      this.rotateTimer = setInterval(() => {
        deg = +deg + 0.2;
        this.record.style.transform = `rotate(${deg}deg)`;
        this.record.dataset.r = deg;
      }, 1000 / 60);
    }
    stopRatote() {
      clearInterval(this.rotateTimer);
    }
    controlImg(deg) {
      this.controlBtns[2].className = "playing";

      this.imgRotate(deg);
    }
    //列表切歌
    listPlay(index) {
      this.list = listControl(this.dataList, this.wrap);
      this.controlBtns[4].addEventListener("touchend", () => {
        this.list.slideUp();
      });
      this.list.musicList.forEach((ele, index) => {
        ele.addEventListener("touchend", () => {
          player.music.status = "play";
          this.index.index = index; //更新索引值，防止列表和和歌曲对不上
          this.loadMusic(index);
          this.controlImg(this.deg);
          this.list.slideDown();
        });
      });
    }
    dragProgress() {
      this.drag.init();
      this.drag.start = () => {
        this.progress.stop();
        player.music.pause();
      };
      this.drag.move = (pre) => {
        this.progress.update(pre);
      };
      this.drag.end = (pre) => {
        const curTime = pre * this.dataList[this.index.index].duration;
        player.music.timeTo(curTime);
        player.music.play();
        this.progress.move(pre);
        this.controlBtns[2].className = "playing";
        const deg = this.record.dataset.r || 0;
        this.controlImg(deg);
      };
    }
    init() {
      this.getDom();
      this.getData("../mock/data.json");
    }
  }
  const musicPlyer = new MusicPlyer(document.getElementById("wrap"));
  musicPlyer.init();
})(window.player);
