(function (root) {
  class AudioMange {
    constructor() {
      this.audio = new Audio();
      this.status = "pause";
    }
    load(src) {
      this.audio.src = src;
      this.audio.load();
    }
    play() {
      this.audio.play();
      this.status = "play";
    }
    pause() {
      this.audio.pause();
      this.status = "pause";
    }
    ended(fn) {
      //播放完成后的回调函数；
      this.audio.onended = fn;
    }
    timeTo(time) {
      this.audio.currentTime = time;
    }
  }
  root.music = new AudioMange();
})(window.player || (window.player = {}));
