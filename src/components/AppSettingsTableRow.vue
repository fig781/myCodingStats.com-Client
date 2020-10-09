<template>
  <div class="table-row" :class="evenId && shader">
    <div class="table-cell name">
      {{ entry.name }}
    </div>
    <div class="table-cell delete">
      <img src="../assets/trash-can.png" @click="deleteRow(entry.id)" />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AppSettingsTableRow',
    data() {
      return {
        evenId: false,
        shader: 'shaded',
      };
    },
    props: {
      entry: Object,
    },
    methods: {
      deleteRow: (entryId) => {
        this.$emit('deleteRow', entryId);
      },
    },
    mounted() {
      if (this.entry.rowId % 2 == 0) {
        this.evenId = true;
      }
    },
  };
</script>

<style scoped>
  .table-cell {
    display: table-cell;
    padding-top: 4px;
    padding-left: 0.2rem;

    text-align: left;
  }
  .table-row {
    display: table-row;
  }
  .name {
    width: 28rem;
  }
  .delete {
    text-align: right;
    padding-right: 0.2rem;
  }
  .shaded {
    background-color: #4a7eee18;
  }
  img {
    height: 15px;
    width: 15px;
  }
  img:hover {
    cursor: pointer;
  }
</style>
