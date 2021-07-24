(function (root) {
  class Index {
    constructor(len) {
      this.index = 0;
      this.len = len;
    }
    prev() {
      return this.getIndex(-1);
    }
    next() {
      return this.getIndex(1);
    }
    getIndex(val) {
      this.index = (this.index + val + this.len) % this.len;
      return this.index;
    }
  }
  root.controlIndex = Index;
})(window.player || (window.player = {}));
