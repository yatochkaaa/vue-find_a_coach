<template>
  <section>
    <base-card>
      <h2>Register as a coach now!</h2>
      <coach-form @save-data="saveData" />
    </base-card>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import CoachForm from '../../components/coaches/CoachForm.vue';

export default {
  components: {
    CoachForm,
  },
  methods: {
    ...mapActions({
      registerCoach: 'coaches/registerCoach',
    }),
    saveData(data) {
      this.registerCoach(data);
      this.$router.push('/coaches');
    },
  },
};
</script>

<style scoped></style>
