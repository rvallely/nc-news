export const underline = (id) => {
    // console.log('clicked ', id);
    if (id === null) {
        id = 'home';
    }
    const selected = document.getElementById(id);
    const navElements = document.getElementsByClassName('Nav-item');
    for (let item in navElements) {
        if (navElements[item].id !== undefined && navElements[item].id !== selected.id) {
            let deselectedE = document.getElementById(navElements[item].id);
            deselectedE.style.textDecoration = 'none';
        }  
    }
    selected.style.textDecoration = 'underline';
}

