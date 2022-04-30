<template>
  <div class="custom-select" :tabindex="tabindex" @blur="open = false">
    <div
      class="custom-select__selected"
      :class="{ open: open }"
      @click="open = !open"
    >
      {{ selected.name }}
    </div>
    <div class="custom-select__items" :class="{ selectHide: !open }">
      <div
        v-for="option of options"
        :key="option.id"
        @click="
          selected = option;
          open = false;
          $emit('input', option);
        "
      >
        {{ option.name }}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CustomSelect',
    data() {
      return {
        selected: this.default
          ? this.default
          : this.options.length > 0
          ? this.options[0]
          : null,
        open: false,
      };
    },
    props: {
      options: {
        type: Array,
        required: true,
      },
      default: {
        type: Object,
        required: false,
      },
      tabindex: {
        type: Number,
        required: false,
        default: 0,
      },
    },
    mounted() {
      this.$emit('input', this.selected);
    },
  };
</script>

<style scoped>
  .custom-select {
    position: relative;
    width: 100%;
    text-align: left;
    outline: none;
    height: 35px;
    line-height: 35px;
    font-size: 18px;
    margin-top: 8px;
  }

  .custom-select .custom-select__selected {
    border-radius: var(--br-default);
    border: 1px solid black;
    padding-left: 10px;
    cursor: pointer;
    user-select: none;
  }

  .custom-select .custom-select__selected:hover {
    border: solid 1px #0069ff;
  }

  .custom-select .custom-select__selected.open {
    border: 1px solid black;
    border-radius: 2px 2px 0px 0px;
  }

  .custom-select .custom-select__selected:after {
    position: absolute;
    content: '';
    top: 17.5px;
    right: 10px;
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-color: black transparent transparent transparent;
  }

  .custom-select .custom-select__items {
    color: black;
    border-radius: 0px 0px 2px 2px;
    overflow-y: auto;
    max-height: 200px;
    border-right: 1px solid black;
    border-left: 1px solid black;
    border-bottom: 1px solid black;
    position: absolute;
    background-color: #ffffff;
    left: 0;
    right: 0;
    z-index: 1;
  }

  .custom-select .custom-select__items div {
    padding-left: 10px;
    cursor: pointer;
    user-select: none;
  }

  .custom-select .custom-select__items div:hover {
    background-color: rgba(53, 53, 53, 0.089);
  }

  .selectHide {
    display: none;
  }
</style>
