import React from 'react';
import logo from '../logo.png';
import Select from 'react-select';
import Dropzone from 'react-dropzone';
import {Modal,Button} from 'react-bootstrap'
import { withAuthorization } from '../Session';
// const ModalBriefTitle = ({open, hide,openModalTalent}) => (
//   <Modal show={open} onHide={hide}>
//     <Modal.Header closeButton>
//       <Modal.Title>Intitulé du brief</Modal.Title>
//     </Modal.Header>
//     <Modal.Body>
//       <input type="text" name='title'/>
//     </Modal.Body>
//     <Modal.Footer>
//       <Button variant="secondary" onClick={() => {hide();openModalTalent()}}>
//         CONTINUER
//       </Button>
//     </Modal.Footer>
//   </Modal>
// )
// const ModalTalent = ({openModalTalent, hideModalTalent}) => (
//   <Modal show={openModalTalent} onHide={hideModalTalent}>
//     <Modal.Header closeButton>
//       <Modal.Title>Ajouter un talent</Modal.Title>
//     </Modal.Header>
//     <Modal.Body>
//     <p>Métier</p><br/>
//     <Select 
//         options={options}
//         placeholder='Trier'
//         isSearchable={false}
//     />   
//     </Modal.Body>
//     <Modal.Footer>
//       <Button variant="secondary" onClick={hideModalTalent}>
//       LANCER LA RECHERCHE
//       </Button>
//     </Modal.Footer>
//   </Modal>
// )
const options = [
  { value: 'option1', label: 'option1' },
  { value: 'option2', label: 'option2' },
  { value: 'option3', label: 'option3' },
];
const metierOptions=[
  { value: 'photographe', label: 'photographe' },
  { value: 'designer', label: 'designer' },
  { value: 'frontEndDeveloper', label: 'frontEndDeveloper' },
]
const participationOptions=[
  { value: 'Compétition', label: 'Compétition' },
  { value: 'Conférence', label: 'Conférence' },
  { value: 'nimporte', label: 'nimporte' },
]
class ListingBrief extends React.Component {
  state = {
    selectedOption: null,
    selectedMetier:null,
    selectedParticipation:null,
    open: false,
    openModalTalent: false,
    tagsMetier:[],
    newTagMetier:'',
    spécificitésGénérales:[],
    newSpécificitéGénérale:''
  };
  handleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };
  handleChangeMetier= selectedMetier => {
    this.setState({ selectedMetier });
    console.log(`Metier selected:`, selectedMetier);
  };
  handleChangeParticipation= selectedParticipation => {
    this.setState({ selectedParticipation });
    console.log(`Metier selected:`, selectedParticipation);
  };

  handleChangenewTagMetier = (e) =>{
    this.setState({
      newTagMetier:e.target.value
    })
}
handleSubmitnewTagMetier = (e) =>{
  e.preventDefault();
  if (this.state.newTagMetier!=='') {let newcontent=this.state.newTagMetier;this.addTagMetier({newcontent})
  this.setState({
    newTagMetier:''
  })
}
}
addTagMetier = (newcontent) =>{ 
 
  let tagsMetier=[...this.state.tagsMetier, newcontent];
  this.setState({
    tagsMetier
  })
    }

    handleChangenewSpécificitéGénérale = (e) =>{
      this.setState({
        newSpécificitéGénérale:e.target.value
      })
  }
  handleSubmitnewSpécificitéGénérale = (e) =>{
    e.preventDefault();
    if (this.state.newSpécificitéGénérale!=='') {let newcontent=this.state.newSpécificitéGénérale;this.addSpécificitéGénérale({newcontent})
    this.setState({
      newSpécificitéGénérale:''
    })
  }
  }
  addSpécificitéGénérale = (newcontent) =>{ 
   
    let spécificitésGénérales=[...this.state.spécificitésGénérales, newcontent];
    this.setState({
      spécificitésGénérales
    })
      }

  hideModalTalent=() => this.setState({openModalTalent: false})
  openModalTalent=()=>this.setState({openModalTalent:true})
  hide=() => this.setState({open: false})
  render() {
    const { selectedOption, selectedMetier, selectedParticipation, open, openModalTalent } = this.state;
 
    return (
  <div>
<div className='horline'></div>
<img className='logo' src={logo}/>
<div className='leftnav'>
<ul className='leftnavmenu'>
  <li className='menuActif'>Briefs</li>
  <li>Pre-selection</li>
  <li>Veille</li>
  <li>Talents</li>
</ul>
<div style={{position:'absolute',left:'28px',top:'734.16px'}}>
<svg width="108" height="43" viewBox="0 0 108 43" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M70.9893 0.859103C70.9893 0.558749 71.2135 0.308289 71.5125 0.308289H87.295C87.5944 0.308289 87.8186 0.558749 87.8186 0.859103V2.86245C87.8186 3.16314 87.5944 3.38849 87.295 3.38849H81.1233V16.2958C81.1233 16.5965 80.8743 16.8469 80.575 16.8469H78.2075C77.9085 16.8469 77.6843 16.5965 77.6843 16.2958V3.38849H71.5125C71.2135 3.38849 70.9893 3.16314 70.9893 2.86245V0.859103Z" fill="black"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M50.8827 9.47685H45.6544C45.3967 9.47685 45.1882 9.68997 45.1882 9.95298V11.4716C45.1882 11.7465 45.408 11.9712 45.6771 11.9712H47.8741C46.9859 13.2473 45.5309 14.0753 43.7962 14.0753C40.7776 14.0753 38.6022 11.7581 38.6022 8.62303C38.6022 5.55606 40.7996 3.12514 43.7519 3.12514C46.0162 3.12514 47.5699 4.28393 48.4357 5.98759C48.5023 6.14652 48.5909 6.37385 48.924 6.30578L51.1214 5.73779C51.4544 5.64692 51.4324 5.39712 51.3658 5.23786C50.2561 2.17121 47.1925 0.308289 43.7519 0.308289C39.1127 0.308289 35.4946 3.89767 35.4946 8.57744C35.4946 13.2575 38.8686 16.8469 43.3969 16.8469C45.9496 16.8469 47.5699 15.8018 48.569 14.3932V16.0291C48.569 16.304 48.7888 16.5287 49.0578 16.5287H50.81C51.079 16.5287 51.2992 16.304 51.2992 16.0291V9.90243C51.2992 9.66717 51.1126 9.47685 50.8827 9.47685Z" fill="black"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0.526003 16.8469C0.21529 16.8469 0 16.6107 0 16.3272V14.9096C0 14.6024 0.16741 14.3661 0.334821 14.1771L9.03614 3.11985H0.735936C0.449329 3.11985 0.23404 2.8836 0.23404 2.62389V0.828043C0.23404 0.544541 0.449329 0.308289 0.735936 0.308289H12.7178C12.9807 0.308289 13.2197 0.544541 13.2197 0.828043V2.48181C13.2197 2.74185 13.1002 3.00189 12.9331 3.19056L4.4943 14.0354H13.2676C13.5304 14.0354 13.7695 14.2481 13.7695 14.5316V16.3272C13.7695 16.6107 13.5304 16.8469 13.2676 16.8469H0.526003Z" fill="black"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M90.8789 25.9738C90.8789 25.6735 91.1032 25.423 91.4022 25.423H107.185C107.484 25.423 107.708 25.6735 107.708 25.9738V27.9772C107.708 28.2779 107.484 28.5032 107.185 28.5032H101.013V41.4108C101.013 41.7112 100.764 41.9617 100.465 41.9617H98.0972C97.7982 41.9617 97.5739 41.7112 97.5739 41.4108V28.5032H91.4022C91.1032 28.5032 90.8789 28.2779 90.8789 27.9772V25.9738Z" fill="black"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M67.3176 25.423C67.5796 25.423 67.7764 25.6416 67.7764 25.9044V27.6547C67.7764 27.9172 67.5796 28.1139 67.3176 28.1139H60.4544V31.7236H65.2153C65.4773 31.7236 65.674 31.9422 65.674 32.2047V33.8675C65.674 34.1296 65.4773 34.3485 65.2153 34.3485H60.4544V38.0458H67.4488C67.7108 38.0458 67.9295 38.2424 67.9295 38.5049V40.2552C67.9295 40.5177 67.7108 40.7366 67.4488 40.7366H57.9849C57.7223 40.7366 57.5259 40.5177 57.5259 40.2552V25.8825C57.5259 25.6416 57.7223 25.423 57.9849 25.423H67.3176Z" fill="black"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M25.9264 28.8254H25.8058L23.5866 35.2756H28.1935L25.9264 28.8254ZM20.9093 41.9617H18.5216C18.1598 41.9617 17.9426 41.6778 18.1115 41.2291L23.7072 25.919C23.8282 25.5648 24.1413 25.423 24.3829 25.423H27.6148C27.856 25.423 28.1695 25.5648 28.2902 25.919L33.9099 41.2057C34.0788 41.6778 33.8376 41.9617 33.4518 41.9617H30.9191C30.6296 41.9617 30.485 41.7961 30.3884 41.5126L29.1344 37.9454H22.6701L21.4401 41.5126C21.3438 41.7727 21.1749 41.9617 20.9093 41.9617Z" fill="black"/>
</g>
<defs>
<clipPath id="clip0">
<rect y="0.162781" width="108" height="41.8964" fill="white"/>
</clipPath>
</defs>
</svg>
</div>
</div>
<div className='horlineleftnav'></div>
<p className='briefs'>Briefs</p>
<div className='selectContainer'>
<Select 
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
        placeholder='Trier'
        isSearchable={false}
/>
</div>
<button className='createBriefButton' onClick={()=>this.setState({open:true})}> <p className='createBriefButtonText'> CREER UN NOUVEAU BRIEF</p></button>

{/* <ModalBriefTitle openModalTalent={()=>this.setState({openModalTalent:true})} open={open} hide={() => this.setState({open: false})} /> */}
<Modal show={open} onHide={this.hide}>
    <Modal.Header closeButton>
      <Modal.Title>Intitulé du brief</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <input type="text" name='title'/>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={() => {this.hide();this.openModalTalent()}}>
        CONTINUER
      </Button>
    </Modal.Footer>
  </Modal>

{/* <ModalTalent openModalTalent={openModalTalent} hideModalTalent={() => this.setState({openModalTalent: false})} /> */}

<Modal show={openModalTalent} onHide={this.hideModalTalent}>
    <Modal.Header closeButton>
      <Modal.Title>Ajouter un talent</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div style={{display:'flex'}}>
        <div>
    <p>Métier</p><br/>
    <Select 
        className='hello'
        value={selectedMetier}
        onChange={this.handleChangeMetier}
        options={metierOptions}
        placeholder='Select'
        isSearchable={false}
    />   
    <input type='text'name='newTagMetier' onChange={this.handleChangenewTagMetier} value={this.state.newTagMetier} /> 
    <button onClick={this.handleSubmitnewTagMetier}>Enter</button> 
<div style={{display:'flex'}}>
    {this.state.tagsMetier.length ? (
    this.state.tagsMetier.map((el,index) => {
      return (


          <p style=
          {{width: '88px',height: '23px',background: '#EBEBEB',borderRadius: '11.5px',textAlign:'center',margin:'5px'}} 
             key={index}>{el.newcontent}</p>
      )
    })
  ) : (
    <p></p>
  )}
  </div>

  <label for="client">Client</label><br/>
  <input type="text" id="client" name="client"></input><br/><br/>
  
  <label for="newSpécificitéGénérale">Spécificités générales</label><br/>
  <input type='text'id='newSpécificitéGénérale' name='newSpécificitéGénérale' onChange={this.handleChangenewSpécificitéGénérale} value={this.state.newSpécificitéGénérale} /> 
    <button onClick={this.handleSubmitnewSpécificitéGénérale}>Enter</button> 
<div style={{display:'flex'}}>
    {this.state.spécificitésGénérales.length ? (
    this.state.spécificitésGénérales.map((el,index) => {
      return (


          <p style=
          {{width: '88px',height: '23px',background: '#EBEBEB',borderRadius: '11.5px',textAlign:'center',margin:'5px'}} 
             key={index}>{el.newcontent}</p>
      )
    })
  ) : (
    <p></p>
  )}
  </div>
  
  <p>A participer à </p><br/>
    <Select 
        value={selectedParticipation}
        onChange={this.handleChangeParticipation}
        options={participationOptions}
        placeholder='Select'
        isSearchable={false}
    /> 
    </div>
    <div style={{width: '400px',
height: '437px',border: '1px solid #C4C4C4',
boxSizing: 'border-box',
borderRadius: '2px'}}>
    <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
  {({getRootProps, getInputProps}) => (
    <section>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
    </section>
  )}
</Dropzone>    </div>
    </div>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={this.hideModalTalent}>
      LANCER LA RECHERCHE
      </Button>
    </Modal.Footer>
  </Modal>


<div className='horline2'></div>
<div className='rectangle'></div>




  </div>
); 
}
}
const condition = authUser => !!authUser;
export default withAuthorization(condition)(ListingBrief);
