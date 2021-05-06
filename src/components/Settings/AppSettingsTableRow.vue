<template>
  <div class="table-row">
    <div class="table-cell table-cell__name">
      {{ entry.name }}
    </div>
    <div class="table-cell table-cell__delete">
      <img
        class="table-cell__img"
        src="../../assets/trash-can.png"
        @click="deleteTagOrProject(entry)"
      />
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
        if (entry.type === 'tag') {
          this.$store.dispatch('deleteTag', entry.id);
        } else if (entry.type === 'project') {
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

  .table-cell__name {
    width: 28rem;
  }
  .table-cell__delete {
    text-align: right;
    padding-right: 0.2rem;
  }
  .table-cell__img {
    height: 15px;
    width: 15px;
  }
  .table-cell__img:hover {
    cursor: pointer;
  }
</style>
