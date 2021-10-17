<template>
    <span>
        {{ content }}
    </span>
</template>

<script>
export default {
    data() {
        return {
            content: '',
            // data1: new Date().toString(),
            timer: null
        };
    },
    props: {
        date: {
            type: String,
            default: new Date().toString()
        },
        time: {
            type: Number,
            default: 0,
            dateTimeStamp: ''
        }
    },
    mounted() {
        this.diffTime();
        this.timer = setInterval(() => {
            this.diffTime();
        }, 1000 * 60);
    },
    beforeDestroy() {
        clearInterval(this.timer);
        this.timer = null;
    },
    methods: {
        diffTime() {
            let date1 = this.date;
            date1 = date1.replace(/-/g, '/');
            this.dateTimeStamp = this.time;
            if (!this.dateTimeStamp) {
                if (!date1) {
                    return '刚刚';
                }
                this.dateTimeStamp = new Date(date1).getTime();
            }
            let minute = 1000 * 60;
            let hour = minute * 60;
            let day = hour * 24;
            let halfamonth = day * 15;
            let month = day * 30;
            let now = new Date().getTime();
            let diffValue = now - this.dateTimeStamp;
            let monthC = diffValue / month;
            let weekC = diffValue / (7 * day);
            let dayC = diffValue / day;
            let hourC = diffValue / hour;
            let minC = diffValue / minute;
            if (parseInt(minC) < 1) {
                this.content = '刚刚';
            } else if (parseInt(dayC) > 1) {
                this.content = parseInt(dayC) + '天前';
            } else if (parseInt(dayC) === 1) {
                this.content = '昨天';
            } else if (parseInt(hourC) >= 1) {
                this.content = parseInt(hourC) + '小时前';
            } else if (parseInt(minC) >= 1) {
                this.content = parseInt(minC) + '分钟前';
            } else {
                this.content = parseInt(monthC) + '个月前';
            }
        }
    }
};
</script>

<style></style>
