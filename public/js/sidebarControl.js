const minimizeBtn = document.querySelector("#minimize-sidebar-button");
const expandBtn = document.querySelector("#expand-sidebar-button");
const unexpandBtn = document.querySelector("#unexpand-sidebar-button");
const unexpandBtnContainer = document.querySelector(
  ".unexpand-sidebar-btn-container"
);
const sidebar = document.querySelector("#sidebar");
const dashboardContents = document.querySelector(".dashboard-contents");
const navbar = document.querySelector(".navbar");

const sidebarExpandedHTML = sidebar.innerHTML;

const sidebarMinimizedHTML = ` <a
href="/"
class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
>
  <img src="/images/tracer-logo-light.png" alt="tracer logo" class="img-fluid" />
</a>
<hr class="border border-1" />
<div class="container text-center text-white">
${currentUser.first_name.slice(0, 1).toUpperCase()}
</div>
<hr class="border border-1" />
<div
  class="d-flex text-center justify-content-center align-items-center text-white flex-column"
>
  <div class="my-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      class="bi bi-clipboard-data"
      viewBox="0 0 16 16"
    >
      <path
        d="M4 11a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0v-1zm6-4a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0V7zM7 9a1 1 0 0 1 2 0v3a1 1 0 1 1-2 0V9z"
      />
      <path
        d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"
      />
      <path
        d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"
      />
    </svg>
  </div>
  <div class="my-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      class="bi bi-people"
      viewBox="0 0 16 16"
    >
      <path
        d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"
      />
    </svg>
  </div>
  <div class="my-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      class="bi bi-folder"
      viewBox="0 0 16 16"
    >
      <path
        d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4H2.19zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707z"
      />
    </svg>
  </div>
    <div class="my-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      class="bi bi-file-earmark"
      viewBox="0 0 16 16"
    >
      <path
        d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"
      />
    </svg>
     </div>
  </div>
</div>
`;

minimizeBtn.addEventListener("click", () => {
  sidebar.classList.toggle("sidebar-minimized");
  if (sidebar.classList.contains("sidebar-minimized")) {
    minimizeBtn.style.transform = `rotate(180deg)`;
    sidebar.innerHTML = "";
    sidebar.innerHTML = sidebarMinimizedHTML;
  } else {
    sidebar.innerHTML = "";
    minimizeBtn.style.transform = `rotate(0deg)`;
    sidebar.innerHTML = sidebarExpandedHTML;
  }
  dashboardContents.classList.toggle("dashboard-contents-expanded");
});

sidebar.addEventListener("mouseenter", () => {
  if (!sidebar.classList.contains("sidebar-minimized")) return;
  sidebar.classList.remove("sidebar-minimized");
  sidebar.classList.add("sidebar-minimized-by-hover");
  if (sidebar.classList.contains("sidebar-minimized")) {
    minimizeBtn.style.transform = `rotate(180deg)`;
    sidebar.innerHTML = "";
    sidebar.innerHTML = sidebarMinimizedHTML;
  } else {
    sidebar.innerHTML = "";
    minimizeBtn.style.transform = `rotate(0deg)`;
    sidebar.innerHTML = sidebarExpandedHTML;
  }
  dashboardContents.classList.toggle("dashboard-contents-expanded");
});

sidebar.addEventListener("mouseleave", () => {
  if (!sidebar.classList.contains("sidebar-minimized-by-hover")) return;
  sidebar.classList.add("sidebar-minimized");
  if (sidebar.classList.contains("sidebar-minimized")) {
    minimizeBtn.style.transform = `rotate(180deg)`;
    sidebar.innerHTML = "";
    sidebar.innerHTML = sidebarMinimizedHTML;
  } else {
    sidebar.innerHTML = "";
    minimizeBtn.style.transform = `rotate(0deg)`;
    sidebar.innerHTML = sidebarExpandedHTML;
  }
  dashboardContents.classList.toggle("dashboard-contents-expanded");
  sidebar.classList.remove("sidebar-minimized-by-hover");
});

expandBtn.addEventListener("click", () => {
  if (sidebar.classList.contains("sidebar-minimized")) {
    // Use original html
    sidebar.innerHTML = "";
    sidebar.innerHTML = sidebarExpandedHTML;
  }
  // Reset sidebar to default by removing classes
  sidebar.classList.remove("sidebar-minimized-by-hover");
  sidebar.classList.remove("sidebar-minimized");
  // Add sidebar-mobile style
  sidebar.classList.add("sidebar-mobile");
  // Hide Navbar
  navbar.style.display = "none";
  // Show unexpand btn
  unexpandBtnContainer.classList.remove("d-none");
});

unexpandBtn.addEventListener("click", () => {
  // Remove sidebar-mobile style
  sidebar.classList.remove("sidebar-mobile");
  // Show Navbar
  navbar.style.display = "block";
  // Hide unexpand btn
  unexpandBtnContainer.classList.add("d-none");
});

// sidebar.addEventListener("click", (e) => {
//    if(e.target.classList.container("nav-llink"))
// });
