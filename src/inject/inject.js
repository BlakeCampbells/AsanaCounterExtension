chrome.extension.sendMessage({}, function(response) {
  var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);
      // ----------------------------------------------------------
      // This part of the script triggers when page is done loading
      shiftEventListener();
      checkIfKanBanBoard();
      var currentUrl = window.location.href
      setInterval(function(){
        if (currentUrl != window.location.href) {
          currentUrl = window.location.href;
          checkIfKanBanBoard();
        }
      }, 5000);
    }
  }, 10);
});

function shiftEventListener () {
  window.addEventListener("click", function(e) {
    if (e.shiftKey) {
      chrome.extension.sendMessage({ type: 'table' }, function(response) { calculateTotal(); });
    };
  }, false);
  document.addEventListener("drop", function(event) {
    event.preventDefault();
    checkIfKanBanBoard();
  }, false);
}

function calculateTotal () {
  var regex = /\[([0-9]+)\]/;
  var elements = document.querySelectorAll(".ItemRow--highlighted, .ItemRow--focused");
  if (elements.length > 1) {
    var selectedTask = document.getElementsByClassName("MultiTaskTitleRow-titleText");
    for (var j = 0; j < selectedTask.length; j++) {
      var elementsSelected = 0;
      var selected = selectedTask[j];
      var matches = selected.innerHTML.match(regex);

      if (!matches) {
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
}

function checkIfKanBanBoard() {
  var kanbanCheck = document.getElementsByClassName('Board');
  if (kanbanCheck.length >= 1) {
    addColumnTotals();
  }
}


function addColumnTotals() {
  var regex = /\[([0-9]+)\]/;
  var boardColumns = document.getElementsByClassName('BoardColumnWrapper');
  for (var i = 0; i < boardColumns.length; i++) {
    var columnTitle = boardColumns[i].getElementsByClassName('BoardColumnHeaderTitle');
    if(columnTitle[0].innerHTML.includes('[')) {
      columnTitle[0].innerHTML = columnTitle[0].innerHTML.replace(regex, '');
    }
    var columnPointTotal = 0;
    // TODO Count Points in card before spitting out the total
    var columnCardTitles = boardColumns[i].getElementsByClassName('BoardCardWithCustomProperties-name');
    for(var j = 0; j < columnCardTitles.length; j++) {
      var matches = columnCardTitles[j].innerHTML.match(regex);
      if (null != matches) {
        columnPointTotal = Number(columnPointTotal) + Number(matches[1]);
      }
    }
    columnTitle[0].innerHTML = columnTitle[0].innerHTML + ' [' + columnPointTotal.toString() + ']';
  }
}