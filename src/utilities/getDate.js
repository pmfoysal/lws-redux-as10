export default function getDate(date) {
   const temp = new Date(date);
   const day = temp.toLocaleDateString('en-US', { day: '2-digit' });
   const month = temp.toLocaleDateString('en-US', { month: 'long' });
   const year = temp.getFullYear();
   return `${day} ${month} ${year}`;
}
