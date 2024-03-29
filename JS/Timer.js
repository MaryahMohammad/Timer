export default class Timer {
    constructor(root) {
        root.innerHTML = Timer.getHTML();
        this.el = {
            minutes: root.querySelector(".timer_part-minutes"),
            seconds: root.querySelector(".timer_part-seconds"), 
            control: root.querySelector(".timer_btn-control"),
            reset: root.querySelector(".timer_btn-reset"),
        };
        console.log(this.el);

        this.interval = null;
        this.remainingSeconds = 90;

        this.el.control.addEventListener('click', () => {
            if(this.interval === null){
                this.start();
            } else {
                this.stop();
            }
        });

        this.el.reset.addEventListener('click', () => {
            const inputMinutes = prompt("Enter Minuts: ");
            if (inputMinutes < 60 ){
                this.stop();
                this.remainingSeconds = inputMinutes *60;
                this.updateInterfaceTime();
            }
        }); 
    }

    //Update time
    updateInterfaceTime(){
        const minutes = Math.floor(this.remainingSeconds / 60);
        const seconds = this.remainingSeconds % 60; 
        this.el.minutes.textContent = minutes.toString().padStart(2, "0");
        this.el.seconds.textContent = seconds.toString().padStart(2, "0");
    }

    //Update buttons
    updateInterfaceControler(){
        //start icon
        if(this.interval === null){
            this.el.control.innerHTML = '<span class = "material-symbols-outlined">play_arrow</span>';
            this.el.control.classList.add("timer_btn-start");
            this.el.control.classList.remove("timer_btn-stop");
        } else {
            this.el.control.innerHTML = '<span class="material-symbols-outlined">pause</span>';
            this.el.control.classList.add("timer_btn-stop");
            this.el.control.classList.remove("timer_btn-start");
        }
    }

    start(){
        if(this.remainingSeconds === 0 )
            return;
        this.interval = setInterval(() => {
            this.remainingSeconds--;
            this.updateInterfaceTime();
            if(this.remainingSeconds === 0){
                this.stop();
            }}, 1000);

        this.updateInterfaceControler();
    }

    stop(){
        clearInterval(this.interval);
        this.interval = null;
        this.updateInterfaceControler();
    }
    static getHTML(){

        return '<span class="timer_part timer_part-minutes">00</span >\
            <span class="timer_part ">:</span>\
            <span class="timer_part timer_part-seconds">00</span>\
            <button type="button" class="timer_btn timer_btn-control timer_btn-start">\
                <span class="material-symbols-outlined">play_arrow</span>\
            </button>\
            <button type="button" class="timer_btn timer_btn-reset">\
                <span class="material-symbols-outlined">timelapse</span>\
            </button>';
    }
}