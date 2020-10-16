const body = document.querySelector('body');
const IMG_NUMBER = 5;

function genRandom() { // 배경 이미지로 사용할 랜덤번호를 생성
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function handleImgLoad() {
    console.log('finished loading');
}

function paintImage(imgNumber) { // 선택된 이미지를 배경화면으로 지정
    const image = new Image();
    image.src = `images/${imgNumber+1}.jpg`;
    body.appendChild(image);
    image.classList.add("bgImage");
    image.addEventListener("loadend", handleImgLoad);
}

function init() {
    const randomNumer = genRandom();
    paintImage(randomNumer);
}

init();