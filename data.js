const url = "https://api.spacexdata.com/v4";

var crewButton = document.getElementById("crew_button");
crewButton.addEventListener("click", function (e) {
  _fetchCrewMembers();
});
async function _fetchCrewMembers() {
  var crewButton = document.getElementById("crew_button");
  var crewSection = document.getElementById("crew");
  let activeNumber = 0;
  if (crewButton.innerText === "Calculate") {
    try {
      crewButton.innerText = "hide";
      const response = await fetch(`${url}/crew`);
      if (!response.ok) {
        throw new Error(`Failed to fetch. Status code: ${response.status}`);
      }
      const result = await response.json();
      console.log(result, "crew");
      result.forEach((re) => {
        if (re.status === "active") {
          activeNumber++;
        }
      });
      crewSection.append(activeNumber);
      return response;
    } catch (e) {
      console.log(e);
    }
  } else {
    document.getElementById("crew").innerHTML = "";
    crewButton.innerText = "Calculate";
    return;
  }
}

function _fetchCapsules() {
  fetch(`${url}/capsules`)
    .then((res) => res.json())
    .then((res) => {
      var numberOfCapsules = document.getElementById("number_of_capsules");
      var statusOfCapsules = document.getElementById("status_of_capsules");
      numberOfCapsules.append(res.length);
      let test;
      res.forEach((r) => {
        test = test + r.last_update;
      });
    });
}

var historyButton = document.getElementById("history_button");
historyButton.addEventListener("click", function (e) {
  _fetchHistory();
});
async function _fetchHistory() {
  var historyButton = document.getElementById("history_button");
  var historySection = document.getElementById("history");
  let text = "";
  if (historyButton.innerText === "Click me") {
    try {
      historyButton.innerText = "hide";
      const response = await fetch(`${url}/history`);
      if (!response.ok) {
        throw new Error(`Failed to fetch. Status code: ${status.status}`);
      }
      const result = await response.json();

      result.forEach((r) => {
        text = text + r.details;
      });
      historySection.append(text);
      return response;
    } catch (e) {
      console.log(e);
    }
  } else {
    text = "";
    document.getElementById("history").innerHTML = "";
    historyButton.innerText = "Click me";
    return;
  }
}

_fetchCapsules();
