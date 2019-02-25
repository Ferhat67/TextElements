(window as any).global = window;
(window as any).process = {
  nextTick: (params) => setTimeout(params, 0)
};
