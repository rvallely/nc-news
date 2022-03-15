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
        path += '?'
        if (topic_slug) {
            path+= `topic=${topic_slug}`;
            if (sort_by) {
                path += `&`
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

export const getComments = (article_id) => {
    return newsAPI.get(`/articles/${article_id}/comments`).then((data) => {
        const comments = data.data.comments
        comments.sort(function(a, b) {
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

export const getTitles = (article_ids) => {
    console.log(article_ids);
    
    // article_ids.map(function(article_id) {
    //     let id = article_id
    //     getSingleArticle(id).then((data) => console.log(data.title));
  
    // });
}

export const getTitle = (article_id) => {
    getSingleArticle(article_id).then((data) => {
        return data.title;
    });
}

export const patchComment = (comment_id) => {
    return newsAPI.patch(`/comments/${comment_id}`, {inc_votes: 1 }).then((data) => {
        return data.data.updatedComment;
    });
}

export const getArticlesByUser = (username) => {
    return newsAPI.get('/articles').then((data) => {
        const userArticles = data.data.articles.filter((article) => article.author === username);

        userArticles.sort(function(a, b) {
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
        return userArticles;
    });
}

export const deleteArticleContent = (article_id) => {
    return newsAPI.patch(`/articles/remove/${article_id}`).then((data) => {
        return data;
    });
}

export const getSingleUser = (user) => {
    const username = user.username;
    //icellusedkars
    console.log(username);
    return newsAPI.get(`/users/${username}`).then((data) => {
        console.log(data.data);
        return data.data.user;
    });
}
