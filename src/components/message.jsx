import 'react-toastify/dist/ReactToastify.css';
import { Slide, ToastContainer } from 'react-toastify';

export default function Message() {
   return (
      <ToastContainer
         position='bottom-left'
         autoClose={2500}
         limit={1}
         hideProgressBar
         newestOnTop={false}
         closeOnClick
         rtl={false}
         pauseOnFocusLoss={false}
         draggable={false}
         pauseOnHover={false}
         transition={Slide}
         theme='light'
      />
   );
}
