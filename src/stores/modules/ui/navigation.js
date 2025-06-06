import { defineStore } from 'pinia'

export default defineStore('navigation', {
  // STATE
  state: () => ({
    isEnabled: true,
    openState: false
  }),

  // GETTERS
  getters: {},

  // ACTIONS
  actions: {
    showNavigation() {
      this.openState = true
    },

    hideNavigation() {
      this.openState = false
    },

    toggleNavigation() {
      this.openState = !this.openState
    },

    enableNavigation() {
      this.isEnabled = true
    },

    disableNavigation(delay) {
      this.isEnabled = false

      if (delay) {
        setTimeout(() => {
          this.isEnabled = true
        }, enableDelay)
      }
    },

    setTitle(title) {
      this.title = title
    }
  }
})
