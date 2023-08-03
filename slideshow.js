class Slideshow {
  constructor() {
    this.trackElement = document.querySelector('[data-type="track"]')
    this.slideElements = document.querySelectorAll('[data-type="slide"]')
    this.nextBtn = document.querySelector('[data-type="next-btn"]')
    this.previousBtn = document.querySelector('[data-type="previous-btn"]')
    this.thumbnailsContainer = document.querySelector('[data-type="thumbnails-container"]')
    this.thumbnailElements = document.querySelectorAll('[data-type="thumbnail"]')

    this.slideWidth = this.slideElements[0].getBoundingClientRect().width
  }

  get firstSlide() {
    return this.slideElements[0]
  }

  get lastSlide() {
    return this.slideElements[this.slideElements.length - 1]
  }

  get firstThumbnail() {
    return this.thumbnailElements[0]
  }

  get lastThumbnail() {
    return this.thumbnailElements[this.thumbnailElements.length - 1]
  }

  get currentSlide() {
    return this.trackElement.querySelector('.is-active')
  }

  get nextSlide() {
    return this.currentSlide === this.lastSlide ? this.firstSlide : this.currentSlide.nextElementSibling
  }

  get prevSlide() {
    return this.currentSlide === this.firstSlide ? this.lastSlide : this.currentSlide.previousElementSibling
  }

  get currentThumbnail() {
    return this.thumbnailsContainer.querySelector('.is-active')
  }

  get nextThumbnail() {
    return this.currentThumbnail === this.lastThumbnail ? this.firstThumbnail : this.currentThumbnail.nextElementSibling
  }

  get previousThumbnail() {
    return this.currentThumbnail === this.firstThumbnail ? this.lastThumbnail : this.currentThumbnail.previousElementSibling
  }

  init() {
    this.slideElements.forEach((slide, index) => this.setSlidesPosition(slide, index))

    this.nextBtn.addEventListener('click', () => {
      this.changeSlide(this.nextSlide)
      this.changeThumbnail(this.nextThumbnail)
    });

    this.previousBtn.addEventListener('click', () => {
      this.changeSlide(this.prevSlide)
      this.changeThumbnail(this.previousThumbnail)
    });

    this.thumbnailsContainer.addEventListener('click', (e) => {
      const targetThumbnail = e.target.closest('.product__media__list__item')

      if (targetThumbnail) {
        const targetIndex = Array.from(this.thumbnailElements).findIndex((thumbnail) => thumbnail === targetThumbnail)
        const newSlide = this.slideElements[targetIndex]

        this.changeSlide(newSlide)
        this.changeThumbnail(targetThumbnail)
      }
    })
  }

  setSlidesPosition(slide, index) {
    slide.style.left = `${this.slideWidth * index}px`
  }

  resetSlides() {
    this.changeSlide(this.firstSlide)
    this.changeThumbnail(this.firstThumbnail)
  }

  changeSlide(newSlide) {
    this.trackElement.style.transform = `translateX(-${newSlide.style.left})`
    this.currentSlide.classList.remove('is-active')
    newSlide.classList.add('is-active')
  }

  changeThumbnail(targetThumbnail) {
    this.currentThumbnail.classList.remove('is-active')
    targetThumbnail.classList.add('is-active')
  }
}

export const slideshow = new Slideshow()
slideshow.init()