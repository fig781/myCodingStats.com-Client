<template>
  <div>
    <SideNavigationBar />
    <div id="main-container">
      <div id="tags-container">
        <h1>Add or Remove Tags</h1>
        <p>Tags are used to mark the type of work you've done each day.</p>
        <button @click="toggleAppSettingsEdit('Tag')">Add Tag</button>
        <AppSettingsTable :allEntries="allTags" v-if="allTags.length != 0" />
        <h3 v-if="allTags.length == 0">No tags have been added</h3>
      </div>
      <div id="projects-container">
        <h1>Add or Remove Projects</h1>
        <p>
          Use the projects tag to track what project you were working on each
          day.
        </p>
        <button @click="toggleAppSettingsEdit('Project')">Add Project</button>
        <AppSettingsTable
          :allEntries="allProjects"
          v-if="allProjects.length != 0"
        />
        <h3 v-if="allProjects.length == 0">No projects have been added</h3>
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
    margin-left: 7rem;
  }

  #tags-container {
    margin-left: 3rem;
    padding-top: 3rem;
  }

  #projects-container {
    margin-left: 3rem;
  }

  h3 {
    margin: 4rem;
  }
</style>
