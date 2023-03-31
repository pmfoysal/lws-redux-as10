import api from '../../api';

const videos = api.injectEndpoints({
   endpoints: builder => ({
      getVideos: builder.query({
         query: () => '/videos',
      }),
      getVideo: builder.query({
         query: id => `/videos/${id}`,
      }),
      addVideo: builder.mutation({
         query: data => ({
            url: '/videos',
            method: 'POST',
            body: data,
         }),
      }),
      editVideo: builder.mutation({
         query: ({ id, ...data }) => ({
            url: `/videos/${id}`,
            method: 'PATCH',
            body: data,
         }),
      }),
      deleteVideo: builder.mutation({
         query: id => ({
            url: `/videos/${id}`,
            method: 'DELETE',
         }),
      }),
   }),
});

export default videos;
export const { useGetVideosQuery, useGetVideoQuery, useAddVideoMutation, useEditVideoMutation, useDeleteVideoMutation } = videos;
