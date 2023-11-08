import * as rtkQuery from '@reduxjs/toolkit/dist/query/react/index.js';

import { getSocket } from './socket';
import { DEFAULT_STATE, TYPES } from '../../shared/constants';

const { createApi, fetchBaseQuery } = rtkQuery.default ?? rtkQuery;

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    joinRoom: builder.mutation({
      queryFn: async ({ name }) => {
        const ws = await getSocket();
        ws.send(JSON.stringify({ type: TYPES.JOIN_ROOM, data: { name } }));
      },
    }),
    chooseTeam: builder.mutation({
      queryFn: async ({ team, name }) => {
        const ws = await getSocket();
        ws.send(
          JSON.stringify({ type: TYPES.CHOOSE_TEAM, data: { team, name } })
        );
      },
    }),
    startNewGame: builder.mutation({
      queryFn: async () => {
        const ws = await getSocket();
        ws.send(JSON.stringify({ type: TYPES.START_NEW_GAME }));
      },
    }),
    wordCorrect: builder.mutation({
      queryFn: async () => {
        const ws = await getSocket();
        ws.send(JSON.stringify({ type: TYPES.WORD_SUCCESS }));
      },
    }),
    wordIncorrect: builder.mutation({
      queryFn: async () => {
        const ws = await getSocket();
        ws.send(JSON.stringify({ type: TYPES.WORD_FAILURE }));
      },
    }),
    turnEnd: builder.mutation({
      queryFn: async () => {
        const ws = await getSocket();
        ws.send(JSON.stringify({ type: TYPES.END_ROUND }));
      },
    }),
    chooseWords: builder.mutation({
      queryFn: async ({ words }) => {
        const ws = await getSocket();
        ws.send(JSON.stringify({ type: TYPES.CHOOSE_WORDS, data: { words } }));
      },
    }),
    leaveRoom: builder.mutation({
      queryFn: async ({ name }) => {
        const ws = await getSocket();
        console.warn(name);
        ws.send(JSON.stringify({ type: TYPES.LEAVE_ROOM, data: { name } }));
      },
    }),
    getGameState: builder.query({
      queryFn: () => ({ data: DEFAULT_STATE }),
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const ws = await getSocket();
        try {
          await cacheDataLoaded;
          const listener = (event) => {
            const { data, type } = JSON.parse(event.data);
            switch (type) {
              case TYPES.GAME_STATE: {
                updateCachedData((cachedData) => ({
                  ...cachedData,
                  ...data,
                }));
                break;
              }
              case TYPES.GET_RANDOM_WORDS: {
                updateCachedData((cachedData) => ({
                  ...cachedData,
                  randomWords: data.words,
                }));
                break;
              }
              case TYPES.END_GAME: {
                updateCachedData((cachedData) => ({
                  ...cachedData,
                  isGameFinished: true,
                }));
                break;
              }
              case TYPES.GAME_CAN_BE_STARTED: {
                updateCachedData((cachedData) => ({
                  ...cachedData,
                  randomWords: [],
                  gameCanBeStarted: true,
                }));
                break;
              }
            }
          };

          ws.addEventListener('message', listener);
        } catch (e) {
          console.error(e);
        }
        await cacheEntryRemoved;
        ws.close();
      },
    }),
  }),
});

export const {
  useGetGameStateQuery,
  useJoinRoomMutation,
  useChooseTeamMutation,
  useStartNewGameMutation,
  useChooseWordsMutation,
  useWordCorrectMutation,
  useWordIncorrectMutation,
  useTurnEndMutation,
  useLeaveRoomMutation,
} = api;
