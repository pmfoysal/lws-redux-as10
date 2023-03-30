export default function stringToUrl(string) {
   return string
      ?.toLowerCase()
      ?.replace(/\s+/g, '-')
      ?.replace(/[^a-z0-9-]+/g, '');
}
