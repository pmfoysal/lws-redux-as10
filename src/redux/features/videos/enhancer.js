import videos from './endpoints';

const { updateQueryData } = videos.util;

const enhancedVideos = videos.enhanceEndpoints({
   endpoints: {
      addVideo: {
         onQueryStarted: async (data, { queryFulfilled, dispatch }) => {
            try {
               const { data: result } = await queryFulfilled;
               dispatch(
                  updateQueryData('getVideos', undefined, draft => {
                     draft.push(result);
                  })
               );
            } catch (error) {
               message.error(error.message || error.error.data);
            }
         },
      },
      editVideo: {
         onQueryStarted: async (data, { queryFulfilled, dispatch }) => {
            const updatedGetVideo = dispatch(
               updateQueryData('getVideo', data.id, draft => {
                  if (draft.id === data.id) Object.assign(draft, data);
               })
            );
            const updatedGetVideos = dispatch(
               updateQueryData('getVideos', undefined, draft => {
                  draft.forEach(video => {
                     if (video.id === data.id) {
                        Object.assign(video, data);
                     }
                  });
               })
            );
            try {
               await queryFulfilled;
            } catch (error) {
               updatedGetVideo.undo();
               updatedGetVideos.undo();
               message.error(error.message || error.error.data);
            }
         },
      },
      deleteVideo: {
         onQueryStarted: async (data, { queryFulfilled, dispatch }) => {
            const deletedGetVideos = dispatch(
               updateQueryData('getVideos', undefined, draft => {
                  const index = draft.findIndex(video => video.id === data.id);
                  draft.splice(index, 1);
               })
            );
            try {
               await queryFulfilled;
            } catch (error) {
               deletedGetVideos.undo();
               message.error(error.message || error.error.data);
            }
         },
      },
   },
});

export const { useGetVideosQuery, useGetVideoQuery, useAddVideoMutation, useEditVideoMutation, useDeleteVideoMutation } =
   enhancedVideos;
