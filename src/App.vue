<template>
  <div class="wrapper">
    <input type="number" v-model.number="count" autofocus>
    <ul v-scroll-bar.nohide="{ top: 30, bottom: 30, right: 10, className: 'my-class' }">
      <li v-for="n in count" :key="n" v-scroll-bar>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Vitae nam, odio quam ex? Enim animi autem esse nulla, sapiente
        earum ut beatae eum modi vel quod optio, consequatur atque placeat.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Vitae nam, odio quam ex? Enim animi autem esse nulla, sapiente
        earum ut beatae eum modi vel quod optio, consequatur atque placeat.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Vitae nam, odio quam ex? Enim animi autem esse nulla, sapiente
        earum ut beatae eum modi vel quod optio, consequatur atque placeat.
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return { count: 7 }
  }
}
</script>

<style>
body {
  padding: 0;
  margin: 0;
  font-family: sans-serif;
}

* {
  box-sizing: border-box;
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #eee;
  height: 100vh;
}

input {
  width: 400px;
  padding: 20px;
  border: 0;
  box-shadow: 3px 5px 20px rgba(0, 0, 0, .2);
  outline: 0;
  font-size: 30px;
  text-align: center;
}

ul {
  background: #fff;
  width: 400px;
  max-height: 400px;
  padding: 30px;
  box-shadow: 3px 5px 20px rgba(0, 0, 0, .2);
  text-align: justify;
}

li {
  height: 100px;
}

li + li {
  margin: 10px 0;
}

</style>
