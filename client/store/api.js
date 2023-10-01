import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getSocket } from './socket';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    joinRoom: builder.mutation({
      queryFn: async (name) => {
        const ws = await getSocket();
        ws.send(JSON.stringify({ type: 'join_room', data: { name } }));
      },
    }),
    getGameState: builder.query({
      queryFn: () => ({ data: {} }),
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        // create a websocket connection when the cache subscription starts
        const ws = await getSocket();
        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded;
          const listener = (event) => {
            const data = JSON.parse(event.data);
            updateCachedData(() => data);
          };

          ws.addEventListener('message', listener);
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }
        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await cacheEntryRemoved;
        // perform cleanup steps once the `cacheEntryRemoved` promise resolves
        // ws.close();
      },
    }),
  }),
});

export const { useGetGameStateQuery, useJoinRoomMutation } = api;
