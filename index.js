const c = console.log.bind(console);
const input = document.querySelector('#input')
const saveInputBtn = document.querySelector('.save-input-btn');
const saveTabBtn = document.querySelector('.save-tab-btn');
const deleteBtn = document.querySelector('.delete-btn');
const leadList = document.querySelector('.leads-list');
let leadItem = []
const lead = JSON.parse(localStorage.getItem("leadItem"))

function renderList(arr) {
    let leadItem = ''
    for (const item of arr) {
        leadItem += `
       <li class="leadItem">
        <a target='_blank' href="http://${item}">${item}</a>
    </li>
       `
    }
    return leadList.innerHTML = leadItem
}
if (lead) {
    leadItem = lead;
    renderList(leadItem);
}

function saveToLeads() {
    if (input.value.length && input.value.length > 3){
        leadItem.push(input.value)
    input.value = ''
    localStorage.setItem("leadItem", JSON.stringify(leadItem))
    return renderList(leadItem)
    }
}

function deleteLeads() {
    localStorage.clear()
    leadItem = []
    return renderList(leadItem)
}

function saveTab() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        let currentURL = tabs[0].url;
        leadItem.push(currentURL)
        localStorage.setItem("leadItem", JSON.stringify(leadItem))
        return renderList(leadItem)
     });  
}



saveInputBtn.addEventListener("click", saveToLeads)
saveTabBtn.addEventListener("click",saveTab)
deleteBtn.addEventListener("click", deleteLeads)
