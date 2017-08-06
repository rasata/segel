'use strict';

// Dependencies.
import Vue from 'vue';

// Components.
import Main from './components/main.vue';
import Events from './helpers/events';
import Store from './store/store';

/**
 * Root element for Vue.
 *
 * @type {Vue}
 */
const Instance = new Vue({
  template: '<segel-main v-bind:objects="objects" v-bind:bookings="bookings"></segel-main>',

  beforeMount: function () {
    // Get attributes from root element if present.
    this.start = this.$el.getAttribute('start') ? parseInt(this.$el.getAttribute('start')) : this.start;
    this.end = this.$el.getAttribute('end') ? parseInt(this.$el.getAttribute('end')) : this.end;
    this.steps = this.$el.getAttribute('steps') ? parseInt(this.$el.getAttribute('steps')) : this.steps;
    this.objects = this.$el.getAttribute('objects') ? this.$el.getAttribute('objects') : this.objects;
    this.bookings = this.$el.getAttribute('bookings') ? this.$el.getAttribute('bookings') : this.bookings;
  },

  components: {
    'segel-main': Main
  },

  store: Store,

  computed: {
    objects: function () {
      return this.$store.state.objects;
    },
    bookings: function () {
      return this.$store.state.bookings;
    }
  }
});

// Republish events.
Events.$on('time:changed', function (start, end) {
  Instance.$emit('time:changed', start, end);
});

export default Instance;
