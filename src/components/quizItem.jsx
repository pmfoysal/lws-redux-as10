export default function QuizItem({ index, question, options }) {
   return (
      <div className='quiz'>
         <h4 className='question'>
            Quiz {index + 1} - {question}
         </h4>
         <form className='quizOptions'>
            {options?.map((option, oIndex) => (
               <label key={`option-${oIndex}`}>
                  <input type='checkbox' />
                  {option?.option}
               </label>
            ))}
         </form>
      </div>
   );
}
