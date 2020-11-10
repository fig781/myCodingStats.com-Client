<template>
  <div class="table-row">
    <div class="table-cell name">
      {{ entry.name }}
    </div>
    <div class="table-cell delete">
      <img src="../assets/trash-can.png" @click="deleteTagOrProject(entry)" />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AppSettingsTableRow',
    props: {
      entry: Object,
    },
    methods: {
      deleteTagOrProject(entry) {
        if (entry.type == 'tag') {
          this.$store.dispatch('deleteTag', entry.id);
        } else if (entry.type == 'project') {
          this.$store.dispatch('deleteProject', entry.id);
        }
      },
    },
  };
</script>

<style scoped>
  .table-row {
    display: table-row;
    border-top: 1px solid rgba(128, 128, 128, 0.452);
    border-bottom: 1px solid rgba(128, 128, 128, 0.452);
  }
  .table-cell {
    display: table-cell;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 0.2rem;
    text-align: left;
  }

  .name {
    width: 28rem;
  }
  .delete {
    text-align: right;
    padding-right: 0.2rem;
  }
  img {
    height: 15px;
    width: 15px;
  }
  img:hover {
    cursor: pointer;
  }
</style>
