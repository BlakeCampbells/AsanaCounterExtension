chrome.extension.sendMessage({}, function(response) {
  var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);
      // ----------------------------------------------------------
      // This part of the script triggers when page is done loading
      // console.log("Hello. This message was sent from scripts/inject.js");

      setInterval(function() {
        var elements = document.querySelectorAll(".ItemRow--highlighted, .ItemRow--focused");
        // Grab highlighted and focused tasks, we don't need to add it length is 1
        if (elements.length > 1) {
          var selectedTask = document.getElementsByClassName("MultiTaskTitleRow-titleText");
          // See if we've already written the total result before looping
          for (var j = 0; j < selectedTask.length; j++) {
            var elementsSelected = 0;
            var regex = /\[([0-9]+)\]/;
            var selected = selectedTask[j];
            var matches = selected.innerHTML.match(regex);

            if(!matches) {
              for (var i = 0; i < elements.length; i++) {
                var element = elements[i];
                var taskName = element.getElementsByClassName("TaskName-shadow"); // Class directly surrounding task name
                if (taskName.length) {
                  var matches = taskName[0].innerHTML.match(regex);
                  if (null != matches) {
                    elementsSelected = Number(elementsSelected) + Number(matches[1]);
                  }
                }
              }
              selected.innerHTML = selected.innerHTML + " [" + elementsSelected.toString() + "] ";
            }
          }
        }
      }, 2000);
    }
  }, 10);
});