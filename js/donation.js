
let totalDonations = 6000; 
const donationGoal = 10000; 

document.getElementById('donation-form').addEventListener('submit', function (event) {
    event.preventDefault(); 
   
    let donationAmount = parseFloat(document.getElementById('donation-amount').value);

    if (!donationAmount || donationAmount <= 0) {
        alert('Please enter a valid donation amount.');
        return;
    }

    
    totalDonations += donationAmount;

    let progressPercentage = Math.min((totalDonations / donationGoal) * 100, 100);
    document.querySelector('.progress-fill').style.width = `${progressPercentage}%`;

   
    document.querySelector('.progress-text span').innerText = `$${totalDonations.toLocaleString()} raised of $${donationGoal.toLocaleString()} goal`;

    document.getElementById('donation-form').reset();

    alert('Thank you for your donation!');
});
$(document).ready(function () {
    $("#expiry-date").datepicker();
})
