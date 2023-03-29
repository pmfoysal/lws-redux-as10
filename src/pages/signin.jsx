import SigninForm from '../components/forms/signin';

export default function Signin() {
   return (
      <section class='py-6 bg-primary h-screen grid place-items-center'>
         <div class='mx-auto max-w-md px-5 lg:px-0'>
            <div>
               <img class='h-12 mx-auto' src='/assets/icons/learningportal.svg' />
               <h2 class='mt-6 text-center text-3xl font-extrabold text-slate-100'>Sign in to Student Account</h2>
            </div>
            <SigninForm />
         </div>
      </section>
   );
}
