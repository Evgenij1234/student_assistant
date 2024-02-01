function viewFormVhod(){
    document.getElementById("Vhod1").style.display = "block";
    document.getElementById("reg2").style.display = "none";
    document.getElementById("location2").style.display = "none";
  };
  function viewFormVhodExit(){
     document.getElementById("Vhod1").style.display = "none";
     document.getElementById("reg2").style.display = "block";
     document.getElementById("location2").style.display = "block";
  }
  function viewFormReg(){
    document.getElementById("reg1").style.display = "block";
    document.getElementById("Vhod2").style.display = "none";
    document.getElementById("location2").style.display = "none";
  };
  function viewFormRegExit(){
    document.getElementById("reg1").style.display = "none";
    document.getElementById("Vhod2").style.display = "block";
    document.getElementById("location2").style.display = "block";
  };
  function viewFormLocation(){
    document.getElementById("location1").style.display = "block";
    document.getElementById("Vhod2").style.display = "none";
    document.getElementById("reg2").style.display = "none";
  }
  function viewFormLocationExit(){
    document.getElementById("location1").style.display = "none";
    document.getElementById("Vhod2").style.display = "block";
    document.getElementById("reg2").style.display = "block";
  }
  document.addEventListener("click", function(e) {
    let m = document.getElementById('sort2');
    if (e.target.id != 'sort1' && e.target.id != 'sort2') {
      m.style.display = 'none';
    } else if (e.target.id == 'sort1') {
      m.style.display = (m.style.display != 'block') ? 'block' : 'none';
    }
  });


 
