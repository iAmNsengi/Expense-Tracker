function main() {
    console.log("It's okay");
    const trackerForm = document.querySelector('#trackerForm')
    const tBody = document.querySelector('#tableBody')

    trackerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(trackerForm)
        tBody.innerHTML +=
            `<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
           ${formData.get('expense')}
          </th>
          <td class="px-6 py-4">${formData.get('price')}</td>
          <td class="px-6 py-4">${new Date().toJSON().slice(0, 10)}</td>
          <td class="px-6 py-4"><a class="text-red-500">Delete</a></td>
        </tr >`
        trackerForm.reset()
    })
}