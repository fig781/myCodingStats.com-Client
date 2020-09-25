<template>
  <div id="calendar-day-edit-mask">
    <div id="calendar-day-edit-inner">
      <button @click="$emit('close')">X</button>
      <div id="date">
        <h2>{{ oneCalendarDay.date }}</h2>
        <h2>{{ oneCalendarDay.day }}</h2>
      </div>
      <form @submit.prevent="onSubmit">
        <label for="active">Active Learning Time</label><br />
        <input
          type="text"
          id="active"
          name="active"
          placeholder="hh:mm"
          :value="oneCalendarDay.active"
        /><br />

        <label for="passive">Passive Learning Time</label><br />
        <input
          type="text"
          id="passive"
          name="passive"
          placeholder="hh:mm"
          :value="oneCalendarDay.passive"
        /><br />

        <label for="codingChallenges">Coding Challenges Time</label><br />
        <input
          type="text"
          id="coding-challenges"
          name="codingChallenges"
          placeholder="hh:mm"
          :value="oneCalendarDay.coding"
        /><br />

        <label for="project">Project</label><br />
        <input
          type="text"
          id="project"
          name="project"
          :value="oneCalendarDay.project"
        /><br />

        <label for="description">Description</label><br />
        <input
          type="text"
          id="description"
          name="description"
          :value="oneCalendarDay.desc"
        /><br />

        <input type="submit" value="Submit" />
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CalendarDayEdit',
    data() {
      return {};
    },
    props: {
      oneCalendarDay: Object,
    },
    methods: {
      onSubmit() {
        console.log('yeet');
        this.$emit('close');
      },
    },
  };
</script>

<style>
  #calendar-day-edit-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  #calendar-day-edit-inner {
    max-width: 300px;
    max-height: 500px;
    position: absolute;
    margin: 0px auto;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  }
</style>
