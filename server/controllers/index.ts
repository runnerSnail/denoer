import {createArticle} from './createArticle.ts';
import { getArticle } from './selectArticle.ts';
import { updateArticle } from './updateArticle.ts';
import { getHome } from './home.ts';
import { getLogin } from './login.ts';
import {getArticleList} from './getArticleList.ts';
import { getUserInfo } from './getUserInfo.ts';
import { updateCommentSupport } from './update_comment_support_click.ts';
import { updateArticleSupport } from './update_article_support_click.ts';

export default {
    createArticle,
    getArticle,
    updateArticle,
    getHome,
    getLogin,
    getArticleList,
    getUserInfo,
    updateArticleSupport,
    updateCommentSupport
}