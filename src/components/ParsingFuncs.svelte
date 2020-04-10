<script context="module">
  export const h1 = line => {
    const el = document.createElement("h1");
    el.innerHTML = line.slice(2);
    el.classList.add("text-4xl", "font-hairline");

    const post = document.getElementById("post");
    post.appendChild(el);
  };

  export const h2 = line => {
    const el = document.createElement("h2");
    el.innerHTML = line.slice(2);
    el.classList.add("text-3xl", "font-hairline");

    const post = document.getElementById("post");
    post.appendChild(el);
  };

  export const h3 = line => {
    const el = document.createElement("h3");
    el.innerHTML = line.slice(2);
    el.classList.add("text-2xl", "font-hairline");

    const post = document.getElementById("post");
    post.appendChild(el);
  };

  export const h4 = line => {
    const el = document.createElement("h4");
    el.innerHTML = line.slice(5);
    el.classList.add("text-xl", "font-hairline");

    const post = document.getElementById("post");
    post.appendChild(el);
  };

  export const hr = line => {
    const el = document.createElement("hr");

    const post = document.getElementById("post");
    post.appendChild(el);
  };

  export const p = line => {
    const el = document.createElement("p");
    el.innerHTML = line.trim();
    el.classList.add("text-indent");

    const post = document.getElementById("post");
    post.appendChild(el);
  };

  export const parse = post => {
    const regex = /.*\n?/gm;
    let doc = [];
    let newLine = 0;
    let canPush = false;

    let arr = post.match(regex);

    arr.forEach(line => {
      // prettier-ignore
      if (line === "\n") {
        canPush = false
        return (newLine += 1);
      }
      if (line.startsWith("# ")) {
        doc.push(line);
        canPush = false;
        return (newLine = 0);
      }
      if (line.startsWith("## ")) {
        doc.push(line);
        canPush = false;
        return (newLine = 0);
      }
      if (line.startsWith("### ")) {
        doc.push(line);
        canPush = false;
        return (newLine = 0);
      }
      if (line.startsWith("#### ")) {
        doc.push(line);
        canPush = false;
        return (newLine = 0);
      }
      if (line.match(/^\s{0,3}-{3,}/) || line.match(/^\s{0,3}\*{3,}/)) {
        doc.push(line.trim());
        canPush = false;
        return (newLine = 0);
      }

      if (newLine === 0 && canPush) {
        const len = doc.length;
        if (
          line.match(/ {2,}\n/) ||
          line.endsWith("\\") ||
          line.endsWith("\\\n")
        ) {
          line = line.replace(/\\([^\\]*)$/, "<br/>");
        }
        doc[len - 1] = doc[len - 1].concat(line);

        canPush = true;
        return (newLine = 0);
      }

      if (
        line.match(/ {2,}\n/) ||
        line.endsWith("\\") ||
        line.endsWith("\\\n")
      ) {
        line = line.replace(/\\([^\\]*)$/, "<br/>");
      }

      doc.push(line);

      canPush = true;
      newLine = 0;
    });

    doc.forEach((line, index) => {
      if (line.startsWith("# ")) return h1(line);
      if (line.startsWith("## ")) return h2(line);
      if (line.startsWith("### ")) return h3(line);
      if (line.startsWith("#### ")) return h4(line);

      if (line.match(/^-{3,}/) || line.match(/^\s{0,3}\*{3,}/)) return hr();

      p(line);
    });
  };
</script>
