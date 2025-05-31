import {
  createEntityAdapter,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'
import { Place } from '@rootTypes/places.ts'
import { SAMPLE_PLACES } from '@mocks/places.ts'
import { RootState } from '../store.ts'

const placesAdapter = createEntityAdapter<Place, string>({
  selectId: model => model.id,
})

// Initialize with mock data
const initialState = placesAdapter.getInitialState()
const initialStateWithMockData = placesAdapter.setAll(
  initialState,
  SAMPLE_PLACES,
)

export const placesSlice = createSlice({
  name: 'places',
  initialState: initialStateWithMockData,
  reducers: {
    addPlace: (state, action: PayloadAction<Place>) => {
      placesAdapter.addOne(state, action.payload)
    },
    updatePlace: (
      state,
      action: PayloadAction<{ id: string; updatePayload: Partial<Place> }>,
    ) => {
      placesAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload.updatePayload,
      })
    },
    addPlaceToFavorite: (state, action: PayloadAction<string>) => {
      placesAdapter.updateOne(state, {
        id: action.payload,
        changes: { isFavorite: true },
      })
    },
    removePlaceFromFavorite: (state, action: PayloadAction<string>) => {
      placesAdapter.updateOne(state, {
        id: action.payload,
        changes: { isFavorite: false },
      })
    },
  },
})

export const {
  addPlace,
  updatePlace,
  addPlaceToFavorite,
  removePlaceFromFavorite,
} = placesSlice.actions

// Export the selectors
export const {
  selectAll: selectAllPlaces,
  selectById: selectPlaceById,
  selectIds: selectPlaceIds,
  selectEntities: selectPlaceEntities,
  selectTotal: selectTotalPlaces,
} = placesAdapter.getSelectors((state: RootState) => state.places)

// Custom selector for non-favorite places
export const selectNonFavoritePlaces = createSelector(
  [selectAllPlaces],
  places => places.filter(place => !place.isFavorite),
)

// Custom selector for favorite places
export const selectFavoritePlaces = createSelector([selectAllPlaces], places =>
  places.filter(place => place.isFavorite),
)

const placesReducer = placesSlice.reducer

export default placesReducer
