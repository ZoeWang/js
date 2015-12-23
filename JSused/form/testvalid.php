<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>测试验证规则</title>
<script type="text/javascript" src="jquery-1.9.1.js"></script>
<script type="text/javascript" src="valid.js"></script>
<!-- <script type="text/javascript" src="test_base.js"></script> -->
</head>

<body>
	<form id="form1" name="form1" method="post" action="">
	  <p>
	    <label for="text1">中文</label>
	    <input type="text" name="text1" id="firstname" />
	  </p>
	  <p>
	    <label for="text2">英文</label>
	    <input type="text" name="text2" id="text2" />
	  </p>
	  <p>
	    <label for="text3">中英混淆</label>
	    <input type="text" name="text3" id="text3" />
	  </p>
	  <p>
	    <label for="text4">email</label>
	    <input type="text" name="text4" id="text4" />
	  </p>
	  <p>
	    <label for="text5">phone</label>
	    <input type="text" name="text5" id="text5" />
	  </p>
	  <p>
	    <label for="text6">telephone</label>
	    <input type="text" name="text6" id="text6" />
	  </p>
	   <p>
	    <input type="submit" name="button" id="button" value="提交" />
	  </p>
	</form>
<script type="text/javascript">
$(function(){
	$('#button').submit(function() {
		$(this).siblings('.error').hide();
	    $('input, button', this).blur();
	    $('#form1 .errorTip').html('');
	   	$('#form1 .errorTip').html('');
	    var _minlength = (litb.lan=='ja'||litb.lan=='ko')?2:3;
	    var items = {
	        firstname : [{type:'null', errMsg:litb.langs.poAddr.noFirstName}, {type:'latinMinlength', minlength:2, errMsg:litb.langs.poAddr.shortFirstName.stringFormat(2)}],
	        lastname : [{type:'null', errMsg:litb.langs.poAddr.noLastName}, {type:'latinMinlength', minlength:2, errMsg:litb.langs.poAddr.shortLastName.stringFormat(2)}, {type:'fullname', latinMaxlength:34, jpMaxlength:11, errMsg:litb.langs.poAddr.exceedFullName}],
	        street_address : [{type:'null', errMsg:litb.langs.poAddr.noShippingAddress}, {type:'minlength', minlength:5, errMsg:litb.langs.poAddr.shortShippingAddress.stringFormat(5)}],
	        city : [{type:'null', errMsg:litb.langs.poAddr.noCity}, {type:'minlength', minlength:_minlength, errMsg:litb.langs.poAddr.shortCity.stringFormat(_minlength)}],
	        country_id : [{type:'select', value:-1, errMsg:litb.langs.poAddr.noCountry}],
	        zone_id : [{type:'select', value:-1, errMsg:litb.langs.poAddr.noZoneId}],
	        tax_code_value : [{type:'nullPersonal', errMsg:litb.langs.poAddr.noPersonalTaxCode}, {type:'nullCompany', errMsg:litb.langs.poAddr.noCompanyTaxCode}, {type:'personalTaxCode', minlength:11, errMsg:litb.langs.poAddr.invalidPersonalTaxCode.stringFormat(11)}, {type:'companyTaxCode', minlength:14, errMsg:litb.langs.poAddr.invalidCompanyTaxCode.stringFormat(14)}],
	        postcode : [{type:'null', errMsg:litb.langs.poAddr.noPostcode}, {type:'minlength', minlength:4, errMsg:litb.langs.poAddr.shortPostcode.stringFormat(4)}],
	        phone : [{type:'null', errMsg:litb.langs.poAddr.noPhone}, {type:'digitMinlength', minlength:7, errMsg:litb.langs.poAddr.shortPhone.stringFormat(7)}, {type:'phone', maxlength:15, errMsg:litb.langs.poAddr.invalidPhone}, {type:'areaPhone', maxlength:15, errMsg:litb.langs.poAddr.areaPhoneExceed.stringFormat(15)}]
	    };
	    
	    return $('#button').formCheck(items, {
	        errinfoFinder: function(obj) {return obj.siblings(':last');},
	        rules: {latinMinlength : function(obj, checks) {if (litb.lan=='ja'||litb.lan=='ko')return true; return $(obj).val().length >= checks.minlength;},
	            fullname : function(obj, checks) {var maxlength = (litb.lan=='ja'||litb.lan=='ko')?checks.jpMaxlength:checks.latinMaxlength;return $('#firstname').val().length + $('#lastname').val().length <= maxlength;},
	            nullPersonal : function(obj, checks) {if ($('#taxCodeOption').val() == '1') {return $(obj).val().length > 0;} return true;},
	            nullCompany  : function(obj, checks) {if ($('#taxCodeOption').val() == '2') {return $(obj).val().length > 0;} return true;},
	            personalTaxCode : function(obj, checks) {if ($('#taxCodeOption').val() == '1') {return $(obj).val().replace(/[\.\-/]/g, '').length >= checks.minlength && $(obj).val().replace(/[0-9\.\-/]/g, '').length == 0;} return true;},
	            companyTaxCode : function(obj, checks) {if ($('#taxCodeOption').val() == '2') {return $(obj).val().replace(/[\.\-/]/g, '').length >= checks.minlength && $(obj).val().replace(/[0-9\.\-/]/g, '').length == 0;} return true;},
	            areaPhone : function(obj, checks) {return ($(obj).prev().val().replace('+','').length + $.trim($(obj).val().replace(/[\s]+/g, ' ')).length <= checks.maxlength);}}
	    });
	});	
})
</script>
<?php
   // $t1 = $_POST['text1'];
   // echo $t1;
?>
</body>
</html>
