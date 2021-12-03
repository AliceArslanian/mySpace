/**
 * functions to fetch some data and display it on UI.
 * The data is rendered when clicking on the related buttons
 * Hiding the data when clicking on the hide button
 */
const url = "https://api.spacexdata.com/v4";

// fetching crew data
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
      result.forEach((re) => {
        if (re.status === "active") {
          activeNumber++;
        }
      });
      crewSection.append(activeNumber);
      console.log(result, "crew");
      console.log(activeNumber, "number of active members");
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

//fetching capsules data
var capsulesButton = document.getElementById("capsules_button");
capsulesButton.addEventListener("click", function (e) {
  _fetchCapsules();
});
async function _fetchCapsules() {
  var capsulesButton = document.getElementById("capsules_button");
  var capsulesSection = document.getElementById("capsules");
  var landingsSection = document.getElementById("landings");
  var dragon1Section = document.getElementById("dragon1");
  var dragon11Section = document.getElementById("dragon11");
  var dragon2Section = document.getElementById("dragon2");

  let totalCapsules = 0;
  let totalLandings = 0;
  let dragon1 = 0;
  let dragon11 = 0;
  let dragon2 = 0;

  if (capsulesButton.innerText === "Get info") {
    try {
      capsulesButton.innerText = "hide";
      const response = await fetch(`${url}/capsules`);
      if (!response.ok) {
        throw new Error(`Failed to fetch. Status code: ${response.status}`);
      }
      const result = await response.json();
      console.log(result.length, "total number of capsules");
      capsulesSection.append(result.length);
      result.forEach((re) => {
        totalLandings = totalLandings + re.water_landings;
        if (re.type === "Dragon 1.0") {
          dragon1++;
        } else if (re.type === "Dragon 1.1") {
          dragon11++;
        } else if (re.type === "Dragon 2.0") {
          dragon2++;
        }
      });
      landingsSection.append(totalLandings);
      dragon1Section.append(dragon1);
      dragon11Section.append(dragon11);
      dragon2Section.append(dragon2);
      console.log(result, "capsules");
      console.log(totalLandings, "total water landings");
      return response;
    } catch (e) {
      console.log(e);
    }
  } else {
    document.getElementById("capsules").innerHTML = "";
    document.getElementById("landings").innerHTML = "";
    document.getElementById("dragon1").innerHTML = "";
    document.getElementById("dragon11").innerHTML = "";
    document.getElementById("dragon2").innerHTML = "";
    capsulesButton.innerText = "Get info";
    return;
  }
}

//fetching history data
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
      console.log(result, "history");
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
