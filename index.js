import { checkStudent, getCollegeNames, getBranchNames } from "./script.js";
import { updateCustomSelect, setupCustomSelect } from "./div.js";

let collegenameInput = document.getElementById("Collegename");
let usernameInput = document.getElementById("username");
let passwordInput = document.getElementById("password");
let branchnameInput = document.getElementById("branchname");
let loginbutton = document.getElementById("confirmBranchButton");
const branchSelect = document.getElementById("branchSelect");
const CollegeSelect = document.getElementById("CollegeSelect");
let allColleges = [];
let allBranches = [];


if(document.cookie.includes("Studentname=")) {
    window.location.href = "StudentMain.html";
}
else{
    fetchColleges();
    setupCustomSelect(CollegeSelect);
    setupCustomSelect(branchSelect);
    
}


function setCookie(name, value, days) {
    let expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);
    
    document.cookie = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
}

loginbutton.addEventListener("click", async () => {
    
    let collegename = collegenameInput.value;
    let username = usernameInput.value;
    let password = passwordInput.value;
    let branch = branchnameInput.value;
    if (collegename === "" || username === "" || password === "" || branch === "") {
        alert("Please fill in all the fields.");
        return;
    }
    document.getElementById("loadingPopup").style.display = "block";
    try {
        let isValid = await checkStudent(collegename, branch, username, password); // Await the async function
        document.getElementById("loadingPopup").style.display = "none";

        
        if (isValid) {
            setCookie("Studentcollegename", collegename, 30);
            setCookie("Studentname", username, 30);
            setCookie("Studentbranch", branch, 30);
            window.location.href = "StudentMain.html";
        } else {
            alert("Invalid username or password... Try using different college name");
        }
    } catch (error) {
        console.error("Error during login:", error);
        alert("Something went wrong. Please try again.");
    }
});


async function fetchColleges() {
    try {
        allColleges = await getCollegeNames();
        console.log(allColleges);
        
        updateCustomSelect(CollegeSelect, allColleges, "Select a College");
        document.getElementById("mainDiv").style.display = "block";
        document.getElementById("loadingPopup").style.display = "none";
    } catch (error) {
        console.error("Error fetching branches:", error);
    }
}

async function fetchBranches(college) {
    try {
        allBranches = await getBranchNames(college);
        console.log(allBranches);
        
        updateCustomSelect(branchSelect, allBranches, "Select a Branch");
    } catch (error) {
        console.error("Error fetching subjects:", error);
    }
}







export {fetchColleges, fetchBranches }