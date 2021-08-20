const results = document.getElementById('results')
const filter = document.getElementById('filter')
const listItems = []

getData()

filter.addEventListener('input', (e) => filterData(e.target.value))

async function getData() {
    const res = await fetch('https://randomuser.me/api?results=50&nat=us,ca,fr,au')
    const data = await res.json()
    
    results.innerHTML = ''

    data.results.forEach(user => {
        const li = document.createElement('li')
        li.innerHTML = `
            <img src="${user.picture.large}" alt=${user.name.first}>
            <div class="user-info">
                <h4>${user.name.first} ${user.name.last}<h4>
                <p>${user.location.city}, ${user.location.country}</p>
            </div>
        `
        listItems.push(li)
        results.appendChild(li)
    });
}

function filterData(input) {
    listItems.forEach(item => {
        if(item.innerText.toLowerCase().includes(input.toLowerCase())) {
            item.classList.remove('hide')
        } else {
            item.classList.add('hide')
        }
    })
}