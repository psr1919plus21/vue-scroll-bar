import './ScrollBar.css';

export default class ScrollBar {
  constructor({ el, styles, noHide }) {
    // Bind all methods
    Object.getOwnPropertyNames(this.__proto__).forEach((method) => this[method] = this[method].bind(this));

    this.styles = Object.assign({
      top: 5,
      right: 5,
      bottom: 5,
      width: 7,
      className: ''
    }, styles);

    this.scrollWrap = el;
    this.scrollBar = document.createElement('div');
    this.scrollWrap.insertBefore(this.scrollBar, this.scrollBar.firstChild);

    this.scrollWrap.classList.add('v-scroll-bar-wrap');
    this.scrollBar.classList.add('v-scroll-bar');

    if (noHide) this.scrollBar.classList.add('v-scroll-bar_no-hide');
    if (this.styles.className) this.scrollBar.classList.add(this.styles.className);

    this._setScrollBarStyles({
      'width': `${this.styles.width}px`,
      'top': `${this.styles.top}px`,
      'right': `${this.styles.right}px`,
      'bottom': `${this.styles.bottom}px`
    });

    this.scrollWrap.addEventListener('wheel', this.scrollOnWheel);
    this.scrollWrap.addEventListener('touchstart', this.onTouchStart);
    this.scrollWrap.addEventListener('scroll', this.update);
    this.scrollBar.addEventListener('mousedown', this.onDragStart);
    window.addEventListener('resize', this.update);

    this.update();
  }

  _setScrollBarStyles(styles) {
    for (const prop in styles) {
      const oldVal = this.scrollBar.style[prop];
      const newVal = styles[prop];
      if (newVal !== oldVal) {
        this.scrollBar.style[prop] = newVal;
      }
    }
  }

  update() {
    const sliderHeight = (this.scrollBar.clientHeight * this.scrollWrap.clientHeight) / this.scrollWrap.scrollHeight;
    const sliderOffset = (this.scrollWrap.scrollTop * this.scrollBar.clientHeight) / this.scrollWrap.scrollHeight;

    this._setScrollBarStyles({
      'height': `${this.scrollWrap.clientHeight - this.styles.top - this.styles.bottom}px`,
      'top': `${this.scrollWrap.scrollTop + this.styles.top}px`,
      'padding-top': `${sliderOffset}px`,
      'padding-bottom': `${this.scrollBar.clientHeight - (sliderHeight + sliderOffset)}px`,
      'visibility': (this.scrollWrap.scrollHeight > this.scrollWrap.clientHeight) ? 'visible' : 'hidden'
    });
  }

  destroy() {
    this.scrollWrap.classList.remove('v-scroll-bar-wrap');

    this.scrollWrap.removeEventListener('wheel', this.scrollOnWheel)
    this.scrollWrap.removeEventListener('touchstart', this.onTouchStart);
    this.scrollBar.removeEventListener('mousedown', this.onDragStart);
    this.scrollWrap.removeEventListener('scroll', this.update);
    window.removeEventListener('resize', this.update);

    this.scrollWrap.removeChild(this.scrollBar);
    this.scrollBar = null;
    delete this.scrollWrap;
    delete this.scrollBar;
  }

  // Event listeners

  scrollOnWheel(e) {
    e.stopPropagation();
    e.preventDefault();
    this.scrollWrap.scrollTop += e.deltaY;
  }

  onDragStart(e) {
    // Отменяем выделение текста
    e.preventDefault();

    // Фиксируем точку начала драга
    this.dragStartOffset = e.pageY - (this.scrollBar.getBoundingClientRect().top + parseInt(this.scrollBar.style.paddingTop));

    document.addEventListener('mousemove', this.scrollOnDrag);
    document.addEventListener('mouseup', this.onDragEnd);
  }

  onDragEnd() {
    document.removeEventListener('mousemove', this.scrollOnDrag);
    document.removeEventListener('mouseup', this.onDragEnd);
  }

  scrollOnDrag(e) {
    const dragLength = e.pageY - this.scrollBar.getBoundingClientRect().top - this.dragStartOffset;
    this.scrollWrap.scrollTop = (dragLength * this.scrollWrap.scrollHeight) / this.scrollBar.clientHeight;
  }

  onTouchStart(e) {
    e.preventDefault();

    const { pageY } = e.touches[0];

    // Фиксируем точку начала движения пальца
    this.touchOffset = (e.target === this.scrollBar)
      ? pageY - (this.scrollBar.getBoundingClientRect().top + parseInt(this.scrollBar.style.paddingTop))
      : pageY;

    this.scrollWrap.addEventListener('touchmove', this.scrollOnTouchMove);
    this.scrollWrap.addEventListener('touchend', this.onTouchEnd);
  }

  onTouchEnd() {
    this.scrollWrap.removeEventListener('touchmove', this.scrollOnTouchMove);
    this.scrollWrap.removeEventListener('touchend', this.onTouchEnd);
  }

  scrollOnTouchMove(e) {
    e.preventDefault();
    e.stopPropagation();

    const { pageY } = e.touches[0];

    if (e.target === this.scrollBar) {
      // Если движение пальца по ползунку - крутим пропорционально в противоположную сторону
      const touchLength = pageY - this.scrollBar.getBoundingClientRect().top - this.touchOffset;
      this.scrollWrap.scrollTop = (touchLength * this.scrollWrap.scrollHeight) / this.scrollBar.clientHeight;
    } else {
      // Если по контенту - крутим попиксельно вдоль движения пальца
      this.scrollWrap.scrollTop += this.touchOffset - pageY;
      this.touchOffset = pageY;
    }
  }
}
