const capitaliseFirstLetter = (topic) => {
    let capital = topic.substring(0, 1).toUpperCase() 
    let lower = topic.substring(1).split('').map((char) => char.toLowerCase()).join('');
    return capital + lower
}

export default capitaliseFirstLetter;