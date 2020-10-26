<template>
  <div id="calendar-day-edit-mask">
    <div id="calendar-day-edit-inner">
      <form @submit.prevent="onSubmit">
        <div id="date">
          <h2>{{ oneCalendarDay.day }} {{ oneCalendarDay.date }}</h2>
        </div>
        <label for="active">Active Learning Time</label><br />
        <input
          type="text"
          class="input"
          name="active"
          placeholder="hh:mm"
          v-model="formData.activeTime"
        /><br />

        <label for="passive">Passive Learning Time</label><br />
        <input
          type="text"
          class="input"
          name="passive"
          placeholder="hh:mm"
          v-model="formData.passiveTime"
        /><br />

        <label for="codingChallenges">Coding Challenges Time</label><br />
        <input
          type="text"
          class="input"
          name="codingChallenges"
          placeholder="hh:mm"
          v-model="formData.codingChallengesTime"
        /><br />

        <label for="tag">Tag</label><br />
        <select type="text" class="input" name="tag" v-model="formData.tag">
          <option v-for="tag in allTags" :key="tag.id" value="tag">{{
            tag.name
          }}</option> </select
        ><br />

        <label for="project">Project</label><br />
        <select
          type="text"
          class="input"
          name="project"
          v-model="formData.project"
        >
          <option
            v-for="project in allProjects"
            :key="project.id"
            value="project"
            >{{ project.name }}</option
          ></select
        ><br />

        <label for="description">Description</label><br />
        <textarea
          name="description"
          id=""
          class="input"
          cols="30"
          rows="6"
          v-model="formData.description"
          @keyup="remainingCharCount()"
        ></textarea>
        <p>{{ descChar }} characters left</p>
      </form>
      <div id="cancel" class="button" @click="$emit('close')">Cancel</div>
      <input
        id="submit"
        class="button"
        type="submit"
        value="Submit"
        @click="onSubmit()"
      />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CalendarDayEdit',
    data() {
      return {
        descChar: 300,
        formData: {
          activeTime: '',
          passiveTime: '',
          codingChallengesTime: '',
          tag: '',
          project: '',
          description: '',
        },
      };
    },
    props: {
      oneCalendarDay: Object,
    },
    methods: {
      onSubmit() {
        this.$emit('close');
      },
      remainingCharCount: function() {
        const maxChar = 300;
        this.descChar = maxChar - this.formData.description.length;
        if (this.descChar < 0) {
          this.descChar = 0;
        }
      },
    },
    computed: {
      allTags() {
        return this.$store.getters.getAllTags;
      },
      allProjects() {
        return this.$store.getters.getAllProjects;
      },
    },
    created() {
      this.formData.activeTime = this.oneCalendarDay.active;
      this.formData.passiveTime = this.oneCalendarDay.passive;
      this.formData.codingChallengesTime = this.oneCalendarDay.coding;
      this.formData.tag = this.oneCalendarDay.tag;
      this.formData.project = this.oneCalendarDay.project;
      this.formData.description = this.oneCalendarDay.description;
      this.remainingCharCount();
    },
  };
</script>

<style scoped>
  #calendar-day-edit-mask {
    position: fixed; /* Stay in place */
    z-index: 99; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */

    background-color: rgba(0, 0, 0, 0.623);
  }

  #calendar-day-edit-inner {
    margin: auto;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    border-radius: 3px;
    width: 400px;
    padding: 40px 40px 60px 40px;
    margin-top: 5%;
  }

  #date {
    margin-bottom: 15px;
  }
  img {
    margin: 20px;
    width: 16px;
    height: 16px;
  }

  .input {
    width: 100%;
    padding: 5px 10px;
    margin: 8px 0;
    box-sizing: border-box;
    font-size: 18px;
  }
  textarea {
    resize: none;
    margin-bottom: 0;
    padding-bottom: 0;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .button {
    float: right;
    margin-top: 5px;
    margin-bottom: 13px;
    width: 8rem;
    padding: 10px;
    border: none;
    outline: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    text-align: center;
  }
  #submit {
    background-color: #5f7bb6;
    color: white;
    margin-right: 5px;
  }
  #cancel {
    background-color: #ced6e7;
    color: black;
  }
</style>
