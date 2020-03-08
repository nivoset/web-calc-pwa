import './components/calculator'

document
  .querySelector("#main-calc")
  .addEventListener("update", (evt: CustomEvent) => console.log(evt.detail));

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/offline.js')
    .then(function(registration) {
      console.log('Registration successful, scope is:', registration.scope);
    })
    .catch(function(error) {
      console.log('Service worker registration failed, error:', error);
    });
  }