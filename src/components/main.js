
function main() {
    const tBody = document.querySelector('#tableBody')

    setTrackerItems()
    console.log("It's okay");
    const trackerForm = document.querySelector('#trackerForm')




    trackerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(trackerForm)
        const data = {
            expense: formData.get('expense'),
            price: formData.get('price'),
            date: new Date().toJSON().slice(0, 10),
        }
        localStorage.getItem('trackerData') ? null : localStorage.setItem('trackerData', JSON.stringify(""))
        localStorage.setItem('trackerData', `${JSON.stringify(data)}`)
        setTrackerItems()
        trackerForm.reset()
    })
}

function setTrackerItems() {
    const tBody = document.querySelector('#tableBody')
    tBody.innerHTML = ""
    console.log(JSON.parse(localStorage.getItem('trackerData')))
    for (item in localStorage.getItem('trackerData').split('$')) {
        item = JSON.parse(item)
        tBody.innerHTML +=
            `<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
           ${item.expense}
          </th>
          <td class="px-6 py-4">${item.price}</td>
          <td class="px-6 py-4">${item.date}</td>
          <td class="px-6 py-4"><a class="text-red-500">Delete</a></td>
        </tr >`

    }
}