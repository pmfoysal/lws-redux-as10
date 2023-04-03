import auth from './endpoints';
import users from '../users/endpoints';
import { setAuth } from '../others/auth';
import message from '../../../utilities/message';

const enhancedAuth = auth.enhanceEndpoints({
   endpoints: {
      signin: {
         onQueryStarted: async (data, { queryFulfilled, dispatch }) => {
            try {
               const { data: result } = await queryFulfilled;
               dispatch(setAuth(result));
            } catch (error) {
               message.error(error.error.data);
            }
         },
      },
      signup: {
         onQueryStarted: async (data, { queryFulfilled, dispatch }) => {
            try {
               const { data: result } = await queryFulfilled;
               dispatch(setAuth(result));
               dispatch(users.util.updateQueryData('getUsers', undefined, draft => draft.push(result.user)));
            } catch (error) {
               message.error(error.error.data);
            }
         },
      },
   },
});

export const { useSigninMutation, useSignupMutation } = enhancedAuth;
