const swRegister = async() => {
  if (!("serviceWorker" in navigator)) {
    console.log("Service worker not supported in this browser");
  }
  try {
    await navigator.serviceWorker.register("../sw.js");
    console.log("Service Worker Working");
  } catch (error) {
    console.log("Failed Register Service Worker", error);
  }
};

export default swRegister;
