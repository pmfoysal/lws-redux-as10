import Modal from './modal';
import Error from '../pages/common/error';
import urlToId from '../utilities/urlToId';
import { useEffect, useState } from 'react';
import quizSchema from '../schemas/quiz.json';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetVideosQuery } from '../redux/features/videos/enhancer';
import { useAddQuizMutation, useEditQuizMutation, useGetQuizQuery } from '../redux/features/quizzes/enhancer';

export default function QuizForm({ mode }) {
   const navigate = useNavigate();
   const { id_title } = useParams();
   const videosApi = useGetVideosQuery();
   const [opened, setOpened] = useState([0]);
   const [videoId, setVideoId] = useState('');
   const [addQuiz, addQuizApi] = useAddQuizMutation();
   const [editQuiz, editQuizApi] = useEditQuizMutation();
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [questions, setQuestions] = useState([quizSchema]);
   const quizApi = useGetQuizQuery(urlToId(id_title), { skip: mode !== 'edit' || !id_title });

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
         return prev.map((question, qI) => {
            if (index === qI) {
               return {
                  ...question,
                  question: value,
               };
            }
            return question;
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

   function handleSubmit(event) {
      event.preventDefault();
      if (videoId !== '') setIsModalOpen(true);
   }

   function handleQuiz() {
      const payload = questions;
      if (mode === 'add') {
         const video = videosApi.data?.find(item => item.id === Number(videoId));
         if (video?.id !== undefined) {
            Promise.all(
               payload.map(item => {
                  return new Promise((resolve, reject) => {
                     addQuiz({
                        ...item,
                        video_id: video.id,
                        video_title: video.title,
                     })
                        .then(({ data }) => {
                           resolve(data);
                        })
                        .catch(error => {
                           reject(error);
                        });
                  });
               })
            ).then(() => {
               navigate('/admin/quizzes');
            });
         }
      } else if (mode === 'edit') {
         if (quizApi.data?.id !== undefined) {
            payload[0].id = quizApi.data.id;
            editQuiz(payload[0]).then(() => {
               navigate('/admin/quizzes');
            });
         }
      }
   }

   useEffect(() => {
      if (mode === 'edit' && id_title && quizApi.data?.id !== undefined) {
         setVideoId(quizApi.data.video_id);
         setQuestions([
            {
               question: quizApi.data.question,
               options: quizApi.data.options,
            },
         ]);
      }
   }, [mode, id_title, quizApi]);

   if (mode === 'edit' && !quizApi.isLoading) {
      if (quizApi.data?.id === undefined) {
         return <Error />;
      }
   }

   return (
      <form className='add-form' onSubmit={handleSubmit}>
         <select
            required
            value={videoId}
            disabled={mode === 'edit'}
            className='login-input rounded-md dropdown'
            onChange={e => {
               if (mode !== 'edit') setVideoId(e.target.value);
            }}
         >
            <option value='' hidden>
               Select Video
            </option>
            {videosApi.data?.map((item, index) => (
               <option key={`video-${index}`} value={item.id}>
                  {item.title}
               </option>
            ))}
         </select>
         {questions.map((qItem, qIndex) => (
            <div key={`question-${qIndex}`} className={`question ${opened.includes(qIndex) ? 'active' : ''}`}>
               <textarea
                  rows={2}
                  required
                  type='text'
                  value={qItem.question}
                  autoComplete='question'
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
                              required
                              type='text'
                              autoComplete='option'
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
         {mode === 'add' ? (
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
         ) : (
            <button
               type='submit'
               className='mt-3 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500'
            >
               Update
            </button>
         )}
         <Modal
            type={mode}
            isOpen={isModalOpen}
            onClick={handleQuiz}
            setIsOpen={setIsModalOpen}
            isLoading={editQuizApi.isLoading}
            message={`Do you want to ${mode} this quiz?`}
         />
      </form>
   );
}
