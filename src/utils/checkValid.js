export const checkSortByValid = (sortBy) => {
    const sortByElements = sortBy.split(' ');

    if (sortByElements.length === 1) {
        const column = sortByElements[0].split('=');
        if (column[0] === 'sort_by' &&
            column[1] === 'title' ||
            column[1] === 'votes' ||
            column[1] === 'author' ||
            column[1] === 'comment_count' ||
            column[1] === 'created_at' 
        ) {
            return true;
        }
    }
    if (sortByElements.length === 2) {
        const column = sortByElements[0].split('=');
        const order = sortByElements[1].split('=');
        if (column[0] === 'sort_by' &&
            order[0] === 'order' &&
            column[1] === 'title' ||
            column[1] === 'votes' ||
            column[1] === 'author' ||
            column[1] === 'comment_count' ||
            column[1] === 'created_at' &&
            order[1]  === 'DESC' ||
            order[1]  === 'ASC' 
        ) {
            return true;
        }
    } else {
        return false;
    }    
}