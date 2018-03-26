import ScrollBarsList from './ScrollBarsList/';

const install = (Vue, options = {}) => {
  const scrollBars = new ScrollBarsList();

  const {
    top = 5,
    right = 5,
    bottom = 5,
    width = 7,
    noHide = false
  } = options;

  Vue.directive('scroll-bar', {
    inserted: (el, { value = {}, modifiers }) => {
      const scrollBar = {
        el,
        styles: Object.assign({ top ,right, bottom, width }, value),
        noHide: noHide || modifiers.nohide
      };
      scrollBars.add(scrollBar);
    },
    update: (el) => scrollBars.update(el),
    componentUpdated: (el) => scrollBars.update(el),
    unbind: (el) => scrollBars.remove(el)
  });
};


export default { install };
