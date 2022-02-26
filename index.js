//chrome://extensions/

let myData = [];

const inputEl = document.getElementById('input-el')
const ulEl = document.getElementById('ul-el')
const inputBtn = document.getElementById('input-btn')
const deleteBtn = document.getElementById('delete-btn')
const dataLocalStorage = JSON.parse(localStorage.getItem("myData"))
const tabBtn = document.getElementById('tab-btn')

if (dataLocalStorage) {
    myData = dataLocalStorage
    render(myData)
}

tabBtn.addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myData.push(tabs[0].url)
        localStorage.setItem('myData', JSON.stringify(myData))
        render(myData);
    })
})

deleteBtn.addEventListener("click", function () {
    localStorage.clear();
    myData = [];
    render(myData);
})

inputBtn.addEventListener('click', function () {
    myData.push(inputEl.value)
    inputEl.value = ''
    localStorage.setItem('myData', JSON.stringify(myData))
    render(myData)
})

function render(data) {
    let listItems = '';
    for (let i = 0; i < data.length; i++) {
        listItems += `
        <li>
        <a target='_blank' href='${data[i]}'>
        ${data[i]}
        </a>
        </li>
        `
    }
    ulEl.innerHTML = listItems

}
