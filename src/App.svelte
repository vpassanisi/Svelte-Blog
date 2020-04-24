<script>
  import Tailwindcss from "./CSS/Tailwindcss.svelte";
  import { onMount } from "svelte";
  import { media } from "./stores/watchMedia.js";
  import { darkMode } from "./stores/darkMode.js";

  import Router from "svelte-spa-router";
  import Navbar from "./layout/Navbar.svelte";
  import Home from "./pages/Home.svelte";
  import BlogPosts from "./pages/BlogPosts.svelte";
  import ParallelCompression from "./pages/ParrallelCompression.svelte";
  import NotFound from "./pages/NotFound.svelte";
  import RMS from "./pages/RMS.svelte";
  import Synth from "./pages/Synth.svelte";

  const routes = {
    "/": Home,
    "/posts": BlogPosts,
    "/posts/parallel-compression": ParallelCompression,
    "/posts/rms": RMS,
    "/posts/synth": Synth,
    "*": NotFound
  };

  onMount(() => {
    if ($media.dark) darkMode.turnOn();
  });
</script>

<Tailwindcss />
<main>
  <Navbar />
  <Router {routes} />
</main>
