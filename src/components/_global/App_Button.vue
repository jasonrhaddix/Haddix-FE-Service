<template>
  <div
    :class="[
      'app-button__container',
      { disabled: disabled },
      { disabled: loading }
    ]"
  >
    <div :class="['app-button', variant]">
      <div v-show="!loading" class="inner">
        <div class="text app-button__text">{{ label }}</div>
        <div class="app-button__bg-under" />
        <div class="app-button__bg" />
        <div class="text app-button__text-animated">{{ label }}</div>
      </div>

      <div v-show="loading" class="inner">
        <div class="progress__ind__container">
          <v-progress-circular
            indeterminate
            class="progress__ind"
            color="grey lighten-1"
            width="4"
            size="30"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true,
    default: null
  },

  variant: {
    type: String,
    required: false,
    default: 'default'
  },

  disabled: {
    type: Boolean,
    required: false,
    default: false
  },

  loading: {
    type: Boolean,
    required: false,
    default: false
  }
})
</script>
