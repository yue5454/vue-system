export const getOption = (state) => state.optionsList;
export const getFeatures = (state) => state.features;
export const getElements = (state) => state.elements;
export const deleteOption = (state) => (index) => {
  state.optionsList.splice(index, 1);
  return state.optionsList;
};
export const addOption = (state) => (item) => {
  state.optionsList.push(item);
  return state.optionsList;
};
