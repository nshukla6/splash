const count = 10;
const apiKey = "wzH5YW1fCKeF9vjp4FpjCo_YbwLXt28bTz8Y0DQt1hw";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

const imageContainer = document.getElementById("image-container");
const loader = document.getElementById('loader');

function showLoader(){
    loader.hidden = false;
    imageContainer.hidden = true;
}

function hideLoader(){
    loader.hidden = true;
    imageContainer.hidden = false;
}

let ready = false;
let loadedImageCount=0;

function imageLoaded(){
    loadedImageCount++;
    showLoader();
    if(loadedImageCount%count === 0){
        console.log("loaded all images");
        ready = true;
        hideLoader();
    }
    
}

const setAttributes = (item, attributes) => {
  for (let key in attributes) {
    item.setAttribute(key, attributes[key]);
  }
  return item;
};


const createImages = (imageRes) => {
  imageRes.forEach((img) => {
    const anchor = createAnchor(img);
    const image = createImage(img);
    anchor.appendChild(image);
    imageContainer.appendChild(anchor);
  });
};
const fetchImages = async (url) => {
  const response = await fetch(url);
  const imageRes = await response.json();
  createImages(imageRes);
};

function createAnchor(img) {
  const anchor = document.createElement("a");
  return setAttributes(anchor, {
    href: img.urls.regular,
    target: "_blank",
  });
}
function createImage(img) {
  const image = document.createElement("img");
  image.addEventListener('load', imageLoaded);
  return setAttributes(image, {
    src: img.urls.regular,
    class: "image",
    alt: img.alt_description,
    title: img.alt_description,
  });
}
fetchImages(apiUrl);


window.addEventListener("scroll", function () {
    const viewHeight = window.innerHeight;
    const scrollHeight = window.scrollY;
    const totalPageHeight = document.body.scrollHeight;

    if(viewHeight + scrollHeight >= totalPageHeight - 1500 && ready){
        console.log('scrolled');
        ready = false;
        fetchImages(apiUrl);
    }
});