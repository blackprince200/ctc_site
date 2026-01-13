// LOAD HEADER
fetch("components/header.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("header").innerHTML = html;

    // Active nav link
    const page = document.body.dataset.page;
    document
      .querySelector(`a[data-page="${page}"]`)
      ?.classList.add("active");
  });

// LOAD FOOTER
fetch("components/footer.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("footer").innerHTML = html;
  });
