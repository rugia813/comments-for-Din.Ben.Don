console.log('Comment Plugin for Din.Ben.Don loaded')
let hasError = false
const isDetail = (() => {
    try {
        return document.getElementById('main').childNodes[3].localName !== 'div'
    } catch (error) {
        hasError = true
    }
})()
const id = (() => {
    try {
        return isDetail
        ? document.getElementById('main').childNodes[3].childNodes[3].innerText
        : document.getElementById('main').childNodes[3].childNodes[1].innerText.slice(3)
    } catch (error) {
        hasError = true
    }
})()
console.log({isDetail, id})
if (!hasError) {
    const list = isDetail
        ? document.querySelector('#viewTab_panel_productGroup > table > tbody').childNodes
        : document.querySelectorAll('#addOrderItemForm > table > tbody > tr')
    
    list.forEach((tr, i) => {
        const td1 = tr.childNodes[1]
        if ( i === 0 || !td1 || !['productName', 'mergeKey'].includes(td1.className) ) return
        const product = td1.innerText
        const td = document.createElement('td')
        const btn = document.createElement('button')
        const input = document.createElement('input')
    
        btn.innerText = '備註'
        btn.addEventListener('click', e => {
            e.preventDefault()
            save(id, product, input.value)
        })
    
        input.value = localStorage.getItem(id + product) || ''
    
        try {
            td.appendChild(input)
            td.appendChild(btn)
            tr.appendChild(td)
        } catch (error) {
        }
    })

    function save(id, product, comment) {
        console.log({id, product, comment});
        localStorage.setItem(id + product, comment)
    }
} else {
    console.log('not a valid page')
}