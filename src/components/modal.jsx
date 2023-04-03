import { forwardRef, cloneElement } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Box, Modal as MuiModal, Backdrop } from '@mui/material';

const modalStyle = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: 550,
   borderRadius: '1.25rem',
   // bgcolor: 'background.paper',
   bgcolor: '#0e192f',
   border: '2px solid #18294e',
   boxShadow: 24,
};

export default function Modal({ isOpen, setIsOpen, type, message, onClick, isLoading }) {
   const icons = {
      delete: (
         <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
            <path
               fill='currentColor'
               d='M10 5h4a2 2 0 1 0-4 0ZM8.5 5a3.5 3.5 0 1 1 7 0h5.75a.75.75 0 0 1 0 1.5h-1.32l-1.17 12.111A3.75 3.75 0 0 1 15.026 22H8.974a3.75 3.75 0 0 1-3.733-3.389L4.07 6.5H2.75a.75.75 0 0 1 0-1.5H8.5Zm2 4.75a.75.75 0 0 0-1.5 0v7.5a.75.75 0 0 0 1.5 0v-7.5ZM14.25 9a.75.75 0 0 1 .75.75v7.5a.75.75 0 0 1-1.5 0v-7.5a.75.75 0 0 1 .75-.75Zm-7.516 9.467a2.25 2.25 0 0 0 2.24 2.033h6.052a2.25 2.25 0 0 0 2.24-2.033L18.424 6.5H5.576l1.158 11.967Z'
            />
         </svg>
      ),
      add: (
         <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
            <path
               fill='currentColor'
               d='M6.25 3A3.25 3.25 0 0 0 3 6.25v11.5A3.25 3.25 0 0 0 6.25 21h5.772a6.471 6.471 0 0 1-.709-1.5H6.25a1.75 1.75 0 0 1-1.75-1.75V6.25c0-.966.784-1.75 1.75-1.75h11.5c.966 0 1.75.784 1.75 1.75v5.063a6.471 6.471 0 0 1 1.5.709V6.25A3.25 3.25 0 0 0 17.75 3H6.25Zm6.25 6.25a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1-.75-.75Zm-1.72-.47a.75.75 0 1 0-1.06-1.06L8.25 9.19l-.47-.47a.75.75 0 0 0-1.06 1.06l1 1a.75.75 0 0 0 1.06 0l2-2Zm0 4.44a.75.75 0 0 1 0 1.06l-2 2a.75.75 0 0 1-1.06 0l-1-1a.75.75 0 1 1 1.06-1.06l.47.47l1.47-1.47a.75.75 0 0 1 1.06 0ZM23 17.5a5.5 5.5 0 1 0-11 0a5.5 5.5 0 0 0 11 0Zm-5 .5l.001 2.503a.5.5 0 1 1-1 0V18h-2.505a.5.5 0 0 1 0-1H17v-2.5a.5.5 0 1 1 1 0V17h2.497a.5.5 0 0 1 0 1H18Z'
            />
         </svg>
      ),
      edit: (
         <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
            <path
               fill='currentColor'
               d='M5.25 3A2.25 2.25 0 0 0 3 5.25v13.499a2.25 2.25 0 0 0 2.25 2.25h5.914l.356-1.424l.02-.076H5.25a.75.75 0 0 1-.75-.75v-13.5a.75.75 0 0 1 .75-.75h13.499a.75.75 0 0 1 .75.75v5.983c.478-.19.993-.264 1.5-.22V5.25A2.25 2.25 0 0 0 18.748 3h-13.5Zm10.104 11.999h-4.105a.75.75 0 1 0 0 1.5h2.605l1.5-1.5Zm-6.605-6.75a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm2.5-.75a.75.75 0 1 0 0 1.5h5.5a.75.75 0 1 0 0-1.5h-5.5Zm0 3.75a.75.75 0 1 0 0 1.5h5.5a.75.75 0 1 0 0-1.5h-5.5ZM7.75 13a1 1 0 1 0 0-2a1 1 0 0 0 0 2Zm1 2.75a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm10.35-3.08l-5.902 5.901a2.685 2.685 0 0 0-.707 1.248l-.457 1.83c-.2.797.522 1.518 1.318 1.319l1.83-.458a2.685 2.685 0 0 0 1.248-.706l5.9-5.904a2.286 2.286 0 0 0-3.233-3.232Z'
            />
         </svg>
      ),
   };

   return (
      <MuiModal
         open={isOpen}
         closeAfterTransition
         onClose={() => setIsOpen(false)}
         slots={{ backdrop: Backdrop }}
         slotProps={{
            backdrop: {
               TransitionComponent: Fade,
            },
         }}
      >
         <Fade in={isOpen}>
            <Box sx={modalStyle}>
               <div className='modal'>
                  <h3 className='modal-head'>
                     {type} confirmation
                     <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        onClick={() => setIsOpen(false)}
                     >
                        <path
                           fill='currentColor'
                           d='M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2Zm3.53 6.47l-.084-.073a.75.75 0 0 0-.882-.007l-.094.08L12 10.939l-2.47-2.47l-.084-.072a.75.75 0 0 0-.882-.007l-.094.08l-.073.084a.75.75 0 0 0-.007.882l.08.094L10.939 12l-2.47 2.47l-.072.084a.75.75 0 0 0-.007.882l.08.094l.084.073a.75.75 0 0 0 .882.007l.094-.08L12 13.061l2.47 2.47l.084.072a.75.75 0 0 0 .882.007l.094-.08l.073-.084a.75.75 0 0 0 .007-.882l-.08-.094L13.061 12l2.47-2.47l.072-.084a.75.75 0 0 0 .007-.882l-.08-.094l-.084-.073l.084.073Z'
                        />
                     </svg>
                  </h3>
                  <div className={`modal-icon ${type}`}>{icons[type]}</div>
                  <p className='modal-message'>{message}</p>
                  <div className='modal-buttons'>
                     <button onClick={onClick} disabled={isLoading}>
                        {isLoading ? `${type === 'delete' ? 'delet' : type}ing...` : 'Yes !'}
                     </button>
                  </div>
               </div>
            </Box>
         </Fade>
      </MuiModal>
   );
}

const Fade = forwardRef(function Fade(props, ref) {
   const { children, in: open, onClick, onEnter, onExited, ownerState, ...other } = props;
   const style = useSpring({
      from: { opacity: 0 },
      config: { duration: 250 },
      to: { opacity: open ? 1 : 0 },
      onStart: () => {
         if (open && onEnter) {
            onEnter(null, true);
         }
      },
      onRest: () => {
         if (!open && onExited) {
            onExited(null, true);
         }
      },
   });

   return (
      <animated.div ref={ref} style={style} {...other}>
         {cloneElement(children, { onClick })}
      </animated.div>
   );
});
