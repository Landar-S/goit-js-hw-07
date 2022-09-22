import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

const galleryContainer = document.querySelector(".gallery");
const galleryMarkup = createGalleryMarkup(galleryItems);

galleryContainer.insertAdjacentHTML("beforeend", galleryMarkup);

galleryContainer.addEventListener("click", onGalleryContainerClick);

function createGalleryMarkup(items) {
  return items
    .map(
      ({ preview, original, description }) =>
        `<div class="gallery__item"><a class="gallery__link" href=${original}><img class="gallery__image" src="${preview}" data-source="${original}" loading="lazy" alt="${description}"/></a></div>`
    )
    .join("");
}

function onGalleryContainerClick(e) {
  e.preventDefault();

  if (e.target === e.currentTarget) {
    return;
  }

  const instance = basicLightbox.create(
    `
        <img src="${e.target.dataset.source}" width="800" height="600">
    `,
    {
      onShow: () => document.addEventListener("keydown", closePressedEscape),
      onClose: () =>
        document.removeEventListener("keydown", closePressedEscape),
    }
  );
  instance.show();

  function closePressedEscape(e) {
    if (e.code === "Escape") instance.close();
  }
}
