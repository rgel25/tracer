const demoAdminBtn = document.querySelector("#demo-admin");
const demoPmBtn = document.querySelector("#demo-pm");
const demoDevBtn = document.querySelector("#demo-dev");
const demoSubmitterBtn = document.querySelector("#demo-submitter");
const loginForm = document.querySelector("#login-form");
const email = document.querySelector("#loginEmail");
const password = document.querySelector("#loginPassword");

demoAdminBtn.addEventListener("click", () => {
  email.value = "demoadmin@tracer.com";
  password.value = "tangina";
  loginForm.submit();
});

demoPmBtn.addEventListener("click", () => {
  email.value = "demoprojectmanager@tracer.com";
  password.value = "tangina";
  loginForm.submit();
});

demoDevBtn.addEventListener("click", () => {
  email.value = "demodeveloper@tracer.com";
  password.value = "tangina";
  loginForm.submit();
});

demoSubmitterBtn.addEventListener("click", () => {
  email.value = "demosubmitter@tracer.com";
  password.value = "tangina";
  loginForm.submit();
});
