const music = new Audio('Song-3.mp3');
// music.play();

//  Create an Array
const songs =  [
    {
        id: '1',
        songName: ` 
            On My Way <br />
            <div class="subtitle artist">Alan Walker</div>
            `,
        poster: "https://www.morexlusive.com/wp-content/uploads/2021/11/Alan-Walker.jpg",
    },
    {
        id: '2',
        songName: ` 
            Fade  <br />
            <div class="subtitle artist">Alan Walker</div>
            `,
        poster: "https://www.morexlusive.com/wp-content/uploads/2021/11/Alan-Walker.jpg",
    }
];

// Iterate the elements as popular songs section
// select the element and correspond the array object.
/**
 * ! Todo Breaking this code, I should find how to fix this. 
 */
// Array.from(document.getElementsByClassName('song-item')).forEach((element, i) => {
//     element.getElementsByTagName('img')[0].src = songs[i].poster;
//     element.getElementsByTagName('h5')[0].innerHTML = songs[i].songName;
// });


let masterPlay = document.getElementById('masterPlay');
let wave = document.getElementsByClassName('wave')[0];

masterPlay.addEventListener('click', () => {
    if(music.paused || music.currentTime <= 0) { 
        music.play();
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2')
    } else {
        music.pause();
        masterPlay.classList.add('bi-play-fill');
        masterPlay.classList.remove('bi-pause-fill');
        wave.classList.remove('active2')
    }
    console.log('clicked')
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('playListPlay')).forEach((element) => {
        element.classList.add('bi-play-circle-fill');
        element.classList.remove('bi-pause-circle-fill');
    })
}

const makeAllBackgrounds = () => {
    Array.from(document.getElementsByClassName('song-item')).forEach((element) => {
        element.style.background = "rgba(105, 150, 170, 0)";
    })
}

// Sidemenu player
let index = 0;
let posterMasterPlay = document.getElementById('posterMasterPlay');
let title = document.getElementById('title');

// Create side menu songs
// correspond the anotehr audio file to music
Array.from(document.getElementsByClassName('playListPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        index = e.target.id; // Target is this = <i id="1" class="bi bi-play-circle-fill playListPlay"></i>
        makeAllPlays();
        e.target.classList.remove('bi-play-circle-fill');
        e.target.classList.add('bi-pause-circle-fill');
        // music.src = `audio/${index}.mp3`;
        posterMasterPlay.src = `img/${index}.jpg`; // Bottom left image
        music.play();
        let songTitle = songs.filter((ele) => {
            return ele.id == index;
        })
        
        // Correespnd to the id adn object of the array
        songTitle.forEach(titleId => {
            // Get the object of an array
            let {songName} = titleId;
            title.innerHTML = songName;
        })
        masterPlay.classList.add('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2');
        music.addEventListener('ended', () => {
            masterPlay.classList.add('bi-play-fill');
            masterPlay.classList.remove('bi-pause-fill');
            wave.classList.remove('active2')
        })
        makeAllBackgrounds();
        Array.from(document.getElementsByClassName('song-item'))[`${index - 1}`].style.background = "rgba(105, 150, 170, .1)";
     })
})


let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];

music.addEventListener('timeupdate', () => {
    let musicCurrent = music.currentTime;
    let musicDur = music.duration;

    let min = Math.floor(musicDur / 60);
    let sec = Math.floor(musicDur % 60);
    // Display two digits. ex) 00:00
    if(sec < 10) {
        sec = `0${sec}`
    } else if (min < 10) {
        min = `0${min}`
    }

    currentEnd.innerText = `${min}:${sec}`; 

    let min1 = Math.floor(musicCurrent / 60);
    let sec1 = Math.floor(musicCurrent % 60);
    // Display two digits. ex) 00:00
    if(sec1 < 10) {
        sec1 = `0${sec1}`
    } else if (min1 < 10) {
        min1 = `0${min1}`
    }

    currentStart.innerText = `${min1}:${sec1}`; 

    /* Add Progress Bar */
    let progressbar = parseInt((music.currentTime/music.duration) * 100);
    seek.value = progressbar;
    let seekbar = seek.value;
    bar2.style.width = `${seekbar}%`;
    dot.style.left = `${seekbar}%`;
})

seek.addEventListener('change', () => {
    music.currentTime = seek.value * music.duration / 100;
})

music.addEventListener('ended', () => {
    masterPlay.classList.add('bi-play-fill');
    masterPlay.classList.remove('bi-pause-fill');
    wave.classList.remove('active2')
})

/* Volume */
let volIcon = document.getElementById('volIcon');
let vol = document.getElementById('vol');
let volDot = document.getElementById('volDot');
let volBar = document.getElementsByClassName('vol__bar')[0];

vol.addEventListener('change', () => {

    if(vol.value == 0) {
        volIcon.classList.remove('bi-volume-down-fill');
        volIcon.classList.add('bi-volume-mute-fill');
        volIcon.classList.add('bi-volume-up-fill');
    } 
    if (vol.value > 0) {
        volIcon.classList.add('bi-volume-down-fill');
        volIcon.classList.remove('bi-volume-mute-fill');
        volIcon.classList.add('bi-volume-up-fill');
    } 
    if (vol.value > 50) {
        volIcon.classList.remove('bi-volume-down-fill');
        volIcon.classList.remove('bi-volume-mute-fill');
        volIcon.classList.add('bi-volume-up-fill');
    }

    let volA = vol.value;
    volBar.style.width = `${volA}%`;
    volDot.style.left = `${volA}%`;
    music.volume = volA / 100;

    console.log("workdd")
});


let back = document.getElementById('back');
let next = document.getElementById('next');

back.addEventListener('click', () => {
    index -= 1;
    if(index < 1) {
        index = Array.from(document.getElementsByClassName('song-item')).length;
    }
      // music.src = `audio/${index}.mp3`;
      posterMasterPlay.src = `img/${index}.jpg`; // Bottom left image
      music.play();
      let songTitle = songs.filter((ele) => {
          return ele.id == index;
      })
      
      // Correespnd to the id adn object of the array
      songTitle.forEach(titleId => {
          // Get the object of an array
          let {songName} = titleId;
          title.innerHTML = songName;
      })
      makeAllPlays();
      document.getElementById(`${index}`).classList.add('bi-play-fill');
      document.getElementById(`${index}`).classList.add('bi-pause-fill');
      makeAllBackgrounds();
      Array.from(document.getElementsByClassName('song-item'))[`${index - 1}`].style.background = "rgba(105, 150, 170, .1)";


      music.addEventListener('ended', () => {
          masterPlay.classList.add('bi-play-fill');
          masterPlay.classList.remove('bi-pause-fill');
          wave.classList.remove('active2')
      })
})


next.addEventListener('click', () => {
    index -= 1;
    index += 1;
    if(index > Array.from(document.getElementsByClassName('song-item')).length) {
        index = 1;
    }
      // music.src = `audio/${index}.mp3`;
      posterMasterPlay.src = `img/${index}.jpg`; // Bottom left image
      music.play();
      let songTitle = songs.filter((ele) => {
          return ele.id == index;
      })
      
      // Correespnd to the id adn object of the array
      songTitle.forEach(titleId => {
          // Get the object of an array
          let {songName} = titleId;
          title.innerHTML = songName;
      })
      makeAllPlays();
      document.getElementById(`${index}`).classList.add('bi-play-fill');
      document.getElementById(`${index}`).classList.add('bi-pause-fill');
      makeAllBackgrounds();
      Array.from(document.getElementsByClassName('song-item'))[`${index - 1}`].style.background = "rgba(105, 150, 170, .1)";

})

// music.addEventListener('ended', () => {
//     masterPlay.classList.add('bi-play-fill');
//     masterPlay.classList.remove('bi-pause-fill');
//     wave.classList.remove('active2')
// })

/* Carousel */
let leftScroll = document.getElementById('scrollLeft')
let rightScroll = document.getElementById('scrollRight')

let popSong = document.getElementsByClassName('popular-song__pop-song')[0];

leftScroll.addEventListener('click', () => {
    popSong.scrollLeft -= 330;
})

rightScroll.addEventListener('click', () => {
    popSong.scrollRight += 330;
    console.log('right')
})

let leftScrolls = document.getElementById('scrollLefts')
let rightScrolls = document.getElementById('scrollRights')

let item = document.getElementsByClassName('item')[0];

leftScrolls.addEventListener('click', () => {
    item.scrollLeft -= 330;
})

rightScrolls.addEventListener('click', () => {
    item.scrollRight += 330;
})