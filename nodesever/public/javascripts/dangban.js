
			

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
            alert('hello world')
			const firebaseConfig = {
				
			};
			const app = initializeApp(firebaseConfig);
			import { getStorage, ref as sRef,uploadBytesResumable,getDownloadURL } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-storage.js";
            //Clould //
            import { getFirestore,doc,getDoc,setDoc,collection,addDoc } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";
            const cloudb = getFirestore();
			//---------------------//
			var files = [];
			var reader = new FileReader();
			var namebox = document.getElementById('namebox');
			var exitlab = document.getElementById('exitlab');
			
			var upprogess = document.getElementById('upprogess');
			var setbtn = document.getElementById('setbtn');
			var upbtn = document.getElementById('upbtn');
			var downbtn = document.getElementById('downbtn');
            var namefirestore = document.getElementById('namefirestore');
           
            //Hinh 1//
            var inputs1 = document.createElement('input');
            inputs1.type = "file";
            var up1 = document.getElementById('up1');
            var hinh1 = document.getElementById('ten1');
            var hinhXe1 = document.getElementById('hinhchiecXe1');
            createUploadFirebase(inputs1,up1,hinh1,hinhXe1);
            //---------//
             //Hinh 2//
             var inputs2 = document.createElement('input');
             inputs2.type = "file";
             var up2 = document.getElementById('up2');
             var hinh2 = document.getElementById('ten2');
             var hinhXe2 = document.getElementById('hinhchiecXe2');
             createUploadFirebase(inputs2,up2,hinh2,hinhXe2);
             //---------//
              //Hinh 3//
              var inputs3 = document.createElement('input');
              inputs3.type = "file";
              var up3 = document.getElementById('up3');
              var hinh3 = document.getElementById('ten3');
              var hinhXe3 = document.getElementById('hinhchiecXe3');
              createUploadFirebase(inputs3,up3,hinh3,hinhXe3);
              //---------//
              //Hinh 4//
              var inputs4 = document.createElement('input');
              inputs4.type = "file";
              var up4 = document.getElementById('up4');
              var hinh4 = document.getElementById('ten4');
              var hinhXe4 = document.getElementById('hinhchiecXe4');
              createUploadFirebase(inputs4,up4,hinh4,hinhXe4);
              //---------//
              //Hinh 5//
              var inputs5 = document.createElement('input');
              inputs5.type = "file";
              var up5 = document.getElementById('up5');
              var hinh5 = document.getElementById('ten5');
              var hinhXe5 = document.getElementById('hinhchiecXe5');
              createUploadFirebase(inputs5,up5,hinh5,hinhXe5);
              //---------//
              //Hinh 6//
              var inputs6 = document.createElement('input');
              inputs6.type = "file";
              var up6 = document.getElementById('up6');
              var hinh6 = document.getElementById('ten6');
              var hinhXe6 = document.getElementById('hinhchiecXe6');
              createUploadFirebase(inputs6,up6,hinh6,hinhXe6);
              //---------//
              //Hinh 7//
              var inputs7 = document.createElement('input');
              inputs7.type = "file";
              var up7 = document.getElementById('up7');
              var hinh7 = document.getElementById('ten7');
              var hinhXe7 = document.getElementById('hinhchiecXe7');
              createUploadFirebase(inputs7,up7,hinh7,hinhXe7);
              //---------//
            function GetExtName(file){
				const temp = file.name.split('.');
				const ext = temp.slice((temp.length-1),(temp.length));
				return '.' + ext[0];
			} 
			function GetFileName(file){
				const temp = file.name.split('.');
				const fname = temp.slice(0,-1).join('0');
				return fname;
			}
			// var inputs = document.createElement('input');
            // inputs.type = "file";
            function createUploadFirebase(inputs,ups,ten,duonglink){
                var myimg = document.getElementById('myimg');
                inputs.onchange = e => {
                files = e.target.files;
                var exits = GetExtName(files[0]);
                var names = GetFileName(files[0]);
                ten.value = names+exits;
                // exitlab.innerHTML = exits;
                reader.readAsDataURL(files[0]);
                
                if(ten.value == ""){
                    alert('doi chut');
                } else {
                    UploadProges1();
                    getImage1();
                }
            }
            reader.onload = function () {
				myimg.src = reader.result;
			}
            async function UploadProges1(){
                var ImgToUpload = files[0];
                var ImgName = ten.value;
                const metaData =  {
                    contentType: ImgToUpload.type
                }
                const storage = getStorage();
                const storoageRef = sRef(storage,"Images"+ImgName);
                const UploadTask = uploadBytesResumable(storoageRef,ImgToUpload,metaData);
                UploadTask.on("stage-changed",(snapshot)=>{
                    var progess = (snapshot.bytesTransferred/snapshot.totalByte) *100;
                    upprogess.innerHTML = "Upload" + progess + "%"
                }, (error) => {
                    alert('ERRRO');
                },
                ()=>{
                    getDownloadURL(UploadTask.snapshot.ref).then((downloadURL)=>{
                        console.log(downloadURL);
                        SaveURLtoFirestore1(downloadURL);
                    })
                }
                );
            }
            async function SaveURLtoFirestore1(url){
                var name = ten.value;
                var ext = exitlab.innerHTML;
                var ref = doc(cloudb,"Images/" + name);
                await setDoc(ref,{
                    image_name:(name),
                    ImageUrl:url
                    }
                )
            }
            async function getImage1(){
                var name = ten.value;
                console.log(name);
                var ref = doc(cloudb,"Images/"+name)
                const docSnap = await getDoc(ref);
                console.log(docSnap._document);
                if(docSnap._document==null){
                    ups.onload = function(){
                        inputs.click();
                    }
                } else {
                    if(docSnap.exists()){
                        alert('upload Thanh cong roi');
                        duonglink.value = docSnap.data().ImageUrl;
                    }
                }
               
            }
            ups.onclick = function(){
                inputs.click();
            }
            }
        //-----//
			// inputs.onchange = e => {
			// 	files = e.target.files;
			// 	var exits = GetExtName(files[0]);
			// 	var names = GetFileName(files[0]);
			// 	namebox.value = names;
			// 	exitlab.innerHTML = exits;
			// 	reader.readAsDataURL(files[0]);
			// 	myimg.src = names;
			// 	console.log('hello');
			// }
			// reader.onload = function () {
			// 	myimg.src = reader.result;
			// }
            // //---------------------//
            // setbtn.onclick = function(){
            //     inputs.click();
            // }
            // //---------UPLOAD------------//
            // async function UploadProgess(){
            //     var ImgToUpload = files[0];
            //     var ImgName = namebox.value + exitlab.innerHTML;
            //     const metaData =  {
            //         contentType: ImgToUpload.type
            //     }
            //     const storage = getStorage();
            //     const storoageRef = sRef(storage,"Images"+ImgName);
            //     const UploadTask = uploadBytesResumable(storoageRef,ImgToUpload,metaData);
            //     UploadTask.on("stage-changed",(snapshot)=>{
            //         var progess = (snapshot.bytesTransferred/snapshot.totalByte) *100;
            //         upprogess.innerHTML = "Upload" + progess + "%"
            //     }, (error) => {
            //         alert('ERRRO');
            //     },
            //     ()=>{
            //         getDownloadURL(UploadTask.snapshot.ref).then((downloadURL)=>{
            //             console.log(downloadURL);
            //             SaveURLtoFirestore(downloadURL);
            //         })
            //     }
            //     );
            // }
            // async function SaveURLtoFirestore(url){
            //     var name = namebox.value;
            //     var ext = exitlab.innerHTML;
            //     var ref = doc(cloudb,"Images/" + name);
            //     await setDoc(ref,{
            //         image_name:(name),
            //         ImageUrl:url
            //         }
            //     )
            // }
            // async function getImage(){
            //     var name = namebox.value;
            //     var ref = doc(cloudb,"Images/"+name)
            //     const docSnap = await getDoc(ref);
            //     if(docSnap.exists()){
                    
            //         namefirestore.value = docSnap.data().ImageUrl;
            //     }
                
            // }
            // upbtn.onclick = UploadProgess;
            // downbtn.onclick = getImage;

