export default function VideoForm({ mode }) {
   return (
      <form className='add-form'>
         <input name='title' type='text' autoComplete required className='login-input rounded-md' placeholder='Video Title' />
         <textarea
            name='description'
            type='text'
            autoComplete
            required
            rows={6}
            className='login-input rounded-md'
            placeholder='Video Description'
         />
         <input name='url' type='url' autoComplete required className='login-input rounded-md' placeholder='Video Url' />
         <div className='input-group'>
            <input name='views' type='text' autoComplete required className='login-input rounded-md' placeholder='Total Views' />
            <input
               name='duration'
               type='text'
               autoComplete
               required
               className='login-input rounded-md'
               placeholder='Total Duration'
            />
         </div>
         <button
            type='submit'
            className='mt-3 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500'
         >
            {mode === 'add' ? '+ Add' : 'Update'}
         </button>
      </form>
   );
}
