$(document).ready(function(){$(window).scroll(function(){$scrollamount=$(window).scrollTop();if($scrollamount>50){$(".is-sticky").addClass("fixed");}else{$(".is-sticky").removeClass("fixed");}});$('.navbar-toggler').on('click',function(){$(".is-sticky").addClass("fixed");});let toTop=document.querySelector('.go-top');window.addEventListener('scroll',()=>{if(window.pageYOffset>150){toTop.classList.add('active');}else{toTop.classList.remove('active');}})
$('.go-top').on('click',function(){$('html, body').animate({scrollTop:0},300);return false;});$('.pricing-pattern span').on('click',function(){$('.pricing-pattern span').removeClass("active");$(this).addClass("active");var selected_pattern=$(this).attr("data-pattern");$('.pricing-row .col').hide();if(selected_pattern==="android"){$('.pricing-row .col[data-pattern="android"]').show();}else if(selected_pattern==="ios"){$('.pricing-row .col[data-pattern="ios"]').show();}});});function appilix_contact_msg_esc_string(str){'use strict';return str.replaceAll('&','::appilix_amp::').replaceAll('<','::appilix_left_arrow::').replaceAll('>','::appilix_right_arrow::').replaceAll('"','::appilix_dbl_quote::').replaceAll("'",'::appilix_sin_quote::').replaceAll("`",'::appilix_grave::').replaceAll("\\",'::appilix_backslash::');return str;}
function contact_form_submit(host){var has_error=false;var topic=$(".appilix_contact select.subject").val()
var full_name=$(".appilix_contact input.name").val()
var email_address=$(".appilix_contact input.email").val()
var message=$(".appilix_contact textarea.message").val()
if(topic.trim().length===0){has_error=true;$(".appilix_contact select.subject").addClass("error_occurred")}
if(full_name.trim().length===0){has_error=true;$(".appilix_contact input.name").addClass("error_occurred")}
if(!is_email_valid(email_address)){has_error=true;$(".appilix_contact input.email").addClass("error_occurred")}
if(message.trim().length===0){has_error=true;$(".appilix_contact textarea.message").addClass("error_occurred")}
if(!has_error){var form_data=new FormData();form_data.append("topic",topic)
form_data.append("full_name",full_name)
form_data.append("email_address",email_address)
form_data.append("message",appilix_contact_msg_esc_string(message))
var submit_btn_text=$(".appilix_contact button.submit-btn").text()
$(".appilix_contact button.submit-btn").empty().append("<div class=\"submitting_loader\"></div>")
$.ajax({url:host+'/api/contact_request.php',type:"POST",data:form_data,enctype:"multipart/form-data",cache:false,processData:false,contentType:false,success:function(data){$(".appilix_contact select.subject").val("")
$(".appilix_contact input.name").val("")
$(".appilix_contact input.email").val("")
$(".appilix_contact textarea.message").val("")
$(".appilix_contact button.submit-btn").text("Message Received, We will reach back soon.")
setTimeout(function(){$(".appilix_contact button.submit-btn").text(submit_btn_text)},2500);}})}}
function email_subscription(host,button,field){var email_address=$(field).val()
if(is_email_valid(email_address)){var form_data=new FormData();form_data.append("email_address",email_address)
var submit_btn_text=$(button).text()
$(button).empty().append("<div class=\"submitting_loader\"></div>")
$.ajax({url:host+'/api/email_subscribe.php',type:"POST",data:form_data,enctype:"multipart/form-data",cache:false,processData:false,contentType:false,success:function(data){$(field).val("")
$(button).text("Done!")
setTimeout(function(){$(button).text(submit_btn_text)},1500);}})}else{$(field).addClass("error_occurred")}}
function is_email_valid(email){'use strict';var regex=/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;return regex.test(email);}
function field_remove_errors(view){$(view).removeClass("error_occurred")}
function validateRecaptcha(){var response=grecaptcha.getResponse();if(response.length===0){alert("Complete Human Check");return false;}else{return true;}}
function calculateDiscountTimeDifference(currentDateStr,endDateStr){const currentDate=new Date(currentDateStr);const endDateParts=endDateStr.split(/[\s:-]+/);const endDate=new Date(endDateParts[2],endDateParts[1]-1,endDateParts[0],endDateParts[3],endDateParts[4]);const timeDifference=endDate-currentDate;const days=String(Math.floor(timeDifference/(1000*60*60*24))).padStart(2,'0');const hours=String(Math.floor((timeDifference%(1000*60*60*24))/(1000*60*60))).padStart(2,'0');const minutes=String(Math.floor((timeDifference%(1000*60*60))/(1000*60))).padStart(2,'0');const seconds=String(Math.floor((timeDifference%(1000*60))/1000)).padStart(2,'0');$(".discount .discount_ends").text("Ends in "+days+" Days "+hours+" Hours "+minutes+" Minutes "+seconds+" Seconds")
const updatedCurrentDate=new Date(currentDate.getTime()+1000);const updatedDay=updatedCurrentDate.getDate().toString().padStart(2,'0');const updatedMonth=(updatedCurrentDate.getMonth()+1).toString().padStart(2,'0');const updatedYear=updatedCurrentDate.getFullYear();const updatedHours=updatedCurrentDate.getHours().toString().padStart(2,'0');const updatedMinutes=updatedCurrentDate.getMinutes().toString().padStart(2,'0');const updatedSeconds=updatedCurrentDate.getSeconds().toString().padStart(2,'0');const updatedCurrentDateStr=`${updatedYear}-${updatedMonth}-${updatedDay} ${updatedHours}:${updatedMinutes}:${updatedSeconds}`;setTimeout(()=>{calculateDiscountTimeDifference(updatedCurrentDateStr,endDateStr);},1000);}