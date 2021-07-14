const audio = document.querySelector("audio");
const image = document.getElementById("image");
const playButton = document.getElementById("play");
const playNext = document.getElementById("next");
const playPrev = document.getElementById("prev");
const songTitle = document.getElementById("title");
const singerName = document.getElementById("singer");
const bar = document.getElementById("bar");
const curr = document.getElementById("current_time");
const ttl = document.getElementById("total_time");
const progress_bar = document.getElementById("progress_bar");
const replay = document.getElementById("replay");
const forward = document.getElementById("forward");
const volup = document.getElementById("vol_up");
const voldown = document.getElementById("vol_down");
const volmute = document.getElementById("vol_mute");
const card = document.getElementsByClassName("card");

let isPlaying = false;

//play song
const playSong = () => {
  isPlaying = true;
  audio.play();
  document.getElementById("play").src = "images/pause.svg";
  image.classList.add("animateimage");
};

//pause song
const pauseSong = () => {
  isPlaying = false;
  audio.pause();
  document.getElementById("play").src = "images/play.svg";
  image.classList.remove("animateimage");
};

//play pause button
playButton.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

//music list
const list = [
  {
    songTitle: "Daddy Issues",
    singerName: "The Neighbourhood",
    image: "1",
    audio: "music1",
  },
  {
    songTitle: "Cry Baby",
    singerName: "The Neighbourhood",
    image: "2",
    audio: "music2",
  },
  {
    songTitle: "RIP my youth",
    singerName: "The Neighbourhood",
    image: "3",
    audio: "music3",
  },
  {
    songTitle: "Sweater Weather",
    singerName: "The Neighbourhood",
    image: "4",
    audio: "music4",
  },
  {
    songTitle: "Flawless",
    singerName: "The Neighbourhood",
    image: "5",
    audio: "music5",
  },
];

//loading song content
const loading = (list) => {
  singerName.textContent = list.singerName;
  songTitle.textContent = list.songTitle;
  image.src = "images/img-" + list.image + ".jpg";
  audio.src = "music/" + list.audio + ".mp3";
};

let i = 0;

//go to next song
const nextSong = () => {
  i = (i + 1) % list.length;
  loading(list[i]);
  playSong();
};

//go to prev song
const prevSong = () => {
  i = (i + 2) % list.length;
  loading(list[i]);
  playSong();
};

audio.addEventListener("timeupdate", (event) => {
  const { currentTime, duration } = event.target;
  let prog_time = (currentTime / duration) * 100;
  bar.style.width = `${prog_time}%`;

  // total time
  let min_dur = Math.floor(duration / 60);
  let sec_dur = Math.floor(duration % 60);

  if (duration) {
    let total_dur = `${min_dur}:${sec_dur}`;
    ttl.innerHTML = total_dur;
  }

  //current time
  let min_start = Math.floor(currentTime / 60);
  let sec_start = Math.floor(currentTime % 60);
  if (sec_start < 10) {
    sec_start = `0${sec_start}`;
  }
  let total_start = `${min_start}:${sec_start}`;
  curr.innerHTML = total_start;
});

//onclick progressbar change
progress_bar.addEventListener("click", (event) => {
  const { duration } = audio;
  //clientWidth = 300
  let progg = (event.offsetX / 280) * duration;
  audio.currentTime = progg;
});

//rewind 10 secs
const replayFunc = () => {
  const { currentTime } = audio;
  audio.currentTime = currentTime - 10;
};

//forward 10 sec
const forwardFunc = () => {
  const { currentTime } = audio;
  audio.currentTime = currentTime + 10;
};

//volume up by 0.25
const volupFunc = () => {
  audio.volume += 0.25;
};

//volume down by 0.25
const voldownFunc = () => {
  audio.volume -= 0.25;
};

replay.addEventListener("click", replayFunc);
forward.addEventListener("click", forwardFunc);
volup.addEventListener("click", volupFunc);
voldown.addEventListener("click", voldownFunc);

//go to next song if ended
audio.addEventListener("ended", nextSong);

//play next or previous song
playNext.addEventListener("click", nextSong);
playPrev.addEventListener("click", prevSong);

////mute
volmute.addEventListener("click", () => {
  if (audio.volume === 1) {
    audio.volume = 0;
    document.getElementById("vol_mute").src = "images/volume-off.svg";
  } else {
    audio.volume = 1;
    document.getElementById("vol_mute").src = "images/soundon.svg";
  }
});

document.body.onkeyup = function (e) {
    //spacebar play pause
    if (e.keyCode == 32) {
        isPlaying ? pauseSong() : playSong();
    }
    //arrow up to increase volume
    if (e.keyCode == 38) {
        volupFunc();
    }
    //arrow down to decrease volume
    if (e.keyCode == 40) {
        voldownFunc();
    }
    //arrow right to skip by 10seconds
    if (e.keyCode == 39) {
        forwardFunc();
    }
    //arrow left to rewind by 10seconds
    if (e.keyCode == 37) {
        replayFunc();
    }
}