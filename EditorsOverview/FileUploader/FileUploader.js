$(document).ready(function () {

    $("#fileUploader").dxFileUploader({
        uploadUrl: 'https://js.devexpress.com/Demos/NetCore/FileUploader/Upload',
        abortUpload: function (file, uploadInfo) {
            alert("stop");
        },
        onBeforeSend: (e) => {
            console.log(`onBeforeSend`);
            console.log(e);
        },
        onUploadStarted: (e) => {
            console.log(`onUploadStarted`);
            console.log(e);
        },
        onProgress: (e) => {
            console.log(`onProgress`);
            console.log(e);
        },
        onUploaded: (e) => {
            console.log(`onUploaded`);
            console.log(e);
        },
        onUploadError: (e) => {
            console.log(`onUploadError`);
            console.log(e);
        },
        onFilesUploaded: (e) => {
            console.log(`onFilesUploaded`);
            console.log(e);
        },
        onUploadAborted: (e) => {
            console.log(`onUploadAborted`);
            console.log(e);
        },
    });

    var fileUploader2Instance = $("#fileUploader2").dxFileUploader({
        selectButtonText: 'upload img',
        uploadUrl: 'https://js.devexpress.com/Demos/NetCore/FileUploader/Upload',
        dropZone: "#dropArea", // to specify drop area
        dialogTrigger: "#dropArea", // invokes file upload dialog

        onDropZoneEnter: () => {
            $("#dropArea").css('border-color','lime');
        },
        onDropZoneLeave: () => {
            $("#dropArea").css('border-color','crimson');
            setTimeout(()=>{
                $("#dropArea").css('border-color','white');
            },1000)
        },

        // visible: false, // to hide original upload button and only work with dropZone
        multiple: false, // alllow mutliple files
        uploadMode: 'instantly', // 'instantly' | 'useButtons' | 'useForm' 
        // allowedFileExtensions: ['.jpg', '.jpeg', '.gif', '.png'], // check valid extensions 
        // invalidFileExtensionMessage: '[Custom] : not allowed Extensions',
        allowCanceling: false, // default: true
        accept: ".jpg,.jpeg,.gif,.png", // only for upload dialog
        labelText: '[ jpg jpeg gif png ]',

        maxFileSize: 2000000, //2MB
        invalidMaxFileSizeMessage: '[Custom] : tooooo large',
        minFileSize: 4000, // 4KB
        invalidMinFileSizeMessage:'[Custom] : tooooo small',

        onUploaded: () => {
            fileUploader2Instance.option('dropZone', '');

            $("#dropAreaText").css('display', 'none');

        },

        width: 280,

        chunkSize: 10000,
        onProgress: (e) => {
            // console.log(e);
            console.log(`Uploaded bytes : ${e.bytesLoaded} , Total bytes : ${e.bytesTotal}`);
        }

    }).dxFileUploader('instance');


});

/*
// abortUpload
// accept
// allowCanceling
// allowedFileExtensions
// chunkSize
// dialogTrigger
// dropZone
// invalidFileExtensionMessage
// invalidMaxFileSizeMessage
// invalidMinFileSizeMessage
// labelText
// maxFileSize
// minFileSize
// multiple
// onBeforeSend
// onDropZoneEnter
// onDropZoneLeave
// onFilesUploaded
// onProgress
// onUploadAborted
// onUploaded
// onUploadError
// onUploadStarted
// progress
// readyToUploadMessage
// selectButtonText
// showFileList
// uploadAbortedMessage
// uploadButtonText
uploadChunk
uploadCustomData
// uploadedMessage
// uploadFailedMessage
uploadFile
uploadHeaders
uploadMethod
// uploadMode
// uploadUrl
*/