$(document).ready(function(){
  
  // -[Animasi Scroll]---------------------------
  
  $(".navbar a, footer a[href='#halamanku']").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 900, function(){
        window.location.hash = hash;
      });
    } 
  });
  
  $(window).scroll(function() {
    $(".slideanim").each(function(){
      var pos = $(this).offset().top;
      var winTop = $(window).scrollTop();
        if (pos < winTop + 600) {
          $(this).addClass("slide");
        }
    });
  });

  // -[Prediksi Model]---------------------------
  
  // Fungsi untuk memanggil API ketika tombol prediksi ditekan
  $("#prediksi_submit").click(function(e) {
    e.preventDefault();
	
	// Set data pengukuran bunga iris dari input pengguna
  var input_Age = $("#range_Age").val(); 
	var input_Sex  = $("#select_Sex").val(); 
	var input_ChestPainType = $("#select_ChestPainType").val(); 
	var input_RestingBP  = $("#range_RestingBP").val();
	var input_Cholesterol = $("#range_Cholesterol").val(); 
	var input_FastingBS  = $("#select_FastingBS").val(); 
	var input_RestingECG = $("#select_RestingECG").val(); 
	var input_MaxHR  = $("#range_MaxHR").val(); 
	var input_ExerciseAngina = $("#select_ExerciseAngina").val(); 
	var input_Oldpeak  = $("#range_Oldpeak").val(); 
	var input_ST_Slope = $("#select_ST_Slope").val();  

	// Panggil API dengan timeout 1 detik (1000 ms)
    setTimeout(function() {
	  try {
			$.ajax({
			  url  : "/api/deteksi",
			  type : "POST",
			  data : {
			  		"i_Age" : input_Age,
					  "i_Sex"  : input_Sex,
					  "i_ChestPainType" : input_ChestPainType,
					  "i_RestingBP"  : input_RestingBP,
					  "i_Cholesterol" : input_Cholesterol,
					  "i_FastingBS"  : input_FastingBS,
					  "i_RestingECG" : input_RestingECG,
					  "i_MaxHR"  : input_MaxHR,
					  "i_ExerciseAngina" : input_ExerciseAngina,
					  "i_Oldpeak"  : input_Oldpeak,
					  "i_ST_Slope" : input_ST_Slope,
			         },
			  success:function(res){
				// Ambil hasil prediksi spesies dan path gambar spesies dari API
				res_data_prediksi   = res['prediksi']
				res_gambar_prediksi = res['gambar_prediksi']
				
				// Tampilkan hasil prediksi ke halaman web
			    generate_prediksi(res_data_prediksi, res_gambar_prediksi); 
			  }
			});
		}
		catch(e) {
			// Jika gagal memanggil API, tampilkan error di console
			console.log("Gagal !");
			console.log(e);
		} 
    }, 1000)
    
  })
    
  // Fungsi untuk menampilkan hasil prediksi model
  function generate_prediksi(data_prediksi, image_prediksi) {
    var str="";
    str += "<h3>Hasil Prediksi </h3>";
    str += "<br>";
    str += "<img src='" + image_prediksi + "' width=\"200\" height=\"150\"></img>"
    str += "<h3>" + data_prediksi + "</h3>";
    $("#hasil_prediksi").html(str);
  }  
  
})
  
