(function () {
  const script = document.currentScript;
  const surveyId = script.dataset.surveyId;
  const form = document.querySelector("form");
  if (!form || !surveyId) {
    return;
  }
  const storageKey = `survey_${surveyId}_draft`;

  const saved = localStorage.getItem(storageKey);
  if (saved) {
    try {
      const values = JSON.parse(saved);
      form.querySelectorAll("input[name='option']").forEach((el) => {
        if (values.includes(el.value)) {
          el.checked = true;
        }
      });
    } catch (e) {
      console.warn("Failed to parse saved survey data", e);
    }
  }

  form.addEventListener("change", () => {
    const selected = Array.from(
      form.querySelectorAll("input[name='option']:checked")
    ).map((el) => el.value);
    localStorage.setItem(storageKey, JSON.stringify(selected));
  });

  form.addEventListener("submit", () => {
    localStorage.removeItem(storageKey);
  });
})();
