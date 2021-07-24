function listControl(data, wrap) {
  const list = document.createElement("div"),
    dl = document.createElement("dl"),
    dt = document.createElement("dt"),
    close = document.createElement("div"),
    musicList = [];
  list.className = "list";
  dt.innerHTML = "播放列表";
  close.className = "close";
  close.innerHTML = "关闭";
  dl.appendChild(dt);
  data.forEach((ele, index) => {
    const dd = document.createElement("dd");
    dd.innerHTML = ele.name;
    musicList.push(dd);
    dl.appendChild(dd);
    dd.addEventListener("touchend", () => {
      changeSelect(index);
    });
  });
  changeSelect(0);
  list.appendChild(dl);
  list.appendChild(close);
  wrap.appendChild(list);
  close.addEventListener("touchend", () => {
    slideDown();
  });
  const disY = list.offsetHeight;
  list.style.transform = `translateY(${disY}px)`;
  function slideUp() {
    list.style.transition = ".3s";
    list.style.transform = `translateY(0px)`;
  }
  function slideDown() {
    list.style.transition = ".3s";
    list.style.transform = `translateY(${disY}px)`;
  }
  function changeSelect(index) {
    for (let ele of musicList) {
      ele.className = "";
    }
    musicList[index].className = "active";
  }
  return {
    slideDown,
    slideUp,
    musicList,
    changeSelect,
  };
}
export default listControl;
