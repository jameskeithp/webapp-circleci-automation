// Example helper function
function getUserCount() {
  // Make DB call
  return db.users.count(); 
}

module.exports = {
  getUserCount
}
