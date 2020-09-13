import React from 'react';


import { imagePathResolver } from '../utils';

class Portfolio extends React.Component{

    render(){
      const { projects } = this.props.data;

        return (
          <section id="work" className="portfolio-mf sect-pt4 route">
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <div className="title-box text-center">
                    <h3 className="title-a">
                      Portfolio
                    </h3>
                    <p className="subtitle-a">
                      Check Out My Latest Projects.
                    </p>
                    <div className="line-mf"></div>
                  </div>
                </div>
              </div>
              <div className="row">
                {projects && projects.map((data, index)=>(
                   <div className="col-md-4" key={index}>
                   <div className="work-box">
                     <a href={imagePathResolver(data.image)} data-lightbox={`gallery-${index}`}>
                       <div className="work-img">
                         <img src={imagePathResolver(data.image)} alt="" className="img-fluid"/>
                       </div>
                       <div className="work-content">
                         <div className="row">
                           <div className="col-sm-8">
                             <h2 className="w-title">{data.name}</h2>
                             <div className="w-more">
                               <span className="w-ctegory">{data.description}</span> {/*/ <span className="w-date">18 Sep. 2018</span>*/}
                             </div>
                           </div>
                           <div className="col-sm-4">
                             <div className="w-like">
                               <span className="ion-ios-plus-outline"></span>
                             </div>
                           </div>
                         </div>
                       </div>
                       </a>
                       {
                         data.lists && data.lists.map((img, i)=> <a key={i} href={imagePathResolver(img.image)} data-lightbox={`gallery-${index}`} style={{display: "none"}}>{img.title}</a>)
                       }
                   </div>
                   </div>
                ))}
               
               
              
              
                
              </div>
            </div>
          </section>
        );
    }
}

export default Portfolio;