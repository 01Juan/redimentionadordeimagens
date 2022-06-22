function myFunction(){
  let x = document.getElementById("selecao-arquivo");
  let txt = "";
  if ('files' in x) {
    if (x.files.length == 0) {
      txt = "Selecione um ou mais arquivos.";
    } else {
      // for (let i = 0; i < x.files.length; i++) {
      //   txt += "<br><strong>" + (i+1) + ". file</strong><br>";
      //   let file = x.files[i];
      //   if ('name' in file) {
      //     txt += "name: " + file.name + "<br>";
      //   }
      //   if ('size' in file) {
      //     txt += "size: " + file.size + " bytes <br>";
      //   }
      // }
      for (let i = 0; i < x.files.length; i++) {
        // txt += "<br><strong>" + (i+1) + ". <strong>";
        txt += "<strong>" + (i+1) + ". </strong>";
        let file = x.files[i];
        if ('name' in file) {
          txt += file.name + " <br>" 
          // txt += file.name
          document.getElementById("demo").setAttribute("class", "demo");
        }
      }
    }
  }
  else {
    if (x.value == "") {
      txt += "Selecione um ou mais arquivos.";
    } else {
      txt += "The files property is not supported by your browser!";
      txt  += "<br>The path of the selected file: " + x.value; // If the browser does not support the files property, it will return the path of the selected file instead. 
    }
  }
  document.getElementById("demo").innerHTML = txt
}

function remover() {
    let myobj = document.getElementById("limpar");
    myobj.remove();
}





//  // fileDialog.files is a FileList 

//  var fileBuffer=[];

//  // append the file list to an array
//  Array.prototype.push.apply( fileBuffer, fileDialog.files ); // <-- here

//  // And now you may manipulated the result as required

//  // shift an item off the array
//  var file = fileBuffer.shift(0,1);  // <-- works as expected
//  console.info( file.name + ", " + file.size + ", " + file.type );

//  // sort files by size
//  fileBuffer.sort(function(a,b) {
//     return a.size > b.size ? 1 : a.size < b.size ? -1 : 0;
//  });









// // const
// //   $input    = document.getElementById('input-file'),
// //   $fileName = document.getElementById('file-name')

// // $input.addEventListener('change', function(){
// //   $fileName.textContent = this.value
// //   console.log($fileName)
// // })

// const
//   $input    = document.getElementById('selecao-arquivo'),
//   $fileName = document.getElementById('file-name')

// $input.addEventListener('change', function(){
//   // $fileName.textContent = this.value
//   console.log(this.value)
//   // console.log( $( "label" ).get() )
//   // console.log($('input[type=file]').get(0).files.length)
//   // listaArquivos()
// })

// function listaArquivos (){
//   for (let i = vSequencia; i < vSequencia2; i++) {
//     const numero = document.createElement("span")
//     // numero.setAttribute("class", "numero");
//     // numero.setAttribute("id", "limpar");
//     // var href = document.createElement("a");
//     // href.setAttribute("href", "https://api.whatsapp.com/send?phone=" + vPais + vCidade + i + "&text=" + vMsg);
//     // href.setAttribute("target", "_blank")
//     // href.setAttribute("id", i);
//     numero.innerHTML = i;
//     document.getElementsByTagName("body")[0].appendChild(numero)
//     // numero.appendChild(href);
//   }
// }



// // for (var i = vSequencia; i < vSequencia2; i++) {
// //   var numero = document.createElement("div");
// //   numero.setAttribute("class", "numero");
// //   numero.setAttribute("id", "limpar");
// //   var href = document.createElement("a");
// //   href.setAttribute("href", "https://api.whatsapp.com/send?phone=" + vPais + vCidade + i + "&text=" + vMsg);
// //   href.setAttribute("target", "_blank");
// //   href.setAttribute("id", i);
// //   href.innerHTML = i;
// //   document.getElementsByTagName("body")[0].appendChild(numero);
// //   numero.appendChild(href);
// // }

// // alert($('#myForm input[type=file]').length)
// // alert($('#myForm input[type=file]').size());
// // alert($('#file').size());
// // alert($('#file').length);

// // $('#myForm input[type=file]').get(0).files.length

