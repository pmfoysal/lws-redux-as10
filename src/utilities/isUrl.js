export default function isUrl(text) {
   try {
      new URL(text);
      return true;
   } catch (error) {
      return false;
   }
}
