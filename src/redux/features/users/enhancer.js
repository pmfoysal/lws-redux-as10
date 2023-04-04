import users from './endpoints';
import message from '../../../utilities/message';

const enhancedUsers = users.enhanceEndpoints({
   endpoints: {
      getUsers: {
         onQueryStarted: async (data, { queryFulfilled }) => {
            try {
               await queryFulfilled;
            } catch (error) {
               message.error(error.message || error.error.error || error.error.data);
            }
         },
      },
      getUser: {
         onQueryStarted: async (data, { queryFulfilled }) => {
            try {
               await queryFulfilled;
            } catch (error) {
               message.error(error.message || error.error.error || error.error.data);
            }
         },
      },
   },
});

export const { useGetUsersQuery, useGetUserQuery } = enhancedUsers;
