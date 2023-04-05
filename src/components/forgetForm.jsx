export default function ForgetForm() {
   function handleSubmit(event) {
      event.preventDefault();
   }

   return (
      <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
         <input type='hidden' name='remember' value='true' />
         <div className='rounded-md shadow-sm -space-y-px'>
            <div>
               <label htmlFor='email-address' className='sr-only'>
                  Email address
               </label>
               <input
                  id='email-address'
                  name='email'
                  type='email'
                  autoComplete='email'
                  required
                  className='login-input rounded-md'
                  placeholder='Email address'
               />
            </div>
         </div>
         <div>
            <button
               type='submit'
               className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500'
            >
               Send Reset Email
            </button>
         </div>
      </form>
   );
}
