const COLLECTION = document.querySelectorAll('.piano-key');
const PIANO = document;

//ф-ция проигрывания аудио
function playAudio(src) {
    const audio = new Audio();
    audio.src = src;
    audio.currentTime = 0;
    audio.play();
}

//ф-ция проигрывания звука нажатия на клавишу и вызова анимации
const pianoKeyDown = (event) => {
    event.target.classList.add('piano-key-active');
    const note = event.target.dataset.note;
    const src = `assets/audio/${note}.mp3`;
    playAudio(src);
}
//ф-ция разжатия клавиши(присвоение обычного статуса)
const pianoKeyUp = (event) => {
    event.target.classList.remove('piano-key-active');
}

//ф-ция добавления событий для клавиш при нажатии на них
const startCorrespondOver = (event) => {
    if (event.target.classList.contains('piano-key')) {
        pianoKeyDown(event);
        COLLECTION.forEach((elem) => {
            elem.addEventListener('mouseover', pianoKeyDown);
            elem.addEventListener('mouseout', pianoKeyUp);
        });
    }

}
//ф-ция сбрасывания событий
const endCorrespondOver = () => {
    COLLECTION.forEach((elem) => {
        elem.classList.remove('piano-key-active');
        elem.removeEventListener('mouseover', pianoKeyDown);
        elem.removeEventListener('mouseout', pianoKeyUp);
    });
}



//Добавляються обработчики событий мыши для документа
PIANO.addEventListener('mousedown', startCorrespondOver);
PIANO.addEventListener('mouseup', endCorrespondOver);

//Добавляеться слушаетль для зажатой клавишы
window.addEventListener('keydown', (event) => {
    COLLECTION.forEach((elem) => {
        const letter = elem.dataset.letter;
        if (event.code === `Key${letter}`) {
            //Что-то я не знаю как сделать только одно событие keydown,
            //так что пока что так. Если знаити как подругому подскажите)
            if (!elem.classList.contains('piano-key-active')) {
                elem.classList.add('piano-key-active');
                const note = elem.dataset.note;
                const src = `assets/audio/${note}.mp3`;
                playAudio(src);
            }
        }
    });
});

//Добавляем слушатель для разжатой клавишы
window.addEventListener('keyup',(event)=>{
    COLLECTION.forEach((elem)=>{
        const letter = elem.dataset.letter;
        if(event.code === `Key${letter}`){
            elem.classList.remove('piano-key-active');
        }
    });
});


const btnСolection = document.querySelectorAll('.btn');
const btnFeild = document.querySelector('.btn-container');

//Слушатель для Notes Letters
btnFeild.addEventListener('click',(event)=>{
    // чуток запутанный код по проверке клавиш
    if(event.target.classList.contains('btn')){
        if(!event.target.classList.contains('btn-active')){
            btnСolection.forEach((elem)=>{
                if(event.target === elem){
                    elem.classList.add('btn-active');
                    //меняю название клавиш
                    if(elem.classList.contains('btn-letters')){
                        COLLECTION.forEach((elem1)=>{
                            elem1.classList.add('piano-key-letter');
                        });
                    }else{
                        COLLECTION.forEach((elem1)=>{
                            elem1.classList.remove('piano-key-letter');
                        });
                    }
                }else{
                    elem.classList.remove('btn-active');
                }
            });
        }    
    }
});



function activateFullscreen(element) {
    if(element.requestFullscreen) {
      element.requestFullscreen();        // W3C spec
    }
    else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();     // Firefox
    }
    else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();  // Safari
    }
    else if(element.msRequestFullscreen) {
      element.msRequestFullscreen();      // IE/Edge
    }
  };

  function deactivateFullscreen() {
    if(document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  };



  const fullscreen =document.querySelector('.fullscreen');

  //Слушатель для ячейки с развёртыванием экрана
  fullscreen.addEventListener('click',(event)=>{
      if(event.target.classList.contains('openfullscreen')){
          activateFullscreen(document.body);
          event.target.classList.remove('openfullscreen');
      }else{
          deactivateFullscreen();
          event.target.classList.add('openfullscreen');
      }
  });