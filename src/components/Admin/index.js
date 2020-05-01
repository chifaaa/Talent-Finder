import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import { compose } from 'recompose';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBIcon } from 'mdbreact';




class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      users: [],
    };
  }
  // componentDidMount() {
  //   this.setState({ loading: true });
  //   this.props.firebase.users().on('value', snapshot => {
  //     const usersObject = snapshot.val();
  //     const usersList = Object.keys(usersObject).map(key => ({
  //       ...usersObject[key],
  //       uid: key,
  //     }));
  //     this.setState({
  //       users: usersList,
  //       loading: false,
  //     });
  //   });
  // }


  // componentWillUnmount() {
  //   this.props.firebase.users().off();
  // }

  componentDidMount() {
    this.setState({ loading: true });
    this.unsubscribe = this.props.firebase
      .users()
      .onSnapshot(snapshot => {
        let users = [];
        snapshot.forEach(doc =>
          users.push({ ...doc.data(), uid: doc.id }),
        );
        this.setState({
          users,
          loading: false,
        });
      });
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    const { users, loading } = this.state;
    return (
      <div>
        <h1 style={{textAlign:'center'}}>Users list</h1>
        {loading && <div>Loading ...</div>}
        <UserList users={users} />
      </div>
    );
  }
}
const UserList = ({ users }) => (
  <div>
          <MDBRow>
          <MDBCol col='4'>
    {users.map(user => (
            <MDBCard narrow>
              <MDBCardImage
                className='view view-cascade gradient-card-header'
                cascade
                tag='div'
              >
                <h2 className='h2-responsive'>{user.username}</h2>
                <p>{user.email}</p>
                <div className='text-center'>
                  <MDBBtn color='purple' floating size='sm'>
                    <MDBIcon fab icon='facebook-f' size="lg"/>
                  </MDBBtn>
                  <MDBBtn color='purple' floating size='sm'>
                    <MDBIcon fab icon='twitter' size="lg"/>
                  </MDBBtn>
                  <MDBBtn color='purple' floating size='sm'>
                    <MDBIcon fab icon='google-plus-g' size="lg"/>
                  </MDBBtn>
                </div>
              </MDBCardImage>
              <MDBCardBody cascade className='text-center'>
                <MDBCardText>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Voluptatibus, ex, recusandae. Facere modi sunt, quod quibusdam
                  dignissimos neque rem nihil ratione est placeat vel, natus non
                  quos laudantium veritatis sequi.Ut enim ad minima veniam, quis
                  nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut
                  aliquid ex ea commodi.
                </MDBCardText>
              </MDBCardBody>
            </MDBCard>
 

      // <li style={{color:'blue'}} key={user.uid}>
      //   <span>
      //     <strong>ID:</strong> {user.uid}
      //   </span>
      //   <span>
      //     <strong>E-Mail:</strong> {user.email}
      //   </span>
      //   <span>
      //     <strong>Username:</strong> {user.username}
      //   </span>
      // </li>
    ))}
             </MDBCol>
          </MDBRow>
  </div>
);
const condition = authUser => !!authUser;

export default compose( withAuthorization(condition), withFirebase)(AdminPage);