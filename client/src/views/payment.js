import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
 
export default class TakeMoney extends React.Component {
//   onToken = (token) => {
//     fetch('http://localhost:3001/save-stripe-token', {
//       method: 'POST',
//       body: JSON.stringify(token),
//     }).then(response => {
//       response.json().then(data => {
//         alert(`We are in business, ${data.email}`);
//       });
//     });
//   }
  onToken = (token) =>{
    console.log(token);
  }
 
  // ...
 
  render() {
    return (
      
      <StripeCheckout
        currency="USD"
        token={this.onToken}
        stripeKey="pk_test_51OQMG0JXp1hO5R4erfQhJpc5wApAydZbph8nnJByYlpEewy1hiqo4INF1AHpYHdkGxaVSThdO3MBMr6gzW83AoVR00wxcfQpkh"
      />
    )
  }
}