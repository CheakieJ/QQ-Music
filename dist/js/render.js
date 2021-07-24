(function (root) {
  //渲染图片
  function renderImg(src) {
    root.blurImg(src);
    const img = document.querySelector(".songImg img");
    img.src = src;
  }
  //渲染音乐信息
  function renderInfo(data) {
    const songInfoChildren = document.querySelector(".songInfo").children;
    songInfoChildren[0].innerText = data.name;
    songInfoChildren[1].innerText = data.singer;
    songInfoChildren[2].innerText = data.album;
  }
  //渲染是否喜欢
  function renderisLike(data) {
    const lis = document.querySelectorAll(".control li");
    lis[0].className = data ? "liking" : "";
  }
  root.render = function (data) {
    renderImg(data.image);
    renderInfo(data);
    renderisLike(data.isLike);
  };
})(window.player || (window.player = {}));
