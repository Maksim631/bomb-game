import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getSocket } from './socket';
import { TYPES } from '../../shared/constants';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    joinRoom: builder.mutation({
      queryFn: async (name) => {
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
    chooseWords: builder.mutation({
      queryFn: async ({ words }) => {
        const ws = await getSocket();
        ws.send(JSON.stringify({ type: TYPES.CHOOSE_WORDS, data: { words } }));
      },
    }),
    getGameState: builder.query({
      queryFn: () => ({ data: {} }),
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const ws = await getSocket();
        try {
          await cacheDataLoaded;
          const listener = (event) => {
            const { data, type } = JSON.parse(event.data);
            console.log(data, type);
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
} = api;
