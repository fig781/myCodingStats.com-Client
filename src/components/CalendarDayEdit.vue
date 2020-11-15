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
        <CustomSelect
          :options="allTags"
          :default="formData.tag"
          @input="insertTag"
        />
        <br />

        <label for="project">Project</label><br />
        <CustomSelect
          :options="allProjects"
          :default="formData.project"
          @input="insertProject"
        />
        <br />

        <label for="description">Description</label><br />
        <textarea
          name="description"
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
  import CustomSelect from './CustomSelect';
  export default {
    name: 'CalendarDayEdit',
    components: {
      CustomSelect,
    },
    data() {
      return {
        descChar: 300,
        formData: {
          activeTime: '',
          passiveTime: '',
          codingChallengesTime: '',
          tag: { id: null, name: null },
          project: { id: null, name: null },
          description: '',
        },
      };
    },
    props: {
      oneCalendarDay: Object,
    },
    methods: {
      insertTag(option) {
        this.formData.tag.id = option.id;
        this.formData.tag.name = option.name;
      },
      insertProject(option) {
        this.formData.project.id = option.id;
        this.formData.project.name = option.name;
      },
      onSubmit() {
        const requestInfo = this.compiledRequestInfo();
        this.$store.dispatch('addGridRow', requestInfo);
        this.$emit('close');
      },
      remainingCharCount: function() {
        const maxChar = 300;
        this.descChar = maxChar - this.formData.description.length;
        if (this.descChar < 0) {
          this.descChar = 0;
        }
      },
      compiledRequestInfo() {
        let returnValue = {
          inAppId: this.oneCalendarDay.id,
          inAppDate: this.oneCalendarDay.date,
          activeTime: this.formData.activeTime,
          passiveTime: this.formData.passiveTime,
          codingChallengesTime: this.formData.codingChallengesTime,
          tag: this.formData.tag,
          project: this.formData.project,
          description: this.formData.description,
        };
        return returnValue;
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
      //autistic
      function cloneValue(external) {
        const internalToCloneTo = {};
        internalToCloneTo.id = external.id;
        internalToCloneTo.name = external.name;
        return internalToCloneTo;
      }

      this.formData.activeTime = this.oneCalendarDay.active;
      this.formData.passiveTime = this.oneCalendarDay.passive;
      this.formData.codingChallengesTime = this.oneCalendarDay.coding;
      this.formData.tag = cloneValue(this.oneCalendarDay.tag);
      if (this.formData.tag.id == null) {
        //invisable character for name
        this.formData.tag = { id: null, name: '‎' };
      }
      this.formData.project = cloneValue(this.oneCalendarDay.project);
      if (this.formData.project.id == null) {
        //invisable character for name
        this.formData.project = { id: null, name: '‎' };
      }
      this.formData.description = this.oneCalendarDay.description;
      this.remainingCharCount();
    },
  };
</script>

<style scoped>
  #calendar-day-edit-mask {
    position: fixed;
    z-index: 99;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
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

  option {
    overflow: hidden;
    max-width: inherit;
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
  #submit:hover {
    background: #2a54b1;
  }
  #cancel {
    background-color: #ced6e7;
    color: black;
  }
  #cancel:hover {
    background-color: #afb8cc;
  }
</style>
