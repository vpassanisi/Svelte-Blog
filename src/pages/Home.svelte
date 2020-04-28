<script>
  import Landing from "../components/Landing.svelte";
  import Links from "../components/Links.svelte";
  import { parse } from "../modules/ParsingFuncs.svelte";
  import { onMount } from "svelte";

  onMount(async () => {
    const req = await fetch(
      "https://raw.githubusercontent.com/vpassanisi/Blog-Posts/master/Home.txt",
      {
        method: "GET"
      }
    );

    const res = await req.text();

    parse(res);
  });
</script>

<Landing />
<div id="post" class="dark:text-white mx-auto py-24 w-90p max-w-screen-lg" />
<Links />
