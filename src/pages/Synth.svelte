<script>
  import { media } from "../stores/watchMedia.js";
  import Synthesizer from "../components/Synthesizer.svelte";
  import { onMount } from "svelte";
  import { parse } from "../modules/ParsingFuncs.svelte";

  onMount(async () => {
    const req = await fetch(
      "https://raw.githubusercontent.com/vpassanisi/Blog-Posts/master/Synth.txt",
      {
        method: "GET"
      }
    );

    const res = await req.text();

    parse(res);
  });
</script>

<style>
  .bg-img {
    background-image: url("https://source.unsplash.com/5AlEtKAqTls/1600x900");
  }
</style>

<div
  class={`bg-img ${$media.lg ? 'bg-fixed' : ''} bg-cover bg-no-repeat bg-center w-full h-50vh`} />
<div id="post" class="dark:text-white mx-auto py-24 w-90p max-w-screen-lg" />
<Synthesizer />
