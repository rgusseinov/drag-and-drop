const cardMarkup = (cardItems) => {
  const cardItemMarkup = cardItems
    .map((cardItem) => `<div class="card__item">${cardItem}</div>`)
    .join("");
  return `<div class="card__header todo">
						<div class="card__label">Todo</div>
						<span class="card__meta">(${cardItems.length})</span>
					</div>
					<div class="card__lists">${cardItemMarkup}</div>`;
};

class dragAndDrop {
  constructor(selector, options) {
    this.$el = document.querySelector(selector);
    this.$cardItems = options.cardItems || [];
    this.draggableElement = null;
    this.cardItemElements = null;

    this.render();
    this.setup();
  }

  render() {
    this.$el.insertAdjacentHTML("afterbegin", cardMarkup(this.$cardItems));
  }

  setup() {
    this.cardItemElements = this.$el.querySelectorAll(
      ".card__lists .card__item"
    );

    this.cardItemElements.forEach((cardItem) => {
      cardItem.draggable = true;
      cardItem.addEventListener("dragstart", this.handleDragStart.bind(this));

      cardItem.addEventListener("dragover", this.handleDragOver.bind(this));
      cardItem.addEventListener("dragenter", this.handleDragEnter.bind(this));
      cardItem.addEventListener("dragleave", this.handleDragLeave.bind(this));

      cardItem.addEventListener("dragend", this.handleDragEnd.bind(this));
      cardItem.addEventListener("drop", this.handleDrop.bind(this));
    });
  }

  handleDragStart(e) {
    e.target.classList.add("selected");
    this.draggableElement = e.target;
  }

  handleDragOver(e) {
    e.preventDefault();

    if (this.$el.querySelector(".card__lists .selected") == null) {
      e.target.classList.remove("over");
      return;
    }

    const activeElement = this.$el.querySelector(".card__lists .selected");
    const currentElement = e.target;

    const nextElement =
      currentElement === activeElement.nextElementSibling
        ? activeElement.nextElementSibling
        : currentElement;

    this.$el
      .querySelector(".card__lists")
      .insertBefore(activeElement, nextElement);

    return false;
  }

  handleDragEnter(e) {
    e.target.classList.add("over");
  }

  handleDragLeave(e) {
    e.target.classList.remove("over");
  }

  handleDragEnd() {
    this.clearSelection();
  }

  handleDrop(e) {
    e.stopPropagation();

    const isMoveable =
      this.draggableElement !== this.$el.querySelector(".card__lists .over") &&
      this.$el.querySelector(".card__lists .selected");

    if (!isMoveable) {
      this.clearSelection();
      return;
    }

    const bufferDraggable = this.draggableElement.innerHTML;
    this.draggableElement.innerHTML =
      this.$el.querySelector(".card__lists .over").innerHTML;
    this.$el.querySelector(".card__lists .over").innerHTML = bufferDraggable;

    this.clearSelection();
    return false;
  }

  clearSelection() {
    this.cardItemElements.forEach((cardItem) => {
      cardItem.classList.remove("over");
      cardItem.classList.remove("selected");
    });
  }
}

export default dragAndDrop;
