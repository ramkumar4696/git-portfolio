import React, { useState } from "react";
import { imagePathResolver } from "../utils";
import { useApolloClient, useMutation } from "@apollo/client";
import gql from "graphql-tag";
import UploadFile from "./upload";
import Spinner from "../img/Spinner.gif"

const SINGLE_UPLOAD_MUTATION = gql`
  mutation singleUpload($file: Upload!, $name:String!, $desc:String!) {
    singleUpload(file: $file, name:$name, desc:$desc) {
      id
      path
    }
  }
`;

const MULTIPLE_UPLOAD_MUTATION = gql`
  mutation multipleUpload($files: [Upload!]!) {
    multipleUpload(files: $files) {
      id
    }
  }
`;

const Contact = () => {
  const [uploadFileMutation, { loading }] = useMutation(MULTIPLE_UPLOAD_MUTATION);
  const apolloClient = useApolloClient();
  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState(false)
  const [name, setName] = React.useState("");
  const [desc, setDesc] = React.useState("");
  
  const onNameChange = ({ target: { value } }) => setName(value);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!file) return alert("file is empty");
    if (!name) return alert("name is empty");
    if (!desc) return alert("description is empty");
    const form = new FormData()
    form.append("file", file)
    form.append("name", name)
    console.log( file)
    uploadFileMutation({ variables: { files:form, name, desc } }).then(() => {
     
      apolloClient.resetStore();
      setUploaded(true)
      setTimeout(()=>setUploaded(false), 5000)
    }).catch(e=>console.log(e));
    setFile(null);
    setName("");
    setDesc("");
  };
  
  const fileChange = (file) => {
    setFile(file);
  };

 

  return (
    <section
      className="paralax-mf footer-paralax bg-image sect-mt4 route"
      style={{ backgroundImage: "url(" + imagePathResolver("earth.jpg") + ")" }}
    >
      <div className="overlay-mf"></div>
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="contact-mf">
              <div id="contact" className="box-shadow-full">
                <div className="row">
                  <div className="col-md-6">
                    <div className="title-box-2">
                      <h5 className="title-left">Send A Project</h5>
                    </div>
                    <div>
                      <form
                        onSubmit={handleSubmit}
                        className="contactForm"
                      >
                       {uploaded && <div id="sendmessage" style={{display:"block"}}>
                          Your File has been sent. Thank you!
                        </div>} 
                        <div id="errormessage"></div>
                        <div className="row">
                          <div className="col-md-12 mb-3">
                            <div className="form-group">
                              <input
                                type="text"
                                name="name"
                                className="form-control"
                                id="name"
                                placeholder="Your Name"
                                value={name}
                                required
                                onChange = {onNameChange}
                              />
                              <div className="validation"></div>
                            </div>
                          </div>
                         
                         
                          <div className="col-md-12 mb-3">
                            <div className="form-group">
                              <textarea
                                className="form-control"
                                name="message"
                                rows="5"
                                value={desc}
                                onChange={(e)=>setDesc(e.target.value)}
                                placeholder="Write something here..."
                                required
                              ></textarea>
                              <div className="validation"></div>
                            </div>
                            <div className="form-group">
                              <UploadFile
                                onChangeFile={fileChange}f
                                loading = {loading}
                                uploaded={uploaded}
                              ></UploadFile>
                              <div className="validation"></div>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <button
                              type="submit"
                              onClick={handleSubmit}
                              disabled = {loading}
                              className="button button-a button-big"
                            >
                             {loading ? <span>Uploading...<img width={30} height={30} src={Spinner} alt="loading"/></span> : "Send"}
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="title-box-2 pt-4 pt-md-0">
                      <h5 className="title-left">Get in Touch</h5>
                    </div>
                    <div className="more-info">
                      <p className="lead">
                        Whether you want to get in touch, talk about a project
                        collaboration, or just say hi, I'd love to hear from
                        you.
                        <br />
                        Simply fill the from and send me an email.
                      </p>
                      {/* <!-- <ul class="list-ico">
                                <li><span class="ion-ios-location"></span> 329 WASHINGTON ST BOSTON, MA 02108</li>
                                <li><span class="ion-ios-telephone"></span> (617) 557-0089</li>
                                <li><span class="ion-email"></span> contact@example.com</li>
                                </ul> --> */}
                    </div>
                    <div className="socials">
                      <ul>
                        <li>
                          <a
                            href="https://codepen.io/kodi24fever/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span className="ico-circle">
                              <i className="ion-social-codepen"></i>
                            </span>
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://github.com/kodi24fever"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span className="ico-circle">
                              <i className="ion-social-github"></i>
                            </span>
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.linkedin.com/in/frankizquierdo/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span className="ico-circle">
                              <i className="ion-social-linkedin"></i>
                            </span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="copyright-box">
                {/* <p className="copyright">
                  2019 &copy; Copyright <strong>Frank Izquierdo</strong>. All
                  Rights Reserved
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Contact;
