export default function Signin() {
   return (
      <form class='mt-8 space-y-6' action='#' method='POST'>
         <input type='hidden' name='remember' value='true' />
         <div class='rounded-md shadow-sm -space-y-px'>
            <div>
               <label for='email-address' class='sr-only'>
                  Email address
               </label>
               <input
                  id='email-address'
                  name='email'
                  type='email'
                  autocomplete='email'
                  required
                  class='login-input rounded-t-md'
                  placeholder='Email address'
               />
            </div>
            <div>
               <label for='password' class='sr-only'>
                  Password
               </label>
               <input
                  id='password'
                  name='password'
                  type='password'
                  autocomplete='current-password'
                  required
                  class='login-input rounded-b-md'
                  placeholder='Password'
               />
            </div>
         </div>

         <div class='flex items-center justify-end'>
            <div class='text-sm'>
               <a href='#' class='font-medium text-violet-600 hover:text-violet-500'>
                  Forgot your password?
               </a>
            </div>
         </div>
         <div>
            <button
               type='submit'
               class='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500'
            >
               Sign in
            </button>
         </div>
      </form>
   );
}
