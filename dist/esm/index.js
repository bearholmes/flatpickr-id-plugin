function idPlugin() {
  return function (fp) {
    return {
      onReady: function () {
        setTimeout(function () {
          const id = fp.input.id;
          if (!id) return;
          if (fp.mobileInput) {
            fp.input.removeAttribute('id');
            fp.mobileInput.id = id;
          } else if (fp.altInput) {
            fp.input.removeAttribute('id');
            fp.altInput.id = id;
          }
          fp.loadedPlugins.push('idPlugin');
        }, 10);
      },
    };
  };
}
export default idPlugin;
