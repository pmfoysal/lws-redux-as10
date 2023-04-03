import MuiModal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import { forwardRef, cloneElement } from 'react';
import { useSpring, animated } from '@react-spring/web';

export default function Modal({ isOpen, setIsOpen, type, onClick }) {
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
            <div>Hellow</div>
         </Fade>
      </MuiModal>
   );
}

const Fade = forwardRef(function Fade(props, ref) {
   const { children, in: open, onClick, onEnter, onExited, ownerState, ...other } = props;
   const style = useSpring({
      from: { opacity: 0 },
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
