<template>
  <div id="table">
    <div class="table-row">
      <div class="table-header">
        <p class="table-header-text">Name</p>
      </div>
    </div>
    <AppSettingsTableRow
      v-for="entry in allEntries"
      :key="entry.id"
      :entry="entry"
    />
  </div>
</template>

<script>
  import AppSettingsTableRow from './AppSettingsTableRow';
  export default {
    name: 'AppSettingsTable',
    props: {
      //Very strange error here. If I switch prop type to Array, I get a warning that a function was passed.
      // If I change the prop type to Function, then I get a warning that an array was passed??
      allEntries: [Array, Function],
    },
    components: {
      AppSettingsTableRow,
    },
  };
</script>

<style scoped>
  #table {
    display: table;
    border-collapse: collapse;
  }
  .table-row {
    display: table-row;
  }
  .table-header {
    display: table-cell;
    padding-bottom: 2px;
    padding-left: 2px;
  }
  .table-header-text {
    font-weight: bold;
  }
</style>
