
// import React, { Component } from 'react';
// import { Link, withRouter } from 'react-router-dom';
// import { compose } from 'recompose';
// import { withFirebase } from '../Firebase';
// import { withAuthorization } from '../Session';
// import * as ROUTES from '../../constants/routes';
// const AddProjet = () => (
//   <div>
//     <h1>Add a project</h1>
//     <AddProjectForm />

//   </div>
// );
// const INITIAL_STATE = {
//   nom: '',
//   montant: null,
//   dateDebut: '',
//   dateFin: '',
//   images:'',
// };
// class AddProjectFormBase extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { ...INITIAL_STATE };
//   }
//   onSubmit = event => {
//     // const { nom, montant, dateDebut,dateFin,images} = this.state;
//     let imgs=[]
//     imgs.push(this.state.images)
//     this.props.firebase.projets().add({
//         nom: this.state.nom,
//         montant: this.state.montant,
//         dateDebut: this.state.dateDebut,
//         dateFin: this.state.dateFin,
//         images: imgs,

//       })
//       .catch(function(error) {
//         console.error("Error adding document: ", error);
//     });
//         this.setState({ ...INITIAL_STATE });
//         this.props.history.push(ROUTES.ACCOUNT);


//     event.preventDefault();

//   };
//   onChange = event => {
//     this.setState({ [event.target.name]: event.target.value });
//   };
//   render() {
//     const {
//       nom,
//       montant,
//       dateDebut,
//       dateFin,
//       images,
//     } = this.state;


//     const isInvalid =
//       nom ==='' ||
//       montant === null ||
//       dateDebut === '' ||
//       dateFin === '';

//     return (
//       <form onSubmit={this.onSubmit}>
//         <input
//           name="nom"
//           value={nom}
//           onChange={this.onChange}
//           type="text"
//           placeholder="nom du projet"
//         />
//         <input
//           name="montant"
//           value={montant}
//           onChange={this.onChange}
//           type="number"
//           placeholder="montant"
//         />
//         <input
//           name="dateDebut"
//           value={dateDebut}
//           onChange={this.onChange}
//           type="date"
//           placeholder="date Debut"
//         />
//         <input
//           name="dateFin"
//           value={dateFin}
//           onChange={this.onChange}
//           type="date"
//           placeholder="date Fin"
//         />
//         <input
//           name="images"
//           value={images}
//           onChange={this.onChange}
//           type="text"
//           placeholder="images"
//         />
//         <input
//           name="uploadimages"
//         //   value={uploadimages}
//         //   onChange={this.onChange}
//           type="file"
//           placeholder="uploadimages"
//         />
//         <button disabled={isInvalid} type="submit">Add</button>
//         {/* {error && <p>{error.message}</p>} */}
//       </form>
//     );
//   }
// }
// const condition = authUser => !!authUser;
// const AddProjectForm = compose(
//   withRouter,
//   withFirebase,
// )(AddProjectFormBase);
// export default withAuthorization(condition) (AddProjet);
// export { AddProjectForm };


import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import * as ROUTES from '../../constants/routes';
const AddProjet = () => (
  <div>
    <AddProjectForm />
  </div>
);
const INITIAL_STATE = {
  nom: '',
  montant: null,
  dateDebut: '',
  dateFin: '',
//   images:[],
  files:null,
  urls:[],
  progress:0
};
class AddProjectFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.handleChange = this.handleChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);

  }
  handleChange = e => {
    if (e.target.files) {
      const files = e.target.files;
      console.log(e.target.files)

      this.setState(() => ({files}));
    }
  }
  handleUpload = () => {
    const {files} = this.state;
    console.log(files)
    const values = Object.values(files)
    let urls=[]
    values.forEach(file =>{



    const uploadTask = this.props.firebase.uploadTask(file.name).put(file);
    uploadTask.on('state_changed', 
    (snapshot) => {
    //   // progrss function ....
    //   const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    //   this.setState({progress});
    }, 
    (error) => {
         // error function ....
      console.log(error);
    }, 
  () => {
      // complete function ....
      this.props.firebase.uploadTaskURL().child(file.name).getDownloadURL().then(url => {
          console.log('Here it is: '+url)
// let urls= urls.push(url)
// this.setState(() => ({urls}))
// console.log('Here it is: '+urls)   
urls.push(url)
this.setState(() => ({urls}));
console.log(urls)   


})
  });

    });


}
  onSubmit = event => {
    // const { nom, montant, dateDebut,dateFin,images} = this.state;

    this.props.firebase.projets().add({
        nom: this.state.nom,
        montant: this.state.montant,
        dateDebut: this.state.dateDebut,
        dateFin: this.state.dateFin,
        images: this.state.urls,

      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
    });
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.ACCOUNT);


    event.preventDefault();

  };
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const {
      nom,
      montant,
      dateDebut,
      dateFin,
      urls,
    } = this.state;


    const isInvalid =
      nom ==='' ||
      montant === null ||
      dateDebut === '' ||
      dateFin === '';

    return (
<MDBContainer>
  <MDBRow>
    <MDBCol md="6">
      <form onSubmit={this.onSubmit}>
      <p className="h5 text-center mb-4">Add a project</p>
      <div className="grey-text">
        <MDBInput
          name="nom"
          value={nom}
          onChange={this.onChange}
          type="text"
          label="Nom du Projet"
        />
        <MDBInput
          name="montant"
          value={montant}
          onChange={this.onChange}
          type="number"
          label="Montant"
        />
        <br/>
        <MDBInput
          name="dateDebut"
          value={dateDebut}
          onChange={this.onChange}
          type="date"
          label="Date Début"
        />
        <br/>
        <MDBInput
          name="dateFin"
          value={dateFin}
          onChange={this.onChange}
          type="date"
          label="Date Fin"
        />
        {/* <input
          name="images"
          value={images}
          onChange={this.onChange}
          type="text"
          placeholder="images"
        /> */}
        <MDBInput
          name="uploadimages"
          onChange={this.handleChange}
        //   value={uploadimages}
        //   onChange={this.onChange}
          type="file" multiple
        />
        <a onClick={this.handleUpload}>Upload your photos</a>
        </div>

        <div className="text-center">
        <MDBBtn disabled={isInvalid} type="submit">Add</MDBBtn>
        </div>
        {/* {error && <p>{error.message}</p>} */}
      </form>
    </MDBCol>
  </MDBRow>
</MDBContainer>
    );
  }
}
const condition = authUser => !!authUser;
const AddProjectForm = compose(
  withRouter,
  withFirebase,
)(AddProjectFormBase);
export default withAuthorization(condition) (AddProjet);
export { AddProjectForm };