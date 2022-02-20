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

