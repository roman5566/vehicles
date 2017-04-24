var obj_make_model=Array();


function buildYearMenu(){
	var date = new Date();
	this_year = date.getFullYear();
	
	jQuery('#veh_year, form [name="veh_year"]').append('<option value="Other">Other</option>');
	for(i=this_year; i>=1950; i--){
		jQuery('#veh_year, form [name="veh_year"]').append('<option value="'+i+'">'+i+'</option>');		
	}
}

jQuery(document).ready(function(){
	buildYearMenu();
	jQuery('#veh_year, form [name="veh_year"]').change(function(){
		populateVMakes();
	});
	
	jQuery('#veh_make, form [name="veh_make"], form [name="veh_make"]').change(function(){
		populateModels(jQuery('#veh_make, form [name="veh_make"], form [name="veh_make"]').prop("selectedIndex"));
	});
	
	jQuery.ajax({
		type: 'GET',
		dataType: "json",
		jsonp: 'jsonp_callback',
		crossDomain: true,
		url:("http://www.yoururl.com")+"/ajax/makeModelJson.php"+("?callback=?"),
		async:false,
		error:function(xhr,status,errorThrown){
			//j(xhr+','+status+','+errorThrown);
		},
		success:function(jsonp){
			obj_make_model = jsonp;
			populateVMakes();
			jQuery('form select[name^="veh_year"]').removeAttr("disabled");
		}
	});
});


function populateVMakes(){
	jQuery('#veh_make, form [name="veh_make"], form [name="veh_make"]').children().remove();
	jQuery('#veh_make, form [name="veh_make"], form [name="veh_make"]').append('<option value="">Make</option>');
	//jQuery('#veh_make, form [name="veh_make"], form [name="veh_make"]').append('<option value="Other">Other</option>');
	for (i = 0; i < obj_make_model.length; i++){
		jQuery('#veh_make, form [name="veh_make"], form [name="veh_make"]').append('<option value="'+obj_make_model[i].Make+'">'+obj_make_model[i].Make+'</option>');
	}
}	


function populateModels(make_num) {
	make_num = make_num-1;
	jQuery('#veh_model, form [name="veh_model"]').children().remove();
	jQuery('#veh_model, form [name="veh_model"]').append('<option value="">Model</option>');
	//jQuery('#veh_make, form [name="veh_model"]').append('<option value="Other">Other</option>');
	for (i = 0; i < obj_make_model[make_num].Models.length; i++){
		jQuery('#veh_model, form [name="veh_model"]').append('<option value="'+obj_make_model[make_num].Models[i]+'">'+obj_make_model[make_num].Models[i]+'</option>');
	}
}	

