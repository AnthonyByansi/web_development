var settingsMenu = document.querySelector(".settings-menu");
var darkBtn = document.getElementById("dark-btn");


function settingsMenuToggle() {
    settingsMenu.classList.toggle("settings-menu-height");

}

darkBtn.onclick = function() {
    darkBtn.classList.toggle("dark-btn-on");
    document.body.classList.toggle("dark-theme");
}

//canging the font size of the user by the user himself

var cont = document.getElementById("widget-post");

function changeSizeByBtn(size) {

    // Set value of the parameter as fontSize
    cont.style.fontSize = size;
}

function changeSizeBySlider() {
    var slider = document.getElementById("slider");

    // Set slider value as fontSize
    cont.style.fontSize = body.value;
}




const dropArea = document.querySelector(".drag-area"),
    dragText = dropArea.querySelector("header"),
    button = dropArea.querySelector("button"),
    input = dropArea.querySelector("input");
let file;
button.onclick = () => {
    input.click();
}
input.addEventListener("change", function() {

            file = this.files[0];
            dropArea.classList.add("active");
            showFile();
            dropArea.addEventListener("dragover", (event) => {
                event.preventDefault();
                dragText.textContent = "Release to Upload File";
            });
            dropArea.addEventListener("dragleave", () => {
                dropArea.classList.remove("active");
                dragText.textContent = "Drag & Drop to Upload File";
            });
            dropArea.addEventListener("drop", (event) => {
                event.preventDefault(); //preventing from default behaviour
                //getting user select file and [0] this means if user select multiple files then we'll select only the first one
                file = event.dataTransfer.files[0];
                showFile(); //calling function
            });

            function showFile() {
                let fileType = file.type; //getting selected file type
                let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; //adding some valid image extensions in array
                if (validExtensions.includes(fileType)) { //if user selected file is an image file
                    let fileReader = new FileReader(); //creating new FileReader object
                    fileReader.onload = () => {
                        let fileURL = fileReader.result; //passing user file source in fileURL variable

                        let imgTag = `<img src="${fileURL}" alt="image">`; //creating an img tag and passing user selected file source inside src attribute
                        dropArea.innerHTML = imgTag; //adding that created img tag inside dropArea container
                    }
                    fileReader.readAsDataURL(file);
                } else {
                    alert("This is not an Image File!");
                    dropArea.classList.remove("active");
                    dragText.textContent = "Drag and Drop to Upload your photo";
                }
            }

            function myFunction() {
                var element = document.body;
                element.classList.toggle("dark-mode");
            }



            const form = document.querySelector("form"),
                fileInput = document.querySelector(".file-input"),
                progressArea = document.querySelector(".progress-area"),
                uploadedArea = document.querySelector(".uploaded-area");
            form.addEventListener("click", () => {
                fileInput.click();
            });
            fileInput.onchange = ({ target }) => {
                let file = target.files[0];
                if (file) {
                    let fileName = file.name;
                    if (fileName.length >= 12) {
                        let splitName = fileName.split('.');
                        fileName = splitName[0].substring(0, 13) + "... ." + splitName[1];
                    }
                    uploadFile(fileName);
                }
            }

            function uploadFile(name) {
                let xhr = new XMLHttpRequest();
                xhr.open("POST", "php/upload.php");
                xhr.upload.addEventListener("progress", ({ loaded, total }) => {
                    let fileLoaded = Math.floor((loaded / total) * 100);
                    let fileTotal = Math.floor(total / 1000);
                    let fileSize;
                    (fileTotal < 1024) ? fileSize = fileTotal + " KB": fileSize = (loaded / (1024 * 1024)).toFixed(2) + " MB";
                    let progressHTML = `<li class="row">
                          <i class="fas fa-file-alt"></i>
                          <div class="content">
                            <div class="details">
                              <span class="name">${name} • Uploading</span>
                              <span class="percent">${fileLoaded}%</span>
                            </div>
                            <div class="progress-bar">
                              <div class="progress" style="width: ${fileLoaded}%"></div>
                            </div>
                          </div>
                        </li>`;
                    uploadedArea.classList.add("onprogress");
                    progressArea.innerHTML = progressHTML;
                    if (loaded == total) {
                        progressArea.innerHTML = "";
                        let uploadedHTML = `<li class="row">
                            <div class="content upload">
                              <i class="fas fa-file-alt"></i>
                              <div class="details">
                                <span class="name">${name} • Uploaded</span>
                                <span class="size">${fileSize}</span>
                              </div>
                            </div>
                            <i class="fas fa-check"></i>
                          </li>`;
                        uploadedArea.classList.remove("onprogress");
                        uploadedArea.insertAdjacentHTML("afterbegin", uploadedHTML);
                    }
                });
                let data = new FormData(form);
                xhr.send(data);
            }


            function doTrick() {
                document.getElementById('file').click();
            }