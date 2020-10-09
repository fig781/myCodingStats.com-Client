<template>
  <div>
    <SideNavigationBar />
    <div id="main-container">
      <div id="tags-container">
        <h1>Add or Remove Tags</h1>
        <p>Tags are used to mark the type of work you've done that day.</p>
        <button>Add Tag</button>
        <AppSettingsTable :allEntries="allTags" v-if="allTags.length != 0" />
        <h3 v-if="allTags.length == 0">No tags have been added</h3>
      </div>
      <div id="projects-container">
        <h1>Add or Remove Projects</h1>
        <p>
          Use the projects tag to track what project you were working on each
          day.
        </p>
        <button>Add Project</button>

        <h3>No projects have been added</h3>
      </div>
    </div>
  </div>
</template>

<script>
  import SideNavigationBar from '../components/SideNavigationBar';
  import AppSettingsTable from '../components/AppSettingsTable';
  import router from '../router/index';

  export default {
    name: 'AppSettings',
    data() {
      return {
        allTags: [],
      };
    },
    components: {
      SideNavigationBar,
      AppSettingsTable,
    },
    methods: {
      fetchAllTags: async (userId) => {
        try {
          const res = await fetch(
            `http://localhost:3000/settings/tags/${userId}`,
            {
              method: 'GET',
              credentials: 'include',
            }
          );
          const jsonResponse = await res.json();

          if (res.status == 200) {
            console.log(jsonResponse);
            return jsonResponse;
          } else {
            alert(jsonResponse.error);
            router.push('/forbidden');
          }
        } catch (err) {
          console.log(err);
        }
      },
      insertRowIds: (entries) => {
        if (entries.length > 0) {
          for (let x = 0; x < entries.length; x++) {
            entries[x].rowId = x;
          }
        }
        return entries;
      },
    },
    computed: {
      userId() {
        return this.$store.getters.userId;
      },
    },

    async created() {
      let tags = await this.fetchAllTags(this.userId);
      this.allTags = this.insertRowIds(tags);
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
