
import Qs from 'qs';
const searchParam = Qs.parse(location.search.slice(1));
console.log(searchParam);
