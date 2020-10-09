<template>
  <div id="table">
    <div class="table-row">
      <div class="table-header">
        <p class="table-header-text">Date</p>
      </div>
      <div class="table-header">
        <p class="table-header-text">Day</p>
      </div>
      <div class="table-header">
        <p class="table-header-text">Active Learning</p>
      </div>
      <div class="table-header">
        <p class="table-header-text">Passive Learning</p>
      </div>
      <div class="table-header">
        <p class="table-header-text">Coding Challenges</p>
      </div>
      <div class="table-header">
        <p class="table-header-text">Tag</p>
      </div>
      <div class="table-header">
        <p class="table-header-text">Project</p>
      </div>
      <div class="table-header">
        <p class="table-header-text">Description</p>
      </div>
      <div class="table-header">
        <p class="table-header-text">Day Total</p>
      </div>
      <div class="table-header">
        <p class="table-header-text">Week Total</p>
      </div>
    </div>
    <CalendarDay
      v-for="calendarDay in calendar"
      :key="calendarDay.id"
      :oneCalendarDay="calendarDay"
      @toggleCalendarDayEdit="toggleCalendarDayEdit"
    />
    <CalendarDayEdit
      v-if="showCalendarDayEdit"
      @close="showCalendarDayEdit = false"
      :oneCalendarDay="dayToEdit"
    />
  </div>
</template>

<script>
  import CalendarDay from './CalendarDay';
  import router from '../router/index';
  import CalendarDayEdit from './CalendarDayEdit';
  export default {
    name: 'Calendar',
    components: {
      CalendarDay,
      CalendarDayEdit,
    },
    props: {
      month: Object,
      year: Number,
    },
    data() {
      return {
        numberOfDaysInThisMonth: 0,
        calendar: [],
        showCalendarDayEdit: false,
        dayToEdit: Object,
      };
    },
    methods: {
      toggleCalendarDayEdit(rowInfo) {
        this.showCalendarDayEdit = true;
        this.dayToEdit = rowInfo;
      },
      populateOneCalendarRow(rowId, dayObject) {
        let oneCalendarDay = {
          id: 0,
          date: '',
          day: '',
          active: '',
          passive: '',
          coding: '',
          tag: '',
          project: '',
          desc: '',
          dayTotal: '',
          week_total: '',
        };

        const date = new Date();
        const dayFormat = new Intl.DateTimeFormat('en-US', { weekday: 'long' });

        date.setFullYear(this.year);
        date.setMonth(this.month.number);
        date.setDate(rowId);

        oneCalendarDay.id = rowId;
        oneCalendarDay.date = `${this.month.number + 1}/${rowId}`;
        oneCalendarDay.day = dayFormat.format(date);
        if (dayObject.active_time != 0) {
          oneCalendarDay.active = this.convertNumberToTime(
            dayObject.active_time
          );
        }
        if (dayObject.passive_time != 0) {
          oneCalendarDay.passive = this.convertNumberToTime(
            dayObject.passive_time
          );
        }
        if (dayObject.coding_problems_time != 0) {
          oneCalendarDay.coding = this.convertNumberToTime(
            dayObject.coding_problems_time
          );
        }
        if (dayObject.tag != null) {
          oneCalendarDay.tag = dayObject.tag;
        }
        if (dayObject.project != null) {
          oneCalendarDay.project = dayObject.project;
        }
        if (dayObject.description != null) {
          oneCalendarDay.description = dayObject.description;
        }
        const dayTotals =
          dayObject.active_time +
          dayObject.passive_time +
          dayObject.coding_problems_time;
        if (dayTotals != 0) {
          oneCalendarDay.dayTotal = this.convertNumberToTime(dayTotals);
        }

        //set the other information based on the info from the server
        return oneCalendarDay;
      },

      async generateAllCalendarRows() {
        const yearAndMonth = `${this.year}-${this.month.number + 1}`;
        const fetchedRowInformation = await this.fetchRowsWithValues(
          yearAndMonth,
          this.userId
        );

        const extractedDates = this.convertDates(fetchedRowInformation);
        const numberOfDaysInMonth = [
          31,
          28,
          31,
          30,
          31,
          30,
          31,
          31,
          30,
          31,
          30,
          31,
        ];
        this.numberOfDaysInThisMonth = numberOfDaysInMonth[this.month.number];

        let dateEntered = false;
        for (let id = 1; id <= this.numberOfDaysInThisMonth; id++) {
          for (let entry = 0; entry < extractedDates.length; entry++) {
            if (id == extractedDates[entry]) {
              this.calendar.push(
                this.populateOneCalendarRow(id, fetchedRowInformation[entry])
              );
              dateEntered = true;
              break;
            }
          }
          if (dateEntered == false) {
            this.calendar.push(
              this.populateOneCalendarRow(id, {
                active_time: 0,
                passive_time: 0,
                coding_problems_time: 0,
                projects: null,
                description: null,
              })
            );
          }
          dateEntered = false;
        }
      },

      async fetchRowsWithValues(date, userId) {
        try {
          const res = await fetch('http://localhost:3000/gridmonth', {
            method: 'POST',
            body: JSON.stringify({ date: date, userId: userId }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
          });
          const jsonResponse = await res.json();

          if (res.status == 200) {
            return jsonResponse;
          } else {
            alert(jsonResponse.error);
            router.push('/forbidden');
          }
        } catch (err) {
          console.log(err);
        }
      },
      convertDates(rowsArray) {
        let convertedDays = [];
        let slicedString;
        for (let x = 0; x < rowsArray.length; x++) {
          slicedString = rowsArray[x].in_app_date.slice(3, 5);
          parseInt(slicedString);
          convertedDays.push(slicedString);
        }
        return convertedDays;
      },
      convertNumberToTime(time) {
        let hours = Math.floor(time / 60);
        let minutes = time % 60;
        if (minutes == 0) {
          minutes = '00';
        } else if (minutes.length < 2) {
          minutes = '0' + minutes.toString();
        }
        return `${hours}:${minutes}`;
      },
    },

    computed: {
      userId() {
        return this.$store.getters.userId;
      },
    },

    mounted() {
      this.generateAllCalendarRows();
    },
  };
</script>

<style scoped>
  #table {
    display: table;
    border-collapse: collapse;
    margin-left: 3rem;
  }

  .table-row {
    display: table-row;
  }
  .table-header {
    display: table-cell;

    padding-top: 2px;
    padding-bottom: 2px;
    padding-left: 2rem;
    padding-right: 2rem;
  }
  .table-header-text {
    font-weight: bold;
  }
</style>
