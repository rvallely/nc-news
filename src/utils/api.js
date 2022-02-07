import axios from 'axios';

const newsAPI = axios.create({
    baseURL: 'https://rosie-nc-news-app.herokuapp.com/api'
});

export const getTopics = () => {
    return newsAPI.get('/topics').then((data) => {
        return data.data.topics;
    });
}

export const getArticles = (topic_slug) => {
    let path = '/articles';
    if (topic_slug) {
        path += `?topic=${topic_slug}`;
    }
    return newsAPI.get(path).then((data) => {
        return data.data.articles;
    });
}

