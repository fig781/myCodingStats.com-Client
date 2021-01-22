<template>
  <div id="custom-time-input-container">
    <div id="selected" @click="open = !open">
      {{ timeInput }}
    </div>
    <div id="dropdown" v-if="open" v-on-clickaway="away">
      <div class="time-clicker">
        <div class="button increase-hours-button" @click="increaseHours">
          <img class="arrow" src="../../assets/up-arrow.png" alt="arrow" />
        </div>
        <div class="time-window">
          <div id="hours">
            {{ hoursInput }}
          </div>
        </div>
        <div class="button" @click="decreaseHours">
          <img class="arrow" src="../../assets/down-arrow.png" alt="arrow" />
        </div>
      </div>
      <div class="time-clicker">
        <div class="button" @click="increaseMinutes">
          <img class="arrow" src="../../assets/up-arrow.png" alt="arrow" />
        </div>
        <div class="time-window minutes">
          <div id="minutes">
            {{ minutesInput }}
          </div>
        </div>
        <div class="button" @click="decreaseMinutes">
          <img class="arrow" src="../../assets/down-arrow.png" alt="arrow" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { directive as onClickaway } from 'vue-clickaway';

  export default {
    name: 'CustomTimeInput',
    directives: {
      onClickaway: onClickaway,
    },
    data() {
      return {
        open: false,
        hoursInput: '00',
        minutesInput: '00',
      };
    },
    props: {
      timeInput: {
        type: String,
        default: '0:00',
      },
    },
    methods: {
      away: function() {
        this.open = false;
      },
      increaseHours() {
        let hours = parseInt(this.hoursInput);
        if (hours + 1 == 24) {
          hours = 0;
        } else {
          hours++;
        }
        if (hours < 10) {
          this.hoursInput = '0' + hours.toString();
        } else {
          this.hoursInput = hours.toString();
        }
        let compiledTime = this.hoursInput + ':' + this.minutesInput;
        if (compiledTime[0] == '0') {
          compiledTime = compiledTime.substring(1, 5);
        }
        this.$emit('change', compiledTime);
      },
      decreaseHours() {
        let hours = parseInt(this.hoursInput);
        if (hours == 0) {
          hours = 23;
        } else {
          hours--;
        }
        if (hours < 10) {
          this.hoursInput = '0' + hours.toString();
        } else {
          this.hoursInput = hours.toString();
        }
        let compiledTime = this.hoursInput + ':' + this.minutesInput;
        if (compiledTime[0] == '0') {
          compiledTime = compiledTime.substring(1, 5);
        }
        this.$emit('change', compiledTime);
      },
      increaseMinutes() {
        let minutes = parseInt(this.minutesInput);
        if (minutes == 55) {
          minutes = 0;
        } else {
          minutes += 5;
        }
        if (minutes < 10) {
          this.minutesInput = '0' + minutes.toString();
        } else {
          this.minutesInput = minutes.toString();
        }
        let compiledTime = this.hoursInput + ':' + this.minutesInput;
        if (compiledTime[0] == '0') {
          compiledTime = compiledTime.substring(1, 5);
        }
        this.$emit('change', compiledTime);
      },
      decreaseMinutes() {
        let minutes = parseInt(this.minutesInput);
        if (minutes == 0) {
          minutes = 55;
        } else {
          minutes -= 5;
        }
        if (minutes < 10) {
          this.minutesInput = '0' + minutes.toString();
        } else {
          this.minutesInput = minutes.toString();
        }
        let compiledTime = this.hoursInput + ':' + this.minutesInput;
        if (compiledTime[0] == '0') {
          compiledTime = compiledTime.substring(1, 5);
        }
        this.$emit('change', compiledTime);
      },
    },
    created() {
      if (this.timeInput.length == 5) {
        this.hoursInput = this.timeInput.slice(0, 2);
        this.minutesInput = this.timeInput.slice(3, 5);
      } else if (this.timeInput.length == 4) {
        this.hoursInput = '0' + this.timeInput.slice(0, 1);
        this.minutesInput = this.timeInput.slice(2, 4);
      }
    },
  };
</script>

<style scoped>
  #custom-time-input-container {
    margin-top: 4px;
    margin-bottom: 10px;
  }
  #selected {
    cursor: pointer;
    border: 1px solid black;
    padding: 5px 10px;
    font-size: 18px;
    border-radius: 2px;
    min-height: 23px;
  }
  #selected:hover {
    border: solid 1px #0069ff;
    outline: #0069ff;
  }
  #dropdown {
    border-bottom: 1px solid black;
    border-right: 1px solid black;
    border-left: 1px solid black;
    position: absolute;
    z-index: 99;
    background: white;
    display: flex;
    border-radius: 2px;
    box-shadow: 2px 2px 2px 2px #8080806e;
  }
  .button {
    cursor: pointer;
    padding: 5px;
    background-color: #ced6e7;
    margin: 5px;
    text-align: center;
    border-radius: 5px;
  }
  .button:hover {
    background-color: #afb8cc;
  }
  img {
    max-width: 16px;
    max-height: 16px;
  }
  .time-window {
    padding: 5px;
    border: 1px solid black;
    margin: 5px;
    border-radius: 2px;
  }
</style>
