export default function AssignmentForm({ mode }) {
   return (
      <form className='add-form'>
         <input type='text' autoComplete required className='login-input rounded-md' placeholder='Video Title' />
         <input type='text' autoComplete required className='login-input rounded-md' placeholder='Assignment Title' />
         <input type='text' autoComplete required className='login-input rounded-md' placeholder='Total Marks' />
         <button
            type='submit'
            className='mt-3 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500'
         >
            {mode === 'add' ? '+ Add' : 'Update'}
         </button>
      </form>
   );
}
