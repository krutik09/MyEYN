function loginformsubmit()
{
  var userID=document.getElementById("username").value;
  console.log(userID);
  localStorage.setItem("id", userID);
  return false;
}
