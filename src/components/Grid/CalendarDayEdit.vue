<template>
  <div id="calendar-day-edit-mask">
    <div id="calendar-day-edit-inner">
      <form @submit.prevent="onSubmit">
        <div id="date">
          <h1>{{ oneCalendarDay.day }} {{ oneCalendarDay.date }}</h1>
        </div>
        <label for="active">Active Learning Time</label><br />
        <CustomTimeInput :timeInput="formData.activeTime" @change="updateActive" />

        <label for="passive">Passive Learning Time</label><br />
        <CustomTimeInput :timeInput="formData.passiveTime" @change="updatePassive" />

        <label for="codingChallenges">Coding Challenges Time</label><br />
        <CustomTimeInput
          :timeInput="formData.codingChallengesTime"
          @change="updateCodingTime"
        />

        <div class="no-tags">
          <label for="tag">Tag</label>
          <div v-if="allTags.length == 0">
            <i> - No Tags - </i>
            <p
              @click="
                $router.push({ name: 'Settings', params: { id: user.userId } })
              "
            >
              Settings
            </p>
          </div>
        </div>

        <CustomSelect
          :options="allTags"
          :default="formData.tag"
          @input="insertTag"
        />
        <br />

        <div class="no-tags">
          <label for="projects">Projects</label>
          <div v-if="allProjects.length == 0">
            <i> - No Projects - </i>
            <p
              @click="
                $router.push({ name: 'Settings', params: { id: user.userId } })
              "
            >
              Settings
            </p>
          </div>
        </div>
        <CustomSelect
          :options="allProjects"
          :default="formData.project"
          @input="insertProject"
        />
        <br />

        <label for="description">Description</label><br />
        <InputErrorMessage
          v-if="descriptionErrorMessage"
          :message="descriptionErrorMessage"
        />
        <textarea
          name="description"
          class="input description-input"
          v-model="formData.description"
          @keyup="remainingCharCount()"
        ></textarea>

        <p>{{ descChar }} characters left</p>
      </form>
      <div class="btn-container">
        <button id="submit" class="button" @click="onSubmit()">Submit</button>
        <button id="cancel" class="button" @click="$emit('close')">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
  import CustomSelect from './CustomSelect';
  import InputErrorMessage from '../InputErrorMessage';
  import CustomTimeInput from './CustomTimeInput';

  export default {
    name: 'CalendarDayEdit',
    components: {
      CustomSelect,
      InputErrorMessage,
      CustomTimeInput,
    },
    data() {
      return {
        descChar: 200,
        formData: {
          activeTime: '',
          passiveTime: '',
          codingChallengesTime: '',
          tag: { id: null, name: null },
          project: { id: null, name: null },
          description: '',
        },
        descriptionErrorMessage: '',
        activeErrorMessage: '',
        passiveErrorMessage: '',
        codingErrorMessage: '',
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
      updateActive(compiledTime) {
        this.formData.activeTime = compiledTime;
      },
      updatePassive(compiledTime) {
        this.formData.passiveTime = compiledTime;
      },
      updateCodingTime(compiledTime) {
        this.formData.codingChallengesTime = compiledTime;
      },
      validateDescription(description) {
        if (description.length > 200) {
          return 'Too many characters';
        } else {
          return '';
        }
      },

      onSubmit() {
        const descriptionValid = this.validateDescription(this.formData.description);
        if (descriptionValid.length != 0) {
          this.descriptionErrorMessage = descriptionValid;
        } else {
          const requestInfo = this.compiledRequestInfo();
          this.$store.dispatch('addGridRow', requestInfo);
          this.$emit('close');
        }
      },
      remainingCharCount: function() {
        const maxChar = 200;
        this.descChar = maxChar - this.formData.description.length;
        if (this.descChar < 0) {
          this.descChar = 0;
        }
      },
      compiledRequestInfo() {
        if (this.formData.tag.id == null) {
          this.formData.tag.name = null;
        }
        if (this.formData.project.id == null) {
          this.formData.project.name = null;
        }

        let normalizedDate = this.oneCalendarDay.date;
        let month = normalizedDate[0] + normalizedDate[1];
        if (month != '10' && month != '11' && month != '12') {
          normalizedDate = '0' + normalizedDate;
        }
        if (normalizedDate.length == 4) {
          let lastValue = normalizedDate.slice(3, 4);
          normalizedDate = normalizedDate.substring(0, normalizedDate.length - 1);
          normalizedDate = normalizedDate + '0' + lastValue;
        }

        let returnValue = {
          inAppId: this.oneCalendarDay.id,
          inAppDate: normalizedDate,
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
      user() {
        return this.$store.getters.loggedInUser;
      },
    },
    created() {
      //need to access the body element to stop scrolling
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100%';

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
    destroyed() {
      //Set the styles back to normal when closing the modal
      document.body.style.overflow = '';
      document.body.style.height = '';
    },
  };
</script>

<style scoped>
  h1 {
    font-family: 'Montserrat', sans-serif;
  }

  #calendar-day-edit-mask {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.623);
  }

  #calendar-day-edit-inner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    border-radius: 3px;
    padding: 40px;
  }

  #date {
    margin-bottom: 15px;
    letter-spacing: 1px;
  }

  .input {
    width: 100%;
    padding: 5px 10px;
    margin-top: 4px;
    margin-bottom: 10px;
    box-sizing: border-box;
    font-size: 18px;
  }
  i {
    color: rgb(97, 97, 97);
    padding: 0 4px;
  }
  .no-tags {
    display: flex;
  }
  .no-tags div {
    display: flex;
    flex-wrap: wrap;
  }
  .no-tags p {
    color: #1f43b8;
    cursor: pointer;
  }
  .description-input {
    margin-bottom: 0px;
  }
  textarea {
    resize: none;
    border: solid 1px black;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    border-radius: var(--br-default);
  }

  textarea:hover {
    border: solid 1px #0069ff;
  }

  textarea:focus {
    border: solid 1px #0069ff;
    outline: #0069ff;
  }

  option {
    overflow: hidden;
    max-width: inherit;
  }

  .btn-container {
    display: flex;
    justify-content: end;
    margin-top: 10px;
  }
  .button {
    width: 8rem;
    padding: 10px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    text-align: center;
  }
  #submit {
    background-color: #1f43b8;
    color: white;
    margin-right: 5px;
  }
  #submit:hover {
    background: #2a54b1;
  }
  #submit:active {
    background: #2a54b1;
  }
  #cancel {
    background-color: #ced6e7;
    color: black;
  }
  #cancel:hover {
    background-color: #afb8cc;
  }
  #cancel:active {
    background-color: #afb8cc;
  }
</style>
