"use strict";
const reportUrl = `http://127.0.0.1:5500/data.json`;

const reportContainer = document.getElementById("report");

const populateReport = (report) => {
  const timeFramePhrase = {
    daily: "Yesterday",
    weekly: "Last Week",
    monthly: "Last Month",
  };
  report.forEach((item) => {
    Object.entries(item.timeframes).forEach(([timeFrame, values]) => {
      const { current, previous } = values;
      reportContainer.innerHTML += `<section class="time-card" data-type="${item.title
        .toLowerCase()
        .replace(" ", "-")}" data-hidden="${
        timeFrame !== "daily"
      }" data-time="${timeFrame.toLowerCase()}">
                <div class="time-card-main">
                  <header>
                    <h2>${item.title}</h2>
                    <img
                      src="images/icon-ellipsis.svg"
                      alt=""
                      width="21"
                      height="5"
                    />
                  </header>
                  <div class="time-card-content">
                    <p>${current}hrs</p>
                    <p>${timeFramePhrase[timeFrame]} - ${previous}hrs</p>
                  </div>
                </div>
              </section>`;
    });
  });
};

(async () => {
  try {
    const response = await fetch(reportUrl);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const report = await response.json();
    populateReport(report);
    const dialer = document.getElementById("dialer");
    const timeCards = reportContainer.querySelectorAll(`[data-time]`);
    dialer.addEventListener("change", (event) => {
      if (event.target.type === "radio") {
        const timeFrame = event.target.value;
        timeCards.forEach((item) => {
          if (item.dataset.time !== timeFrame) {
            item.dataset.hidden = "true";
          } else {
            item.dataset.hidden = "false";
          }
        });
      }
    });
  } catch (error) {
    console.error(`Could not get report: ${error}`);
  }
})();
