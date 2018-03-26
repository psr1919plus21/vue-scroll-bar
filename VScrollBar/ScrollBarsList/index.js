import ScrollBar from './ScrollBar';

export default class ScrollBarsList {
  constructor() {
    this.list = [];
  }

  _get(el) {
    return this.list.find((scrollBar) => scrollBar.scrollWrap === el);
  }

  add() {
    this.list.push(new ScrollBar(...arguments));
  }

  update(el) {
    const scrollBar = this._get(el);
    scrollBar.update();
  }

  remove(el) {
    const scrollBar = this._get(el);
    const scrollBarIndex = this.list.indexOf(scrollBar);

    scrollBar.destroy();
    
    delete this.list[scrollBarIndex];
    this.list.splice(scrollBarIndex, 1);
  }
}
