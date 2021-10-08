export const fullScreenMixin = {
    data() {
        return {
            isFullscreen: true,
        }
    },
    mounted() {
        let isFullscreen =
            document.fullscreenElement ||
            document.mozFullScreenElement ||
            document.webkitFullscreenElement ||
            document.fullScreen ||
            document.mozFullScreen ||
            document.webkitIsFullScreen;
        isFullscreen = !isFullscreen;
        let that = this;
        document.addEventListener("fullscreenchange", () => {
            that.isFullScren = !that.isFullScren;
        });
        document.addEventListener("mozfullscreenchange", () => {
            that.isFullScren = !that.isFullScren;
        });
        document.addEventListener("webkitfullscreenchange", () => {
            that.isFullScren = !that.isFullScren;
        });
        document.addEventListener("msfullscreenchange", () => {
            that.isFullScren = !that.isFullScren;
        });
    },
    methods: {
        fullScreenEvent() {
            let el = document.getElementById("full-Screen");
            if (this.isFullscreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                if (el.requestFullscreen) {
                    el.requestFullscreen();
                } else if (el.mozRequestFullScreen) {
                    el.mozRequestFullScreen();
                } else if (el.webkitRequestFullScreen) {
                    el.webkitRequestFullScreen();
                } else if (el.msRequestFullscreen) {
                    el.msRequestFullscreen();
                }
            }
        },
    }
}