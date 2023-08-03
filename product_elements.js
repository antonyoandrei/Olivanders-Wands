import data from './data.js'
import { slideshow } from './slideshow.js'

class ProductElements {
  constructor() {
    this.productForm = document.querySelector('[data-type="product-form"]')
    this.hiddenInput = document.querySelector('[type="hidden"]')
    this.slides = document.querySelectorAll('[data-type="product-image"]')
    this.thumbnails = document.querySelectorAll('[data-type="product-thumbnail"]')
    this.price = document.querySelector('[data-type="product-price"]')
    this.title = document.querySelector('[data-type="product-title"]')
    this.description = document.querySelector('[data-type="product-description"]')
    this.variantsContainer = document.querySelector('[datatype="variants-container"]')
  }

  init() {
    this.connectVariants()
    this.renderNewVariant()
  }

  connectVariants() {
    this.variantsContainer.addEventListener('change', (event) => {
      const selectedVariant = event.target
      if (selectedVariant.type !== 'radio') return
      this.renderNewVariant()
    });
  }

  renderNewVariant() {
    const newVariant = this.getNewVariant()
    this.title.innerText = newVariant.title
    this.slides.forEach((slide, index) => (slide.src = newVariant.images[index]))
    this.thumbnails.forEach((thumbnail, index) => (thumbnail.src = newVariant.images[index]))
    this.price.innerText = newVariant.price
    this.description.innerText = newVariant.description
    slideshow.resetSlides()
  }

  getNewVariant() {
    const newVariantId = document.querySelector('[data-type="variant-input"]:checked').dataset.variantId
    return data.find((variant) => variant.id === newVariantId)
  }
}

const productElements = new ProductElements()
productElements.init()