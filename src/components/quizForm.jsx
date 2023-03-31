import { useState } from 'react';
import quizSchema from '../schemas/quiz.json';

export default function QuizForm({ mode }) {
   const [opened, setOpened] = useState([0]);
   const [questions, setQuestions] = useState([quizSchema]);

   function handleAddQuestion() {
      setQuestions(prev => [...prev, quizSchema]);
   }

   function handleQuestionOpen(index) {
      setOpened(prev => {
         if (prev.includes(index)) return prev.filter(i => i !== index);
         return [...prev, index];
      });
   }

   function handleQuestion(value, index) {
      setQuestions(prev => {
         return prev.map((q, i) => {
            if (index === i) {
               return {
                  ...q,
                  question: value,
               };
            }
            return q;
         });
      });
   }

   function handleOption(key, value, qIndex, oIndex) {
      setQuestions(prev => {
         return prev.map((question, qI) => {
            if (qIndex === qI) {
               return {
                  ...question,
                  options: question.options.map((option, oI) => {
                     if (oIndex === oI) {
                        return {
                           ...option,
                           [key]: value,
                        };
                     }
                     return option;
                  }),
               };
            }
            return question;
         });
      });
   }

   return (
      <form className='add-form'>
         <input type='text' autoComplete required className='login-input rounded-md' placeholder='Video Title' />
         {questions.map((qItem, qIndex) => (
            <div key={`question-${qIndex}`} className={`question ${opened.includes(qIndex) ? 'active' : ''}`}>
               <textarea
                  type='text'
                  autoComplete
                  required
                  rows={2}
                  value={qItem.question}
                  className='login-input rounded-md'
                  placeholder={`Question ${qIndex + 1}`}
                  onChange={e => handleQuestion(e.target.value, qIndex)}
               />
               <span className='q-icon' onClick={() => handleQuestionOpen(qIndex)}>
                  <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
                     <path
                        fill='currentColor'
                        d='M11.883 3.007L12 3a1 1 0 0 1 .993.883L13 4v7h7a1 1 0 0 1 .993.883L21 12a1 1 0 0 1-.883.993L20 13h-7v7a1 1 0 0 1-.883.993L12 21a1 1 0 0 1-.993-.883L11 20v-7H4a1 1 0 0 1-.993-.883L3 12a1 1 0 0 1 .883-.993L4 11h7V4a1 1 0 0 1 .883-.993L12 3l-.117.007Z'
                     />
                  </svg>
               </span>
               <div className='q-options'>
                  <div className='q-options-content'>
                     {qItem.options.map((option, oIndex) => (
                        <label key={`question-${qIndex}-option-${oIndex}`} className='q-option'>
                           <input
                              type='checkbox'
                              checked={option.isCorrect}
                              onChange={e => handleOption('isCorrect', e.target.checked, qIndex, oIndex)}
                           />
                           <input
                              type='text'
                              autoComplete
                              required
                              value={option.option}
                              className='login-input rounded-md'
                              placeholder={`Option ${oIndex + 1}`}
                              onChange={e => handleOption('option', e.target.value, qIndex, oIndex)}
                           />
                        </label>
                     ))}
                  </div>
               </div>
            </div>
         ))}
         <div className='input-group'>
            <button
               type='button'
               onClick={handleAddQuestion}
               className='mt-3 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500'
            >
               Add Question
            </button>
            <button
               type='submit'
               className='mt-3 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500'
            >
               Submit
            </button>
         </div>
      </form>
   );
}
