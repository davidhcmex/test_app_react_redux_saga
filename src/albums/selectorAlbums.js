import { createSelector } from 'reselect';

const itemsSelector = state => {
    return  state.reducerAlbums.data.data.filter((item) => item.userId === state.reducerUsers.userId);
}

const filteredAlbums = createSelector(
    itemsSelector,
    items => items
)

export default filteredAlbums
