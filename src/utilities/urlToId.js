export default function urlToId(url) {
   return Number(url?.split('_')?.[0]);
}
