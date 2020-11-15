<template>
  <div>
    <SideNavigationBar />
    <div id="main-container">
      <div id="tags-container">
        <h1>Add or Remove Tags</h1>
        <p>Tags are used to mark the type of work you've done each day.</p>
        <div class="table-container">
          <h3 v-if="allTags.length == 0">No tags have been added</h3>
          <div class="button-row">
            <div class="icon" @click="toggleAppSettingsEdit('Tag')"></div>
          </div>
          <AppSettingsTable :allEntries="allTags" v-if="allTags.length != 0" />
        </div>
      </div>
      <div id="projects-container">
        <h1>Add or Remove Projects</h1>
        <p>
          Use the projects tag to track what project you were working on each
          day.
        </p>
        <div class="table-container">
          <h3 v-if="allProjects.length == 0">No projects have been added</h3>
          <div class="button-row">
            <div class="icon" @click="toggleAppSettingsEdit('Project')"></div>
          </div>
          <AppSettingsTable
            :allEntries="allProjects"
            v-if="allProjects.length != 0"
          />
        </div>
      </div>
    </div>

    <AppSettingsEdit
      v-if="showAppSettingsEdit"
      @close="showAppSettingsEdit = false"
      :type="whatIsBeingAdded"
    />
  </div>
</template>

<script>
  import SideNavigationBar from '../components/SideNavigationBar';
  import AppSettingsTable from '../components/AppSettingsTable';
  import AppSettingsEdit from '../components/AppSettingsEdit';

  export default {
    name: 'AppSettings',
    data() {
      return {
        showAppSettingsEdit: false,
        whatIsBeingAdded: String,
      };
    },
    components: {
      SideNavigationBar,
      AppSettingsTable,
      AppSettingsEdit,
    },
    methods: {
      toggleAppSettingsEdit(type) {
        this.whatIsBeingAdded = type;
        this.showAppSettingsEdit = true;
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
    async created() {
      this.$store.dispatch('fetchAllTags');
      this.$store.dispatch('fetchAllProjects');
    },
  };
</script>

<style scoped>
  #main-container {
    margin-left: 5rem;
  }
  h1 {
    font-family: 'Montserrat', sans-serif;
    margin-bottom: 10px;
  }
  p {
    margin-bottom: 4px;
  }
  #tags-container {
    margin-left: 3rem;
    padding-top: 3rem;
  }

  #projects-container {
    margin-left: 3rem;
    margin-top: 3rem;
  }

  .table-container {
    width: 28rem;
  }
  .button-row {
    display: flex;
    justify-content: flex-end;
  }
  .icon {
    width: 22px;
    height: 22px;
    border-radius: 100%;
    position: relative;
    vertical-align: middle;
    background: #5f7bb6;
    cursor: pointer;
  }
  .icon:hover {
    background: #2a54b1;
  }
  .icon:before,
  .icon:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  /* PLUS */
  .icon:before,
  .icon:after {
    background: #f0f3f6;
  }
  .icon:before {
    width: 2px;
    margin: 3px auto;
  }
  .icon:after {
    margin: auto 3px;
    height: 2px;
    box-shadow: none;
  }
  h3 {
    margin: 4rem;
  }
</style>
