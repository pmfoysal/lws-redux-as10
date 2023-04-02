export default function QuizItem({ index, question, options, setQuizzes }) {
   function handleSelect(quizIndex, optionIndex, value) {
      setQuizzes(prev => {
         return prev?.map((quiz, qIndex) => {
            if (quizIndex === qIndex) {
               return {
                  ...quiz,
                  options: quiz?.options?.map((option, oIndex) => {
                     if (optionIndex === oIndex) {
                        return {
                           ...option,
                           isSelected: value,
                        };
                     }
                     return option;
                  }),
               };
            }
            return quiz;
         });
      });
   }

   return (
      <div className='quiz'>
         <h4 className='question'>
            Quiz {index + 1} - {question}
         </h4>
         <form className='quizOptions'>
            {options?.map((option, oIndex) => (
               <label key={`option-${oIndex}`}>
                  <input
                     type='checkbox'
                     checked={option?.isSelected}
                     onChange={e => handleSelect(index, oIndex, e.target.checked)}
                  />
                  {option?.option}
               </label>
            ))}
         </form>
      </div>
   );
}
