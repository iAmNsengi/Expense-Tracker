let storageData = [];
localStorage.getItem('trackerData') ? storageData = JSON.parse(localStorage.getItem('trackerData')) : localStorage.setItem('trackerData', JSON.stringify([]))

function main() {
    setTrackerItems()
    getJoke()
    const trackerForm = document.querySelector('#trackerForm')

    trackerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(trackerForm)
        const data = {
            expense: formData.get('expense'),
            price: formData.get('price'),
            date: new Date().toJSON().slice(0, 10),
        }
        storageData.unshift(data)
        localStorage.setItem('trackerData', JSON.stringify(storageData))
        setTrackerItems()
        trackerForm.reset()
    })
    setInterval(() => {
        document.querySelector('.time').innerHTML = `<p class="text-2xl font-bold"> ${new Date().toLocaleTimeString()}</p>`
    }, 1000)
}

function setTrackerItems() {
    const tBody = document.querySelector('#tableBody')
    tBody.innerHTML = ""
    if (JSON.parse(localStorage.getItem('trackerData'))) {
        let counter = 0, sumAmount = 0;
        for (item of storageData) {
            sumAmount += parseFloat(item.price)
            tBody.innerHTML +=
                `<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    ${item.expense}
                </th>
                <td class="px-6 py-4">${item.price}</td>
                <td class="px-6 py-4">${item.date}</td>
                <td class="px-6 py-4">
                    <a class="text-red-500 delete-btn cursor-pointer" data-id="${counter}">Delete</a>
                    &nbsp; <a class="text-blue-500 underline edit-btn cursor-pointer" data-id="${counter}">Edit</a>
                </td>
            </tr>`;
            counter++
        }
        document.querySelector('.sumAmount').innerHTML = `${sumAmount} Frw`

    }
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            deleteItem(id);
        });
    });
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            editItem(id);
        });
    });
}

function deleteItem(id) {
    storageData.splice(id, 1);
    console.log(storageData)
    localStorage.setItem('trackerData', JSON.stringify(storageData));
    setTrackerItems();
}
function editItem(id) {
    let data = storageData[id]
    document.querySelector('input[name="expense"]').value = data.expense
    document.querySelector('input[name="price"]').value = data.price
    deleteItem(id);


}

function getJoke() {
    setInterval(() => {
        fetch('https://v2.jokeapi.dev/joke/Any')
            .then(response => response.json())
            .then(data => {
                let joke = '';
                if (data.type === 'single') {
                    joke = data.joke;
                } else if (data.type === 'twopart') {
                    joke = `${data.setup} ... ${data.delivery}`;
                } else {
                    joke = 'No joke found!';
                }
                document.querySelector('.joke').innerHTML = `<p>"${joke}"</p>`;
            })
            .catch(error => console.error('Error fetching joke:', error));
    }, 7000);
}