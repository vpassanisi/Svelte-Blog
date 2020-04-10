<script>
  import { push } from "svelte-spa-router";
</script>

<div class="pt-24 px-8 pb-16">
  <div class="dark:text-white text-5xl font-hairline">Blog Posts</div>
  <div class="dark:text-white text-lg mt-4">
    Short posts about anything audio related
  </div>
</div>
<div class="w-90p max-w-screen-lg mx-auto dark:text-white">
  <button on:click={() => push('/posts/parallel-compression')}>
    Parralell Compression
  </button>
</div>
