export default function stringToUrl(string) {
   return string
      ?.toLowerCase()
      ?.replace(/[ -]+/g, '-')
      ?.replace(/[^a-z0-9-]+/g, '');
}
