// import React, { Component } from 'react';
// import { withFirebase } from '../Firebase';
// import { AuthUserContext, withAuthorization } from '../Session';
// import { compose } from 'recompose';

// class AccountPage extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       loading: false,
//       projets: [],
//     };
//   }

//   componentDidMount() {
//       this.setState({ loading: true });
//       this.unsubscribe = this.props.firebase
//         .projets()
//         .onSnapshot(snapshot => {
//           let projets = [];
//           snapshot.forEach(doc =>
//             projets.push({ ...doc.data(), uid: doc.id }),
//           );
//           this.setState({
//             projets,
//             loading: false,
//           });
//         });
//     }
//   componentWillUnmount() {
//     this.unsubscribe();
//   }
//   render() {
//     const { projets, loading } = this.state;
//     return (
//       <div>
//       <AuthUserContext.Consumer>
//        {authUser => (
//       <div>
//         <h1>Account: {authUser.email}</h1>
//       </div>
//       )}
//       </AuthUserContext.Consumer>
//         {loading && <div>Loading ...</div>}
//         <ProjectList projets={projets} />
//       </div>
//     );
//   }
// }
// const ProjectList = ({ projets }) => {
//       return(
//   <ul>
//     {projets.map((p) => (
//       <li>
//         <span>
//           <strong>ID:</strong> {p.uid}
//         </span>
//         <span>
//           <strong>nom:</strong> {p.nom}
//         </span>
//         <span>
//           <strong>montant:</strong> {p.montant}
//         </span>
//         <div>{p.images.map((image) =>{
//               return (
//       <img src={image}/>)})}</div>
//       </li>
    
    
//     ))}

//   </ul>
// )};
// const condition = authUser => !!authUser;

// export default compose( withAuthorization(condition), withFirebase)(AccountPage);

import React, { Component } from 'react';
import { compose } from 'recompose';
import { withAuthorization,AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import Addbutton from '../addbutton.png'
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBIcon } from 'mdbreact';


const AccountPage = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser => (
      <div>
        <h1 style={{textAlign:'center'}}>Account: {authUser.email}</h1>
      </div>
      )}
    </AuthUserContext.Consumer>
    <Projets />
  </div>
);
// const ProjetItem = ({ projet }) => (
//       <li>
//         <strong>Nom du projet:</strong> {projet.nom} <strong>  Montant:</strong> {projet.montant}
//         <div className='imgs'>{projet.images.map((image) =>{
//               return (
//       <img src={image}/>)})}</div>
//       </li>
//     );
const ProjetItem = ({ projet }) => (
  <MDBRow>
      <MDBCol style={{ maxWidth: "60rem" }}>
        <MDBCard reverse>
  {/* <li>
    <strong>Nom du projet:</strong> {projet.nom} <strong>  Montant:</strong> {projet.montant}
    <div className='imgs'>{projet.images.map((image) =>{
          return (
  <img src={image}/>)})}</div>
  </li> */}
            <div className='imgs'>{projet.images.map((image) =>{
            return (
            <MDBCardImage cascade style={{ height: '20rem' }} src={image} />)})}
            </div>
            <MDBCardBody cascade className="text-center">
            <MDBCardTitle>{projet.nom}</MDBCardTitle>
            <h5 className="indigo-text"><strong>Montant: {projet.montant}</strong></h5>
            <MDBCardText>Sed ut perspiciatis unde omnis iste natus sit voluptatem accusantium doloremque laudantium, totam
              rem aperiam.</MDBCardText>
            <a href="#!" className="icons-sm li-ic ml-1">
              <MDBIcon fab icon="linkedin-in" /></a>
            <a href="#!" className="icons-sm tw-ic ml-1">
              <MDBIcon fab icon="twitter" /></a>
            <a href="#!" className="icons-sm fb-ic ml-1">
              <MDBIcon fab icon="facebook-f" /></a>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
);
const ProjetList = ({ projets }) => (
      <ul>
        {projets.map(projet => (
          <ProjetItem projet={projet} />
        ))}
      </ul>
    );

class ProjetsBase extends Component {
      constructor(props) {
        super(props);
        this.state = {
          loading: false,
          projets: [],
        };
      }
      componentDidMount() {
        this.setState({ loading: true });
        this.unsubscribe = this.props.firebase
        .projets().onSnapshot(snapshot => {
            let projets = [];

            if (projets) {

                  snapshot.forEach(doc =>
                        projets.push({ ...doc.data(), uid: doc.id }),
                      );
                      this.setState({ 
                            loading: false,projets,
                        });
            } else {
                  this.setState({ projets: null, loading: false });
                }
        });
      }
      componentWillUnmount() {
            this.unsubscribe();
      }
      render() {
        const { projets, loading } = this.state;
        return (
          <div>
            {loading && <div>Loading ...</div>}
            {projets ? (

            <ProjetList projets={projets} />
            ) : (
                  <div>There are no projets ...</div>
                )}
                        <Link to={ROUTES.ADDPROJET}><img className='addbutton' src={Addbutton}/> </Link>

          </div>
        );

      }
    }
const Projets = withFirebase(ProjetsBase);
const condition = authUser => !!authUser;

export default compose(
  withAuthorization(condition),withFirebase
)(AccountPage);
