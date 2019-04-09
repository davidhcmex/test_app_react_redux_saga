import { createSelector } from "reselect";

const itemsSelector = state => {
  return {
    data: state.reducerAlbums.data.data,
    user: state.reducerUsers.userId,
    maxNumber: state.reducerAlbums.maxNumber
  };
};

const filteredAlbums = createSelector(
  itemsSelector,
  items =>
    items.data.filter(
      item => item.userId === items.user && item.title.length < items.maxNumber
    )
);

export default filteredAlbums;
