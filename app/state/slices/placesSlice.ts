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
    addNote: (
      state,
      action: PayloadAction<{ note: string; placeId: string }>,
    ) => {
      const { placeId, note } = action.payload

      placesAdapter.updateOne(state, {
        id: placeId,
        changes: {
          notes: [...state.entities[placeId].notes, note],
        },
      })
    },
    editNote: (
      state,
      action: PayloadAction<{ index: number; placeId: string; note: string }>,
    ) => {
      const { placeId, index, note } = action.payload

      const notes = [...state.entities[placeId].notes]
      notes.splice(index, 1, note)

      placesAdapter.updateOne(state, {
        id: placeId,
        changes: {
          notes: notes,
        },
      })
    },
    deleteNote: (
      state,
      action: PayloadAction<{ index: number; placeId: string }>,
    ) => {
      const { placeId, index } = action.payload

      const notes = [...state.entities[placeId].notes]
      notes.splice(index, 1)

      placesAdapter.updateOne(state, {
        id: placeId,
        changes: {
          notes,
        },
      })
    },
    addPhoto: (
      state,
      action: PayloadAction<{ placeId: string; photoUri: string }>,
    ) => {
      const { placeId, photoUri } = action.payload

      placesAdapter.updateOne(state, {
        id: placeId,
        changes: {
          photos: [...state.entities[placeId].photos, photoUri],
        },
      })
    },
  },
})

export const {
  addPlace,
  updatePlace,
  addPlaceToFavorite,
  removePlaceFromFavorite,
  addNote,
  editNote,
  deleteNote,
  addPhoto,
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
