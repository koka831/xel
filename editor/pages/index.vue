<template>
  <section class="container">
    <div>
      <h1 class="title">
        XelEditor
      </h1>
      <aside>
        <input class="width" type="number" v-model="width" />
        <input class="height" type="number" v-model="height" />
        <no-ssr placeholder="Loading...">
          <picker v-model="color"></picker>
        </no-ssr>
        <no-ssr placeholder="Loading...">
          <material-picker v-model="color"></material-picker>
        </no-ssr>
      </aside>
      <main>
        <div class="row" v-for="j in 16" :key="j">
          <input class="col" v-for="k in 16" :class="{ 'active': status[j][k] }" type="checkbox" :key="k" v-if="j < width && k < height" @click="click(j, k)" :style="{ 'background': colors[j][k] }"/>
        </div>
      </main>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          class="button--green">Documentation</a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey">GitHub</a>
      </div>
    </div>
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'
import { Swatches, Material } from 'vue-color'

let defaultColor = {
  hex: '#EBEDF0',
  hsl: {
    h: 150,
    s: 0.5,
    l: 0.2,
    a: 1
  },
  hsv: {
    h: 150,
    s: 0.66,
    v: 0.30,
    a: 1
  },
  rgba: {
    r: 25,
    g: 77,
    b: 51,
    a: 1
  },
  a: 1
}

let status = new Array(16);
let colors = new Array(16);
for (let y = 0; y < 16; y++) {
  status[y] = new Array(16).fill(false);
  colors[y] = new Array(16).fill(defaultColor['hex']);
}
export default {
  components: {
    AppLogo,
    'picker': Swatches,
    'material-picker': Material
  },
  data() {
    return {
      width: 16,
      height: 16,
      color: defaultColor,
      colors,
      status
    }
  },
  methods: {
    click: function (j, k) {
      // NOTE: Vue cannot detect any changes in array
      this.$set(this.colors[j], k, this.status[j][k] ? defaultColor['hex'] : this.color['hex'])
      this.$set(this.status[j], k, !this.status[j][k])
    }
  }
}
</script>

<style lang="scss">
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

aside {
  margin: 20px 0;
}

.row {
  display: flex;
  justify-content: center;
  background: white;

  .col {
    width: 30px;
    height: 30px;
    margin: 1px;
  }
}

.links {
  padding-top: 15px;
}
</style>
