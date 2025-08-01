"use strict";
const reportUrl = `data.json`;
const reportContainer = document.getElementById("report");
const radioButtons = reportContainer.querySelectorAll(
  ".toggle-btn-group input[type='radio']"
);
let timeCards = [];

const populateReport = (report) => {
  const timeFramePhrase = {
    daily: "Yesterday",
    weekly: "Last Week",
    monthly: "Last Month",
  };
  report.forEach((item) => {
    Object.entries(item.timeframes).forEach(([timeFrame, values]) => {
      const { current, previous } = values;
      const timeCard = `<section class="time-card" data-type="${item.title
        .toLowerCase()
        .replace(" ", "-")}" data-hidden="${
        timeFrame !== "weekly"
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
      reportContainer.insertAdjacentHTML("beforeend", timeCard);
    });
  });
};

const toggleTimeCards = (timeFrame) => {
  timeCards.forEach((item) => {
    if (item.dataset.time !== timeFrame) {
      item.dataset.hidden = "true";
    } else {
      item.dataset.hidden = "false";
    }
  });
};

const handleChange = (event) => {
  toggleTimeCards(event.currentTarget.value);
};

(async () => {
  try {
    const response = await fetch(reportUrl);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const report = await response.json();
    populateReport(report);
    timeCards = reportContainer.querySelectorAll(`[data-time]`);
    radioButtons.forEach((btn) => {
      btn.addEventListener("change", handleChange);
    });
  } catch (error) {
    console.error(`Could not get report: ${error}`);
  }
})();
