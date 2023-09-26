const hello = console.warn(
    "%c\ud83d\ude4b welcome to my Mindx project",
    "color: #29c4a9;font-size: 16px;font-weight: 600;"
);
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const players = $(".player");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const cd = $(".cd");
const playBtn = $(".btn-toggle-play");
const backgroundVideo = $("#background-video");
const playlist = $(".playlist");
const mainSong = $(".cd");
const progress = $("#progress");
const nextBtn = $(".btn-next");
const prevBtn = $(".btn-prev");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const volumeUpBtn = document.querySelector(".btn-volume-up");
const volumeDownBtn = document.querySelector(".btn-volume-down");
const audio2 = document.getElementById("audio");

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    isVideoLoaded: false,

    songs: [
        {
            name: "Ex’s Hate Me (Part 2)",
            singer: "B RAY - AMEE",
            path: "accset/audio/exhateme.mp3",
            image: "accset/img/exhateme.jpg",
            video: "https://drive.google.com/uc?export=download&id=1uN2Vou_ldvZkdKx-tdjLaz0mmSoP_uSY",
        },
        {
            name: "Cao ốc 20",
            singer: "B RAY - DatG",
            path: "accset/audio/caooc20.mp3",
            image: "accset/img/caooc20.jpg",
            video: "https://drive.google.com/uc?export=download&id=1BeJ4ZKJ8NOPsTNYC0z0fLk_sq8iIimcF",
        },
        {
            name: "An thần",
            singer: "Low G - Thắng",
            path: "accset/audio/anthan.mp3",
            image: "accset/img/anthan.jpg",
            video: "https://drive.google.com/uc?export=download&id=1VcHzIaKvBn-8MH8JLS8Hr61iu5Di2B0Z",
        },
        {
            name: "Không thích",
            singer: "Low G",
            path: "accset/audio/khongthich.mp3",
            image: "accset/img/khongthich.jpg",
            video: "https://drive.google.com/uc?export=download&id=1IsOq016Ur9tNA4dAPMoUu4O8-FQbkfap",
        },
        {
            name: "Người đi bao",
            singer: "Tlinh - Low G",
            path: "accset/audio/nguoidibao.mp3",
            image: "accset/img/nguoidibao.jpg",
            video: "https://drive.google.com/uc?export=download&id=1p2czp_ea0dTmfjT8ughap5yvImIiXxDP",
        },
        {
            name: "Diễn viên tồi",
            singer: "Đen - Thành Bùi,Cadillac",
            path: "accset/audio/dienvientoi.mp3",
            image: "accset/img/dienvientoi.jpg",
            video: "https://drive.google.com/uc?export=download&id=1_28rfFRBurGmtqLWlW4lAF8D1r2KMFDY",
        },
        {
            name: "Luôn yêu đời",
            singer: "Đen - Cheng",
            path: "accset/audio/luonyeudoi.mp3",
            image: "accset/img/luonyeudoi.jpg",
            video: "https://drive.google.com/uc?export=download&id=1jw9pI384TanY147EqLOi9SADuahKE0Xn",
        },
        {
            name: "Bài này chill phết",
            singer: "Đen - Min",
            path: "accset/audio/bainaychillphet.mp3",
            image: "accset/img/bainaychillphet.jpg",
            video: "https://drive.google.com/uc?export=download&id=1PIS2buG0qJ1FJXg0zaO_4nY2CvjZ_v8E",
        },
    ],

    render: function () {
        const htmls = this.songs.map((song, index) => {
            return `
                <div class="song ${
                    index === this.currentIndex ? "active" : ""
                }" data-index="${index}">
                    <div class="thumb" style="background-image: url('${
                        song.image
                    }')"></div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>`;
        });
        $(".playlist").innerHTML = htmls.join("");
    },
    defineProperties: function () {
        Object.defineProperty(this, "currentSong", {
            get: function () {
                return this.songs[this.currentIndex];
            },
        });
    },
    handleEvents: function () {
        const _this = this;
        const cdWidth = cd.offsetWidth;
        const volumeUpBtn = document.querySelector(".btn-volume-up");
        const volumeDownBtn = document.querySelector(".btn-volume-down");
        volumeUpBtn.onclick = function () {
            if (audio.volume < 1) {
                audio.volume += 0.1;
            }
            volumeUpBtn.classList.add("active");
            setTimeout(function () {
                volumeUpBtn.classList.remove("active");
            }, 300);
        };
        volumeDownBtn.onclick = function () {
            if (audio.volume > 0) {
                audio.volume -= 0.1;
            }
            volumeDownBtn.classList.add("active");
            setTimeout(function () {
                volumeDownBtn.classList.remove("active");
            }, 300);
        };
        const cdThumAnimate = cdThumb.animate(
            [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
            {
                duration: 20000,
                iterations: Infinity,
            }
        );

        cdThumAnimate.pause();
        playBtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        };
        audio.onplay = function () {
            _this.isPlaying = true;
            players.classList.add("playing");
            cdThumAnimate.play();
        };
        audio.onpause = function () {
            _this.isPlaying = false;
            players.classList.remove("playing");
            cdThumAnimate.pause();
        };
        audio.addEventListener("timeupdate", function () {
            const currentTime = audio.currentTime;
            const duration = audio.duration;
            const progressPercent = (currentTime / duration) * 100;
            progress.value = progressPercent;
        });
        audio.ontimeupdate = function () {
            if (audio.duration && !audio.paused) {
                const currentTime = audio.currentTime;
                const duration = audio.duration;
                const progress = currentTime / duration;
                backgroundVideo.currentTime =
                    progress * backgroundVideo.duration;
                backgroundVideo.play();
                const progressPercent = Math.floor(
                    (audio.currentTime / audio.duration) * 100
                );
                progress.value = progressPercent;
            } else {
                backgroundVideo.pause();
            }
        };

        progress.oninput = function (e) {
            const seekTime = (audio.duration / 100) * e.target.value;
            audio.currentTime = seekTime;
        };

        nextBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong();
            } else {
                _this.nextSong();
            }
            nextBtn.classList.add("active");
            setTimeout(function () {
                nextBtn.classList.remove("active");
            }, 300);
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        };

        prevBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong();
            } else {
                _this.prevSong();
            }
            prevBtn.classList.add("active");
            setTimeout(function () {
                prevBtn.classList.remove("active");
            }, 300);
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        };

        randomBtn.onclick = function (e) {
            _this.isRandom = !_this.isRandom;
            randomBtn.classList.toggle("active", _this.isRandom);
        };
        repeatBtn.onclick = function (e) {
            _this.isRepeat = !_this.isRepeat;
            repeatBtn.classList.toggle("active", _this.isRepeat);
        };
        audio.onended = function () {
            if (_this.isRandom) {
                _this.playRandomSong();
            } else if (_this.isRepeat) {
                audio.play();
            } else {
                _this.nextSong();
            }
            audio.play();
        };
        playlist.onclick = function (e) {
            const songNode = e.target.closest(".song:not(.active)");
            if (songNode || !e.target.closest(".option")) {
                if (songNode) {
                    _this.currentIndex = Number(songNode.dataset.index);
                    _this.loadCurrentSong();
                    _this.render();
                    audio.play();
                }
            }
        };
    },
    scrollToActiveSong: function () {
        setTimeout(() => {
            $(".song.active").scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }, 100);
    },
    loadVideo: function () {
        if (!this.isVideoLoaded) {
            backgroundVideo.load();
            this.isVideoLoaded = true;
        }
    },

    loadCurrentSong: function () {
        const currentSong = this.songs[this.currentIndex];
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`;
        audio.src = this.currentSong.path;
        backgroundVideo.src = this.currentSong.video;
        this.loadVideo();
    },
    nextSong: function () {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
        this.render();
        this.scrollToActiveSong();
    },
    prevSong: function () {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.song.length - 1;
        }
        this.loadCurrentSong();
        this.render();
        this.scrollToActiveSong();
    },
    playRandomSong: function () {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        } while (newIndex === this.currentIndex);
        this.currentIndex = newIndex;
        this.loadCurrentSong();
        this.render();
        this.scrollToActiveSong();
    },

    start: function () {
        this.defineProperties();
        this.handleEvents();
        this.loadCurrentSong();
        this.render();
    },
};
app.start();
