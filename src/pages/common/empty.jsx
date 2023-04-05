export default function Empty({ text }) {
   return (
      <section className='py-6 page-empty'>
         <div className='mx-auto max-w-7xl px-5 lg:px-0 container-empty'>
            <h1 className='text-2xl font-bold text-empty'>{text}</h1>
         </div>
      </section>
   );
}
