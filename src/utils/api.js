import axios from 'axios';

const newsAPI = axios.create({
    baseURL: 'https://rosie-nc-news-app.herokuapp.com/api'
});

export const getTopics = () => {
    return newsAPI.get('/topics').then((data) => {
        return data.data.topics;
    });
}

export const getArticles = (topic_slug, sort_by) => {
    let path = '/articles';
    if (topic_slug || sort_by) {
        path += '?';
        if (topic_slug) {
            path+= `topic=${topic_slug}`;
            if (sort_by) {
                path += `&`;
                sort_by = sort_by.split(' ').join('&');
                path += sort_by;
            }
        }
        if (sort_by && !topic_slug) {
            sort_by = sort_by.split(' ').join('&');
            path += sort_by;
        }
    }
    return newsAPI.get(path).then((data) => {
        return data.data.articles;
    });
}

export const getSingleArticle = (article_id) => {
    return newsAPI.get(`/articles/${article_id}`).then((data) => {
        return data.data.article;
    });
}

export const getComments = (article_id, searchSort_by, searchOrder) => {
    return newsAPI.get(`/articles/${article_id}/comments`).then((data) => {
        const comments = data.data.comments;
        comments.sort(function(a, b) {
            if(a[searchSort_by] > b[searchSort_by]) {
                if (searchOrder === 'DESC') {
                    return -1;
                } 
                else if (searchOrder === 'ASC') {
                    return 1;
                }
            }
            if(a[searchSort_by] < b[searchSort_by]) {
                if (searchOrder === 'DESC') {
                    return 1;
                }
                else if (searchOrder === 'ASC') {
                    return -1;
                }
            }
            else {
                return 0;
            }
        });
        return comments;
    });
}

export const patchArticle = (article_id) => {
        return newsAPI.patch(`/articles/${article_id}`, {inc_votes: 1 }).then((data) => {
            return data.data.updatedArticle;
        });
}

export const postComment = (article_id, comment_obj) => {
    return newsAPI.post(`/articles/${article_id}/comments`, comment_obj).then((data) => {
        return data.data.comment;
    });
}

export const getCommentsByUser = (username) => {
    return newsAPI.get('/comments').then((data) => {
        const userComments = data.data.comments.filter((comment) => comment.author === username);

        userComments.sort(function(a, b) {
            if(a.created_at > b.created_at) {
                return -1;
            }
            if(a.created_at < b.created_at) {
                return 1;
            }
            else {
                return 0;
            }
        });
        return userComments;
    });
}

export const deleteComment = (comment_id) => {
    return newsAPI.delete(`/comments/${comment_id}`).then((data) => {
        return data.data;
    });
}

export const patchComment = (comment_id) => {
    return newsAPI.patch(`/comments/${comment_id}`, {inc_votes: 1 }).then((data) => {
        return data.data.updatedComment;
    });
}

export const getArticlesByUser = (username, searchSort_by, searchOrder) => {
    return newsAPI.get('/articles').then((data) => {
        const userArticles = data.data.articles.filter((article) => article.author === username);
        userArticles.sort(function(a, b) {
            if(a[searchSort_by] > b[searchSort_by]) {
                if (searchOrder === 'DESC') {
                    return -1;
                } 
                else if (searchOrder === 'ASC') {
                    return 1;
                }
            }
            if(a[searchSort_by] < b[searchSort_by]) {
                if (searchOrder === 'DESC') {
                    return 1;
                }
                else if (searchOrder === 'ASC') {
                    return -1;
                }
            }
            else {
                return 0;
            }
        });
        return userArticles;
    }); 
}

export const deleteArticleContent = (article_id) => {
    return newsAPI.patch(`/articles/remove/${article_id}`).then((data) => {
        return data;
    });
}

export const getSingleUser = (username, password) => {
    return newsAPI.post('/users/login', { username: username, password: password }).then((response) => {
        return response.data.user;
    });
}

export const postNewUser = (user) => {
    return newsAPI.post('/users', user).then((data) => {
        return data.data.postedUser;
    });
}

export const postArticle = (newArticle) => {
    return newsAPI.post('/articles', newArticle).then((data) => {
        return data.data.postedArticle;
    });
}
