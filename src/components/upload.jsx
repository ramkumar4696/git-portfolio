import React, { useState, useEffect, useRef } from "react";
import { Input } from "reactstrap";
import "./upload.scss";

const UploadFile = ({ onChangeFile, uploaded }) => {
  const [uploadInput, setUploadInput] = useState("No File Choosen")
  const fileRef = useRef(null)
  const _validFileExtensions = [".zip"];

  useEffect(()=>{
    if(uploaded){
      setUploadInput("No File Choosen")
      console.log(fileRef)
      if (fileRef.current) fileRef.current.value = null;
    }
  }, [uploaded])

  const Validate = (oForm) => {
    console.log(oForm);
    var sFileName = oForm.value || oForm.name;
    if (sFileName.length > 0) {
      var blnValid = false;
      for (var j = 0; j < _validFileExtensions.length; j++) {
        var sCurExtension = _validFileExtensions[j];
        if (
          sFileName
            .substr(
              sFileName.length - sCurExtension.length,
              sCurExtension.length
            )
            .toLowerCase() == sCurExtension.toLowerCase()
        ) {
          blnValid = true;
          break;
        }
      }

      if (!blnValid) {
        alert(
          "Sorry, " +
            sFileName +
            " is invalid, allowed extensions are: " +
            _validFileExtensions.join(", ")
        );
        return false;
      }
    }
    setUploadInput(sFileName)
    return true;
  };

  const onChange = ({
    target: {
      validity,
      files: [file],
    },
  }) => validity.valid && Validate(file) && onChangeFile(file);

  return (
    <div id="FileUpload">
      <Input
        type="file"
        size="24"
        id="BrowserHidden"
        required
        onChange={onChange}
        ref={fileRef}
        accept=".zip"
      />
      <div id="BrowserVisible">
        <input type="text" id="FileField" value={uploadInput} />
      </div>
    </div>
  );
};

export default UploadFile;
