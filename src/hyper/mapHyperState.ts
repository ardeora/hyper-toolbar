const mapHyperState = (state, map) => {
  return Object.assign({}, map, {
    toolbar: state.ui.toolbar || {},
  });
};

export default mapHyperState;
