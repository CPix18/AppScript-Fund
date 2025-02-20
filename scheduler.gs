function createTrigger() {
  // Delete existing triggers to prevent duplicates
  deleteExistingTriggers();
  
  // Create a new time-driven trigger to run every 30 minutes
  ScriptApp.newTrigger("fetchOnchainData")
    .timeBased()
    .everyHours(2)
    .create();
}

function deleteExistingTriggers() {
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => {
    if (trigger.getHandlerFunction() === "fetchOnchainData") {
      ScriptApp.deleteTrigger(trigger);
    }
  });
}
