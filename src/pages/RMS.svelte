<script>
  import { media } from "../stores/watchMedia.js";
  import Player from "../components/Player.svelte";
  import D3test from "../components/d3test.svelte";
  import P5test from "../components/P5Test.svelte";
</script>

<style>
  .bg-img {
    background-image: url("https://source.unsplash.com/4O1e7F2qjGM/1600x700");
  }
</style>

<div
  class={`bg-img ${$media.lg ? 'bg-fixed' : ''} bg-cover bg-no-repeat bg-right-bottom w-full h-50vh`} />
<div id="post" class="dark:text-white mx-auto py-24 w-90p max-w-screen-lg" />
<D3test />
