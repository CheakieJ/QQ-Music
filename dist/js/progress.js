class Progress {
  constructor() {
    this.durTime = 0;
    this.startTime = 0;
    this.frameId = null;
    this.lastTime = null;
    this.init();
  }
  getDom() {
    this.curTime = document.querySelector(".curTime");
    this.circle = document.querySelector(".circle");
    this.frontBg = document.querySelector(".frontBg");
    this.totalTime = document.querySelector(".totalTime");
  }
  init() {
    this.getDom();
  }
  formatTime(time) {
    time = Math.round(time);
    let m = Math.floor(time / 60);
    let s = time % 60;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    return `${m}:${s}`;
  }
  renderAllTime(time) {
    this.durTime = time;
    time = this.formatTime(time);
    this.totalTime.innerHTML = time;
  }
  move(per) {
    cancelAnimationFrame(this.frameId);
    this.startTime = new Date().getTime();
    this.lastTime = per === undefined ? this.lastTime : per; //切歌时重新刷新进度条
    const frame = () => {
      const curTime = new Date().getTime();
      const per =
        this.lastTime + (curTime - this.startTime) / (this.durTime * 1000);
      if (per <= 1) {
        this.update(per);
      } else {
        this.stop();
      }
      this.frameId = requestAnimationFrame(frame);
    };
    frame();
  }
  update(per) {
    const time = this.formatTime(per * this.durTime);
    this.curTime.innerHTML = time;
    this.frontBg.style.width = per * 100 + "%";
    const l = this.circle.parentNode.offsetWidth * per;
    this.circle.style.transform = `translateX(${l}px)`;
  }
  stop() {
    cancelAnimationFrame(this.frameId);
    const stopTime = new Date().getTime();
    this.lastTime += (stopTime - this.startTime) / (this.durTime * 1000);
  }
}
function instanceProgress() {
  return new Progress();
}
export default instanceProgress;
