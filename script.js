const quittingListUrl = 'https://api.jsonbin.io/b/60291623435c323ba1c624fa'
const presentListUrl = 'https://api.jsonbin.io/b/60291c59435c323ba1c627dc'

$(document).ready(function () {
    $.ajax({
        url: presentListUrl,
        async: true,
        dataType: 'json',
        success: data => {
            $('.tab1')[0].innerText += `(${data.length})`
            data.forEach((el, id) => {
                $('.table1').append(`<tr class="table__row"><td>${id + 1}</td><td>${el.lastName} ${el.firstName} ${el.patrName}</td><td>${el.bedNumber}</td></tr>`);
            })
            $('.table1 .table__row').click(element => trClickEvent(element, data))
        },
    });
    $.ajax({
        url: quittingListUrl,
        async: true,
        dataType: 'json',
        success: data => {
            $('.tab2')[0].innerText += `(${data.length})`
            data.forEach((el, id) => {
                $('.table2').append(`<tr class="table__row"><td>${id + 1}</td><td>${el.lastName} ${el.firstName} ${el.patrName}</td><td>${el.cause}</td></tr>`);
            })
            $('.table2 .table__row').click(element => trClickEvent(element, data))
        },
    });
})

const trClickEvent = (element, data) => {
    const id = element.currentTarget.childNodes[0].innerText - 1
    const el = data[id]
    const dateOfBirth = data[id].birthDate.split('-')
    const currentDate = new Date()
    let age = currentDate.getFullYear() - dateOfBirth[0]
    if (currentDate.getMonth() + 1 < dateOfBirth[1] || (currentDate.getMonth() + 1 === dateOfBirth[1] && currentDate.getDate() < dateOfBirth[2])) {
        age -= 1
    }
    $('.line__data1')[0].innerText = `${el.lastName} ${el.firstName} ${el.patrName}`
    $('.line__data2')[0].innerText = age
    $('.line__data3')[0].innerText = el.diagnosis
}

$('.tab1').click(() => {
    $('.tab1').addClass('tab-active')
    $('.tab2').removeClass('tab-active')
    $('.table1').removeClass('hidden')
    $('.table2').addClass('hidden')
})

$('.tab2').click(() => {
    $('.tab1').removeClass('tab-active')
    $('.tab2').addClass('tab-active')
    $('.table2').removeClass('hidden')
    $('.table1').addClass('hidden')
})
