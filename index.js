import "./style.sass";

document.addEventListener("DOMContentLoaded", (event) => {
  let items = document.querySelectorAll(".card__lists .card__item");
  document.querySelector(".card__meta").innerHTML = "(" + items.length + ")";
  let draggableElement = null;

  function handleDragStart(e) {
    this.style.opacity = "0.4";
    this.classList.add("selected");

    draggableElement = e.target;
  }

  function handleDragEnd() {
    this.style.opacity = "1";
    clearSelection();
  }

  function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }
    if (document.querySelector(".card__lists .selected") === null) {
      e.target.classList.remove("over");
      return;
    }

    return false;
  }

  function handleDragEnter(e) {
    this.classList.add("over");
  }

  function handleDragLeave(e) {
    this.classList.remove("over");
  }

  function handleDrop(e) {
    e.stopPropagation();

    const isMoveable =
      draggableElement !== document.querySelector(".card__lists .over") &&
      document.querySelector(".card__lists .selected");
    if (!isMoveable) {
      clearSelection();
      return;
    }
    const bufferDraggable = draggableElement.innerHTML;
    draggableElement.innerHTML =
      document.querySelector(".card__lists .over").innerHTML;
    document.querySelector(".card__lists .over").innerHTML = bufferDraggable;

    clearSelection();
    return false;
  }

  items.forEach(function (item) {
    item.draggable = true;

    item.addEventListener("dragstart", handleDragStart);

    item.addEventListener("dragover", handleDragOver);
    item.addEventListener("dragenter", handleDragEnter);
    item.addEventListener("dragleave", handleDragLeave);

    item.addEventListener("dragend", handleDragEnd);
    item.addEventListener("drop", handleDrop);
  });

  function clearSelection() {
    items.forEach(function (item) {
      item.classList.remove("over");
      item.classList.remove("selected");
    });
  }
});
