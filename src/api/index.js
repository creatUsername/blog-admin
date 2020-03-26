const BASE_URL = 'http://127.0.0.1:7001/admin';

const servicePath = {
  LOGIN: BASE_URL + '/login',
  GET_TYPE_INFO: BASE_URL + '/getTypeInfo',
  ADD_ARTICLE: BASE_URL + '/addArticle',
  REMOVE_ARTICLE: BASE_URL + '/removeArticle/',
  UPDATE_ARTICLE: BASE_URL + '/updateArticle',
  GET_ARTICLE_LIST: BASE_URL + '/getArticleList',
  GET_ARTICLE_BY_ID: BASE_URL + '/getArticleById/',
};

export default servicePath;
