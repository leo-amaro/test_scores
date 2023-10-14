$(document).ready(function () {
  // Initialize arrays for names and scores
  const names = ["Ben", "Joel", "Judy", "Anne"];
  const scores = [88, 98, 77, 88];

  // Function to add a score
  const addScore = () => {
    const name = $("#name").val();
    const score = parseInt($("#score").val());
    let isValid = true;

    // Check if the name field is empty
    if (name === "") {
      $("#name").next().text("This field is required.");
      isValid = false;
    } else {
      $("#name").next().text("");
    }

    // Check if the score is valid
    if (isNaN(score) || score < 0 || score > 100) {
      $("#score").next().text("You must enter a score between 0 and 100.");
      isValid = false;
    } else {
      $("#score").next().text("");
    }

    if (isValid) {
      // Add the name and score to the arrays
      names.push(name);
      scores.push(score);

      // Clear the input fields
      $("#name").val("");
      $("#score").val("");
      $("#scores_display").val("");

      // Display an alert when successfully added new name and score
      $("#success-alert").show();
      $("#alert-msg").html(
        "You added: Name: <b>" +
          name +
          "</b> and " +
          "Score: <b>" +
          score +
          "</b>"
      );
      setTimeout(function () {
        $("#success-alert").fadeOut(1000);
      }, 2500);
    }
    $("#name").focus();
  };

  //function to combine the arrays
  const combineArr = (names, scores) => {
    const combinedData = names.map((name, index) => ({
      name,
      score: scores[index],
    }));

    return combinedData;
  };

  //format the combined arrays
  const formatSortedData = (sortedData) => {
    const output = sortedData
      .map((item) => `${item.name}: ${item.score}`)
      .join("\n");
    return output;
  };

  //sort the combined arrays by descending
  const sortArrByDesc = (combinedData) => {
    const sortedData = combinedData.slice().sort((a, b) => b.score - a.score);
    return sortedData;
  };

  //sort the combined arrays by descending
  const sortArrByAsc = (combinedData) => {
    const sortedData = combinedData.slice().sort((a, b) => a.score - b.score);
    return sortedData;
  };

  // Function to display name and score in textarea
  const displayScores = () => {
    const sortOption = document.getElementById("sort_scores").value;
    const combinedData = combineArr(names, scores);

    let sortedData;
    if (sortOption === "highest_to_lowest") {
      sortedData = sortArrByDesc(combinedData);
    } else if (sortOption === "lowest_to_highest") {
      sortedData = sortArrByAsc(combinedData);
    }

    $("#scores_display").val(formatSortedData(sortedData));
  };

  // Attach event handlers to elements
  $("#add").on("click", addScore);
  $("#name").focus();
  $("#display_scores").on("change", displayScores);
  $("#display_scores").on("click", displayScores);
  $("#sort_scores").on("change", displayScores);
});
