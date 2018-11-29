//fadeAllFinancial() code based on fadeAllCeo in ceo.js
function fadeAllFinancial(callBack) {
    if ($('.content-initial').css('display').toLowerCase() != 'none') {
        $('.content-initial').fadeOut(callBack);
    } else if ($('.content-review-department-requests').css('display').toLowerCase() != 'none') {
        $('.content-review-department-requests').fadeOut(callBack);
    } else if ($('.content-distribute-total-revenue').css('display').toLowerCase() != 'none') {
        $('.content-distribute-total-revenue').fadeOut(callBack);
    }
}

function displayAllRequests(html) {

    const requests = html.requests;

    // Clears the list before appending html elements to div's. Prevents the same tuples from being printed more than
    // once when fading out of the Review Department Requests frame, and then fading it back in.
    $('.request-list-box-department-name').html("");
    $('.request-list-box-amount').html("");
    $('.request-list-box-reason').html("");
    $('.request-list-box-notify').html("");


    for (let i = 0; requests.length; i++) {
        const currentRequest = requests[i];
        $('.request-list-box-department-name').append('<div class="request-list-entry"> <div class="request-list-entry-text">'
                                                                + currentRequest.department + '</div> </div>');
        $('.request-list-box-amount').append('<div class="request-list-entry"> <div class="request-list-entry-text">'
                                                                + currentRequest.amount + '</div> </div>');
        $('.request-list-box-reason').append('<div class="request-list-entry"> <div class="request-list-entry-text">'
                                                                + currentRequest.reason + '</div></div>');
        $('.request-list-box-notify').append();
    }

}

function reviewDepartmentRequestsClicked() {
    $('.graph-button').fadeOut();
    fadeAllFinancial(showReviewDepartmentRequests);
    $.ajax({
        url: "http://127.0.0.1:5000/requests/all_requests",
        cache: false,
        success: function(html){
            displayAllRequests(html);
        }
    });
}

function showReviewDepartmentRequests(callback) {
    $('.content-review-department-requests').fadeIn(callback);
    fadeInGraphButton();
}

function displayAllDepartmentsAndRevenueInputs(html) {
    const departments = html.departments;

    $('.distribute-revenue-form').html('');

    for (let i = 0; departments.length; i++) {
        const currentDepartment = departments[i];
        $('.distribute-revenue-form').append('<div class="distribute-revenue-entry"><form>'
                                        + currentDepartment.department
                                        + ': <input type="text" name="'
                                        + currentDepartment.department
                                        + 'RevenueEntry"> </form> </div>')
    }
}

function distributeTotalRevenueClicked() {
    $('.graph-button').fadeOut();
    fadeAllFinancial(showDistributeTotalRevenue);
    $.ajax({
        url: "http://127.0.0.1:5000/all_departments",
        cache: false,
        success: function(html){
            displayAllDepartmentsAndRevenueInputs(html);
        }
    });
}

function showDistributeTotalRevenue(callback) {
    $('.content-distribute-total-revenue').fadeIn(callback);
    fadeInGraphButton();
}

function graphButtonClicked() {
    $('.graph-button').fadeOut();
    fadeAllFinancial(showInitialContent);
}

function checkIfCeoSetRevenueGoal() {
    // If the ceo has set a revenue goal, then 
    // display a notification
    // notify financial head when CEO makes a total revenue foal
    $.ajax({
        url: "http://127.0.0.1:5000/financial/check_total_rev_goal_set",
        cache: false,
        success: function(html){

            if (html.total_rev_goal == null) {
                // ceo has not set the notification yet
                return;
            }

            // display notification
            
        }
    });

}

checkIfCeoSetRevenueGoal();

