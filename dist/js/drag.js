class Drag {
  constructor(dom) {
    this.obj = dom;
    this.startPointX = 0;
    this.startLeft = 0;
    this.percent = 0;
  }
  init() {
    this.obj.style.transform = `translateX(0)`;
    this.obj.addEventListener("touchstart", (e) => {
      this.startPointX = e.changedTouches[0].pageX;
      this.startLeft = parseFloat(this.obj.style.transform.split("(")[1]);
      this.start && this.start();
    });
    this.obj.addEventListener("touchmove", (e) => {
      this.pointX = e.changedTouches[0].pageX - this.startPointX;
      let l = this.pointX + this.startLeft;
      if (l < 0) {
        l = 0;
      } else if (l > this.obj.offsetParent.offsetWidth) {
        l = this.obj.offsetParent.offsetWidth;
      }
      this.obj.style.transform = `translate(${l}px)`;
      this.percent = l / this.obj.offsetParent.offsetWidth;
      this.move && this.move(this.percent);
      e.preventDefault();
    });
    this.obj.addEventListener("touchend", () => {
      this.end && this.end(this.percent);
    });
  }
}
export default function drag(obj) {
  return new Drag(obj);
}
