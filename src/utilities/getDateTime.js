export default function getDateTime(date) {
   const temp = new Date(date);
   const day = temp.toLocaleDateString('en-US', { day: '2-digit' });
   const month = temp.toLocaleDateString('en-US', { month: 'short' });
   const year = temp.getFullYear();
   const time = temp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
   return `${day} ${month} ${year} at ${time}`;
}
