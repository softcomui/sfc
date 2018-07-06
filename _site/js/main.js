'use strict'
/**
  * Main JS File
  *
  * @package  sfc
  * @author   Kabolobari Benakole <i@kb.life>
*/

// Definitions
let sfc = {
    // Variables
    body:       document.body,
    mainbar:    document.querySelector('#mainbar'),
    topOffset:  this.mainbar.offsetTop,
    topHeight:  this.mainbar.clientHeight,
    
    fullYear:   new Date().getFullYear(),
    elem:       document.querySelector('[currentYear]'),
    
    images:     document.querySelectorAll('.content-area p img'),
    iframes:    document.querySelectorAll('iframe'),
    figure:     document.createElement('figure')
}


// Output current year
sfc.insertCurrentYear =  function() {
    return this.elem.innerText = this.fullYear
}


// Affix mainbar to top on scroll to it
sfc.affixMainbar = function() {
    let that = this
    window.addEventListener('scroll', function() {
        let scrollY = window.scrollY
        if (scrollY > (that.topOffset + that.topHeight)) {
            that.mainbar.classList.add('is-fixed')
        } else {
            that.mainbar.classList.remove('is-fixed')
        }
    })
}


// Replace img and ifram etc with html5 types...
sfc.replaceMedia = function() {
    let that = this
    // Replacing all images with figure and caption...
    if (that.images) {
        that.images.forEach(el => {  
            let parentImg   = el.closest('p'),
                figure      = document.createElement('figure')    
            figure.innerHTML = `
                <img src="${el.src}" alt="${el.alt}">
                <figcaption>${el.alt}</figcaption>
            `
            parentImg.parentNode.replaceChild(figure, parentImg)
        })
    }
    
    // Replacing all iframes with figure and figcaption...
    if (that.iframes) {
        that.iframes.forEach(el => {
            that.figure.classList.add('video-wrapper')    
            that.figure.innerHTML = `
                <iframe src="${el.src}" frameborder="0" allowfullscreen></iframe>
            `
            el.parentNode.replaceChild(that.figure, el)
        })
    }
}


// Calls
sfc.affixMainbar()
sfc.insertCurrentYear()
sfc.replaceMedia()