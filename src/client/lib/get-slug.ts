// Remove trailing and leading slash
const getSlug = (path: string) => path.replace(/^\/|\/$/g, '');

export default getSlug;
