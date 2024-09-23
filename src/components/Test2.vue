<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div id="app">
    <div class="container">
      <h1 class="title">Infinte Scroll Vue</h1>
      <button @click="handleLoadmore">Click to Load</button>
      <ul class="cards">
        <li class="card" v-for="(card, index) in cards" :key="index">
          <img
            :src="`https://picsum.photos/id/${index}/300/300`"
            width="300"
            height="300"
            alt="Random Image"
          />
          <p>#Image: {{ index }}</p>
        </li>
      </ul>
      <Observer
        v-if="!(ScrollOptions.currentPage > ScrollOptions.maxPage)"
        @is-in-view="handleIsInView"
        @is-outside-view="handleIsOutsideView"
      />
    </div>
  </div>
</template>

<script>
import Observer from "@/components/Observer.vue";
import { ref } from "vue";
import { throttle } from "lodash";

export default {
  data() {
    return {
      ScrollOptions: {
        maxPage: 5,
        limitsPerPage: 3,
        currentPage: 1,
        isInView: false,
      },
      cards: {},
      ss: throttle(
        function (options = this.ScrollOptions) {
          const { limitsPerPage, currentPage, isInView, maxPage } = options;
          if (currentPage > maxPage) {
            return;
          }
          const newCurrentPage = currentPage + 1;
          options.currentPage = newCurrentPage;
          this.ScrollOptions.currentPage = newCurrentPage;
          const newCards = this.getCards(limitsPerPage, newCurrentPage);
          this.cards = [...this.cards, ...newCards];
          console.log("throttle: ", this.cards);
          if (isInView) {
            this.handleLoadmore();
          }
        },
        300,
        { leading: true, trailing: true }
      ),
    };
  },
  components: { Observer },
  methods: {
    handleLoadmore() {
      this.ss();
    },
    getCards(limitsPerPage, currentPage) {
      console.log(limitsPerPage, currentPage);
      return Array.from({ length: limitsPerPage }, () => ({
        isView: currentPage.toString(),
      }));
    },
    handleIsInView() {
      this.ScrollOptions.isInView = true;
      this.handleLoadmore();
    },
    handleIsOutsideView() {
      this.ScrollOptions.isInView = false;
    },
  },
  mounted() {
    this.cards = ref(
      this.getCards(
        this.ScrollOptions.limitsPerPage,
        this.ScrollOptions.currentPage
      )
    );
    console.log(
      ref(
        this.getCards(
          this.ScrollOptions.limitsPerPage,
          this.ScrollOptions.currentPage
        )
      )
    );
    console.log("一開始mouted: ", this.cards);
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
.cards {
  text-align: center;
  list-style-type: none;
  margin: 0;
  padding: 2rem;
  display: grid;
  width: 100%;
  max-width: 1200px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  flex-direction: column;
  gap: 1rem;
}

.card {
  padding: 1rem;
  background: var(--card-bg);
}
</style>
